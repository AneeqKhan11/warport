import {
   CONTACTUS_SUBJECT ,
 CONTACTUS_MESSAGE ,
  CONTACTUS_LOADING ,
  CONTACTUS_RESET 
} from '../ActionTypes';

const DEFAULT_VALUES = {
  contactUsSubject: { value: '', error: '' },
  contactUsMessage: { value: '', error: '' },
  contactUsLoading: false
}
export const ContactUsReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case CONTACTUS_SUBJECT:
      return Object.assign({}, state, {
        contactUsSubject: action.payload.contactUsSubject,
      })
      case CONTACTUS_MESSAGE:
      return Object.assign({}, state, {
        contactUsMessage: action.payload.contactUsMessage,
      })
    case CONTACTUS_LOADING:
      return Object.assign({}, state, {
        contactUsLoading: action.payload.contactUsLoading,
      })
    case CONTACTUS_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
