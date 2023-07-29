import {
  VENDOR_DRAWER_TOGGLE,
  VENDOR_DRAWER_PROFILEAVATAR,
  VENDOR_DRAWER_RESET,
} from '../ActionTypes';

const DEFAULT_VALUES = {
  vendorDrawerToggle: false,

}
export const VendorDrawerReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case VENDOR_DRAWER_TOGGLE:
      return Object.assign({}, state, {
        vendorDrawerToggle: action.payload.vendorDrawerToggle,
      })

    case VENDOR_DRAWER_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
