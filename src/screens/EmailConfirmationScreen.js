import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import { theme } from '../core/theme'
import { emailCodeValidator } from '../helpers/emailCodeValidator'
import AnimatedCodeField from '../components/AnimatedCodeField'
import Paragraph from '../components/Paragraph'
import { connect } from 'react-redux'
import {
  setEmailConfirmationCode,
  setEmailConfirmationLoading,
  setEmailConfirmationButtonDisabledToggle,
  setEmailConfirmationReset,
} from '../store/actions/EmailConfirmationActions'
import LoadingButton from '../components/LoadingButton'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import { useTranslation } from '../context/Localization'
import AlertView from '../context/AlertView'
const styles = StyleSheet.create({
  lockIcon: {
    width: 217 / 1.5,
    height: 158 / 1.5,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    marginTop: 10,
  },
  submitBtn: {
    marginTop: 24,
  },
})
function EmailConfirmationScreen(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const onVerifyPressed = () => {
    const confirmationCodeError = emailCodeValidator(
      props.emailConfirmationCode.value
    )

    if (confirmationCodeError) {
      props.setEmailConfirmationCode({
        value: props.emailConfirmationCode.value,
        error: confirmationCodeError,
      })

      return
    }

    props.setEmailConfirmationLoading(true)
    if (props.route && props.route.params) {
      if (props.route.params.code != props.emailConfirmationCode.value) {
        props.setEmailConfirmationCode({
          value: '',
          error: '',
        })
        setAlertMessage('Code is invalid. Try again.')
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', translation('Code is invalid. Try again.'))
      } else {
        props.route.params.onAuthStateChanged &&
          props.route.params.onAuthStateChanged()
      }
      props.setEmailConfirmationLoading(false)
    }
  }
  useEffect(() => {
    const confirmationCodeError = emailCodeValidator(
      props.emailConfirmationCode.value
    )

    if (confirmationCodeError) {
      props.setEmailConfirmationButtonDisabledToggle(true)
    } else {
      onVerifyPressed()
    }
  }, [props.emailConfirmationCode])
  return (
    <Background>
      {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
      }
      <BackButtonWithLanguageMenu
        goBack={() => {
          props.navigation.goBack()
          props.setEmailConfirmationReset()
        }}
      />
      <Image
        style={styles.lockIcon}
        source={require('../../assets/confirmationcode.png')}
      />
      <Paragraph style={styles.subTitle}>
        {translation('Please enter the verification code')}
        {'\n'}
        {translation('we send to your email address')}
      </Paragraph>
      <AnimatedCodeField
        valueText={props.emailConfirmationCode.value}
        onChangeText={(value) => {
          props.setEmailConfirmationCode({
            value: value,
            error: '',
          })
        }}
      />
      <LoadingButton
        disabled={props.emailConfirmationButtonDisabledToggle}
        loading={props.emailConfirmationLoading}
        mode="contained"
        onPress={() => onVerifyPressed()}
        style={styles.submitBtn}
      >
        {translation('Verify')}
      </LoadingButton>
    </Background>
  )
}
const mapStateToProps = (state) => {
  return { ...state.EmailConfirmationReducer }
}
export default connect(mapStateToProps, {
  setEmailConfirmationCode,
  setEmailConfirmationLoading,
  setEmailConfirmationButtonDisabledToggle,
  setEmailConfirmationReset,
})(EmailConfirmationScreen)
