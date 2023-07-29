import {
  REGISTER_COMPANYNAME,
  REGISTER_CONTACTNO,
  REGISTER_PASSWORD,
  REGISTER_FINAL_SCREEN_LOADING,
  REGISTER_CONFIRMPASSWORD,
  REGISTER_LOADING,
  REGISTER_RESET,
} from '../ActionTypes';

const DEFAULT_VALUES = {
  registerCompanyName: { value: '', error: '' },
  registerContactNo: { value: '', error: '',country_code: '', calling_code: '' },
  registerPassword: { value: '', error: '' },
  registerFinalScreenLoading:false,
  registerConfirmPassword: { value: '', error: '' },
  registerLoading: false,
}
export const RegisterReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case REGISTER_COMPANYNAME:
      return Object.assign({}, state, {
        registerCompanyName: action.payload.registerCompanyName,
      })
    case REGISTER_CONTACTNO:
      return Object.assign({}, state, {
        registerContactNo: action.payload.registerContactNo,
      })

    case REGISTER_PASSWORD:
      return Object.assign({}, state, {
        registerPassword: action.payload.registerPassword,
      })
      case REGISTER_FINAL_SCREEN_LOADING:
        return Object.assign({}, state, {
          registerFinalScreenLoading: action.payload.registerFinalScreenLoading,
        })
      
    case REGISTER_CONFIRMPASSWORD:
      return Object.assign({}, state, {
        registerConfirmPassword: action.payload.registerConfirmPassword,
      })
    case REGISTER_LOADING:
      return Object.assign({}, state, {
        registerLoading: action.payload.registerLoading,
      })
    case REGISTER_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })

    default:
      return state
  }
}
