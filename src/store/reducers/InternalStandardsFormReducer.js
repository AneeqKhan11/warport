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

const DEFAULT_VALUES = {
  internalStandardsFormManufacturerName: { value: '', error: '' },
  internalStandardsFormUsername: { value: '', error: '' },
  internalStandardsFormBuyerId: { value: '', error: '' },
  internalStandardsFormManufacturerCountry: { value: '', error: '' },
  internalStandardsFormPortOfLoading: { value: '', error: '' },
  internalStandardsFormPaymentTerms: { value: '', error: '' },
  internalStandardsFormShipmentTerms: { value: '', error: '' },
  internalStandardsFormModeOfShipment: { value: '', error: '' },
  internalStandardsFormLoading: false,
}
export const InternalStandardsFormReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case INTERNALSTANDARDSFORM_MANUFACTURERNAME:
      return Object.assign({}, state, {
        internalStandardsFormManufacturerName: action.payload.internalStandardsFormManufacturerName,
      })
    case INTERNALSTANDARDSFORM_USERNAME:
      return Object.assign({}, state, {
        internalStandardsFormUsername: action.payload.internalStandardsFormUsername,
      })
    case INTERNALSTANDARDSFORM_BUYERID:
      return Object.assign({}, state, {
        internalStandardsFormBuyerId: action.payload.internalStandardsFormBuyerId,
      })
    case INTERNALSTANDARDSFORM_MANUFACTURERCOUNTRY:
      return Object.assign({}, state, {
        internalStandardsFormManufacturerCountry: action.payload.internalStandardsFormManufacturerCountry,
      })
    case INTERNALSTANDARDSFORM_PORTOFLOADING:
      return Object.assign({}, state, {
        internalStandardsFormPortOfLoading: action.payload.internalStandardsFormPortOfLoading,
      })
    case INTERNALSTANDARDSFORM_PAYMENTTERMS:
      return Object.assign({}, state, {
        internalStandardsFormPaymentTerms: action.payload.internalStandardsFormPaymentTerms,
      })
    case INTERNALSTANDARDSFORM_SHIPMENTTERMS:
      return Object.assign({}, state, {
        internalStandardsFormShipmentTerms: action.payload.internalStandardsFormShipmentTerms,
      })
    case INTERNALSTANDARDSFORM_MODEOFSHIPMENT:
      return Object.assign({}, state, {
        internalStandardsFormModeOfShipment: action.payload.internalStandardsFormModeOfShipment,
      })
    case INTERNALSTANDARDSFORM_LOADING:
      return Object.assign({}, state, {
        internalStandardsFormLoading: action.payload.internalStandardsFormLoading,
      })
    case INTERNALSTANDARDSFORM_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
