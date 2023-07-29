import {
  VENDOR_BOTTOM_DRAWER_TOGGLE,
  VENDOR_BOTTOM_DRAWER_INDEX,
  VENDOR_BOTTOM_DRAWER_RESET,
} from '../ActionTypes'

export const setVendorBottomDrawerToggle = (vendorBottomDrawerToggle) => {
  return {
    type: VENDOR_BOTTOM_DRAWER_TOGGLE,
    payload: {
      vendorBottomDrawerToggle: vendorBottomDrawerToggle,
    },
  }
}
export const setVendorBottomDrawerIndex = (vendorBottomDrawerIndex) => {
  return {
    type: VENDOR_BOTTOM_DRAWER_INDEX,
    payload: {
      vendorBottomDrawerIndex: vendorBottomDrawerIndex,
    },
  }
}

export const setVendorBottomDrawerReset = () => {
  return {
    type: VENDOR_BOTTOM_DRAWER_RESET,
  }
}
