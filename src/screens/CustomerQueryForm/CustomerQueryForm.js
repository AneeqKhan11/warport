import React, { useEffect,useContext, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Alert ,ImageBackground} from 'react-native'
import { RadioButton, Divider, TextInput as Input } from 'react-native-paper'
import Background from '../../components/Background'
import BackButtonWithTitleAndComponent from '../../components/BackButtonWithTitleAndComponent'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import {
  setCustomerQueryFormCompanyName,
  setCustomerQueryFormBuyerName,
  setCustomerQueryFormLocation,
  setCustomerQueryFormContactNo,
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
import { locationValidator } from '../../helpers/locationValidator'
import { contactNoValidator } from '../../helpers/contactNoValidator'
import { sourceOfContactValidator } from '../../helpers/sourceOfContactValidator'
import {
  LS_KEY,
  fetchLocale,
  getLanguageCodeFromLS,
} from '../../context/Localization/helpers'
import { languages } from '../../context/Localization/languages'
import { CustomerQueryFormContext } from '../../context/CustomerQueryFormContextProvider'
import { BackHandler } from 'react-native'
import AlertView from '../../context/AlertView'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
   paddingLeft:15
  }
})

function CustomerQueryForm(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [back, setBack] = useState(false)
  const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
  const handleBackPress = ()=>{
    props.navigation.goBack()
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
      $location: String!
      $country_code: String!
      $contact_no: String!
      $source_of_contact: String!
      $other_platform_text: String
      $status_of_query: String!
      $additional_note: String
      $customerQueryFormProductsSearialized: String!
    ) {
      add_customer_query_forms(
        user_id: $user_id
        company_name: $company_name
        buyer_name: $buyer_name
        location: $location
        country_code: $country_code
        contact_no: $contact_no
        source_of_contact: $source_of_contact
        other_platform_text: $other_platform_text
        status_of_query: $status_of_query
        additional_note: $additional_note
        customerQueryFormProductsSearialized: $customerQueryFormProductsSearialized
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
    const locationError = locationValidator(
      props.customerQueryFormLocation.value
    )
    const contactNoError = contactNoValidator(
      props.customerQueryFormContactNo.value
    )
    const otherPlatformError = sourceOfContactValidator(
      props.customerQueryFormSourceOfContact,
      props.customerQueryFormSourceOfContactOtherPlatform.value
    )
    contactNoValidator
    if (
      companyNameError ||
      buyerNameError ||
      locationError ||
      contactNoError ||
      otherPlatformError
    ) {
      props.setCustomerQueryFormCompanyName({
        value: props.customerQueryFormCompanyName.value,
        error: companyNameError,
      })
      props.setCustomerQueryFormBuyerName({
        value: props.customerQueryFormBuyerName.value,
        error: buyerNameError,
      })
      props.setCustomerQueryFormLocation({
        value: props.customerQueryFormLocation.value,
        error: locationError,
      })
      props.setCustomerQueryFormContactNo({
        value: props.customerQueryFormContactNo.value,
        error: contactNoError,
        country_code: props.customerQueryFormContactNo.country_code,
        calling_code: props.customerQueryFormContactNo.calling_code,
      })
      props.setCustomerQueryFormSourceOfContactOtherPlatform({
        value: props.customerQueryFormSourceOfContactOtherPlatform.value,
        error: otherPlatformError,
        country_code:
          props.customerQueryFormSourceOfContactOtherPlatform.country_code,
        calling_code:
          props.customerQueryFormSourceOfContactOtherPlatform.calling_code,
      })
      return
    }

    if (props.customerQueryFormProductDetailsAdded.length == 0) {
      // Alert.alert('', translation('Please add products in products list.'))
      setAlertMessage('Please add products in products list.')
      setAlertVisible(true)
      return
    }
    props.setCustomerQueryFormLoading(true)

    try {
      await addCustomerQueryForms({
        variables: {
          user_id: props.userAuthData.id,
          company_name: props.customerQueryFormCompanyName.value,
          buyer_name: props.customerQueryFormBuyerName.value,
          location: props.customerQueryFormLocation.value,
          country_code: props.customerQueryFormContactNo.country_code,
          contact_no: (
            props.customerQueryFormContactNo.calling_code + props.customerQueryFormContactNo.value
          ).replace(/\s/g, ''),
          source_of_contact: props.customerQueryFormSourceOfContact,
          other_platform_text:
            props.customerQueryFormSourceOfContactOtherPlatform.value,
          status_of_query: props.customerQueryFormStatusOfQuery,
          additional_note: props.customerQueryFormAdditionalNote.value,
          customerQueryFormProductsSearialized: JSON.stringify(
            props.customerQueryFormProductDetailsAdded.map((itm) => itm.id)
          ),
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
    <ScrollView style={styles.mainContainer}>
      {
             alertVisible && <AlertView message={alertMessage} back={back} visible={setAlertVisible}></AlertView>
      }
      <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
          props.setCustomerQueryFormReset()
        }}
        title={translation('Customer Query Form')}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scroll}
      >
        <ImageBackground
      source={require('../../assets/background.jpeg')}
      resizeMode="repeat" 
      style={styles.formContainer}>
        <TextInput
          disabled={props.customerQueryFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Company Name')}
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
          placeholder={translation('Please Enter Customer Name')}
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
          placeholder={translation('Please Enter Address')}
          containerStyle={styles.textField}
          returnKeyType="next"
          value={props.customerQueryFormLocation.value}
          onChangeText={(text) =>
            props.setCustomerQueryFormLocation({ value: text, error: '' })
          }
          error={!!props.customerQueryFormLocation.error}
          errorText={translation(props.customerQueryFormLocation.error)}
        />
        <PhoneNumberInput
          containerStyle={styles.customerQueryFormContactNoContainerStyle}
          disabled={props.customerQueryFormLoading}
          placeholder={translation('Please Enter Contact Number')}
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

        <CustomerQueryFormProductList navigation={props.navigation} />
        <View style={styles.sourceOfContactContainer}>
          <Text style={styles.formFieldTitle}>
            {translation('Source of Contact')}
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => {
              props.setCustomerQueryFormSourceOfContact(newValue)
            }}
            value={props.customerQueryFormSourceOfContact}
          >
            <View style={styles.sourceOfContactRowContainer}>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="whatsapp"
                />
                <Text>{translation('Whatsapp')}</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="linkdin"
                />
                <Text>{translation('Linkdin')}</Text>
              </View>
            </View>
            <View style={styles.sourceOfContactRowContainer}>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="phone"
                />
                <Text>{translation('Phone')}</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="otherplatform"
                />
                <TextInput
                  mode="outlined"
                  placeholder="Other Platform"
                  containerStyle={
                    styles.sourceOfContactOtherPlatformInputContainerStyle
                  }
                  value={
                    props.customerQueryFormSourceOfContactOtherPlatform.value
                  }
                  onChangeText={(text) =>
                    props.setCustomerQueryFormSourceOfContactOtherPlatform({
                      value: text,
                      error: '',
                    })
                  }
                  error={
                    !!props.customerQueryFormSourceOfContactOtherPlatform.error
                  }
                  errorText={translation(
                    props.customerQueryFormSourceOfContactOtherPlatform.error
                  )}
                  style={styles.sourceOfContactOtherPlatformInput}
                ></TextInput>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.statusOfQueryContainer}>
          <Text style={styles.formFieldTitle}>
            {translation('Status of Query')}
          </Text>
          <RadioButton.Group
            onValueChange={(newValue) => {
              props.setCustomerQueryFormStatusOfQuery(newValue)
            }}
            value={props.customerQueryFormStatusOfQuery}
          >
            <View style={styles.sourceOfContactRowContainer}>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="initialstage"
                />
                <Text>{translation('Initial Stage')}</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="midstage"
                />
                <Text>{translation('Mid Stage')}</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton.Item
                  style={styles.radioButtonItem}
                  disabled={props.customerQueryFormLoading}
                  value="finalstage"
                />
                <Text>{translation('Final Stage')}</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          placeholder={translation('Please Enter Additional Note')}
          returnKeyType="done"
          multiline={true}
          numberOfLines={4}
          value={props.customerQueryFormAdditionalNote.value}
          onChangeText={(text) =>
            props.setCustomerQueryFormAdditionalNote({
              value: text,
              error: '',
            })
          }
          error={!!props.customerQueryFormAdditionalNote.error}
          errorText={translation(props.customerQueryFormAdditionalNote.error)}
        />
        </ImageBackground>
      </ScrollView>
    </ScrollView>
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
  setCustomerQueryFormSourceOfContact,
  setCustomerQueryFormSourceOfContactOtherPlatform,
  setCustomerQueryFormProductDetailsAdded,
  setCustomerQueryFormProductDetailsData,
  setCustomerQueryFormStatusOfQuery,
  setCustomerQueryFormAdditionalNote,
  setCustomerQueryFormLoading,
  setCustomerQueryFormReset,
})(CustomerQueryForm)
