import React, { useState, useEffect} from 'react'
import { gql, useLazyQuery, useMutation} from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUserAuthData } from '../store/actions/UserAuthDataActions'
import { useDropdownAlert } from './AlertDropdownContextProvider'
import AlertView from './AlertView'
import { useTranslation } from './Localization'

const LoginDataContext = React.createContext({
  loginData: null,
  requestloginDataRefresh: null,
  loginDataLoading: true,
})

const LoginDataContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null)
  const [userId,setUserId] = useState()
  const { alertWithType } = useDropdownAlert()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const { translation } = useTranslation()
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
      })
    }
  }, [meMutationError])

  useEffect(() => {
    ;(async () => {
      if (meMutationResult) {
        if (meMutationResult.me) {
          setUserAuthData(meMutationResult.me)
          setLoginData(meMutationResult.me)
        } else {
          await removeLoginUserId()
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
        setTimeout(() => {
          getUserByUserId(userId)
        }, 1000)
      }
    }
  }

  const requestLoginDataRefresh = async (users_id) => {
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
        } else {
        }
      })
      .catch(error => console.log(error));

      if (userId != null) {
        getUserByUserId(userId)
      }
  }, []);

  return (
    <LoginDataContext.Provider
      value={{
        loginData,
        requestLoginDataRefresh,
        loginDataLoading: meMutationLoading,
      }}
    >
      {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
      }
      {children}
    </LoginDataContext.Provider>
  )
}

export { LoginDataContext, LoginDataContextProvider }
