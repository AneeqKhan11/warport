import {
  LOGIN_CONTACTNO,
  LOGIN_PASSWORD,
  LOGIN_LOADING,
  LOGIN_RESET,
  LOGIN_INIT_LOGIN_LOADED,
} from '../ActionTypes';

export const setLoginContactNo = (loginContactNo) => {
  return {
    type: LOGIN_CONTACTNO,
    payload: {
      loginContactNo: loginContactNo,
    },
  }
}
export const setLoginPassword = (loginPassword) => {
  return {
    type: LOGIN_PASSWORD,
    payload: {
      loginPassword: loginPassword,
    },
  }
}
export const setLoginLoading = (loginLoading) => {
  return {
    type: LOGIN_LOADING,
    payload: {
      loginLoading: loginLoading,
    },
  }
}

export const setLoginInitLoginLoaded = (loginInitialLoginLoaded) => {
  return {
    type: LOGIN_INIT_LOGIN_LOADED,
    payload: {
      loginInitialLoginLoaded: loginInitialLoginLoaded,
    },
  }
}
export const setLoginReset = () => {
  return {
    type: LOGIN_RESET,
  }
}
