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
  USERPROFILE_ADDRESS
} from '../ActionTypes';

export const setUserProfileProfileAvatar = (userProfileProfileAvatar) => {
  return {
    type: USERPROFILE_PROFILEAVATAR,
    payload: {
      userProfileProfileAvatar: userProfileProfileAvatar,
    },
  }
}
export const setUserProfileCompanyName = (userProfileCompanyName) => {
  return {
    type: USERPROFILE_COMPANYNAME,
    payload: {
      userProfileCompanyName: userProfileCompanyName,
    },
  }
}
export const setUserProfileContactNo = (userProfileContactNo) => {
  return {
    type: USERPROFILE_CONTACTNO,
    payload: {
      userProfileContactNo: userProfileContactNo,
    },
  }
}
export const setUserProfileContactNoVerifiedNo = (userProfileContactNoVerifiedNo) => {
  return {
    type: USERPROFILE_CONTACTNO_VERIFIED_NO,
    payload: {
      userProfileContactNoVerifiedNo: userProfileContactNoVerifiedNo,
    },
  }
}
export const setUserProfileContactNoVerified = (userProfileContactNoVerified) => {
  return {
    type: USERPROFILE_CONTACTNO_VERIFIED,
    payload: {
      userProfileContactNoVerified: userProfileContactNoVerified,
    },
  }
}
export const setUserProfileContactNoVerifyLoading = (userProfileContactNoVerifyLoading) => {
  return {
    type: USERPROFILE_CONTACTNO_VERIFY_LOADING,
    payload: {
      userProfileContactNoVerifyLoading: userProfileContactNoVerifyLoading,
    },
  }
}
export const setUserProfileEmail = (userProfileEmail) => {
  return {
    type: USERPROFILE_EMAIL,
    payload: {
      userProfileEmail: userProfileEmail,
    },
  }
}
export const setUserProfileEmailVerifiedEmail = (userProfileEmailVerifiedEmail) => {
  return {
    type: USERPROFILE_EMAIL_VERIFIED_EMAIL,
    payload: {
      userProfileEmailVerifiedEmail: userProfileEmailVerifiedEmail,
    },
  }
}
export const setUserProfileEmailVerified = (userProfileEmailVerified) => {
  return {
    type: USERPROFILE_EMAIL_VERIFIED,
    payload: {
      userProfileEmailVerified: userProfileEmailVerified,
    },
  }
}
export const setUserProfileEmailVerifyLoading = (userProfileEmailVerifyLoading) => {
  return {
    type: USERPROFILE_EMAIL_VERIFY_LOADING,
    payload: {
      userProfileEmailVerifyLoading: userProfileEmailVerifyLoading,
    },
  }
}
export const setUserProfileLoading = (userProfileLoading) => {
  return {
    type: USERPROFILE_LOADING,
    payload: {
      userProfileLoading: userProfileLoading,
    },
  }
}
export const setUserProfileContentLoading = (userProfileContentLoading) => {
  return {
    type: USERPROFILE_CONTENT_LOADING,
    payload: {
      userProfileContentLoading: userProfileContentLoading,
    },
  }
}
export const setUserProfileReset = () => {
  return {
    type: USERPROFILE_RESET,
  }
}

export const setUserProfileAddress = (userProfileAddress) => {
  return {
    type: USERPROFILE_ADDRESS,
    payload: {
      userProfileAddress: userProfileAddress
    }
  }
}