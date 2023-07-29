import { combineReducers } from 'redux'
import { LoginReducer } from './LoginReducer'
import { ChangePasswordReducer } from './ChangePasswordReducer'
import { MobileConfirmationReducer } from './MobileConfirmationReducer'
import { EmailConfirmationReducer } from './EmailConfirmationReducer'
import { RegisterReducer } from './RegisterReducer'
import { ResetPasswordReducer } from './ResetPasswordReducer'
import { VendorDrawerReducer } from './VendorDrawerReducer'
import { AddEditProductReducer } from './AddEditProductReducer'
import { ContactUsReducer } from './ContactUsReducer'
import { UserProfileReducer } from './UserProfileReducer'
import { VendorReducer } from './VendorReducer'
import { UserAuthDataReducer } from './UserAuthDataReducer'
import { VendorBottomDrawerReducer } from './VendorBottomDrawerReducer'
import { CustomerQueryFormReducer } from './CustomerQueryFormReducer'
import { InfoForProductsFormReducer } from './InfoForProductsFormReducer'
import { InternalStandardsFormReducer } from './InternalStandardsFormReducer'

const rootReducer = combineReducers({
  LoginReducer,
  ChangePasswordReducer,
  MobileConfirmationReducer,
  EmailConfirmationReducer,
  RegisterReducer,
  ResetPasswordReducer,
  VendorDrawerReducer,
  VendorBottomDrawerReducer,
  AddEditProductReducer,
  VendorReducer,
  ContactUsReducer,
  UserProfileReducer,
  UserAuthDataReducer,
  CustomerQueryFormReducer,
  InfoForProductsFormReducer,
  InternalStandardsFormReducer
})

export default rootReducer
