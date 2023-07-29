import React, { useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'
import Background from '../components/Background'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import HideOnKeyboardShow from '../components/HideOnKeyboardShow'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { confirmPasswordValidator } from '../helpers/confirmPasswordValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { connect } from 'react-redux'
import TextInput from '../components/TextInput'
import {
  setChangePasswordPassword,
  setChangePasswordConfirmPassword,
  setChangePasswordLoading,
  setChangePasswordReset,
} from '../store/actions/ChangePasswordActions'
import { setResetPasswordReset } from '../store/actions/ResetPasswordActions'
import LoadingButton from '../components/LoadingButton'
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import { useTranslation } from '../context/Localization'
import AlertView from '../context/AlertView'

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 16,
  },
})

function ChangePasswordScreen(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const [route, setRoute] = useState(false)
  const [ok,setok] = useState(true)
  const [success, setSuccess] = useState(false)
  let changePasswordMutation = gql`
    mutation change_password($contact_no: String!, $password: String!) {
      change_password(contact_no: $contact_no, password: $password) {
        success
        error
        result
      }
    }
  `
  const [
    changePassword,
    {
      loading: changePasswordMutationLoading,
      error: changePasswordMutationError,
      data: changePasswordMutationResult,
    },
  ] = useMutation(changePasswordMutation)

  useEffect(() => {
    if (changePasswordMutationError) {
      changePasswordMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', '', message)
      })
    }
  }, [changePasswordMutationError])

  useEffect(() => {
    if (
      changePasswordMutationResult &&
      changePasswordMutationResult.change_password
    ) {
      if (changePasswordMutationResult.change_password.success) {
        setAlertMessage('Password changed successfully.')
        setAlertVisible(true)
        setok(true)
        setSuccess(true)
        setRoute(true)
        // Alert.alert('Success', translation('Password changed successfully.'), [
        //   {
        //     text: 'OK',
        //     onPress: () => {
        //       props.navigation.reset({
        //         index: 1,
        //         routes: [{ name: 'StartScreen' }, { name: 'LoginScreen' }],
        //       })
        //     },
        //   },
        // ])

        props.setChangePasswordReset()
        props.setResetPasswordReset()
      }
    }
  }, [changePasswordMutationResult])

  const onChangePasswordpressed = async () => {
    const passwordError = passwordValidator(props.changePasswordPassword.value)
    const confirmPasswordError = confirmPasswordValidator(
      props.changePasswordPassword.value,
      props.changePasswordPassword.value
    )
    if (passwordError || confirmPasswordError) {
      props.setChangePasswordPassword({
        value: props.changePasswordPassword.value,
        error: passwordError,
      })
      props.setChangePasswordConfirmPassword({
        value: props.changePasswordConfirmPassword.value,
        error: confirmPasswordError,
      })
      return
    }

    try {
      props.setChangePasswordLoading(true)
      await changePassword({
        variables: {
          contact_no: (
            props.resetPasswordContactNo.calling_code +
            props.resetPasswordContactNo.value
          ).replace(/\s/g, ''),
          password: props.changePasswordConfirmPassword.value,
        },
      })
    } catch (ex) {
      props.setChangePasswordLoading(false)
      if (ex.networkError){
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      } 
      // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
    }
  }

  return (
    <Background>
      {
        alertVisible && <AlertView message={alertMessage} ok={ok} success={success} route={route}></AlertView>
      }
      <BackButtonWithLanguageMenu goBack={props.navigation.goBack} />
      {/* <HideOnKeyboardShow> */}
        <Logo />
      {/* </HideOnKeyboardShow> */}
      <Header>{translation('Change Password')}</Header>
      <TextInput
        placeholder={translation('Password')}
        returnKeyType="next"
        value={props.changePasswordPassword.value}
        onChangeText={(text) =>
          props.setChangePasswordPassword({ value: text, error: '' })
        }
        error={!!props.changePasswordPassword.error}
        errorText={translation(props.changePasswordPassword.error)}
        secureTextEntry
      />
      <TextInput
        placeholder={translation('Confirm Password')}
        returnKeyType="done"
        value={props.changePasswordConfirmPassword.value}
        onChangeText={(text) =>
          props.setChangePasswordConfirmPassword({ value: text, error: '' })
        }
        error={!!props.changePasswordConfirmPassword.error}
        errorText={translation(props.changePasswordConfirmPassword.error)}
        secureTextEntry
      />
      <LoadingButton
        disabled={props.changePasswordLoading}
        loading={props.changePasswordLoading}
        mode="contained"
        onPress={onChangePasswordpressed}
        style={styles.submitButton}
      >
        {translation('Change Password')}
      </LoadingButton>
    </Background>
  )
}
const mapStateToProps = (state) => {
  return { ...state.ChangePasswordReducer, ...state.ResetPasswordReducer }
}
export default connect(mapStateToProps, {
  setResetPasswordReset,
  setChangePasswordPassword,
  setChangePasswordConfirmPassword,
  setChangePasswordLoading,
  setChangePasswordReset,
})(ChangePasswordScreen)
