import {
  VENDOR_CHAT_BADGE,
  VENDOR_SEARCH_BADGE,
  VENDOR_NOFICATIONS_BADGE,
  VENDOR_WELCOME_CALL_POP_UP_TOGGLE,
  VENDOR_RESET,
} from '../ActionTypes'

const DEFAULT_VALUES = {
  vendorChatBadge: 0,
  vendorSearchBadge: 0,
  vendorNotificationBadge: 0,
  vendorWelcomeCallPopUpToggle: false,
}
export const VendorReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case VENDOR_CHAT_BADGE:
      return Object.assign({}, state, {
        vendorChatBadge: action.payload.vendorChatBadge,
      })
    case VENDOR_SEARCH_BADGE:
      return Object.assign({}, state, {
        vendorSearchBadge: action.payload.vendorSearchBadge,
      })
    case VENDOR_NOFICATIONS_BADGE:
      return Object.assign({}, state, {
        vendorNotificationBadge: action.payload.vendorNotificationBadge,
      })
    case VENDOR_WELCOME_CALL_POP_UP_TOGGLE:
      return Object.assign({}, state, {
        vendorWelcomeCallPopUpToggle:
          action.payload.vendorWelcomeCallPopUpToggle,
      })
    case VENDOR_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
