import {
  EMAILCONFIRMATION_CODE ,
 EMAILCONFIRMATION_LOADING ,
   EMAILCONFIRMATION_BUTTON_DISABLED_TOGGLE,
  EMAILCONFIRMATION_RESET 
} from '../ActionTypes';

export const setEmailConfirmationCode = (emailConfirmationCode) => {
  return {
    type: EMAILCONFIRMATION_CODE,
    payload: {
      emailConfirmationCode: emailConfirmationCode,
    },
  }
}
export const setEmailConfirmationLoading = (emailConfirmationLoading) => {
  return {
    type: EMAILCONFIRMATION_LOADING,
    payload: {
      emailConfirmationLoading: emailConfirmationLoading,
    },
  }
}
export const setEmailConfirmationButtonDisabledToggle = (emailConfirmationButtonDisabledToggle) => {
  return {
    type: EMAILCONFIRMATION_BUTTON_DISABLED_TOGGLE,
    payload: {
      emailConfirmationButtonDisabledToggle: emailConfirmationButtonDisabledToggle,
    },
  }
}
export const setEmailConfirmationReset = () => {
  return {
    type: EMAILCONFIRMATION_RESET,
  }
}
