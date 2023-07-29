import {
  RESETPASSWORD_CONTACTNO,
  RESETPASSWORD_LOADING,
  RESETPASSWORD_RESET,
} from '../ActionTypes';

export const setResetPasswordContactNo = (resetPasswordContactNo) => {
  return {
    type: RESETPASSWORD_CONTACTNO,
    payload: {
      resetPasswordContactNo: resetPasswordContactNo,
    },
  }
}
export const setResetPasswordLoading = (resetPasswordLoading) => {
  return {
    type: RESETPASSWORD_LOADING,
    payload: {
      resetPasswordLoading: resetPasswordLoading,
    },
  }
}
export const setResetPasswordReset = () => {
  return {
    type: RESETPASSWORD_RESET,
  }
}
