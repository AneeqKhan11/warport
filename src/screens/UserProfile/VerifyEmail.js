import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import LoadingButton from '../../components/LoadingButton'
import { emailValidator } from '../../helpers/emailValidator'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  setUserProfileEmailVerified,
  setUserProfileEmailVerifiedEmail,
  setUserProfileEmail,
  setUserProfileEmailVerifyLoading,
} from '../../store/actions/UserProfileActions'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { gql, useMutation } from '@apollo/client'
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

function VerifyEmail(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)

  let checkEmailUserExistMutation = gql`
    mutation check_email_user_exist($email: String!) {
      check_email_user_exist(email: $email) {
        success
        error
        result
      }
    }
  `

  const [
    checkEmailUserExist,
    {
      loading: checkEmailUserExistMutationLoading,
      error: checkEmailUserExistMutationError,
      data: checkEmailUserExistMutationResult,
    },
  ] = useMutation(checkEmailUserExistMutation)

  let sendEmailVerificationCodeMutation = gql`
    mutation send_email_verification_code($email: String!) {
      send_email_verification_code(email: $email) {
        success
        error
        result
      }
    }
  `

  const [
    sendEmailVerificationCode,
    {
      loading: sendEmailVerificationCodeMutationLoading,
      error: sendEmailVerificationCodeMutationError,
      data: sendEmailVerificationCodeMutationResult,
    },
  ] = useMutation(sendEmailVerificationCodeMutation)

  useEffect(() => {
    if (checkEmailUserExistMutationError) {
      checkEmailUserExistMutationError.graphQLErrors.map(({ message }, i) => {
        props.setUserProfileEmailVerifyLoading(false)
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [checkEmailUserExistMutationError])

  useEffect(() => {
    if (
      checkEmailUserExistMutationResult &&
      checkEmailUserExistMutationResult.check_email_user_exist
    ) {
      if (
        !JSON.parse(
          checkEmailUserExistMutationResult.check_email_user_exist.result
        )
      ) {
        sendEmailVerificationCode({
          variables: {
            email: props.userProfileEmail.value,
          },
        })
      } else {
        props.setUserProfileEmailVerifyLoading(false)
        setAlertMessage('Email already registered.')
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', translation('Email already registered.'))
      }
    }
  }, [checkEmailUserExistMutationResult])

  useEffect(() => {
    if (sendEmailVerificationCodeMutationError) {
      sendEmailVerificationCodeMutationError.graphQLErrors.map(
        ({ message }, i) => {
          props.setUserProfileEmailVerifyLoading(false)
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', message)
        }
      )
    }
  }, [sendEmailVerificationCodeMutationError])

  useEffect(() => {
    if (
      sendEmailVerificationCodeMutationResult &&
      sendEmailVerificationCodeMutationResult.send_email_verification_code
    ) {
      if (
        sendEmailVerificationCodeMutationResult.send_email_verification_code
          .result
      ) {
        props.navigation.navigate('EmailConfirmationScreen', {
          onAuthStateChanged: () => {
            props.setUserProfileEmailVerifiedEmail({
              value: props.userProfileEmail.value,
            })
            props.navigation.goBack()
          },
          code: sendEmailVerificationCodeMutationResult
            .send_email_verification_code.result,
        })
        props.setUserProfileEmailVerifyLoading(false)
      } else {
        props.setUserProfileEmailVerifyLoading(false)
        setAlertMessage(sendEmailVerificationCodeMutationResult.send_email_verification_code)
        setAlertVisible(true)
        // alertWithType(
        //   'error',
        //   'WarePort Error',
        //   sendEmailVerificationCodeMutationResult.send_email_verification_code
        //     .error
        // )
      }
    }
  }, [sendEmailVerificationCodeMutationResult])

  useEffect(() => {
    if (
      props.userProfileEmailVerifiedEmail != null &&
      props.userProfileEmail.value == props.userProfileEmailVerifiedEmail.value
    ) {
      props.setUserProfileEmailVerified(true)
    } else if (
      props.userProfileEmail.value != null &&
      props.userProfileEmail.value != '' &&
      props.userProfileEmail.value == props.userAuthData.email
    ) {
      props.setUserProfileEmailVerified(true)
    } else {
      props.setUserProfileEmailVerified(false)
    }
  }, [props.userProfileEmail, props.userProfileEmailVerifiedEmail])

  const onVerifyPressed = async () => {
    const emailError = emailValidator(props.userProfileEmail.value)

    if (emailError) {
      props.setUserProfileEmail({
        value: props.userProfileEmail.value,
        error: emailError,
      })

      return
    }

    try {
      props.setUserProfileEmailVerifyLoading(true)

      await checkEmailUserExist({
        variables: {
          email: props.userProfileEmail.value,
        },
      })
    } catch (ex) {
      props.setUserProfileEmailVerifyLoading(false)
      if (ex.networkError){
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      } 
      // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
    }
  }

  return (
    <>
      {props.userProfileEmailVerified ? (
        <Icon
          name={'check'}
          size={20}
          style={{ marginHorizontal: 17 }}
          color={'#85bb5c'}
        />
      ) : (
        <LoadingButton
          textStyle={styles.verifyButtonText}
          disabled={props.userProfileEmailVerifyLoading}
          loading={props.userProfileEmailVerifyLoading}
          onPress={onVerifyPressed}
          style={styles.verifyButton}
        >
          {!props.userProfileEmailVerifyLoading ? translation('Verify') : ''}
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
  setUserProfileEmailVerified,
  setUserProfileEmail,
  setUserProfileEmailVerifiedEmail,
  setUserProfileEmailVerifyLoading,
})(VerifyEmail)
