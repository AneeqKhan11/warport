import {
  LOGIN_CONTACTNO,
  LOGIN_PASSWORD,
  LOGIN_LOADING,
  LOGIN_RESET,
  LOGIN_INIT_LOGIN_LOADED,
} from '../ActionTypes'

const DEFAULT_VALUES = {
  loginContactNo: { value: '', error: '', country_code: '', calling_code: '' },
  loginPassword: { value: '', error: '' },
  loginLoading: false,
  loginInitialLoginLoaded: false,
}
export const LoginReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_CONTACTNO:
      return Object.assign({}, state, {
        loginContactNo: action.payload.loginContactNo,
      })
    case LOGIN_PASSWORD:
      return Object.assign({}, state, {
        loginPassword: action.payload.loginPassword,
      })
    case LOGIN_LOADING:
      return Object.assign({}, state, {
        loginLoading: action.payload.loginLoading,
      })
    case LOGIN_INIT_LOGIN_LOADED:
      return Object.assign({}, state, {
        loginInitialLoginLoaded: action.payload.loginInitialLoginLoaded,
      })
    case LOGIN_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
