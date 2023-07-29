import {
    LISTONEPRODUCT_ADDPRODUCTMODALTOGGLE,
    LISTONEPRODUCT_ADDPRODUCTMODALSEARCH,
    LISTONEPRODUCT_PRODUCTDETAILSADDED,
    LISTONEPRODUCT_PRODUCTDETAILSDATA,
  } from '../ActionTypes'


  export const setListOneProductAddProductModalToggle = (
    ListOneProductAddProductModalToggle
  ) => {
    return {
      type: LISTONEPRODUCT_ADDPRODUCTMODALTOGGLE,
      payload: {
        ListOneProductAddProductModalToggle: ListOneProductAddProductModalToggle,
      },
    }
  }
  export const setListOneProductAddProductModalSearch = (
    ListOneProductAddProductModalSearch
  ) => {
    return {
      type: LISTONEPRODUCT_ADDPRODUCTMODALSEARCH,
      payload: {
        ListOneProductAddProductModalSearch: ListOneProductAddProductModalSearch,
      },
    }
  }
  export const setListOneProductDetailsAdded = (
    ListOneProductDetailsAdded
  ) => {
  
    return {
      type: LISTONEPRODUCT_PRODUCTDETAILSADDED,
      payload: {
        ListOneProductDetailsAdded: ListOneProductDetailsAdded,
      },
    }
  }
  export const setListOneProductDetailsData = (ListOneProductDetailsData) => {
    return {
      type: LISTONEPRODUCT_PRODUCTDETAILSDATA,
      payload: {
        ListOneProductDetailsData: ListOneProductDetailsData,
      },
    }
  }