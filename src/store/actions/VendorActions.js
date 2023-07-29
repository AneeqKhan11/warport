import {
  VENDOR_CHAT_BADGE,
  VENDOR_SEARCH_BADGE ,
  VENDOR_NOFICATIONS_BADGE ,
  VENDOR_WELCOME_CALL_POP_UP_TOGGLE,
  VENDOR_FORM_CALL_POP_UP_TOGGLE,
 VENDOR_RESET 
} from '../ActionTypes';

export const setVendorChatBadge = (vendorChatBadge) => {
  return {
    type: VENDOR_CHAT_BADGE,
    payload: {
      vendorChatBadge: vendorChatBadge,
    },
  }
}
export const setVendorSearchBadge = (vendorSearchBadge) => {
  return {
    type: VENDOR_SEARCH_BADGE,
    payload: {
      vendorSearchBadge: vendorSearchBadge,
    },
  }
}
export const setVendorNotificationBadge = (vendorNotificationBadge) => {
  return {
    type: VENDOR_NOFICATIONS_BADGE,
    payload: {
      vendorNotificationBadge: vendorNotificationBadge,
    },
  }
}
export const setVendorWelcomeCallPopUpToggle = (vendorWelcomeCallPopUpToggle) => {
  return {
    type: VENDOR_WELCOME_CALL_POP_UP_TOGGLE,
    payload: {
      vendorWelcomeCallPopUpToggle: vendorWelcomeCallPopUpToggle,
    },
  }
}
export const setVendorFormCallPopUpToggle = (vendorFormCallPopUpToggle) => {
  return {
    type: VENDOR_FORM_CALL_POP_UP_TOGGLE,
    payload: {
      vendorFormCallPopUpToggle: vendorFormCallPopUpToggle,
    },
  }
}

export const setVendorReset = () => {
  return {
    type: VENDOR_RESET,
  }
}
