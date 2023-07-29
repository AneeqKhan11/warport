import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native'
import { RadioButton, Divider, TextInput as Input, Colors, Button } from 'react-native-paper'
import Background from '../components/Background'
import BackButtonWithTitleAndComponent from '../components/BackButtonWithTitleAndComponent'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import {
  setInternalStandardsFormManufacturerName,
  setInternalStandardsFormUsername,
  setInternalStandardsFormBuyerId,
  setInternalStandardsFormManufacturerCountry,
  setInternalStandardsFormPortOfLoading,
  setInternalStandardsFormPaymentTerms,
  setInternalStandardsFormShipmentTerms,
  setInternalStandardsFormModeOfShipment,
  setInternalStandardsFormLoading,
  setInternalStandardsFormReset,

} from '../store/actions/InternalStandardsFormActions'
import LoadingButton from '../components/LoadingButton'
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import { useTranslation } from '../context/Localization'
import PhoneNumberInput from '../components/PhoneNumberInput'
import TextInput from '../components/TextInput'
import { formRequiredFieldValidator } from '../helpers/formRequiredFieldValidator'
import { languages } from '../context/Localization/languages'
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlertView from '../context/AlertView'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width:"106%"
  },
  title: {
    alignSelf:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'#e8bc02'
  },
  textField: {
    marginVertical: 0,
    marginTop: 5,
  },
  submitButton: {
    marginTop:10,
    borderColor:theme.colors.primary,
    borderRadius:2,
    backgroundColor:theme.colors.primary,
  },
  submitButtonText: {
    marginHorizontal: 0,
    fontSize: 13,
    paddingHorizontal: 0,
    height: 25,
    color:Colors.white
  },
  submitButtonContent: {
    height: 30,
  },
  formFieldTitle: {
    paddingVertical: 5,
    fontSize: 17,
    marginHorizontal: 10,
  },
  scroll: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  scrollContentContainer: {
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  FormView:{
    width:"100%",
    padding:10,
    borderRadius:10,
    backgroundColor:Colors.white
  },
  container: {
    marginTop:10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonItem: {
    alignItems: 'center',
  },

})

