import {
  MOBILECONFIRMATION_CODE,
  MOBILECONFIRMATION_LOADING,
  MOBILECONFIRMATION_BUTTON_DISABLED_TOGGLE,
  MOBILECONFIRMATION_RESET,
} from '../ActionTypes';

export const setMobileConfirmationCode = (mobileConfirmationCode) => {
  return {
    type: MOBILECONFIRMATION_CODE,
    payload: {
      mobileConfirmationCode: mobileConfirmationCode,
    },
  }
}
export const setMobileConfirmationLoading = (mobileConfirmationLoading) => {
  return {
    type: MOBILECONFIRMATION_LOADING,
    payload: {
      mobileConfirmationLoading: mobileConfirmationLoading,
    },
  }
}
export const setMobileConfirmationButtonDisabledToggle = (mobileConfirmationButtonDisabledToggle) => {
  return {
    type: MOBILECONFIRMATION_BUTTON_DISABLED_TOGGLE,
    payload: {
      mobileConfirmationButtonDisabledToggle: mobileConfirmationButtonDisabledToggle,
    },
  }
}
export const setMobileConfirmationReset = () => {
  return {
    type: MOBILECONFIRMATION_RESET,
  }
}
