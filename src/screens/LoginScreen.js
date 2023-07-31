import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Switch } from 'react-native'
import { Text, Button, Colors } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import LoadingButton from '../components/LoadingButton'
import TextInput from '../components/TextInput'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import HideOnKeyboardShow from '../components/HideOnKeyboardShow'
import { theme } from '../core/theme'
import { passwordValidator } from '../helpers/passwordValidator'
import PhoneNumberInput from '../components/PhoneNumberInput'
import { contactNoValidator } from '../helpers/contactNoValidator'
import { connect } from 'react-redux'
import {
  setLoginContactNo,
  setLoginPassword,
  setLoginLoading,
  setLoginReset,
} from '../store/actions/LoginActions'
import { RoleType } from '../helpers/RoleType'
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import { setUserAuthData } from '../store/actions/UserAuthDataActions'
import { getLoginInfo, getPassword, setInitialRoute, setLoginInfo, setLoginUserId, setPassword } from '../auth/LocalStorage'
import { setLoginUserName } from '../auth/LocalStorage'
import { setLoginNumber } from '../auth/LocalStorage'
import { useTranslation } from '../context/Localization'
import { BackHandler } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertView from '../context/AlertView'
import {
  LS_KEY,
  fetchLocale,
  getLanguageCodeFromLS,
} from '../context/Localization/helpers'
import { languages } from '../context/Localization/languages'
import { saveData } from '../auth/AsyncStorage'

