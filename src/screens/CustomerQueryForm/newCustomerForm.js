import React, { useEffect,useContext, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Alert ,ImageBackground} from 'react-native'
import BackButtonWithTitleAndComponent from '../../components/BackButtonWithTitleAndComponent'
import { connect } from 'react-redux'
import {
  setCustomerQueryFormCompanyName,
  setCustomerQueryFormBuyerName,
  setCustomerQueryFormLocation,
  setCustomerQueryFormContactNo,
  setCustomerQueryFormContactNo2,
  setCustomerQueryFormSourceOfContact,
  setCustomerQueryFormSourceOfContactOtherPlatform,
  setCustomerQueryFormProductDetailsAdded,
  setCustomerQueryFormProductDetailsData,
  setCustomerQueryFormStatusOfQuery,
  setCustomerQueryFormAdditionalNote,
  setCustomerQueryFormLoading,
  setCustomerQueryFormReset,
} from '../../store/actions/CustomerQueryFormActions'
import LoadingButton from '../../components/LoadingButton'
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../context/Localization'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import TextInput from '../../components/TextInput'
import CustomerQueryFormProductList from './CustomerQueryFormProductList'
import { companyNameValidator } from '../../helpers/companyNameValidator'
import { buyerNameValidator } from '../../helpers/buyerNameValidator'
import {
  LS_KEY,
  fetchLocale,
  getLanguageCodeFromLS,
} from '../../context/Localization/helpers'
import {
  setVendorBottomDrawerToggle,
} from '../../store/actions/VendorBottomDrawerActions'
import { languages } from '../../context/Localization/languages'
import { CustomerQueryFormContext } from '../../context/CustomerQueryFormContextProvider'
import { BackHandler } from 'react-native'
import AlertView from '../../context/AlertView'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomDrawerContent from '../VendorDashboard/BottomDrawerContent'
import ProfileAvatarWithEdit from '../../components/ProfileAvatarWithEdit'
import ImageCropPicker from 'react-native-image-crop-picker'
import { useNavigation } from '@react-navigation/native'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height:'100%'
  },
  title: {
    marginTop: 0,
  },
  textField: {
    marginVertical: 0,
    marginTop: 5,
  },
  submitButton: {
    width: 40,
    minWidth: 55,
    minHeight: 10,
  },
  submitButtonText: {
    marginHorizontal: 0,
    fontSize: 13,
    paddingHorizontal: 0,
    height: 25,
  },
  submitButtonContent: {
    height: 30,
  },
  formFieldTitle: {
    paddingVertical: 5,
    fontSize: 17,
    marginHorizontal: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#c5c5c5',
    borderTopWidth: 1,
    flex: 1,
  },

  scroll: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    height:'100%',
    flexGrow:1
  },
  scrollContentContainer: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 10,
  },
  sourceOfContactContainer: {},
  sourceOfContactRowContainer: {
    flexDirection: 'column',
  },
  sourceOfContactOtherPlatformInput: {
    backgroundColor: '#e9e9e9',
    flex: 1,
    height: 32,
    marginBottom: 6,
  },
  sourceOfContactOtherPlatformInputContainerStyle: {
    width: '85%',
    marginRight: 3,
  },
  sourceOfContactContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 4,
  },
  radioButtonItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  statusOfQueryContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 4,
  },
  customerQueryFormContactNoContainerStyle: {
    marginTop: 5,
  },
  formContainer:{
   paddingRight:15,
   paddingLeft:15,
   height:'130%'
  },
  backgroundStyle:{
    marginBottom:400
  }
})

