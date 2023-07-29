import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import LoadingButton from '../../components/LoadingButton'
import { contactNoValidator } from '../../helpers/contactNoValidator'
import { emailValidator } from '../../helpers/emailValidator'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  setUserProfileContactNoVerifiedNo,
  setUserProfileContactNoVerified,
  setUserProfileContactNoVerifyLoading,
  setUserProfileContactNo,
} from '../../store/actions/UserProfileActions'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { gql, useMutation } from '@apollo/client'
import auth from '@react-native-firebase/auth'
import { useTranslation } from '../../context/Localization'
import AlertView from '../../context/AlertView'
const styles = StyleSheet.create({
  verifyButton: {
    width: 40,
    minWidth: 55,
    minHeight: 10,
  },
  verifyButtonText: {
    marginHorizontal: 0,
    fontSize: 10,
    paddingHorizontal: 0,
    height: 25,
  },
})

function VerifyContactNo(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const contactNoConcat = (
    props.userProfileContactNo.calling_code + props.userProfileContactNo.value
  ).replace(/\s/g, '')

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
          props.setUserProfileContactNoVerifyLoading(false)
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', message)
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
        !JSON.parse(
          checkContactNoUserExistMutationResult.check_contact_no_user_exist
            .result
        )
      ) {

        auth()
          .verifyPhoneNumber(contactNoConcat, true)
          .on('state_changed', (phoneAuthSnapshot) => {
            switch (phoneAuthSnapshot.state) {
              case auth.PhoneAuthState.CODE_SENT:
                
                props.navigation.navigate('MobileConfirmationScreen', {
                  phoneAuthSnapshot: phoneAuthSnapshot,
                  onAuthStateChanged: () => {
           
                    props.setUserProfileContactNoVerifiedNo({
                      value: props.userProfileContactNo.value,
                      country_code: props.userProfileContactNo.country_code,
                      calling_code: props.userProfileContactNo.calling_code,
                    })
                    props.navigation.goBack()
                  },
                })
                props.setUserProfileContactNoVerifyLoading(false)
                break
              case auth.PhoneAuthState.ERROR:
                if (
                  phoneAuthSnapshot.error.code == 'auth/network-request-failed'
                ) {
                  setAlertMessage('Network request failed.')
                  setAlertVisible(true)
                  // alertWithType('error', 'WarePort Error', translation('Network request failed.'))
                } else {
                  alert(phoneAuthSnapshot.error)
                }
                props.setUserProfileContactNoVerifyLoading(false)
                break
            }
          })
      } else {
        props.setUserProfileContactNoVerifyLoading(false)
        setAlertMessage('Contact no already registered.')
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', translation('Contact no already registered.'))
      }
    }
  }, [checkContactNoUserExistMutationResult])

  useEffect(() => {
   
    if (
      props.userProfileContactNoVerifiedNo != null &&
      contactNoConcat ==
        (
          props.userProfileContactNoVerifiedNo.calling_code +
          props.userProfileContactNoVerifiedNo.value
        ).replace(/\s/g, '')
    ) {
      props.setUserProfileContactNoVerified(true)
    } else if (contactNoConcat == props.userAuthData.contact_no) {
      props.setUserProfileContactNoVerified(true)
    } else {
      props.setUserProfileContactNoVerified(false)
    }
  }, [props.userProfileContactNo, props.userProfileContactNoVerifiedNo])

  const onVerifyPressed = async () => {
    const contactNoError = contactNoValidator(props.userProfileContactNo.value)

    if (contactNoError) {
      props.setUserProfileContactNo({
        value: props.userProfileContactNo.value,
        error: contactNoError,
        country_code: props.userProfileContactNo.country_code,
        calling_code: props.userProfileContactNo.calling_code,
      })

      return
    }

    try {
      props.setUserProfileContactNoVerifyLoading(true)

      await checkContactNoUserExist({
        variables: {
          contact_no: (
            props.userProfileContactNo.calling_code +
            props.userProfileContactNo.value
          ).replace(/\s/g, ''),
        },
      })
    } catch (ex) {
      props.setUserProfileContactNoVerifyLoading(false)
      if (ex.networkError) alertWithType('error', 'WarePort Error',"Check your Internet Connection"+ ex.toString())
    }
  }

  return (
    <>
    {
      alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
    }
      {props.userProfileContactNoVerified ? (
        <Icon
          name={'check'}
          size={20}
          style={{ marginHorizontal: 17 }}
          color={'#85bb5c'}
        />
      ) : (
        <LoadingButton
          textStyle={styles.verifyButtonText}
          disabled={props.userProfileContactNoVerifyLoading}
          loading={props.userProfileContactNoVerifyLoading}
          onPress={onVerifyPressed}
          style={styles.verifyButton}
        >
          {!props.userProfileContactNoVerifyLoading ? translation('Verify') : ''}
        </LoadingButton>
      )}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state.UserProfileReducer,
    ...state.UserAuthDataReducer,
  }
}
export default connect(mapStateToProps, {
  setUserProfileContactNoVerifiedNo,
  setUserProfileContactNoVerified,
  setUserProfileContactNoVerifyLoading,
  setUserProfileContactNo,
})(VerifyContactNo)
