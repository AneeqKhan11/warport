import {
  CHANGEPASSWORD_PASSWORD ,
  CHANGEPASSWORD_CONFIRMPASSWORD ,
  CHANGEPASSWORD_LOADING,
  CHANGEPASSWORD_RESET 
} from '../ActionTypes';

const DEFAULT_VALUES = {
  changePasswordPassword: { value: '', error: '' },
  changePasswordConfirmPassword: { value: '', error: '' },
  changePasswordPassword: { value: '', error: '' },
  changePasswordLoading: false,
}
export const ChangePasswordReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case CHANGEPASSWORD_PASSWORD:
      return Object.assign({}, state, {
        changePasswordPassword: action.payload.changePasswordPassword,
      })
    case CHANGEPASSWORD_CONFIRMPASSWORD:
      return Object.assign({}, state, {
        changePasswordConfirmPassword: action.payload.changePasswordConfirmPassword,
      })
      case CHANGEPASSWORD_LOADING:
        return Object.assign({}, state, {
          changePasswordLoading: action.payload.changePasswordLoading,
        })
    case CHANGEPASSWORD_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
