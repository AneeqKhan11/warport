import {
  ADDEDITPRODUCT_IMAGES,
  ADDEDITPRODUCT_ACTIVE_SLIDER_THUMBNAIL,
  ADDEDITPRODUCT_CATEGORY_B,
  ADDEDITPRODUCT_CATEGORY_B_DATASET,
  ADDEDITPRODUCT_CATEGORY_C,
  ADDEDITPRODUCT_CATEGORY_C_DATASET,
  ADDEDITPRODUCT_PRODUCT_COLOR,
  ADDEDITPRODUCT_TITLE,
  ADDEDITPRODUCT_PRICE,
  ADDEDITPRODUCT_DISCOUNT_MODAL_TOGGLE,
  ADDEDITPRODUCT_DISCOUNT_QUANTITY,
  ADDEDITPRODUCT_DISCOUNT_PRICE,
  ADDEDITPRODUCT_DESCRIPTION,
  ADDEDITPRODUCT_LOADING,
  ADDEDITPRODUCT_LOADING_PERCENTAGE,
  ADDEDITPRODUCT_CATEGORY_A_INPUT_VALUES,
  ADDEDITPRODUCT_CATEGORY_A_DATASET,
  ADDEDITPRODUCT_CATEGORY_A_LOADING,
  ADDEDITPRODUCT_RESET,
} from '../ActionTypes'

export const setAddEditProductImages = (addEditProductImages) => {
  return {
    type: ADDEDITPRODUCT_IMAGES,
    payload: {
      addEditProductImages: addEditProductImages,
    },
  }
}
export const setAddEditProductActiveSliderThumbnail = (
  addEditProductActiveSliderThumbnail
) => {
  return {
    type: ADDEDITPRODUCT_ACTIVE_SLIDER_THUMBNAIL,
    payload: {
      addEditProductActiveSliderThumbnail: addEditProductActiveSliderThumbnail,
    },
  }
}
export const setAddEditProductCategoryB = (addEditProductCategoryB) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_B,
    payload: {
      addEditProductCategoryB: addEditProductCategoryB,
    },
  }
}
export const setAddEditProductCategoryBDataSet = (
  addEditProductCategoryBDataSet
) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_B_DATASET,
    payload: {
      addEditProductCategoryBDataSet: addEditProductCategoryBDataSet,
    },
  }
}
export const setAddEditProductCategoryC = (addEditProductCategoryC) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_C,
    payload: {
      addEditProductCategoryC: addEditProductCategoryC,
    },
  }
}
export const setAddEditProductCategoryCDataSet = (
  addEditProductCategoryCDataSet
) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_C_DATASET,
    payload: {
      addEditProductCategoryCDataSet: addEditProductCategoryCDataSet,
    },
  }
}
export const setAddEditProductProductColor = (addEditProductProductColor) => {
  return {
    type: ADDEDITPRODUCT_PRODUCT_COLOR,
    payload: {
      addEditProductProductColor: addEditProductProductColor,
    },
  }
}
export const setAddEditProductTitle = (addEditProductTitle) => {
  return {
    type: ADDEDITPRODUCT_TITLE,
    payload: {
      addEditProductTitle: addEditProductTitle,
    },
  }
}
export const setAddEditProductPrice = (addEditProductPrice) => {
  return {
    type: ADDEDITPRODUCT_PRICE,
    payload: {
      addEditProductPrice: addEditProductPrice,
    },
  }
}
export const setAddEditProductDiscountModalToggle = (
  addEditProductDiscountModalToggle
) => {
  return {
    type: ADDEDITPRODUCT_DISCOUNT_MODAL_TOGGLE,
    payload: {
      addEditProductDiscountModalToggle: addEditProductDiscountModalToggle,
    },
  }
}
export const setAddEditProductDiscountQuantity = (
  addEditProductDiscountQuantity
) => {
  return {
    type: ADDEDITPRODUCT_DISCOUNT_QUANTITY,
    payload: {
      addEditProductDiscountQuantity: addEditProductDiscountQuantity,
    },
  }
}
export const setAddEditProductDiscountPrice = (addEditProductDiscountPrice) => {
  return {
    type: ADDEDITPRODUCT_DISCOUNT_PRICE,
    payload: {
      addEditProductDiscountPrice: addEditProductDiscountPrice,
    },
  }
}
export const setAddEditProductDescription = (addEditProductDescription) => {
  return {
    type: ADDEDITPRODUCT_DESCRIPTION,
    payload: {
      addEditProductDescription: addEditProductDescription,
    },
  }
}
export const setAddEditProductLoading = (addEditProductLoading) => {
  return {
    type: ADDEDITPRODUCT_LOADING,
    payload: {
      addEditProductLoading: addEditProductLoading,
    },
  }
}
export const setAddEditProductLoadingPercentage = (
  addEditProductLoadingPercentage
) => {
  return {
    type: ADDEDITPRODUCT_LOADING_PERCENTAGE,
    payload: {
      addEditProductLoadingPercentage: addEditProductLoadingPercentage,
    },
  }
}
export const setAddEditProductCategoryAInputValues = (
  addEditProductCategoryAInputValues
) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_A_INPUT_VALUES,
    payload: {
      addEditProductCategoryAInputValues: addEditProductCategoryAInputValues,
    },
  }
}
export const setAddEditProductCategoryADataSet = (
  addEditProductCategoryADataSet
) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_A_DATASET,
    payload: {
      addEditProductCategoryADataSet: addEditProductCategoryADataSet,
    },
  }
}
export const setAddEditProductCategoryALoading = (
  addEditProductCategoryALoading
) => {
  return {
    type: ADDEDITPRODUCT_CATEGORY_A_LOADING,
    payload: {
      addEditProductCategoryALoading: addEditProductCategoryALoading,
    },
  }
}
export const setAddEditProductReset = () => {
  return {
    type: ADDEDITPRODUCT_RESET,
  }
}
