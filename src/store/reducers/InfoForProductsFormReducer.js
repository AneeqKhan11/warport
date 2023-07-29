import {
  INFOFORPRODUCTSFORM_VALUECODEID,
  INFOFORPRODUCTSFORM_NAME,
  INFOFORPRODUCTSFORM_PRODUCTCATEGORY,
  INFOFORPRODUCTSFORM_UOM,
  INFOFORPRODUCTSFORM_LENGTH,
  INFOFORPRODUCTSFORM_WIDTH,
  INFOFORPRODUCTSFORM_HEIGHT,
  INFOFORPRODUCTSFORM_BRAND,
  INFOFORPRODUCTSFORM_VENDOR,
  INFOFORPRODUCTSFORM_SUOM,
  INFOFORPRODUCTSFORM_UNITS,
  INFOFORPRODUCTSFORM_CASEWEIGHT,
  INFOFORPRODUCTSFORM_MANUFACTURERNAME,
  INFOFORPRODUCTSFORM_PRODUCTPRICE,
  INFOFORPRODUCTSFORM_LOADING,
  INFOFORPRODUCTSFORM_RESET,
} from '../ActionTypes'

const DEFAULT_VALUES = {
  infoForProductsFormValueCodeId: { value: '', error: '' },
  infoForProductsFormName: { value: '', error: '' },
  infoForProductsFormProductCategory: { value: '', error: '' },
  infoForProductsFormUOM: { value: '', error: '' },
  infoForProductsFormLength: { value: '', error: '' },
  infoForProductsFormWidth: { value: '', error: '' },
  infoForProductsFormHeight: { value: '', error: '' },
  infoForProductsFormBrand: { value: '', error: '' },
  infoForProductsFormVendor: { value: '', error: '' },
  infoForProductsFormSOUM: { value: '', error: '' },
  infoForProductsFormUnits: { value: '', error: '' },
  infoForProductsFormCaseWeight: { value: '', error: '' },
  infoForProductsFormManufactureName: { value: '', error: '' },
  infoForProductsFormProductPrice: { value: '', error: '' },
  infoForProductsFormLoading: false,
}
export const InfoForProductsFormReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case INFOFORPRODUCTSFORM_VALUECODEID:
      return Object.assign({}, state, {
        infoForProductsFormValueCodeId:
          action.payload.infoForProductsFormValueCodeId,
      })
    case INFOFORPRODUCTSFORM_NAME:
      return Object.assign({}, state, {
        infoForProductsFormName: action.payload.infoForProductsFormName,
      })
    case INFOFORPRODUCTSFORM_PRODUCTCATEGORY:
      return Object.assign({}, state, {
        infoForProductsFormProductCategory:
          action.payload.infoForProductsFormProductCategory,
      })
    case INFOFORPRODUCTSFORM_UOM:
      return Object.assign({}, state, {
        infoForProductsFormUOM: action.payload.infoForProductsFormUOM,
      })
    case INFOFORPRODUCTSFORM_LENGTH:
      return Object.assign({}, state, {
        infoForProductsFormLength: action.payload.infoForProductsFormLength,
      })
    case INFOFORPRODUCTSFORM_WIDTH:
      return Object.assign({}, state, {
        infoForProductsFormWidth: action.payload.infoForProductsFormWidth,
      })
    case INFOFORPRODUCTSFORM_HEIGHT:
      return Object.assign({}, state, {
        infoForProductsFormHeight: action.payload.infoForProductsFormHeight,
      })
    case INFOFORPRODUCTSFORM_BRAND:
      return Object.assign({}, state, {
        infoForProductsFormBrand: action.payload.infoForProductsFormBrand,
      })
    case INFOFORPRODUCTSFORM_VENDOR:
      return Object.assign({}, state, {
        infoForProductsFormVendor: action.payload.infoForProductsFormVendor,
      })
    case INFOFORPRODUCTSFORM_SUOM:
      return Object.assign({}, state, {
        infoForProductsFormSOUM: action.payload.infoForProductsFormSOUM,
      })
    case INFOFORPRODUCTSFORM_UNITS:
      return Object.assign({}, state, {
        infoForProductsFormUnits: action.payload.infoForProductsFormUnits,
      })
    case INFOFORPRODUCTSFORM_CASEWEIGHT:
      return Object.assign({}, state, {
        infoForProductsFormCaseWeight:
          action.payload.infoForProductsFormCaseWeight,
      })
    case INFOFORPRODUCTSFORM_MANUFACTURERNAME:
      return Object.assign({}, state, {
        infoForProductsFormManufactureName:
          action.payload.infoForProductsFormManufactureName,
      })
    case INFOFORPRODUCTSFORM_PRODUCTPRICE:
      return Object.assign({}, state, {
        infoForProductsFormProductPrice:
          action.payload.infoForProductsFormProductPrice,
      })
    case INFOFORPRODUCTSFORM_LOADING:
      return Object.assign({}, state, {
        infoForProductsFormLoading: action.payload.infoForProductsFormLoading,
      })
    case INFOFORPRODUCTSFORM_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
