import {
  INTERNALSTANDARDSFORM_MANUFACTURERNAME,
  INTERNALSTANDARDSFORM_USERNAME,
  INTERNALSTANDARDSFORM_BUYERID,
  INTERNALSTANDARDSFORM_MANUFACTURERCOUNTRY,
  INTERNALSTANDARDSFORM_PORTOFLOADING,
  INTERNALSTANDARDSFORM_PAYMENTTERMS,
  INTERNALSTANDARDSFORM_SHIPMENTTERMS,
  INTERNALSTANDARDSFORM_MODEOFSHIPMENT,
  INTERNALSTANDARDSFORM_LOADING,
  INTERNALSTANDARDSFORM_RESET,
} from '../ActionTypes'

export const setInternalStandardsFormManufacturerName = (
  internalStandardsFormManufacturerName
) => {
  return {
    type: INTERNALSTANDARDSFORM_MANUFACTURERNAME,
    payload: {
      internalStandardsFormManufacturerName: internalStandardsFormManufacturerName,
    },
  }
}
export const setInternalStandardsFormUsername = (
  internalStandardsFormUsername
) => {
  return {
    type: INTERNALSTANDARDSFORM_USERNAME,
    payload: {
      internalStandardsFormUsername: internalStandardsFormUsername,
    },
  }
}
export const setInternalStandardsFormBuyerId = (
  internalStandardsFormBuyerId 
) => {
  return {
    type: INTERNALSTANDARDSFORM_BUYERID,
    payload: {
      internalStandardsFormBuyerId: internalStandardsFormBuyerId,
    },
  }
}
export const setInternalStandardsFormManufacturerCountry = (
  internalStandardsFormManufacturerCountry
) => {
  return {
    type: INTERNALSTANDARDSFORM_MANUFACTURERCOUNTRY,
    payload: {
      internalStandardsFormManufacturerCountry: internalStandardsFormManufacturerCountry,
    },
  }
}
export const setInternalStandardsFormPortOfLoading = (
  internalStandardsFormPortOfLoading
) => {
  return {
    type: INTERNALSTANDARDSFORM_PORTOFLOADING,
    payload: {
      internalStandardsFormPortOfLoading: internalStandardsFormPortOfLoading,
    },
  }
}
export const setInternalStandardsFormPaymentTerms = (
  internalStandardsFormPaymentTerms
) => {
  return {
    type: INTERNALSTANDARDSFORM_PAYMENTTERMS,
    payload: {
      internalStandardsFormPaymentTerms: internalStandardsFormPaymentTerms,
    },
  }
}
export const setInternalStandardsFormShipmentTerms = (
  internalStandardsFormShipmentTerms
) => {
  return {
    type: INTERNALSTANDARDSFORM_SHIPMENTTERMS,
    payload: {
      internalStandardsFormShipmentTerms: internalStandardsFormShipmentTerms,
    },
  }
}
export const setInternalStandardsFormModeOfShipment = (
  internalStandardsFormModeOfShipment
) => {
  return {
    type: INTERNALSTANDARDSFORM_MODEOFSHIPMENT,
    payload: {
      internalStandardsFormModeOfShipment: internalStandardsFormModeOfShipment,
    },
  }
}
export const setInternalStandardsFormLoading = (
  internalStandardsFormLoading
) => {
  return {
    type: INTERNALSTANDARDSFORM_LOADING,
    payload: {
      internalStandardsFormLoading: internalStandardsFormLoading,
    },
  }
}
export const setInternalStandardsFormReset = () => {
  return {
    type: INTERNALSTANDARDSFORM_RESET,
  }
}
