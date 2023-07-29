import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import HideOnKeyboardShow from '../components/HideOnKeyboardShow'
import Logo from '../components/Logo'
import Header from '../components/Header'
import PhoneNumberInput from '../components/PhoneNumberInput'
import { contactNoValidator } from '../helpers/contactNoValidator'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import {
  setResetPasswordContactNo,
  setResetPasswordLoading,
} from '../store/actions/ResetPasswordActions'
import LoadingButton from '../components/LoadingButton'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import auth from '@react-native-firebase/auth'
import { gql, useMutation } from '@apollo/client'
import { useTranslation } from '../context/Localization'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from '../context/Localization/helpers'
import { languages } from '../context/Localization/languages'
import { Colors } from 'react-native-paper'
import { BackHandler } from 'react-native'
import AlertView from '../context/AlertView'

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 16,
  },
  resetStyle: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    // backgroundColor:Colors.white
  },
  forSupplierHeader: {
    fontSize: 15,
    paddingVertical: 0,
  },

})

function ResetPasswordScreen(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
  const handleBackPress = () => {
    props.navigation.goBack()
  }

  useEffect(() => {

    if (props.resetPasswordContactNo.value.length == 13) {
      const contactNoError = contactNoValidator(props.resetPasswordContactNo.value.slice(1, 13))
      if (!contactNoError) {
        props.setResetPasswordContactNo({
          value: props.resetPasswordContactNo.value.slice(1, 13),
          error: contactNoError,
          country_code: props.resetPasswordContactNo.country_code,
          calling_code: props.resetPasswordContactNo.calling_code,
        })

        return
      }
    }
  }, [props.resetPasswordContactNo.value])


  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  let checkContactNoUserExistMutation = gql`
    mutation check_contact_no_user_exist($contact_no: String!) {
      check_contact_no_user_exist(contact_no: $contact_no) {
        success
        error
        result
      }
    }
  `

  const [
    checkContactNoUserExist,
    {
      loading: checkContactNoUserExistMutationLoading,
      error: checkContactNoUserExistMutationError,
      data: checkContactNoUserExistMutationResult,
    },
  ] = useMutation(checkContactNoUserExistMutation)

  useEffect(() => {
    if (checkContactNoUserExistMutationError) {
      checkContactNoUserExistMutationError.graphQLErrors.map(
        ({ message }, i) => {
          props.setResetPasswordLoading(false)
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [checkContactNoUserExistMutationError])

  useEffect(() => {
    if (
      checkContactNoUserExistMutationResult &&
      checkContactNoUserExistMutationResult.check_contact_no_user_exist
    ) {
      if (
        Boolean(
          checkContactNoUserExistMutationResult.check_contact_no_user_exist
            .result
        )
      ) {
        auth()
          .verifyPhoneNumber(
            (
              props.resetPasswordContactNo.calling_code +
              props.resetPasswordContactNo.value
            ).replace(/\s/g, ''),
            true
          )
          .on('state_changed', (phoneAuthSnapshot) => {
            switch (phoneAuthSnapshot.state) {
              case auth.PhoneAuthState.CODE_SENT:
                props.navigation.navigate('MobileConfirmationScreen', {
                  phoneAuthSnapshot: phoneAuthSnapshot,
                  onAuthStateChanged: () => {
                    props.navigation.replace('ChangePasswordScreen')
                  },
                  phoneNumber: (
                    props.resetPasswordContactNo.calling_code +
                    props.resetPasswordContactNo.value
                  ).replace(/\s/g, ''),
                })
                props.setResetPasswordLoading(false)
                break
              case auth.PhoneAuthState.ERROR:
                if (
                  phoneAuthSnapshot.error.code == 'auth/network-request-failed'
                ) {
                  setAlertMessage("Check your Internet Connection")
                  setAlertVisible(true)
                  // alertWithType(
                  //   'error',
                  //   'WarePort Error',
                  //   "Check your Internet Connection"+translation('Network request failed.')
                  // )
                } else {
                  setAlertMessage("Have you registered on the app First?")
                  setAlertVisible(true)
                }
                props.setResetPasswordLoading(false)
                break
            }
          })
      } else {
        props.setResetPasswordLoading(false)
        setAlertMessage('Contact no. not registered to any account. Please Register First!')
        setAlertVisible(true)
        // alertWithType(
        //   'error',
        //   'WarePort Error',
        //   translation('Contact no. not registered to any account. Please Register First!')
        // )
      }
    }
  }, [checkContactNoUserExistMutationResult])

  const sendResetMobileCode = async () => {
    const contactNoError = contactNoValidator(
      props.resetPasswordContactNo.value
    )

    if (contactNoError) {
      props.setResetPasswordContactNo({
        value: props.resetPasswordContactNo.value,
        error: contactNoError,
        country_code: props.resetPasswordContactNo.countryCode,
        calling_code: props.resetPasswordContactNo.callingCode,
      })
      return
    }
    try {
      props.setResetPasswordLoading(true)
      await checkContactNoUserExist({
        variables: {
          contact_no: (
            props.resetPasswordContactNo.calling_code +
            props.resetPasswordContactNo.value
          ).replace(/\s/g, ''),
        },
      })
    } catch (ex) {
      props.setResetPasswordLoading(false)
      if (ex.networkError) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      }
      //alertWithType('error', 'WarePort Error', "Check your Internet Connection"+translation(ex.toString()))
    }
  }

  return (
    <View style={{

      flex: 1,
      paddingBottom: 100,
      backgroundColor: "#FFF"
    }}>
      <Background>
        {
          alertVisible && <AlertView title={"WarePort Alert"} message={alertMessage} back={true} visible={setAlertVisible}></AlertView>
        }
        <BackButtonWithLanguageMenu goBack={props.navigation.goBack} />
        {/* <HideOnKeyboardShow> */}
        <Logo />
        <Header style={styles.forSupplierHeader}>{translation('For Suppliers')}</Header>
        {/* </HideOnKeyboardShow> */}
        <Header>{translation('Restore Password')}</Header>
        <View style={styles.resetStyle}>
          <PhoneNumberInput
            placeholder={translation('Contact Number')}
            value={props.resetPasswordContactNo.value}
            initialCallingCode={selectedLanguageLocale.callingCode}
            initialCountryCode={selectedLanguageLocale.countryCode}
            error={!!props.resetPasswordContactNo.error}
            errorText={translation(props.resetPasswordContactNo.error)}
            onChangeText={(text, countryCode, callingCode) =>
              props.setResetPasswordContactNo({
                value: text,
                error: '',
                country_code: countryCode,
                calling_code: callingCode,
              })
            }
          />
          <LoadingButton
            disabled={props.resetPasswordLoading}
            loading={props.resetPasswordLoading}
            mode="contained"
            onPress={sendResetMobileCode}
            style={styles.submitButton}
          >
            {translation('Send Code')}
          </LoadingButton>
        </View>
      </Background>
    </View>
  )
}
const mapStateToProps = (state) => {
  return { ...state.ResetPasswordReducer }
}
export default connect(mapStateToProps, {
  setResetPasswordContactNo,
  setResetPasswordLoading,
})(ResetPasswordScreen)