function InternalStandardsForm(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [employes, setEmployes] = useState('');
  const [foundedDate, setFoundedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage , setAlertMessage] = useState("")
  const handleRadioButtonChange = (newValue) => {
    setEmployes(newValue);
  };

  let addInternalStandardsFormsMutation = gql`
  mutation addCompanyInformation(
    $user_id: Int,
    $no_of_emp:String,
    $founded_date:String,
    $owner_name:String,
    $address1:String,
    $address2:String,
    $ntn:String,
    ) {
      addCompanyInformation(
        user_id: $user_id
        no_of_emp: $no_of_emp
        founded_date: $founded_date
        owner_name: $owner_name
        address1: $address1
        address2: $address2
        ntn:$ntn
      ) {
          user_id
      }
    }
`

const [
  addInternalStandardsForms,
  {
    loading: addInternalStandardsFormsMutationLoading,
    error: addInternalStandardsFormsMutationError,
    data: addInternalStandardsFormsMutationResult,
  },
] = useMutation(addInternalStandardsFormsMutation)

useEffect(() => {
  if (addInternalStandardsFormsMutationError) {
    addInternalStandardsFormsMutationError.graphQLErrors.map(
      ({ message }, i) => {
        props.setInternalStandardsFormLoading(false)
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', translation(message))
      }
    )
  }
}, [addInternalStandardsFormsMutationError])

useEffect(() => {
  if (
    addInternalStandardsFormsMutationResult &&
    addInternalStandardsFormsMutationResult.addCompanyInformation
  ) {
    if (
      addInternalStandardsFormsMutationResult.addCompanyInformation
        .user_id
    ) {
      
      setAlertVisible(true)
      props.setInternalStandardsFormReset()
    }
  }
}, [addInternalStandardsFormsMutationResult])

  const onSubmitPress = async () => {
    props.setInternalStandardsFormLoading(true)
    try {
      await addInternalStandardsForms({
        variables: {
          user_id:parseInt(props.userAuthData.id),
          no_of_emp: employes,
          founded_date:foundedDate.toLocaleDateString(),
          owner_name: props.internalStandardsFormUsername.value,
          address1: props.internalStandardsFormManufacturerCountry.value,
          address2: props.internalStandardsFormBuyerId.value,
          ntn:props.internalStandardsFormPortOfLoading.value
        },
      })
      props.setInternalStandardsFormLoading(false)
    } catch (ex) {
      props.setInternalStandardsFormLoading(false)
      setAlertMessage(ex.toString())
      setAlertVisible(true)
      // alertWithType('error', 'WarePort Error', ex.toString())
    }
    }

  
  return (
    
    <ScrollView style={styles.mainContainer}>
      {
             alertVisible && <AlertView title={"WarePort Alert"} message={"Data Saved Successfully"} back={true} visible={setAlertVisible}></AlertView>
      }
      <View style={styles.FormView}>
      <Text style={styles.title}>Company Information</Text>
      {/* <BackButtonWithTitleAndComponent
        goBack={() => {
          props.setInternalStandardsFormReset();
          props.navigation.goBack()
  
        }}
        title={translation('Internal Standards Form')}
      >
        <LoadingButton
          contentStyle={styles.submitButtonContent}
          textStyle={styles.submitButtonText}
          disabled={props.internalStandardsFormLoading}
          loading={props.internalStandardsFormLoading}
          mode="contained"
          onPress={() => {
            onSubmitPress()
          }}
          style={styles.submitButton}
        >
          {!props.internalStandardsFormLoading && translation('Save')}
        </LoadingButton>
      </BackButtonWithTitleAndComponent> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scroll}
      >
        
        <View style={styles.container}>
          <Text style={styles.label}>Number of Employees:</Text>
          <RadioButton.Group onValueChange={handleRadioButtonChange} value={employes}>
            <View style={styles.radioButtonRow}>
              <View style={styles.radioButtonItem}>
                <RadioButton.Item label="1-10" value="1-10" />
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton.Item label="11-50" value="11-50" />
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton.Item label="50+" value="50+" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Text style={{alignSelf:'center', marginHorizontal:10}}>Select Founded Date: </Text>
          <Text style={{alignSelf:'center', marginHorizontal:10}}>{foundedDate.toLocaleDateString()}</Text>
          <TouchableOpacity onPress={()=>{
            setShowDatePicker(true)
          }}>
            <Icon name="calendar" size={30} color="black" />
          </TouchableOpacity>
          </View>
        { showDatePicker &&
          <DateTimePicker
                value={foundedDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setFoundedDate(currentDate);
                  setShowDatePicker(false)
                }}
              />
        }
        

           <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Enter Owner Name')}
          returnKeyType="next"
          value={props.internalStandardsFormUsername.value}
          error={!!props.internalStandardsFormUsername.error}
          errorText={translation(props.internalStandardsFormUsername.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormUsername({ value: text, error: '' })
          }
        
          
        />
           {/* <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Buyer ID')}
          returnKeyType="next"
          value={props.internalStandardsFormBuyerId.value}
          error={!!props.internalStandardsFormBuyerId.error}
          errorText={translation(props.internalStandardsFormBuyerId.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormBuyerId({ value: text, error: '' })
          }
          
        /> */}
           <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Enter Address 1')}
          returnKeyType="next"
          value={props.internalStandardsFormManufacturerCountry.value}
          error={!!props.internalStandardsFormManufacturerCountry.error}
          errorText={translation(props.internalStandardsFormManufacturerCountry.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormManufacturerCountry({ value: text, error: '' })
          }
        
          
        />
         <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Enter Address 2')}
          returnKeyType="next"
          value={props.internalStandardsFormBuyerId.value}
          error={!!props.internalStandardsFormBuyerId.error}
          errorText={translation(props.internalStandardsFormBuyerId.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormBuyerId({ value: text, error: '' })
          }
        
          
        />
           <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('NTN / STRN')}
          returnKeyType="next"
          value={props.internalStandardsFormPortOfLoading.value}
          error={!!props.internalStandardsFormPortOfLoading.error}
          errorText={translation(props.internalStandardsFormPortOfLoading.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormPortOfLoading({ value: text, error: '' })
          }
          
        />
           {/* <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Payment terms')}
          returnKeyType="next"
          value={props.internalStandardsFormPaymentTerms.value}
          error={!!props.internalStandardsFormPaymentTerms.error}
          errorText={translation(props.internalStandardsFormPaymentTerms.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormPaymentTerms({ value: text, error: '' })
          }
          
        />
         <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Shipment Terms')}
          returnKeyType="next"
          value={props.internalStandardsFormShipmentTerms.value}
          error={!!props.internalStandardsFormShipmentTerms.error}
          errorText={translation(props.internalStandardsFormShipmentTerms.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormShipmentTerms({ value: text, error: '' })
          }
          
        />
         <TextInput
          disabled={props.internalStandardsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Mode of Shipment')}
          returnKeyType="next"
          value={props.internalStandardsFormModeOfShipment.value}
          error={!!props.internalStandardsFormModeOfShipment.error}
          errorText={translation(props.internalStandardsFormModeOfShipment.error)}
          onChangeText={(text) =>
            props.setInternalStandardsFormModeOfShipment({ value: text, error: '' })
          }
          
        /> */}
        
        <Button onPress={() => {
            onSubmitPress()
          }} style={styles.submitButton}><Text style={styles.submitButtonText}>Save Company Information</Text></Button>
      </ScrollView>
      </View>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
  return { ...state.InternalStandardsFormReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, {
  setInternalStandardsFormManufacturerName,
  setInternalStandardsFormUsername,
  setInternalStandardsFormBuyerId,
  setInternalStandardsFormManufacturerCountry,
  setInternalStandardsFormPortOfLoading,
  setInternalStandardsFormPaymentTerms,
  setInternalStandardsFormShipmentTerms,
  setInternalStandardsFormModeOfShipment,
  setInternalStandardsFormLoading,
  setInternalStandardsFormReset,
})(InternalStandardsForm)
