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

export const setInfoForProductsFormValueCodeId = (
  infoForProductsFormValueCodeId
) => {
  return {
    type: INFOFORPRODUCTSFORM_VALUECODEID,
    payload: {
      infoForProductsFormValueCodeId: infoForProductsFormValueCodeId,
    },
  }
}
export const setInfoForProductsFormName = (infoForProductsFormName) => {
  return {
    type: INFOFORPRODUCTSFORM_NAME,
    payload: {
      infoForProductsFormName: infoForProductsFormName,
    },
  }
}
export const setInfoForProductsFormProductCategory = (
  infoForProductsFormProductCategory
) => {
  return {
    type: INFOFORPRODUCTSFORM_PRODUCTCATEGORY,
    payload: {
      infoForProductsFormProductCategory: infoForProductsFormProductCategory,
    },
  }
}
export const setInfoForProductsFormUOM = (infoForProductsFormUOM) => {
  return {
    type: INFOFORPRODUCTSFORM_UOM,
    payload: {
      infoForProductsFormUOM: infoForProductsFormUOM,
    },
  }
}
export const setInfoForProductsFormLength = (infoForProductsFormLength) => {
  return {
    type: INFOFORPRODUCTSFORM_LENGTH,
    payload: {
      infoForProductsFormLength: infoForProductsFormLength,
    },
  }
}
export const setInfoForProductsFormWidth = (infoForProductsFormWidth) => {
  return {
    type: INFOFORPRODUCTSFORM_WIDTH,
    payload: {
      infoForProductsFormWidth: infoForProductsFormWidth,
    },
  }
}
export const setInfoForProductsFormHeight = (infoForProductsFormHeight) => {
  return {
    type: INFOFORPRODUCTSFORM_HEIGHT,
    payload: {
      infoForProductsFormHeight: infoForProductsFormHeight,
    },
  }
}
export const setInfoForProductsFormBrand = (infoForProductsFormBrand) => {
  return {
    type: INFOFORPRODUCTSFORM_BRAND,
    payload: {
      infoForProductsFormBrand: infoForProductsFormBrand,
    },
  }
}
export const setInfoForProductsFormVendor = (infoForProductsFormVendor) => {
  return {
    type: INFOFORPRODUCTSFORM_VENDOR,
    payload: {
      infoForProductsFormVendor: infoForProductsFormVendor,
    },
  }
}
export const setInfoForProductsFormSOUM = (infoForProductsFormSOUM) => {
  return {
    type: INFOFORPRODUCTSFORM_SUOM,
    payload: {
      infoForProductsFormSOUM: infoForProductsFormSOUM,
    },
  }
}
export const setInfoForProductsFormUnits = (infoForProductsFormUnits) => {
  return {
    type: INFOFORPRODUCTSFORM_UNITS,
    payload: {
      infoForProductsFormUnits: infoForProductsFormUnits,
    },
  }
}
export const setInfoForProductsFormCaseWeight = (
  infoForProductsFormCaseWeight
) => {
  return {
    type: INFOFORPRODUCTSFORM_CASEWEIGHT,
    payload: {
      infoForProductsFormCaseWeight: infoForProductsFormCaseWeight,
    },
  }
}
export const setInfoForProductsFormManufactureName = (
  infoForProductsFormManufactureName
) => {
  return {
    type: INFOFORPRODUCTSFORM_MANUFACTURERNAME,
    payload: {
      infoForProductsFormManufactureName: infoForProductsFormManufactureName,
    },
  }
}
export const setInfoForProductsFormProductPrice = (
  infoForProductsFormProductPrice
) => {
  return {
    type: INFOFORPRODUCTSFORM_PRODUCTPRICE,
    payload: {
      infoForProductsFormProductPrice: infoForProductsFormProductPrice,
    },
  }
}
export const setInfoForProductsFormLoading = (infoForProductsFormLoading) => {
  return {
    type: INFOFORPRODUCTSFORM_LOADING,
    payload: {
      infoForProductsFormLoading: infoForProductsFormLoading,
    },
  }
}
export const setInfoForProductsFormReset = () => {
  return {
    type: INFOFORPRODUCTSFORM_RESET,
  }
}
