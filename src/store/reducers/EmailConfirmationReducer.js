import {
  EMAILCONFIRMATION_CODE,
  EMAILCONFIRMATION_LOADING,
  EMAILCONFIRMATION_BUTTON_DISABLED_TOGGLE,
  EMAILCONFIRMATION_RESET,
} from '../ActionTypes'

const DEFAULT_VALUES = {
  emailConfirmationCode: { value: '', error: '' },
  emailConfirmationLoading: false,
  emailConfirmationButtonDisabledToggle: true,
}
export const EmailConfirmationReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case EMAILCONFIRMATION_CODE:
      return Object.assign({}, state, {
        emailConfirmationCode: action.payload.emailConfirmationCode,
      })

    case EMAILCONFIRMATION_LOADING:
      return Object.assign({}, state, {
        emailConfirmationLoading: action.payload.emailConfirmationLoading,
      })

    case EMAILCONFIRMATION_BUTTON_DISABLED_TOGGLE:
      return Object.assign({}, state, {
        emailConfirmationButtonDisabledToggle:
          action.payload.emailConfirmationButtonDisabledToggle,
      })
    case EMAILCONFIRMATION_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
