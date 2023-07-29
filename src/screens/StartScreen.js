import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Divider } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { setLoginInitLoginLoaded } from '../store/actions/LoginActions'
import { setUserAuthData } from '../store/actions/UserAuthDataActions'
import SpinnerOverlay from '../components/SpinnerOverlay'
import { gql, useMutation } from '@apollo/client'
import { getLoginUserId, removeLoginUserId } from '../auth/LocalStorage'
import { connect } from 'react-redux'
import { RoleType } from '../helpers/RoleType'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import BackButtonWithLanguageMenu from '../components/BackButtonWithLanguageMenu'
import { useTranslation } from '../context/Localization'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AlertView from '../context/AlertView'

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slugan: {
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: -15,
    fontFamily: 'Roboto'
  },
  discriptionFirstLine: {
    fontSize: 19,
    width: '100%',
    textAlign: 'center',
    fontWeight: '900',
    fontFamily: 'Roboto',
    color:"black"
  },
  discriptionSecondLine: {
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: 'Roboto',
    color:"black"
  },
  discriptionFirstLine: {
    fontSize: 19,
    width: '100%',
    textAlign: 'center',
    fontWeight: '900',
    fontFamily: 'Roboto',
    color:"black"
  },
  discriptionSecondLine: {
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: 'Roboto',
    color:"black"
  }, 
})

export function StartScreen(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const [userId,setUserId] = useState()

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.log(error);
    }
  };
  

  let meMutation = gql`
    mutation me($id: ID!) {
      me(id: $id) {
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
    me,
    {
      loading: meMutationLoading,
      error: meMutationError,
      data: meMutationResult,
    },
  ] = useMutation(meMutation)

  useEffect(() => {
    if (meMutationError) {
      meMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
        props.setLoginInitLoginLoaded(true)
      })
    }
  }, [meMutationError])


  useEffect(() => {
    ;(async () => {
      if (meMutationResult) {
        if (meMutationResult.me) {
          if (meMutationResult.me.role == RoleType.Vendor) {
            props.setUserAuthData(meMutationResult.me)
            props.setLoginInitLoginLoaded(true)
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'VendorScreen' }],
            })
          }
          props.setUserAuthData(meMutationResult.me)
        } else {
          await removeLoginUserId()
          props.setLoginInitLoginLoaded(true)
        }
      }
    })()
  }, [meMutationResult])

  const getUserByUserId = async (userId) => {
    try {

      await me({
        variables: {
          id: userId,
        },
      })
    } catch (ex) {
      if (ex.networkError) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
        props.setLoginInitLoginLoaded(true)
        // setTimeout(() => {
        //   getUserByUserId(userId)
        // }, 1000)
      }
    }
  }

  useEffect(() => {
    getUserId()
      .then(userId => {
        if (userId) {
          setUserId(userId);
          props.setLoginInitLoginLoaded(false);
        } else {
          props.setLoginInitLoginLoaded(true);
        }
      })
      .catch(error => console.log(error));
  }, []);
  

  useEffect(() => {
      if (!props.loginInitialLoginLoaded) {
        if (userId != null) {
          getUserByUserId(userId)
        }else{
          props.setLoginInitLoginLoaded(true)
        }
      }
  }, [props.loginInitialLoginLoaded])

  return (
    <View style={styles.container}>
      {
        alertVisible && <AlertView message={alertMessage} ok={true} visible={setAlertVisible}></AlertView>
      }
      <SpinnerOverlay
        visible={!props.loginInitialLoginLoaded}
        textContent={translation('Loading...')}
        textStyle={styles.spinnerTextStyle}
      />
      <Background>
        <BackButtonWithLanguageMenu showBackButton={false} />
        <Logo />
        <Text style={styles.slugan}>
          {translation('B2B INDUSTRIAL & COMMERCIAL PORTAL')}
        </Text>
        <Text style={[styles.discriptionFirstLine,{marginTop:20}]}>
            {translation('ONE WINDOW B2B E.COMMERCE')}
          </Text>
          <Divider/>
          <Text style={[styles.discriptionSecondLine,{marginTop:10}]}>
            {translation('CONNECTING REGIONAL SUPPLIERS')}
          </Text>
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate('LoginScreen')}
        >
          {translation('Login')}
        </Button>
        <Button
          mode="outlined"
          onPress={() => props.navigation.navigate('RegisterScreen')}
        >
          {translation('Sign Up')}
        </Button>
      </Background>
    </View>
  )
}

const mapStateToProps = (state) => {
  return { ...state.LoginReducer }
}
export default connect(mapStateToProps, {
  setLoginInitLoginLoaded,
  setUserAuthData,
})(StartScreen)






