import {
  CHANGEPASSWORD_PASSWORD ,
  CHANGEPASSWORD_CONFIRMPASSWORD ,
  CHANGEPASSWORD_RESET ,
  CHANGEPASSWORD_LOADING 
} from '../ActionTypes';

export const setChangePasswordPassword = (changePasswordPassword) => {
  return {
    type: CHANGEPASSWORD_PASSWORD,
    payload: {
      changePasswordPassword: changePasswordPassword,
    },
  }
}
export const setChangePasswordConfirmPassword = (changePasswordConfirmPassword) => {
  return {
    type: CHANGEPASSWORD_CONFIRMPASSWORD,
    payload: {
      changePasswordConfirmPassword: changePasswordConfirmPassword,
    },
  }
}
export const setChangePasswordLoading = (changePasswordLoading) => {
  return {
    type: CHANGEPASSWORD_LOADING,
    payload: {
      changePasswordLoading: changePasswordLoading,
    },
  }
}
export const setChangePasswordReset = () => {
  return {
    type: CHANGEPASSWORD_RESET,
   
  }
}

