import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text,Button, Colors } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import HideOnKeyboardShow from '../components/HideOnKeyboardShow'
import { theme } from '../core/theme'
import { contactNoValidator } from '../helpers/contactNoValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { companyNameValidator } from '../helpers/companyNameValidator'
import PhoneNumberInput from '../components/PhoneNumberInput'
import { connect } from 'react-redux'
import {
  setRegisterContactNo,
  setRegisterLoading,
  setRegisterReset,
} from '../store/actions/RegisterActions'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import LoadingButton from '../components/LoadingButton'
import auth from '@react-native-firebase/auth'
import { gql, useMutation } from '@apollo/client'
import { useTranslation } from '../context/Localization'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from '../context/Localization/helpers'
import { languages } from '../context/Localization/languages'
import { BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AlertView from '../context/AlertView'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  submitButton: {
    marginTop: 24,
  },
  loginButtonLabelStyle:{
    textTransform: 'none',
    paddingLeft: 2,
    paddingRight:2,
    height: 18,
    letterSpacing: 0,
    marginHorizontal: 0,
    marginVertical: 0,

  },
  loginButton:{
    minWidth:0
  },
  forSupplierHeader:{
    fontSize:15,
    paddingVertical:0,
  },
  registerView:{
    width:"100%",
    padding:20,
    borderRadius:10,
    // backgroundColor:Colors.white
  },
  termsStyle:{
    position:'absolute',
    bottom:"-10%"
  },
  termsText:{
    color:theme.colors.primary
  }
})

export function RegisterScreen(props) {
  const { translation } = useTranslation()
  const navigation = useNavigation()
  const [alertVisible, setAlertVisible] = useState(false)
  const { alertWithType } = useDropdownAlert()
  const [message, setMessage] = useState('')
  const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
  const handleBackPress = ()=>{
    navigation.goBack()
    return true
  }

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
          props.setRegisterLoading(false)
          setMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [checkContactNoUserExistMutationError])

  useEffect(() => {
    
    if(props.registerContactNo.value.length == 13){
      const contactNoError = contactNoValidator(props.registerContactNo.value.slice(1,13))
      console.log(props.registerContactNo.value.slice(1,13))
      console.log(contactNoError)
      if (!contactNoError) {
        props.setRegisterContactNo({
          value: props.registerContactNo.value.slice(1,13),
          error: contactNoError,
          country_code: props.registerContactNo.country_code,
          calling_code: props.registerContactNo.calling_code,
        })

        return
      }
    }
  }, [props.registerContactNo.value])

  useEffect(() => {
    if (
      checkContactNoUserExistMutationResult &&
      checkContactNoUserExistMutationResult.check_contact_no_user_exist
    ) {
      if (
        !JSON.parse(
          checkContactNoUserExistMutationResult.check_contact_no_user_exist
            .result
        )
      ) {
        auth()
          .verifyPhoneNumber(
            (
              props.registerContactNo.calling_code +
              props.registerContactNo.value
            ).replace(/\s/g, ''),
            true
          )
          .on('state_changed', (phoneAuthSnapshot) => {
            switch (phoneAuthSnapshot.state) {
              case auth.PhoneAuthState.CODE_SENT:
                props.navigation.navigate('MobileConfirmationScreen', {
                  onAuthStateChanged: () => {
                    props.navigation.replace('RegisterScreenFinal')
                  },
                  phoneAuthSnapshot: phoneAuthSnapshot,
                  phoneNumber: (
                    props.registerContactNo.calling_code +
                    props.registerContactNo.value
                  ).replace(/\s/g, ''),
                })
                props.setRegisterLoading(false)
                break
              case auth.PhoneAuthState.ERROR:
                if (
                  phoneAuthSnapshot.error.code == 'auth/network-request-failed'
                ) {
                  setMessage("Check Internet Connection")
                  setAlertVisible(true)
                  // alertWithType('error', 'WarePort Error', translation('Network request failed.'))
                } else {
                  setMessage(phoneAuthSnapshot.error)
                  setAlertVisible(true)
                }
                props.setRegisterLoading(false)
                break
            }
          })
      } else {
        props.setRegisterLoading(false)
        setMessage('Contact Number already registered.')
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', translation('Contact Number already registered.'))
      }
    }
  }, [checkContactNoUserExistMutationResult])

  const onSignUpPressed = async () => {
    const contactNoError = contactNoValidator(props.registerContactNo.value)

    if (contactNoError) {
      props.setRegisterContactNo({
        value: props.registerContactNo.value,
        error: contactNoError,
        country_code: props.registerContactNo.country_code,
        calling_code: props.registerContactNo.calling_code,
      })

      return
    }

    try {
      props.setRegisterLoading(true)
      await checkContactNoUserExist({
        variables: {
          contact_no: (
            props.registerContactNo.calling_code + props.registerContactNo.value
          ).replace(/\s/g, ''),
        },
      })
    } catch (ex) {
      props.setRegisterLoading(false)
      console.log(ex)
      if (ex.networkError){
        setMessage("Check your Internet Connection")
        setAlertVisible(true)
      }
      //  alertWithType('error', 'WarePort Error', "Check your Internet Connection"+translation(ex.toString()))
    }
  }

  return (
    <View style={{
      flex:1,
      paddingBottom:100
    }}>
      <Background>
      {
        alertVisible && <AlertView title={"WarePort Alert"} message={message} ok={true} visible={setAlertVisible}></AlertView>
      }
      <BackButtonWithLanguageMenu goBack={props.navigation.goBack} />
        <Logo />
      <Header style={styles.forSupplierHeader}>{translation('For Suppliers')}</Header>
      <Header>{translation('Create Account')}</Header>
      <View style={styles.registerView}>
      <PhoneNumberInput
        disabled={props.registerLoading}
        placeholder={translation('Contact Number')}
        value={props.registerContactNo.value}
        initialCallingCode={selectedLanguageLocale.callingCode}
        initialCountryCode={selectedLanguageLocale.countryCode}
        error={!!props.registerContactNo.error}
        errorText={translation(props.registerContactNo.error)}
        onChangeText={(text, countryCode, callingCode) =>
          props.setRegisterContactNo({
            value: text,
            error: '',
            country_code: countryCode,
            calling_code: callingCode,
          })
        }
      />
      <LoadingButton
        disabled={props.registerLoading}
        loading={props.registerLoading}
        mode="contained"
        onPress={onSignUpPressed}
        style={styles.submitButton}
      >
        {translation('Sign Up')}
      </LoadingButton>
      <View style={styles.row}>
        <Text>{translation('Already have an account?')} </Text>
         
        <Button
        style={styles.loginButton}
          labelStyle={styles.loginButtonLabelStyle}
          contentStyle={styles.loginButtonContentStyle}
          onPress={() => props.navigation.replace('LoginScreen')}
        >
          <Text style={styles.link}>{translation('Login')}</Text>
          </Button>
      </View>
      </View>
      <HideOnKeyboardShow>
      {/* <TouchableOpacity style={styles.termsStyle}>
      <Text style={styles.termsText}>{translation('Terms And Conditions')}</Text>
      </TouchableOpacity> */}
      </HideOnKeyboardShow>
    </Background>
    </View>
  )
}
const mapStateToProps = (state) => {
  return { ...state.RegisterReducer }
}
export default connect(mapStateToProps, {
  setRegisterContactNo,
  setRegisterLoading,
  setRegisterReset,
})(RegisterScreen)
