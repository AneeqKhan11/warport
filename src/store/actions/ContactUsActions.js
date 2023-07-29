import {
  CONTACTUS_SUBJECT ,
 CONTACTUS_MESSAGE ,
  CONTACTUS_LOADING ,
  CONTACTUS_RESET 
} from '../ActionTypes';

export const setContactUsSubject = (contactUsSubject) => {
  return {
    type: CONTACTUS_SUBJECT,
    payload: {
      contactUsSubject: contactUsSubject,
    },
  }
}
export const setContactUsMessage = (contactUsMessage) => {
  return {
    type: CONTACTUS_MESSAGE,
    payload: {
      contactUsMessage: contactUsMessage,
    },
  }
}
export const setContactUsLoading = (contactUsLoading) => {
  return {
    type: CONTACTUS_LOADING,
    payload: {
      contactUsLoading: contactUsLoading,
    },
  }
}
export const setContactUsReset = () => {
  return {
    type: CONTACTUS_RESET,
  }
}
