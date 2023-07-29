import {
  RESETPASSWORD_CONTACTNO,
  RESETPASSWORD_LOADING,
  RESETPASSWORD_RESET,
} from '../ActionTypes';

const DEFAULT_VALUES = {
  resetPasswordContactNo: { value: '', error: '',country_code: '', calling_code: '' },
  resetPasswordLoading: false,
}
export const ResetPasswordReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case RESETPASSWORD_CONTACTNO:
      return Object.assign({}, state, {
        resetPasswordContactNo: action.payload.resetPasswordContactNo,
      })
    case RESETPASSWORD_LOADING:
      return Object.assign({}, state, {
        resetPasswordLoading: action.payload.resetPasswordLoading,
      })
    case RESETPASSWORD_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
