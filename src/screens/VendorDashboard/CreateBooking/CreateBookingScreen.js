import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ScrollView,View, Text, StyleSheet,Alert, Platform } from 'react-native';
import { Button, TextInput as Input, Colors,} from 'react-native-paper'
import BackButtonWithTitleComponentAndLogo from '../../../components/BackButtonWithTitleComponentAndLogo'
import LoadingButton from '../../../components/LoadingButton'
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../../context/Localization'
import { languages } from '../../../context/Localization/languages'
import DropDown from "react-native-paper-dropdown";
import PoLinesScreen from "./PoLinesScreen";
import {
    LS_KEY,
    fetchLocale,
    getLanguageCodeFromLS,
  } from '../../../context/Localization/helpers'
import { set } from "sync-storage";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
      },
      AddButton:{
        backgroundColor:'#00cc00',
        justifyContent:'center',
        alignSelf:'center',
        marginRight:5,
        marginLeft:5,
      },
      SubsButton:{
        backgroundColor:Colors.red900,
        justifyContent:'center',
        alignSelf:'center',
        marginRight:5,
      },
      addButtonText:{
        justifyContent:'center',
        fontSize:20,
      },
      subsButtonText:{
        justifyContent:'center',
        fontSize:20,
      },
      AddPOButton: {
        marginLeft:10,
        marginTop:8,
        paddingTop:5,
        height:50,
        Width:40,
        marginRight:10,
      },
      BookingNumberRow:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:15,
        marginLeft:5,
        marginRight:5,
        borderWidth:2,
        borderColor:Colors.black,
        padding:10,
      },
      cbmView:{
        marginTop:10,
        height:50,
        backgroundColor:Colors.black,
        flex:1,
        flexDirection:"row",
      },
      cbmLine:{
        marginTop:15,
        marginLeft:12,
        color:Colors.white
      },
      DropDown: {
        marginLeft:5,
        marginRight:5,
        alignSelf:"flex-start",
        flex:1,
      },
      labelStyle:{
        alignSelf:'center',
        fontSize:15,
        fontWeight:"bold",
        marginRight:5,
      },
      noOfContainer:{
        width:100,
      },
      rowContainer: {
        flexDirection: "row",
        marginTop:10,
      },
      submitButton: {
        flex:1,
        minWidth: 55,
        minHeight: 10,
        marginLeft: Dimensions.get('window').width*0.2,
      },
      submitButtonText: {
        marginHorizontal: 0,
        fontSize: 13,
        paddingHorizontal: 0,
        height: 30,
      },
      submitButtonContent: {
        height: 30,
        borderRadius:5,
      },
})


