import React, { useEffect, useState, useReducer } from 'react';
import { Alert, StyleSheet, View, SafeAreaView, BackHandler, Dimensions } from 'react-native';
import { List, Colors, Text, Button, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../../context/Localization'
import { languages} from '../../../context/Localization/languages'
import { getLoginUserName } from '../../../auth/LocalStorage';
import {
  LS_KEY,
  fetchLocale,
  getLanguageCodeFromLS,
} from '../../../context/Localization/helpers'
import { ScrollView } from 'react-native-gesture-handler';
import { ip } from './Constants';
import axios from 'axios';


const styles = StyleSheet.create({
  acceptButton: {
    backgroundColor: Colors.green500,
    height: 40,
  },
  acceptButtonText: {
    fontSize: 10,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textView: {
    flex: 1,
    width:'100%',
    height:Dimensions.get('screen').height,
    justifyContent:'center',
  },
  text: {
    fontSize: 20,
    alignSelf:'center',
  },
})



function ShowPOs(status, po_number) {
  const {translation} = useTranslation()
  const navigation = useNavigation()
  const [POStatus, setPOStatus] = useState(status)
  // const [UpdatePO, {data, loading, error}] = useMutation(UPDATE_PO)
  var sendStatus = " "

  const updateValue = async (isapproved, po_number) => {

    //   var changePOStatus = { 
    //     po_number,
    //     status:stat
    // }
    //     UpdatePO({
    //       variables:{
    //         newStatus: changePOStatus
    //       }
    //     });

    try {
      const body = { isapproved }
      console.log(JSON.stringify(body))
      const updateStatus = await fetch(`https://${ip}/poList/${po_number}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

    } catch (err) {
      console.log(err.message);
    }

  }
  if (POStatus == "N") {
    return <Button style={styles.acceptButton} onPress={() => Alert.alert("Aceept or Reject PO",
      translation("To View Details for the PO click on the Eye Icon and then take the descision"),
      [
        {
          text: "Accept",
          onPress: async () => {
            navigation.navigate('CreateBookingScreen', { po_number: po_number });
            setPOStatus("Y")
            sendStatus = "Y"
            updateValue(sendStatus, po_number)
          },
        },
        {
          text: "Close",
          style: 'cancel',
          onPress: async () => {
            setPOStatus("N")
            sendStatus = "N"
            updateValue(sendStatus, po_number)
          }
        }
      ])}>
      <Text style={styles.acceptButtonText}>{translation("Accept/Reject")}</Text>
    </Button>;
  }
  if (POStatus == "Y") {
    return <Button icon={'check-bold'} style={styles.acceptButton} backgroundColor={Colors.green900} onPress={() => { navigation.navigate('CreateBookingScreen', { po_number: po_number }) }}>
      <Text style={styles.acceptButtonText}>{translation("Create Booking")}</Text>
    </Button>
  }
  // if(POStatus == "N"){
  //   return <Button icon={'close-thick'} backgroundColor={Colors.green900}></Button>
  // }

}

function PoDetailsScreen(props) {
  const navigation = useNavigation()
  const { translation } = useTranslation()
  const selectedLanguageLocale = languages[getLanguageCodeFromLS()]
  const [poData, setPoData] = useState(null)
  const [description, setDescription] = useState("")

  BackHandler.addEventListener("hardwareBackPress", ()=>{
    navigation.goBack()
    return true
  })
  
  const getPO = async () => {
    const name = getLoginUserName()
    if (name != null) {
      try {
        const response = await (await axios.get(`http://${ip}/getUser/${name}`)).data
        const OMLID = response[0]["ad_user_id"]
        const resById = await (await axios.get(`http://${ip}/poList/${OMLID}`)).data
        await setPoData(resById)
      } catch (err) {
        console.log(err)
      }
    }

  }

  useEffect(() => {
    getPO();
  }, [])


  if (poData != null) {
    return (
      
        <ScrollView>
        <List.Section>
          <View style={styles.headerStyle}>
            <List.Subheader>{translation("PO List")}</List.Subheader>
            <Button icon={"close-thick"} onPress={() => navigation.goBack()}></Button>
          </View>
          {
            poData.map((po, index) => {
              return (
                <View>
                <List.Item key={po.c_order_id}
                  title={po.c_order_id}
                  left={props => <Button style={styles.text} onPress={()=>{
                    navigation.navigate('PoLinesScreen', { po_number: po.c_order_id });
                  }} icon="eye"/>}
                  right={props => ShowPOs(po.isapproved, po.c_order_id)} />
                  <Divider bold={true}></Divider>
                  </View>
              )
            })
          }
        </List.Section>
        </ScrollView>
    );
  } else {
    return (
    <View style={{flex:1}}>
          <View style={styles.headerStyle}>
            <List.Subheader>{translation("PO List")}</List.Subheader>
            <Button icon={"close-thick"} onPress={() => navigation.goBack()}></Button>
          </View>
      <View style={styles.textView}>
      <Text style={styles.text}>{translation("Buyer haven't assigned you any Purchase Order yet")}</Text>
      </View>
      </View>
    )
  }
}

export default PoDetailsScreen;