import { USER_AUTH_DATA, USER_AUTH_DATA_RESET } from '../ActionTypes'

const DEFAULT_VALUES = {
  userAuthData: {},
}
export const UserAuthDataReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case USER_AUTH_DATA:
      return Object.assign({}, state, {
        userAuthData: action.payload.userAuthData,
      })
    case USER_AUTH_DATA_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
