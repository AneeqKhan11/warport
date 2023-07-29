import {
  USERPROFILE_PROFILEAVATAR,
  USERPROFILE_COMPANYNAME,
  USERPROFILE_CONTACTNO,
  USERPROFILE_CONTACTNO_VERIFIED_NO,
  USERPROFILE_CONTACTNO_VERIFIED,
  USERPROFILE_CONTACTNO_VERIFY_LOADING,
  USERPROFILE_EMAIL,
  USERPROFILE_EMAIL_VERIFIED_EMAIL,
  USERPROFILE_EMAIL_VERIFIED,
  USERPROFILE_EMAIL_VERIFY_LOADING,
  USERPROFILE_LOADING,
  USERPROFILE_CONTENT_LOADING,
  USERPROFILE_RESET,
} from '../ActionTypes'

const DEFAULT_VALUES = {
  userProfileProfileAvatar: '',
  userProfileCompanyName: { value: '', error: '' },
  userProfileContactNo: {
    value: '',
    error: '',
    country_code: '',
    calling_code: '',
  },
  userProfileContactNoVerifiedNo:null,
  userProfileContactNoVerified: { value: false, error: '' },
  userProfileContactNoVerifyLoading: false,
  userProfileEmail: '',
  userProfileEmailVerifiedEmail: null,
  userProfileEmailVerified: { value: '', error: '' },
  userProfileEmailVerifyLoading: false,
  userProfileContentLoading:true,
  userProfileLoading: false,
}
export const UserProfileReducer = (
  state = {
    ...DEFAULT_VALUES,
  },
  action
) => {
  switch (action.type) {
    case USERPROFILE_PROFILEAVATAR:
      return Object.assign({}, state, {
        userProfileProfileAvatar: action.payload.userProfileProfileAvatar,
      })
    case USERPROFILE_COMPANYNAME:
      return Object.assign({}, state, {
        userProfileCompanyName: action.payload.userProfileCompanyName,
      })
    case USERPROFILE_CONTACTNO:
      return Object.assign({}, state, {
        userProfileContactNo: action.payload.userProfileContactNo,
      })
      case USERPROFILE_CONTACTNO_VERIFIED_NO:
        return Object.assign({}, state, {
          userProfileContactNoVerifiedNo:
            action.payload.userProfileContactNoVerifiedNo,
        })
      case USERPROFILE_CONTACTNO_VERIFIED:
        return Object.assign({}, state, {
          userProfileContactNoVerified:
            action.payload.userProfileContactNoVerified,
        })
    case USERPROFILE_CONTACTNO_VERIFIED:
      return Object.assign({}, state, {
        userProfileContactNoVerified:
          action.payload.userProfileContactNoVerified,
      })
    case USERPROFILE_CONTACTNO_VERIFY_LOADING:
      return Object.assign({}, state, {
        userProfileContactNoVerifyLoading:
          action.payload.userProfileContactNoVerifyLoading,
      })
    case USERPROFILE_EMAIL:
      return Object.assign({}, state, {
        userProfileEmail: action.payload.userProfileEmail,
      })
      case USERPROFILE_EMAIL_VERIFIED_EMAIL:
        return Object.assign({}, state, {
          userProfileEmailVerifiedEmail:
            action.payload.userProfileEmailVerifiedEmail,
        })
    case USERPROFILE_EMAIL_VERIFIED:
      return Object.assign({}, state, {
        userProfileEmailVerified:
          action.payload.userProfileEmailVerified,
      })
      case USERPROFILE_EMAIL_VERIFY_LOADING:
        return Object.assign({}, state, {
          userProfileEmailVerifyLoading:
            action.payload.userProfileEmailVerifyLoading,
        })
    case USERPROFILE_LOADING:
      return Object.assign({}, state, {
        userProfileLoading: action.payload.userProfileLoading,
      })
      case USERPROFILE_CONTENT_LOADING:
        return Object.assign({}, state, {
          userProfileContentLoading: action.payload.userProfileContentLoading,
        })
    case USERPROFILE_RESET:
      return Object.assign({}, state, {
        ...DEFAULT_VALUES,
      })
    default:
      return state
  }
}
