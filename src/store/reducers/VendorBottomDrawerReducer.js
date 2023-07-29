import {
  VENDOR_BOTTOM_DRAWER_TOGGLE,
  VENDOR_BOTTOM_DRAWER_INDEX,
  VENDOR_BOTTOM_DRAWER_RESET,
} from '../ActionTypes';

const DEFAULT_VALUES = {
  vendorBottomDrawerToggle: false,
  vendorBottomDrawerIndex: 0,
}
export const VendorBottomDrawerReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case VENDOR_BOTTOM_DRAWER_TOGGLE:
      return Object.assign({}, state, {
        vendorBottomDrawerToggle: action.payload.vendorBottomDrawerToggle,
      })
      case VENDOR_BOTTOM_DRAWER_INDEX:
      return Object.assign({}, state, {
        vendorBottomDrawerIndex: action.payload.vendorBottomDrawerIndex,
      })
    case VENDOR_BOTTOM_DRAWER_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })

    default:
      return state
  }
}
