import {
  CUSTOMERQUERYFORM_COMPANYNAME,
  CUSTOMERQUERYFORM_BUYERNAME,
  CUSTOMERQUERYFORM_LOCATION,
  CUSTOMERQUERYFORM_CONTACTNO,
  CUSTOMERQUERYFORM_CONTACTNO2,
  CUSTOMERQUERYFORM_SOURCEOFCONTACT,
  CUSTOMERQUERYFORM_SOURCEOFCONTACT_OTHERPLATFORM,
  CUSTOMERQUERYFORM_ADDPRODUCTMODALTOGGLE,
  CUSTOMERQUERYFORM_ADDPRODUCTMODALSEARCH,
  CUSTOMERQUERYFORM_PRODUCTDETAILSADDED,
  CUSTOMERQUERYFORM_PRODUCTDETAILSDATA,
  CUSTOMERQUERYFORM_STATUSOFQUERY,
  CUSTOMERQUERYFORM_ADDITIONALNOTE,
  CUSTOMERQUERYFORM_LOADING,
  CUSTOMERQUERYFORM_RESET,
} from '../ActionTypes'

export const setCustomerQueryFormCompanyName = (customerQueryFormCompanyName) => {
  return {
    type: CUSTOMERQUERYFORM_COMPANYNAME,
    payload: {
      customerQueryFormCompanyName: customerQueryFormCompanyName,
    },
  }
}
export const setCustomerQueryFormBuyerName = (customerQueryFormBuyerName) => {
  return {
    type: CUSTOMERQUERYFORM_BUYERNAME,
    payload: {
      customerQueryFormBuyerName: customerQueryFormBuyerName,
    },
  }
}
export const setCustomerQueryFormLocation = (customerQueryFormLocation) => {
  return {
    type: CUSTOMERQUERYFORM_LOCATION,
    payload: {
      customerQueryFormLocation: customerQueryFormLocation,
    },
  }
}
export const setCustomerQueryFormContactNo = (
  customerQueryFormContactNo
) => {
  return {
    type: CUSTOMERQUERYFORM_CONTACTNO,
    payload: {
      customerQueryFormContactNo: customerQueryFormContactNo,
    },
  }
}
export const setCustomerQueryFormContactNo2 = (
  customerQueryFormContactNo2
) => {
  return {
    type: CUSTOMERQUERYFORM_CONTACTNO2,
    payload: {
      customerQueryFormContactNo2: customerQueryFormContactNo2,
    },
  }
}
export const setCustomerQueryFormSourceOfContact = (
  customerQueryFormSourceOfContact
) => {
  return {
    type: CUSTOMERQUERYFORM_SOURCEOFCONTACT,
    payload: {
      customerQueryFormSourceOfContact: customerQueryFormSourceOfContact,
    },
  }
}
export const setCustomerQueryFormSourceOfContactOtherPlatform = (
  customerQueryFormSourceOfContactOtherPlatform
) => {
  return {
    type: CUSTOMERQUERYFORM_SOURCEOFCONTACT_OTHERPLATFORM,
    payload: {
      customerQueryFormSourceOfContactOtherPlatform: customerQueryFormSourceOfContactOtherPlatform,
    },
  }
}
export const setCustomerQueryFormAddProductModalToggle = (
  customerQueryFormAddProductModalToggle
) => {
  return {
    type: CUSTOMERQUERYFORM_ADDPRODUCTMODALTOGGLE,
    payload: {
      customerQueryFormAddProductModalToggle: customerQueryFormAddProductModalToggle,
    },
  }
}
export const setCustomerQueryFormAddProductModalSearch = (
  customerQueryFormAddProductModalSearch
) => {
  return {
    type: CUSTOMERQUERYFORM_ADDPRODUCTMODALSEARCH,
    payload: {
      customerQueryFormAddProductModalSearch: customerQueryFormAddProductModalSearch,
    },
  }
}
export const setCustomerQueryFormProductDetailsAdded = (
  customerQueryFormProductDetailsAdded
) => {

  return {
    type: CUSTOMERQUERYFORM_PRODUCTDETAILSADDED,
    payload: {
      customerQueryFormProductDetailsAdded: customerQueryFormProductDetailsAdded,
    },
  }
}
export const setCustomerQueryFormProductDetailsData = (customerQueryFormProductDetailsData) => {
  return {
    type: CUSTOMERQUERYFORM_PRODUCTDETAILSDATA,
    payload: {
      customerQueryFormProductDetailsData: customerQueryFormProductDetailsData,
    },
  }
}
export const setCustomerQueryFormStatusOfQuery = (
  customerQueryFormStatusOfQuery
) => {
  return {
    type: CUSTOMERQUERYFORM_STATUSOFQUERY,
    payload: {
      customerQueryFormStatusOfQuery: customerQueryFormStatusOfQuery,
    },
  }
}
export const setCustomerQueryFormAdditionalNote = (customerQueryFormAdditionalNote) => {
  return {
    type: CUSTOMERQUERYFORM_ADDITIONALNOTE,
    payload: {
      customerQueryFormAdditionalNote: customerQueryFormAdditionalNote,
    },
  }
}
export const setCustomerQueryFormLoading = (
  customerQueryFormLoading
) => {
  return {
    type: CUSTOMERQUERYFORM_LOADING,
    payload: {
      customerQueryFormLoading: customerQueryFormLoading,
    },
  }
}
export const setCustomerQueryFormReset = () => {


  return {
    type: CUSTOMERQUERYFORM_RESET,
   
  }
}