const styles = StyleSheet.create({
  forgotPassword: {
    // width: '100%',
    // alignItems: 'flex-end',
    marginTop: -10,
    // marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    marginRight: 15,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.primary,
  },
  link: {
    fontWeight: 'bold',
    textAlign: "right",
    color: theme.colors.primary,
  },
  forgotPasswordButtonLabelStyle: {
    padding: 0,
    textTransform: 'none',
    paddingLeft: 5,
    paddingRight: 5,
    height: 17,
    letterSpacing: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  registerButtonLabelStyle: {
    textTransform: 'none',
    paddingLeft: 2,
    paddingRight: 2,
    height: 18,
    letterSpacing: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  registerButton: {
    minWidth: 0,
  },
  loginView: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderRadius: 12

  },
  forSupplierHeader: {
    fontSize: 15,
    paddingVertical: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rememberMeText: {
    alignSelf: 'center'
  },
  termsStyle: {
    position: 'absolute',
    bottom: "-10%"
  },
  termsText: {
    color: theme.colors.primary
  }
})

function LoginScreen(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [rememberMe, setRememberMe] = useState(true);
  const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const handleBackPress = () => {
    props.navigation.goBack()
  }

  const storeUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('userId', userId);
    } catch (error) {
      console.log(error);
    }
  };


  const storeCredentials = async (username, password, id) => {
    if (rememberMe) {
      try {
        await Keychain.setInternetCredentials(
          'myloginkey',
          username,
          password,
          id,
        );
      } catch (error) {
        console.log('Error saving credentials: ', error);
      }
    }
  };

  const retrieveCredentials = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials('myloginkey');
      if (credentials) {
        const contactNoError = contactNoValidator(credentials.username)
        const passwordError = passwordValidator(credentials.password)
        props.setLoginContactNo({
          value: credentials.username,
          error: contactNoError,
          country_code: props.loginContactNo.country_code,
          calling_code: props.loginContactNo.calling_code,
        })
        props.setLoginPassword({
          value: credentials.password,
          error: passwordError,
        })
      }
    } catch (error) {
      console.log('Error retrieving credentials: ', error);
    }
  };

  useState(() => {
    retrieveCredentials()
  }, [])

  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  let loginMutation = gql`
    mutation login($contact_no: String!, $password: String!) {
      login(contact_no: $contact_no, password: $password) {
        id
        avatar
        company_name
        country_code
        contact_no
        contact_no_verified
        email
        email_verified
        role
        password
        category_a_id
      }
    }
  `
  const [
    login,
    {
      loading: loginMutationLoading,
      error: loginMutationError,
      data: loginMutationResult,
    },
  ] = useMutation(loginMutation)


  useEffect(() => {
    if (props.loginContactNo.value.length == 13) {
      const contactNoError = contactNoValidator(props.loginContactNo.value.slice(1, 13))
      if (!contactNoError) {
        props.setLoginContactNo({
          value: props.loginContactNo.value.slice(1, 13),
          error: contactNoError,
          country_code: props.loginContactNo.country_code,
          calling_code: props.loginContactNo.calling_code,
        })
      }
    }
  }, [props.loginContactNo.value])

  useEffect(() => {
    if (loginMutationError) {
      loginMutationError.graphQLErrors.map(({ message }, i) => {
        props.setLoginLoading(false)
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', translation(message))
      })
    }
  }, [loginMutationError])

  useEffect(() => {
    const handleLogin = async () => {
      if (loginMutationResult && loginMutationResult.login) {
        if (loginMutationResult.login.role === RoleType.Vendor) {
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'VendorScreen' }],
          });
          props.setUserAuthData(loginMutationResult.login);
          await setLoginUserId(loginMutationResult.login.id);
          await saveData("ROUTE", "VendorScreen")
          await storeUserId(loginMutationResult.login.id);
          await setLoginUserName(loginMutationResult.login.company_name);
          await setLoginNumber(loginMutationResult.login.contact_no);
          props.setLoginReset();
        }
      }
    };

    handleLogin();
  }, [loginMutationResult])

  const onLoginPressed = async () => {
    const contactNoError = contactNoValidator(props.loginContactNo.value)
    const passwordError = passwordValidator(props.loginPassword.value)
    if (rememberMe) {
      if (contactNoError || passwordError) {
        setLoginNumber(props.loginContactNo.value)
        setPassword(props.loginPassword.value)
      }
    }
    if (contactNoError || passwordError) {


      props.setLoginContactNo({
        value: props.loginContactNo.value,
        error: contactNoError,
        country_code: props.loginContactNo.country_code,
        calling_code: props.loginContactNo.calling_code,
      })
      props.setLoginPassword({
        value: props.loginPassword.value,
        error: passwordError,
      })
      return
    }
    props.setLoginLoading(true)

    try {
      await login({
        variables: {
          contact_no: (
            props.loginContactNo.calling_code + props.loginContactNo.value
          ).replace(/\s/g, ''),
          password: props.loginPassword.value,
        },
      })
      storeCredentials(props.loginContactNo.value, props.loginPassword.value, loginId)
    } catch (ex) {
      props.setLoginLoading(false)
      if (ex.networkError)
        setAlertMessage("Check your Internet Connection")
      setAlertVisible(true)
      // alertWithType('error', 'WarePort Error', translation(ex.toString()))
    }
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 10,
      backgroundColor: "#FFF"
    }}>

      <BackButtonWithLanguageMenu
        goBack={props.navigation.goBack}
        showBackButton={false}
      />
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <Logo />
      </View>
      {/* <Header style={styles.forSupplierHeader}>{translation('For Suppliers')}</Header> */}
      <View style={{ alignItems: "center" }}>
        <Header
        >{translation('Welcome back.')}</Header>
      </View>
      <View style={styles.loginView}>
        <PhoneNumberInput
          containerStyle={{ borderRadius: 50, }}
          disabled={props.loginLoading}
          placeholder={translation('Contact Number')}
          value={props.loginContactNo.value}
          initialCallingCode={selectedLanguageLocale.callingCode}
          initialCountryCode={selectedLanguageLocale.countryCode}
          error={!!props.loginContactNo.error}
          errorText={translation(props.loginContactNo.error)}
          onChangeText={(text, countryCode, callingCode) =>
            props.setLoginContactNo({
              value: text,
              error: '',
              country_code: countryCode,
              calling_code: callingCode,
            })
          }
        />
        <TextInput
          autoCapitalize="none"
          disabled={props.loginLoading}
          placeholder={translation('Password')}
          returnKeyType="done"
          value={props.loginPassword.value}
          onChangeText={(text) =>
            props.setLoginPassword({ value: text, error: '' })
          }
          error={!!props.loginPassword.error}
          errorText={translation(props.loginPassword.error)}
          secureTextEntry
          inputStyle={{ borderRadius: 12, paddingHorizontal: 20 }}
        />
        <View style={styles.checkboxContainer}>
          {/* <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
            /><Text style={styles.rememberMeText}>Remember Me</Text> */}
          <View style={styles.forgotPassword}>
            <Button
              labelStyle={styles.forgotPasswordButtonLabelStyle}
              onPress={() => props.navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={styles.forgot}>
                {translation('Forgot your password?')}
              </Text>
            </Button>
          </View>
        </View>
        <LoadingButton
          style={{ marginTop: -10 }}
          disabled={props.loginLoading}
          loading={props.loginLoading}
          mode="contained"
          onPress={onLoginPressed}
        >
          {translation('Login')}
        </LoadingButton>
      </View>
      <View style={styles.row}>
        <Text>{translation('Don’t have an account?')} </Text>

        <Button
          style={styles.registerButton}
          labelStyle={styles.registerButtonLabelStyle}
          contentStyle={styles.registerButtonContentStyle}
          onPress={() => props.navigation.replace('RegisterScreen')}
        >
          <Text style={styles.link}>{translation('Sign up')}</Text>
        </Button>
      </View>
      <HideOnKeyboardShow>
        {/* <TouchableOpacity style={styles.termsStyle}>
      <Text style={styles.termsText}>{translation('Terms And Conditions')}</Text>
      </TouchableOpacity> */}
      </HideOnKeyboardShow>
    </View>
  )
}

const mapStateToProps = (state) => {
  return { ...state.LoginReducer }
}
export default connect(mapStateToProps, {
  setLoginContactNo,
  setLoginPassword,
  setLoginLoading,
  setLoginReset,
  setUserAuthData,
})(LoginScreen)
