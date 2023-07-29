import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { TextInput, Checkbox} from 'react-native-paper';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DropDown from "react-native-paper-dropdown";
import { gql,useMutation} from '@apollo/client';
import { useDropdownAlert } from '../context/AlertDropdownContextProvider';
import AlertView from '../context/AlertView';
import { useTranslation } from '../context/Localization';
const BottomSheetScreen = ({ route }) => {

    BackHandler.addEventListener('hardwareBackPress',()=>{
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen'}],
      })
        return true
    })
    const companyName = route.params?.companyName || '';
    const contact_no = route.params?.contact_no || '';
    const { alertWithType } = useDropdownAlert()
    const [alertMessage,setAlertMessage] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)
    const alertVisibility =(state)=>{
      setAlertVisible(state)
    }
    const { translation } = useTranslation()
    
  //States
  const [vendorName, setVendorName]= useState(companyName)
  const [vendorAdd, setVendorAdd]= useState('')
  const [contactPerson, setContactPerson]= useState('')
  const [contactNo, setContactNo] = useState(contact_no)
  const [email, setEmail]= useState('')
  const [companyEmail, setCompanyEmail]= useState('')
  const [ntnNum, setNtnNum]= useState(0)
  const [gstNum, setGstNum]= useState(0)
  const [isStockistChecked, setIsStockistChecked] = useState(false);
  const [isImporterChecked, setIsImporterChecked] = useState(false);
  const [isTraderChecked, setIsTraderChecked] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [businessType, setBusinessType] = useState('')
  let registerMutation = gql`
    mutation addVendorRegistrationDetails(
      $vendor_name: String,
      $vendor_address:String,
      $contact_person:String,
      $contact_no:String,
      $email:String,
      $company_email:String,
      $ntn_number:Int,
      $gst_number:Int,
      $stockist:Boolean,
      $importer:Boolean,
      $trader:Boolean,
      $type_of_business: String
      ) {
        addVendorRegistrationDetails(
          vendor_name: $vendor_name,
          vendor_address:$vendor_address,
          contact_person:$contact_person,
          contact_no:$contact_no,
          email:$email,
          company_email:$company_email,
          ntn_number:$ntn_number,
          gst_number:$gst_number,
          stockist:$stockist,
          importer:$importer,
          trader:$trader,
          type_of_business: $type_of_business
        ) {
          vendor_name
          vendor_address
          contact_person
          contact_no
          email
          company_email
          ntn_number
          gst_number
          stockist
          importer
          trader
          type_of_business
        }
      }
  `

  const [
    addRegistrationDetail,
    {
      loading: addRegistrationDetailMutationLoading,
      error: addRegistrationDetailMutationError,
      data: addRegistrationDetailMutationResult,
    },
  ] = useMutation(registerMutation)

  useEffect(() => {
    if (addRegistrationDetailMutationError) {
      addRegistrationDetailMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addRegistrationDetailMutationError])

  const handleAddRegistrationDetails = async() => {
      try {
        await addRegistrationDetail({
          variables: {
            vendor_name: vendorName,
            vendor_address:vendorAdd,
            contact_person:contactPerson,
            contact_no:contactNo,
            email:email,
            company_email:companyEmail,
            ntn_number:ntnNum,
            gst_number:gstNum,
            stockist:isStockistChecked,
            importer:isImporterChecked,
            trader:isTraderChecked,
            type_of_business: businessType
          },
        })
        navigation.reset({
          index: 0,
          routes: [{ name: 'VendorScreen' }],
        })
      } catch (ex) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
        // if (ex.networkError) alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
      }
    }

  //List of DropDown
  const BusinessTypeList = [
    {
        label:"Mechanical",
        value:"Mechanical"
    },
    {
        label:"Electrical",
        value:"Electrical"
    },
    {
        label:"Construction",
        value:"Construction"
    },
    {
        label:"General Item",
        value:"General Item"
    },
    {
        label:"Services",
        value:"Services"
    },
    {
        label:"Repairing",
        value:"Repairing"
    },
    {
        label:"Dyes & Chemicals",
        value:"Dyes & Chemicals"
    },
    {
        label:"Metallurgy",
        value:"Metallurgy"
    },
    {
        label:"Packaging",
        value:"Packaging"
    },
    {
        label:"Safety Items",
        value:"Safety Items"
    },
    {
        label:"Lubricants",
        value:"Lubricants"
    },
    {
        label:"Weaving / Looms",
        value:"Weaving / Looms"
    },

]
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // navigation
  const navigation = useNavigation();



  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
      {
        alertVisible && <AlertView ok={true} message={alertMessage} visible={alertVisibility}></AlertView>
      }
        <TouchableOpacity style={styles.closeButton} onPress={() => bottomSheetRef.current.close() && navigation.reset({
                index: 0,
                routes: [{ name: 'VendorScreen' }],
            })}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Text style={{flex:1}}>Vendor Name :</Text>
            <TextInput style={{flex:2,height:30}}
            placeholder={"Enter Vendor Name"}
            value={vendorName}
            onChangeText={text=>{setVendorName(text)}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={{flex:1}}>Vendor Address :</Text>
            <TextInput style={{flex:2,height:30}}
            placeholder={"Enter Vendor Address"}
            value={vendorAdd}
            onChangeText={text=>{setVendorAdd(text)}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={{flex:1}}>Contact Person :</Text>
            <TextInput style={{flex:2,height:30}}
            placeholder={"Enter Contact Person"}
            value={contactPerson}
            onChangeText={text=>{setContactPerson(text)}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={{flex:1}}>Email :</Text>
            <TextInput style={{flex:2,height:30}}
            placeholder={"Enter Your Email"}
            value={email}
            onChangeText={text=>{setEmail(text)}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={{flex:1}}>Company Email :</Text>
            <TextInput style={{flex:2,height:30}}
            placeholder={"Enter Your Company Email"}
            value={companyEmail}
            onChangeText={text=>{setCompanyEmail(text)}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={{flex:1}}>NTN Number :</Text>
            <TextInput style={{flex:2,height:30}}
              keyboardType='numeric'
              placeholder={"Enter NTN Number"}
              value={ntnNum}
              onChangeText={text=>{const intValue = parseInt(text, 10); // parse text as integer with base 10
              setNtnNum(intValue);}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={{flex:1}}>GST Number :</Text>
            <TextInput style={{flex:2,height:30}}
            keyboardType='numeric'
            placeholder={"Enter GST Number"}
            value={gstNum}
            onChangeText={text=>{const intValue = parseInt(text, 10); // parse text as integer with base 10
            setGstNum(intValue);}}
            ></TextInput>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nature of Business:</Text>
            <View style={styles.checkboxContainer}>
                <Checkbox
                status={isStockistChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setIsStockistChecked(!isStockistChecked);
                }}
                />
                <Text>STOCKIST</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                status={isImporterChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setIsImporterChecked(!isImporterChecked);
                }}
                />
                <Text>IMPORTER</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                status={isTraderChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setIsTraderChecked(!isTraderChecked);
                }}
                />
                <Text>TRADER</Text>
            </View>
            </View>
           <View style={styles.dropDownRow}>
            <DropDown
                label={"Type of Business"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={businessType}
                setValue={setBusinessType}
                list={BusinessTypeList}
                />
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={() => {
            handleAddRegistrationDetails()
          }}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    marginTop:40
  },
  row:{
    flexDirection:'row',
    marginHorizontal:20,
    marginVertical:5
  },
  dropDownRow:{
    flex:1,
    flexGrow:1,
    width:"95%",
    marginHorizontal:10
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  nextButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginTop:10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  checkboxContainer: {
    marginHorizontal:5,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default BottomSheetScreen;
