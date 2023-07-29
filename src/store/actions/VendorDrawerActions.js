import {
  VENDOR_DRAWER_TOGGLE,

  VENDOR_DRAWER_RESET,
} from '../ActionTypes';

export const setVendorDrawerToggle = (vendorDrawerToggle) => {
  return {
    type: VENDOR_DRAWER_TOGGLE,
    payload: {
      vendorDrawerToggle: vendorDrawerToggle,
    },
  }
}

export const setVendorDrawerReset = () => {
  return {
    type: VENDOR_DRAWER_RESET,
  }
}
