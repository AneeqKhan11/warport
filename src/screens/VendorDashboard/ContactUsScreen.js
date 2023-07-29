import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Colors, Text } from 'react-native-paper'
import BackButtonWithLanguageMenu from '../../components/BackButtonWithLanguageMenu'
import HideOnKeyboardShow from '../../components/HideOnKeyboardShow'
import Logo from '../../components/Logo'
import Background from '../../components/Background'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import LoadingButton from '../../components/LoadingButton'
import { subjectValidator } from '../../helpers/subjectValidator'
import { messageValidator } from '../../helpers/messageValidator'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import {
  setContactUsSubject,
  setContactUsMessage,
  setContactUsLoading,
  setContactUsReset,
} from '../../store/actions/ContactUsActions'
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../context/Localization'
import AlertView from '../../context/AlertView'

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 16,
  },
  WhiteView:{
    width:"100%",
    padding:20,
    borderRadius:10,
    backgroundColor:Colors.white
  }
})

function ContactUsScreen(props) {
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [ok,setok] = useState(true)
  const [success, setSuccess] = useState(false)
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  let submitContactUsMutation = gql`
    mutation submit_contact_us(
      $user_id: ID!
      $subject: String!
      $message: String!
    ) {
      submit_contact_us(
        user_id: $user_id
        subject: $subject
        message: $message
      ) {
        success
        error
        result
      }
    }
  `

  const [
    submitContactUs,
    {
      loading: submitContactUsLoading,
      error: submitContactUsError,
      data: submitContactUsResult,
    },
  ] = useMutation(submitContactUsMutation)

  useEffect(() => {
    if (submitContactUsError) {
      submitContactUsError.graphQLErrors.map(({ message }, i) => {
        props.setContactUsLoading(false)
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [submitContactUsError])

  useEffect(() => {
    if (submitContactUsResult && submitContactUsResult.submit_contact_us) {
      if (submitContactUsResult.submit_contact_us.success) {
        props.setContactUsReset(false)
        // alert(translation('Thanks for cantacting us. We will contact you soon.'))
        setAlertMessage('Thanks for cantacting us. We will contact you soon.')
        setAlertVisible(true)
      } else {
        props.setContactUsLoading(false)
        setAlertMessage(submitContactUsResult.submit_contact_us.error)
        setAlertVisible(true)
        // alertWithType(
        //   'error',
        //   'WarePort Error',
        //   submitContactUsResult.submit_contact_us.error
        // )
      }
    }
  }, [submitContactUsResult])

  const onSendPressed = async () => {
    const subjectError = subjectValidator(props.contactUsSubject.value)
    const messageError = messageValidator(props.contactUsMessage.value)

    if (subjectError || messageError) {
      props.setContactUsSubject({
        value: props.contactUsSubject.value,
        error: subjectError,
      })
      props.setContactUsMessage({
        value: props.contactUsMessage.value,
        error: messageError,
      })
      return
    }
    props.setContactUsLoading(true)
    try {
      await submitContactUs({
        variables: {
          user_id: props.userAuthData.id,
          subject: props.contactUsSubject.value,
          message: props.contactUsMessage.value,
        },
      })
    } catch (ex) {
      props.setContactUsLoading(false)
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
             alertVisible && <AlertView message={alertMessage} back={false} ok={ok} visible={setAlertVisible}></AlertView>
      }
      <BackButtonWithLanguageMenu goBack={props.navigation.goBack} showLanguageButton={false}/>
      {/* <HideOnKeyboardShow> */}
        <Logo />
      {/* </HideOnKeyboardShow> */}
      <Header>{translation('Contact Us')}</Header>
      <View style={styles.WhiteView}>
      <TextInput
        placeholder={translation('Please Enter Subject')}
        value={props.contactUsSubject.value}
        onChangeText={(text) =>
          props.setContactUsSubject({ value: text, error: '' })
        }
        error={!!props.contactUsSubject.error}
        errorText={translation(props.contactUsSubject.error)}
      />
      <TextInput
        placeholder={translation('Please Enter Message')}
        returnKeyType="done"
        multiline={true}
        numberOfLines={4}
        value={props.contactUsMessage.value}
        onChangeText={(text) =>
          props.setContactUsMessage({ value: text, error: '' })
        }
        error={!!props.contactUsMessage.error}
        errorText={translation(props.contactUsMessage.error)}
      />
      <LoadingButton
        disabled={props.contactUsLoading}
        loading={props.contactUsLoading}
        mode="contained"
        onPress={onSendPressed}
        style={styles.submitButton}
      >
        {translation('Send')}
      </LoadingButton>
      </View>
    </Background>
  )
}
const mapStateToProps = (state) => {
  return { ...state.ContactUsReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, {
  setContactUsSubject,
  setContactUsMessage,
  setContactUsLoading,
  setContactUsReset,
})(ContactUsScreen)