function CreateBookingScreen(props) {
    
    const [showPODropDown, setShowPODropDown] = useState(false);
    const [showFreightDropDown, setShowFreightDropDown] = useState(false);
    const [showTargetDaysDropDown, setShowTargetDaysDropDown] = useState(false);
    const [PO, setPO] = useState(props.route.params.po_number);
    const [containerSize, setContainerSize] = useState("40ft")
    const [noOfContainer, setNoOfContainer] = useState(0)
    const [BookingNumber, setBookingNumber] = useState(12)
    const [Freight, setFreight] = useState("Ocean Freight");
    const [TargetDays, setTargetDays] = useState(90);
    const [Description, setDescription] = useState("No Des");
    const [id,setId] = useState(0)
    const [lineValue, SetLineValue] = useState([{id:id,containerSize:containerSize,noOfContainer:noOfContainer,add:"+",subs:"-",showContainerSizeDropDown:false}])

    function addRow(){
      const newId = id+1
      setId(newId)
      SetLineValue([...lineValue,{id:newId,containerSize:containerSize,noOfContainer:noOfContainer,add:"+",subs:"-"}])
    }
    function deleteRow(key){
      const newId = id-1
      setId(newId)
      lineValue.splice(key,1)
      SetLineValue([...lineValue])
    }

    function handleShowDropDown(index){
      const changedLine = [...lineValue]
      const dropdown = changedLine.find(
        a => a.id === index
      )
      dropdown.showContainerSizeDropDown = !dropdown.showContainerSizeDropDown
      SetLineValue(changedLine)
    }

    function setDropdownValue(index,Size){
      const changedLine = [...lineValue]
      const dropdown = changedLine.find(
        a => a.id === index
      )
      dropdown.containerSize = Size
      SetLineValue(changedLine)
    }

    const formData = {
      po_number: String(PO),
      booking_number:BookingNumber,
      freight_term:String(Freight),
      target_days:TargetDays,
      description:String(Description),
    }
    const POList = [
        {
            label:PO,
            value:PO
        },
    ]
    const FreightList = [
        {
            label:"Ocean Freight",
            value:"Ocean Freight"
        },
        {
            label:"Air Freight",
            value:"Air Freight"
        },
        {
            label:"Land Freight",
            value:"Land Freight"
        }
    ]
    const TargetDaysList = [
        {
            label:"90",
            value: 90
        },
        {
            label:"60",
            value:60
        },
    ]
    const ContainerSizeList = [
      {
          label:"40ft",
          value: 40
      },
      {
          label:"20ft",
          value:20
      },
  ]

    const { translation } = useTranslation()
    const { alertWithType } = useDropdownAlert()
    const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.mainContainer}>
        <BackButtonWithTitleComponentAndLogo
        goBack={() => {
          props.navigation.goBack()
        }}
        title=""
      >
        <LoadingButton
          contentStyle={styles.submitButtonContent}
          textStyle={styles.submitButtonText}
          disabled={props.createBookingFormLoading}
          loading={props.createBookingFormLoading}
          mode="contained"
          onPress={() => {
            newBookingForm({
              variables:{
                newBookingForm:formData
              }
            })
          }}
          style={styles.submitButton}
        >
          {!props.createBookingFormLoading && translation('Create Booking')}
        </LoadingButton>
      </BackButtonWithTitleComponentAndLogo>
      <View style={styles.rowContainer}>
        <View style={styles.DropDown}>
        <DropDown
                label={"Select PO"}
                mode={"outlined"}
                visible={showPODropDown}
                showDropDown={() => setShowPODropDown(true)}
                onDismiss={() => setShowPODropDown(false)}
                value={PO}
                setValue={setPO}
                list={POList}
                />
          </View>
        <Button style={styles.AddPOButton} mode="contained" onPress={() => console.log("Adding Another PO")}>
          Add PO
        </Button>
        
      </View>
      <View style={styles.BookingNumberRow}>
        <Text>Booking Number</Text>
        <Text>{BookingNumber}</Text>
      </View>
      <View style={styles.rowContainer}>
      <View style={styles.DropDown}>
      <DropDown
                dropDownStyle={styles.DropDown}
                label={"Freight Term"}
                mode={"outlined"}
                visible={showFreightDropDown}
                showDropDown={() => setShowFreightDropDown(true)}
                onDismiss={() => setShowFreightDropDown(false)}
                value={Freight}
                setValue={setFreight}
                list={FreightList}
                />
        </View>
        <View style={styles.DropDown}>
        <DropDown
                style={styles.DropDown}
                label={"Target Days"}
                mode={"outlined"}
                visible={showTargetDaysDropDown}
                showDropDown={() => setShowTargetDaysDropDown(true)}
                onDismiss={() => setShowTargetDaysDropDown(false)}
                value={TargetDays}
                setValue={setTargetDays}
                list={TargetDaysList}
            />
            </View>
          </View>
      {
      lineValue.map((item,key)=>{
        const minusButton = (key==0) ? <Text></Text> : <Button mode="contained" style={styles.SubsButton} onPress={()=>{deleteRow(key)}}
        ><Text style={styles.subsButtonText}>{item.subs}</Text></Button>;
        return(
          <View  style={styles.rowContainer}>
              <View key={key} style={styles.DropDown}>
                     <DropDown
                              style={styles.DropDown}
                              label={"Container Size"}
                              mode={"outlined"}
                              visible={item.showContainerSizeDropDown}
                              showDropDown={() => handleShowDropDown(key,item)}
                              onDismiss={() => handleShowDropDown(key,item)}
                              value={item.containerSize}
                              setValue={(_value)=>{setDropdownValue(key,_value)}}
                              list={ContainerSizeList}
                          />
                </View>
                      <Input setValue={setNoOfContainer} placeholder={translation("No of Containers")} style={styles.noOfContainer}></Input>
                      <Button mode="contained" style={styles.AddButton} onPress={addRow}
                      ><Text style={styles.addButtonText}>{item.add}</Text></Button>
                      {minusButton}
        </View>
        
       )})}

    <View style={styles.rowContainer}>
      <Text style={styles.labelStyle}>{translation("Description")}</Text>
      <View style={styles.DropDown}>
        <Input setValue={setDescription}></Input>
        </View>
        
    </View>
    <View style={styles.cbmView}>
        <Text style={styles.cbmLine}>{translation("Total Lines 01")}</Text>
        <Text style={styles.cbmLine}>{translation("Target CBM: 0")}</Text>
        <Text style={styles.cbmLine}>{translation("Line CBM: 0")}</Text>
        <Text style={styles.cbmLine}>{translation("Left CBM: 0")}</Text>
    </View>
    {/* <PoLinesScreen po_number={PO}/> */}
    </ScrollView>
    );
}

export default CreateBookingScreen;