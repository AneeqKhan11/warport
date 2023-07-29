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

const DEFAULT_VALUES = {
  customerQueryFormCompanyName: { value: '', error: '' },
  customerQueryFormBuyerName: { value: '', error: '' },
  customerQueryFormLocation: { value: '', error: '' },
  customerQueryFormContactNo: {
    value: '',
    error: '',
    country_code: '',
    calling_code: '',
  },
  customerQueryFormContactNo2: {
    value: '',
    error: '',
    country_code: '',
    calling_code: '',
  },
  customerQueryFormSourceOfContact: 'whatsapp',
  customerQueryFormSourceOfContactOtherPlatform: { value: '', error: '' },
  customerQueryFormAddProductModalToggle:false,
  customerQueryFormAddProductModalSearch:"",
  customerQueryFormProductDetailsAdded: [],
  customerQueryFormProductDetailsData: [],
  customerQueryFormStatusOfQuery: 'initialstage',
  customerQueryFormAdditionalNote: { value: '', error: '' },
  customerQueryFormLoading: false,
}
export const CustomerQueryFormReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case CUSTOMERQUERYFORM_COMPANYNAME:
      return Object.assign({}, state, {
        customerQueryFormCompanyName: action.payload.customerQueryFormCompanyName,
      })
    case CUSTOMERQUERYFORM_BUYERNAME:
      return Object.assign({}, state, {
        customerQueryFormBuyerName: action.payload.customerQueryFormBuyerName,
      })
    case CUSTOMERQUERYFORM_LOCATION:
      return Object.assign({}, state, {
        customerQueryFormLocation: action.payload.customerQueryFormLocation,
      })
      case CUSTOMERQUERYFORM_CONTACTNO:
        return Object.assign({}, state, {
          customerQueryFormContactNo:
            action.payload.customerQueryFormContactNo,
        })
      case CUSTOMERQUERYFORM_CONTACTNO2:
        return Object.assign({}, state, {
          customerQueryFormContactNo2:
            action.payload.customerQueryFormContactNo2,
        })
      case CUSTOMERQUERYFORM_SOURCEOFCONTACT:
        return Object.assign({}, state, {
          customerQueryFormSourceOfContact:
            action.payload.customerQueryFormSourceOfContact,
        })
        case CUSTOMERQUERYFORM_SOURCEOFCONTACT_OTHERPLATFORM:
          return Object.assign({}, state, {
            customerQueryFormSourceOfContactOtherPlatform:
              action.payload.customerQueryFormSourceOfContactOtherPlatform,
          })
        case CUSTOMERQUERYFORM_ADDPRODUCTMODALTOGGLE:
          return Object.assign({}, state, {
            customerQueryFormAddProductModalToggle:
              action.payload.customerQueryFormAddProductModalToggle,
          })
          case CUSTOMERQUERYFORM_ADDPRODUCTMODALSEARCH:
            return Object.assign({}, state, {
              customerQueryFormAddProductModalSearch:
                action.payload.customerQueryFormAddProductModalSearch,
            })
    case CUSTOMERQUERYFORM_PRODUCTDETAILSADDED:
     
      return Object.assign({}, state, {
        customerQueryFormProductDetailsAdded:
          action.payload.customerQueryFormProductDetailsAdded,
      })
    case CUSTOMERQUERYFORM_PRODUCTDETAILSDATA:
      return Object.assign({}, state, {
        customerQueryFormProductDetailsData:
          action.payload.customerQueryFormProductDetailsData,
      })
    case CUSTOMERQUERYFORM_STATUSOFQUERY:
      return Object.assign({}, state, {
        customerQueryFormStatusOfQuery: action.payload.customerQueryFormStatusOfQuery,
      })
      case CUSTOMERQUERYFORM_ADDITIONALNOTE:
        return Object.assign({}, state, {
          customerQueryFormAdditionalNote:
            action.payload.customerQueryFormAdditionalNote,
        })
    case CUSTOMERQUERYFORM_LOADING:
      return Object.assign({}, state, {
        customerQueryFormLoading:
          action.payload.customerQueryFormLoading,
      })
    case CUSTOMERQUERYFORM_RESET:

      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
