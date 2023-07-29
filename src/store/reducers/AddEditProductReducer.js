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

const DEFAULT_VALUES = {
  addEditProductImages: [],
  addEditProductActiveSliderThumbnail: 0,
  addEditProductCategoryB: { value: '', error: '' },
  addEditProductCategoryBDataSet: [],
  addEditProductCategoryC: { value: '', error: '' },
  addEditProductCategoryCDataSet: [],
  addEditProductProductColor: '',
  addEditProductTitle: { value: '', error: '' },
  addEditProductPrice: { value: '', error: '' },
  addEditProductDiscountModalToggle: false,
  addEditProductDiscountQuantity: { value: '', error: '' },
  addEditProductDiscountPrice: { value: '', error: '' },
  addEditProductDescription: { value: '', error: '' },
  addEditProductCategoryAInputValues: { value: '', error: '' },
  addEditProductCategoryALoading: false,
  addEditProductCategoryADataSet: [],
  addEditProductLoading: false,
  addEditProductLoadingPercentage: 0,
}
export const AddEditProductReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case ADDEDITPRODUCT_IMAGES:
      return Object.assign({}, state, {
        addEditProductImages: action.payload.addEditProductImages,
      })
    case ADDEDITPRODUCT_ACTIVE_SLIDER_THUMBNAIL:
      return Object.assign({}, state, {
        addEditProductActiveSliderThumbnail:
          action.payload.addEditProductActiveSliderThumbnail,
      })
    case ADDEDITPRODUCT_CATEGORY_B:
      return Object.assign({}, state, {
        addEditProductCategoryB: action.payload.addEditProductCategoryB,
      })
    case ADDEDITPRODUCT_CATEGORY_B_DATASET:
      return Object.assign({}, state, {
        addEditProductCategoryBDataSet:
          action.payload.addEditProductCategoryBDataSet,
      })
    case ADDEDITPRODUCT_CATEGORY_C:
      return Object.assign({}, state, {
        addEditProductCategoryC: action.payload.addEditProductCategoryC,
      })
    case ADDEDITPRODUCT_CATEGORY_C_DATASET:
      return Object.assign({}, state, {
        addEditProductCategoryCDataSet:
          action.payload.addEditProductCategoryCDataSet,
      })
    case ADDEDITPRODUCT_PRODUCT_COLOR:
      return Object.assign({}, state, {
        addEditProductProductColor: action.payload.addEditProductProductColor,
      })
    case ADDEDITPRODUCT_TITLE:
      return Object.assign({}, state, {
        addEditProductTitle: action.payload.addEditProductTitle,
      })
    case ADDEDITPRODUCT_PRICE:
      return Object.assign({}, state, {
        addEditProductPrice: action.payload.addEditProductPrice,
      })
    case ADDEDITPRODUCT_DISCOUNT_MODAL_TOGGLE:
      return Object.assign({}, state, {
        addEditProductDiscountModalToggle:
          action.payload.addEditProductDiscountModalToggle,
      })
    case ADDEDITPRODUCT_DISCOUNT_QUANTITY:
      return Object.assign({}, state, {
        addEditProductDiscountQuantity:
          action.payload.addEditProductDiscountQuantity,
      })
    case ADDEDITPRODUCT_DISCOUNT_PRICE:
      return Object.assign({}, state, {
        addEditProductDiscountPrice: action.payload.addEditProductDiscountPrice,
      })
    case ADDEDITPRODUCT_DESCRIPTION:
      return Object.assign({}, state, {
        addEditProductDescription: action.payload.addEditProductDescription,
      })
    case ADDEDITPRODUCT_LOADING:
      return Object.assign({}, state, {
        addEditProductLoading: action.payload.addEditProductLoading,
      })
    case ADDEDITPRODUCT_LOADING_PERCENTAGE:
      return Object.assign({}, state, {
        addEditProductLoadingPercentage:
          action.payload.addEditProductLoadingPercentage,
      })

    case ADDEDITPRODUCT_CATEGORY_A_INPUT_VALUES:
      return Object.assign({}, state, {
        addEditProductCategoryAInputValues:
          action.payload.addEditProductCategoryAInputValues,
      })
    case ADDEDITPRODUCT_CATEGORY_A_DATASET:
      return Object.assign({}, state, {
        addEditProductCategoryADataSet:
          action.payload.addEditProductCategoryADataSet,
      })
    case ADDEDITPRODUCT_CATEGORY_A_LOADING:
      return Object.assign({}, state, {
        addEditProductCategoryALoading:
          action.payload.addEditProductCategoryALoading,
      })
    case ADDEDITPRODUCT_RESET:
      return Object.assign({}, state, {
        addEditProductImages: [],
        addEditProductActiveSliderThumbnail: 0,

        addEditProductProductColor: null,
        addEditProductTitle: { value: '', error: '' },
        addEditProductPrice: { value: '', error: '' },

        addEditProductDiscountModalToggle: false,
        addEditProductDiscountQuantity: { value: '', error: '' },
        addEditProductDiscountPrice: { value: '', error: '' },

        addEditProductDescription: { value: '', error: '' },

        addEditProductCategoryALoading: false,

        addEditProductLoading: false,
        addEditProductLoadingPercentage: 0,
      })
    default:
      return state
  }
}
