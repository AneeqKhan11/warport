import {
 USER_AUTH_DATA ,
 USER_AUTH_DATA_RESET
} from '../ActionTypes';

export const setUserAuthData = (userAuthData) => {
  return {
    type: USER_AUTH_DATA,
    payload: {
      userAuthData: userAuthData,
    },
  }
}

export const setUserAuthDataReset = () => {
  return {
    type: USER_AUTH_DATA_RESET,
  }
}