function newCustomerForm(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [alertVisible, setAlertVisible] = useState(false)
  const [back, setBack] = useState(false)
  const navigation = useNavigation()
  const [alertMessage, setAlertMessage] = useState('')
  const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
  const [contactNo1, setContactNo1] = useState("")
  const [contactNo2, setContactNo2] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [userProfileProfileAvatar,setUserProfileProfileAvatar] = useState()
  const handleBackPress = ()=>{
    navigation.goBack()
    return true
  }

  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  const {
    customerQueryFormData,
    customerQueryFormRefresh,
    customerQueryFormLoading,
  } = useContext(CustomerQueryFormContext)

  let addCustomerQueryFormsMutation = gql`
    mutation add_customer_query_forms(
      $user_id: ID
      $company_name: String
      $buyer_name: String!
      $contact_no1: String!
      $contact_no2: String!
      $email: String
      $city: String
      $address:String
      $logo: String!
    ) {
      add_customer_query_forms(
        user_id: $user_id
        company_name: $company_name
        buyer_name: $buyer_name
        contact_no1: $contact_no1
        contact_no2: $contact_no2
        email: $email
        city: $city
        address:$address
        logo: $logo
      ) {
        success
        error
        result
      }
    }
  `

  const [
    addCustomerQueryForms,
    {
      loading: addCustomerQueryFormsMutationLoading,
      error: addCustomerQueryFormsMutationError,
      data: addCustomerQueryFormsMutationResult,
    },
  ] = useMutation(addCustomerQueryFormsMutation)

  useEffect(() => {
    if (addCustomerQueryFormsMutationError) {
      addCustomerQueryFormsMutationError.graphQLErrors.map(({ message }, i) => {
        props.setCustomerQueryFormLoading(false)
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addCustomerQueryFormsMutationError])

  useEffect(() => {
    if (
      addCustomerQueryFormsMutationResult &&
      addCustomerQueryFormsMutationResult.add_customer_query_forms
    ) {
      if (
        addCustomerQueryFormsMutationResult.add_customer_query_forms.success
      ) {
        customerQueryFormRefresh(props.userAuthData.id)
        // Alert.alert('', translation('Customer query form saved.'))
        setAlertMessage('Customer query form saved.')
        setAlertVisible(true)
        setBack(true)
        props.setCustomerQueryFormReset() //check after removing bottom setCustomerQueryFormProductDetailsAdded it will not delete products
        props.setCustomerQueryFormProductDetailsAdded([]);
     
      } else {
        setAlertMessage(addCustomerQueryFormsMutationResult.add_customer_query_forms.error)
        setAlertVisible(true)
        // alertWithType(
        //   'error',
        //   'WarePort Error',
        //   addCustomerQueryFormsMutationResult.add_customer_query_forms.error
        // )
        props.setCustomerQueryFormLoading(false)
      }
    }
  }, [addCustomerQueryFormsMutationResult])

  const onSubmitPress = async () => {
   
    
    const companyNameError = companyNameValidator(
      props.customerQueryFormCompanyName.value
    )
    const buyerNameError = buyerNameValidator(
      props.customerQueryFormBuyerName.value
    )
    if (
      companyNameError ||
      buyerNameError
    ) {
      props.setCustomerQueryFormCompanyName({
        value: props.customerQueryFormCompanyName.value,
        error: companyNameError,
      })
      props.setCustomerQueryFormBuyerName({
        value: props.customerQueryFormBuyerName.value,
        error: buyerNameError,
      })
      return
    }
    props.setCustomerQueryFormLoading(true)

    try {
      await addCustomerQueryForms({
        variables: {
          user_id: props.userAuthData.id,
          company_name: props.customerQueryFormCompanyName.value,
          buyer_name: props.customerQueryFormBuyerName.value,
          contact_no1: (
            props.customerQueryFormContactNo.calling_code + props.customerQueryFormContactNo.value
          ).replace(/\s/g, ''),
          contact_no2: (
            props.customerQueryFormContactNo2.calling_code + props.customerQueryFormContactNo2.value
          ).replace(/\s/g, ''),
          email: email,
          city: city,
          address:address,
          logo: userProfileProfileAvatar? userProfileProfileAvatar:"",
        },
      })
    } catch (ex) {
      console.log(ex)
      props.setCustomerQueryFormLoading(false)
      if (ex.networkError){
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      }
      // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
    }
  }

  return (
    <BottomSheetModalProvider>
    <ScrollView style={styles.mainContainer}>
      {
             alertVisible && <AlertView message={alertMessage} back={back} visible={setAlertVisible}></AlertView>
      }
      <BackButtonWithTitleAndComponent
        goBack={() => {
          navigation.goBack()
          props.setCustomerQueryFormReset()
        }}
        title={translation('New Buyer Form')}
      >
        <LoadingButton
          contentStyle={styles.submitButtonContent}
          textStyle={styles.submitButtonText}
          disabled={props.customerQueryFormLoading}
          loading={props.customerQueryFormLoading}
          mode="contained"
          onPress={() => {
            onSubmitPress()
          }}
          style={styles.submitButton}
        >
          {!props.customerQueryFormLoading && translation('Save')}
        </LoadingButton>
      </BackButtonWithTitleAndComponent>
      
      <View style={styles.backgroundStyle}>
      <ImageBackground
      source={require('../../assets/background.jpeg')}
      resizeMode="repeat" 
      style={styles.formContainer}>
        <TextInput
          disabled={props.customerQueryFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Enter Company Name')}
          returnKeyType="next"
          value={props.customerQueryFormCompanyName.value}
          onChangeText={(text) =>
            props.setCustomerQueryFormCompanyName({ value: text, error: '' })
          }
          error={!!props.customerQueryFormCompanyName.error}
          errorText={translation(props.customerQueryFormCompanyName.error)}
        />
        <TextInput
          disabled={props.customerQueryFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Enter Customer Name')}
          returnKeyType="next"
          value={props.customerQueryFormBuyerName.value}
          onChangeText={(text) =>
            props.setCustomerQueryFormBuyerName({ value: text, error: '' })
          }
          error={!!props.customerQueryFormBuyerName.error}
          errorText={translation(props.customerQueryFormBuyerName.error)}
        />
        <TextInput
          disabled={props.customerQueryFormLoading}
          placeholder={translation('Address')}
          containerStyle={styles.textField}
          returnKeyType="next"
          value={address}
          onChangeText={(text) =>
            setAddress(text)
          }
        />
        <PhoneNumberInput
          containerStyle={styles.customerQueryFormContactNoContainerStyle}
          disabled={props.customerQueryFormLoading}
          placeholder={translation('Enter Contact Number 1')}
          value={props.customerQueryFormContactNo.value}
          initialCallingCode={selectedLanguageLocale.callingCode}
          initialCountryCode={selectedLanguageLocale.countryCode}
          error={!!props.customerQueryFormContactNo.error}
          errorText={translation(props.customerQueryFormContactNo.error)}
          onChangeText={(text, countryCode, callingCode) =>
            props.setCustomerQueryFormContactNo({
              value: text,
              error: '',
              country_code: countryCode,
              calling_code: callingCode,
            })
          }
        />
        <PhoneNumberInput
          containerStyle={styles.customerQueryFormContactNoContainerStyle}
          disabled={props.customerQueryFormLoading}
          placeholder={translation('Enter Contact Number 2')}
          value={props.customerQueryFormContactNo2.value}
          initialCallingCode={selectedLanguageLocale.callingCode}
          initialCountryCode={selectedLanguageLocale.countryCode}
          error={!!props.customerQueryFormContactNo2.error}
          errorText={translation(props.customerQueryFormContactNo2.error)}
          onChangeText={(text, countryCode, callingCode) =>
            props.setCustomerQueryFormContactNo2({
              value: text,
              error: '',
              country_code: countryCode,
              calling_code: callingCode,
            })
          }
        />
        <TextInput
          disabled={props.customerQueryFormLoading}
          placeholder={translation('Enter Email')}
          containerStyle={styles.textField}
          returnKeyType="next"
          value={email}
          onChangeText={(text) =>
            setEmail(text)
          }
        />
        <TextInput
          disabled={props.customerQueryFormLoading}
          placeholder={translation('City')}
          containerStyle={styles.textField}
          returnKeyType="next"
          value={city}
          onChangeText={(text) =>
            setCity(text)
          }
        /><View style={{justifyContent:'center', alignItems:'center'}}>
          <ProfileAvatarWithEdit
                onEditPressed={() => {
                  props.setVendorBottomDrawerToggle(true)
                }}
                style={styles.avatar}
                source={userProfileProfileAvatar}
              />
              <Text>{translation('Add Buyers logo')}</Text>
        </View>
        <BottomDrawerContent
              
              onCameraPress={() => {
                props.setVendorBottomDrawerToggle(false)
                ImageCropPicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                  includeBase64: true,
                }).then((image) => {
                  setUserProfileProfileAvatar(
                    `data:${image.mime};base64,` + image.data
                  )
                })
              }}
              onGalleryPress={() => {
                props.setVendorBottomDrawerToggle(false)
                ImageCropPicker.openPicker({
                  multiple: false,
                  cropping: true,
                  includeBase64: true,
                }).then((image) => {
                  setUserProfileProfileAvatar(
                    `data:${image.mime};base64,` + image.data
                  )
                })
              }}
              navigation={props.navigation}
            />
       
        </ImageBackground>
      </View>
      
    </ScrollView>
    </BottomSheetModalProvider>
  )
}
const mapStateToProps = (state) => {
  return { ...state.CustomerQueryFormReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, {
  setCustomerQueryFormCompanyName,
  setCustomerQueryFormBuyerName,
  setCustomerQueryFormLocation,
  setCustomerQueryFormContactNo,
  setCustomerQueryFormContactNo2,
  setCustomerQueryFormSourceOfContact,
  setCustomerQueryFormSourceOfContactOtherPlatform,
  setCustomerQueryFormProductDetailsAdded,
  setCustomerQueryFormProductDetailsData,
  setCustomerQueryFormStatusOfQuery,
  setCustomerQueryFormAdditionalNote,
  setCustomerQueryFormLoading,
  setVendorBottomDrawerToggle,
  setCustomerQueryFormReset,
})(newCustomerForm)
