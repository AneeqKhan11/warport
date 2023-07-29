import {
  REGISTER_COMPANYNAME,
  REGISTER_CONTACTNO,
  REGISTER_PASSWORD,
  REGISTER_CONFIRMPASSWORD,
  REGISTER_FINAL_SCREEN_LOADING,
  REGISTER_LOADING,
  REGISTER_RESET,
} from '../ActionTypes';

export const setRegisterCompanyName = (registerCompanyName) => {
  return {
    type: REGISTER_COMPANYNAME,
    payload: {
      registerCompanyName: registerCompanyName,
    },
  }
}
export const setRegisterContactNo = (registerContactNo) => {
  return {
    type: REGISTER_CONTACTNO,
    payload: {
      registerContactNo: registerContactNo,
    },
  }
}
export const setRegisterPassword = (registerPassword) => {
  return {
    type: REGISTER_PASSWORD,
    payload: {
      registerPassword: registerPassword,
    },
  }
}
export const setRegisterConfirmPassword = (registerConfirmPassword) => {
  return {
    type: REGISTER_CONFIRMPASSWORD,
    payload: {
      registerConfirmPassword: registerConfirmPassword,
    },
  }
}
export const setRegisterFinalScreenLoading = (registerFinalScreenLoading) => {
  return {
    type: REGISTER_FINAL_SCREEN_LOADING,
    payload: {
      registerFinalScreenLoading: registerFinalScreenLoading,
    },
  }
}
export const setRegisterLoading = (registerLoading) => {
  return {
    type: REGISTER_LOADING,
    payload: {
      registerLoading: registerLoading,
    },
  }
}

export const setRegisterReset = () => {
  return {
    type: REGISTER_RESET,
  }
}
