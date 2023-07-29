import {
  MOBILECONFIRMATION_CODE,
  MOBILECONFIRMATION_LOADING,
  MOBILECONFIRMATION_BUTTON_DISABLED_TOGGLE,
  MOBILECONFIRMATION_RESET,
} from '../ActionTypes'

const DEFAULT_VALUES = {
  mobileConfirmationCode: { value: '', error: '' },
  mobileConfirmationLoading: false,
  mobileConfirmationButtonDisabledToggle: true,
}
export const MobileConfirmationReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case MOBILECONFIRMATION_CODE:
      return Object.assign({}, state, {
        mobileConfirmationCode: action.payload.mobileConfirmationCode,
      })

    case MOBILECONFIRMATION_LOADING:
      return Object.assign({}, state, {
        mobileConfirmationLoading: action.payload.mobileConfirmationLoading,
      })
      
    case MOBILECONFIRMATION_BUTTON_DISABLED_TOGGLE:
      return Object.assign({}, state, {
        mobileConfirmationButtonDisabledToggle:
          action.payload.mobileConfirmationButtonDisabledToggle,
      })
    case MOBILECONFIRMATION_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
