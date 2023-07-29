import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import { theme } from '../core/theme'
import { mobileCodeValidator } from '../helpers/mobileCodeValidator'
import AnimatedCodeField from '../components/AnimatedCodeField'
import Paragraph from '../components/Paragraph'
import { connect } from 'react-redux'
import {
  setMobileConfirmationCode,
  setMobileConfirmationLoading,
  setMobileConfirmationButtonDisabledToggle,
  setMobileConfirmationReset,
} from '../store/actions/MobileConfirmationActions'
import LoadingButton from '../components/LoadingButton'
import auth from '@react-native-firebase/auth'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import { useTranslation } from '../context/Localization'
import SmsRetriever from 'react-native-sms-retriever'
import { BackHandler } from 'react-native'
import Logo from '../components/Logo'
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
function MobileConfirmationScreen(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const handleBackPress = ()=>{
    props.navigation.goBack()
  }

  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  function onAuthStateChanged(user) {
    if (user) {
      setTimeout(() => {
        if (
          props.route &&
          props.route.params &&
          props.route.params.onAuthStateChanged
        ) {
          if (props.route.params.phoneNumber == user.phoneNumber)
            props.route.params.onAuthStateChanged()
        }
        props.setMobileConfirmationReset()
      }, 1000)
    }
  }

  useEffect(() => {
    startSmsRetriever()
    return () => {
      try {
        SmsRetriever.removeSmsListener()
      } catch (e) {}
    }
    //  const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    //  return subscriber // unsubscribe on unmount
    //disbale auto verification from google play
  }, [])

  const onVerifyPressed = () => {
    const confirmationCodeError = mobileCodeValidator(
      props.mobileConfirmationCode.value
    )

    if (confirmationCodeError) {
      props.setMobileConfirmationCode({
        value: props.mobileConfirmationCode.value,
        error: confirmationCodeError,
      })

      return
    }

    props.setMobileConfirmationLoading(true)
    if (props.route && props.route.params) {
      const phoneCredentials = auth.PhoneAuthProvider.credential(
        props.route.params.phoneAuthSnapshot.verificationId,
        props.mobileConfirmationCode.value
      )
      auth()
        .signInWithCredential(phoneCredentials)
        .then((userCredentials) => {
          if (
            props.route &&
            props.route.params &&
            props.route.params.onAuthStateChanged
          )
            props.route.params.onAuthStateChanged()

          props.setMobileConfirmationReset()
        })
        .catch((error) => {
          props.setMobileConfirmationLoading(false)

          if (error.code == 'auth/invalid-verification-code') {
            props.setMobileConfirmationCode({
              value: '',
              error: '',
            })
            setAlertMessage('Code is invalid. Try again.')
            setAlertVisible(true)
            // alertWithType(
            //   'error',
            //   'WarePort Error',
            //   translation('Code is invalid. Try again.')
            // )
          } else if (error.code == 'auth/network-request-failed') {
            props.setMobileConfirmationButtonDisabledToggle(false)
            setAlertMessage('Check your Internet Connection')
            setAlertVisible(true)
            // alertWithType('error', 'WarePort Error', translation('Network request failed.'))
          }
        })
    }
  }

  const startSmsRetriever = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever()

      if (registered) {
        SmsRetriever.addSmsListener((event) => {
          console.log(event.message)
          console.log(
            event.message.includes('OzpKDBvN5yz') /* development sms id */ ||
              event.message.includes('1u3oXP+bn6W')
          )
          // BBaGD2TOEXm
          if (
            event.message.includes('OzpKDBvN5yz') /* development sms id */ ||
            event.message.includes('1u3oXP+bn6W')
          ) {
            console.log('otp', event.message.substring(0, 6))
            props.setMobileConfirmationCode({
              value: event.message.substring(0, 6),
              error: '',
            })

            //onVerifyPressed()

            // SmsRetriever.removeSmsListener()
          }
        })
      }
    } catch (error) {
      console.log('SMS retriever error: ', JSON.stringify(error))
    }
  }
  useEffect(() => {
    const confirmationCodeError = mobileCodeValidator(
      props.mobileConfirmationCode.value
    )

    if (confirmationCodeError) {
      props.setMobileConfirmationButtonDisabledToggle(true)
    } else {
      onVerifyPressed()
    }
  }, [props.mobileConfirmationCode])
  return (
    <Background>
      {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
      }
      <BackButtonWithLanguageMenu
        goBack={() => {
          props.navigation.goBack()
          props.setMobileConfirmationReset()
        }}
      />
      <Logo />
      <Image
        style={styles.lockIcon}
        source={require('../../assets/confirmationcode.png')}
      />
      <Paragraph style={styles.subTitle}>
        {translation('Please enter the verification code')}
        {'\n'}
        {translation('we send to your mobile number')}
      </Paragraph>
      <AnimatedCodeField
        valueText={props.mobileConfirmationCode.value}
        onChangeText={(value) => {
          props.setMobileConfirmationCode({
            value: value,
            error: '',
          })
        }}
      />
      <LoadingButton
        disabled={props.mobileConfirmationButtonDisabledToggle}
        loading={props.mobileConfirmationLoading}
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
  return { ...state.MobileConfirmationReducer }
}
export default connect(mapStateToProps, {
  setMobileConfirmationCode,
  setMobileConfirmationLoading,
  setMobileConfirmationButtonDisabledToggle,
  setMobileConfirmationReset,
})(MobileConfirmationScreen)
