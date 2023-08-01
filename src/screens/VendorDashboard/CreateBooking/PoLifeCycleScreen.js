import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Button, SafeAreaView, BackHandler } from "react-native";
import { Colors, shadow } from "react-native-paper";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackButtonWithTitleAndComponent from "../../../components/BackButtonWithTitleAndComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "../../../context/Localization";
import { getLoginUserName } from '../../../auth/LocalStorage';
import axios from "axios";
import { ip } from './Constants';
import DropDown from "react-native-paper-dropdown";
import Flag from "react-native-flags";
import LogoDashboard from "../../../components/LogoDashboard";
import ButtonWithBadge from "../../../components/ButtonWithBadge";
import AlertView from "../../../context/AlertView";

const styles = StyleSheet.create({
  mainView: {
      paddingHorizontal:14
  },
  twoBoxView: {
    flexDirection: 'row'
  },
  boxView: {
    flex: 1,
    borderRadius: 10,
    margin: 5
  },
  texIconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 5
  },
  POView: {
    // justifyContent:"center",
    alignItems: 'center',
  },
  dropDownStyle: {
    width: "90%",
  },
  poListButton: {
    width: "90%",
    height: 50,
    marginTop: 20,
  },
  poLifeCycleText: {
    width: "100%",
    alignItems: 'center',
    marginTop: 10
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    margin: 5,
    backgroundColor: Colors.blue400,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    shadowColor: Colors.grey400,
    shadowRadius: 5
  },
  cirlceWithText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  poLifeCycle: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: Colors.white,
    fontSize: 25
  },
  textStyle: {
    margin: 5,
    paddingBottom: 10,
    color: Colors.white
  },
  userFlag: {
    marginRight: 8,
    marginLeft: 0,
  },
  chatBtn: {
    marginRight: 5,
  },
  lifeCycleText: {
    fontSize: 12,
  }
});

const PoLifeCycleScreen = (props) => {
  const navigation = useNavigation()
  const { translation } = useTranslation()
  const [purchaseOrder, setPurchaseOrder] = useState(null)
  const [bookings, setBookings] = useState(null)
  const [invoices, setInvoices] = useState(null)
  const [packingLists, setPackingLists] = useState(null)
  const [poData, setPoData] = useState([])
  const [poList, setPoList] = useState([])
  const [status, setStatus] = useState("")
  const [tick, setTick] = useState(0)
  const [backCol, setBackColor] = useState(Colors.blue400)
  const [PO, setPO] = useState(null)
  const [showPODropDown, setShowPODropDown] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false)

  BackHandler.addEventListener("hardwareBackPress", () => {
    // setAlertVisible(!alertVisible)
    navigation.goBack()
    return true
  })

  const getData = async () => {
    const name = getLoginUserName()
    if (name != null) {
      try {
        const response = await (await axios.get(`http://${ip}/getUser/${name}`)).data
        const OMLID = response[0]["ad_user_id"]
        const purchaseOrder = await (await axios.get(`http://${ip}/purchaseOrder/${OMLID}`)).data
        const bookings = await (await axios.get(`http://${ip}/bookings/${OMLID}`)).data
        const invoices = await (await axios.get(`http://${ip}/invoices/${OMLID}`)).data
        const packingLists = await (await axios.get(`http://${ip}/packingLists/${OMLID}`)).data
        await setPurchaseOrder(purchaseOrder[0]["count"])
        await setBookings(bookings[0]["count"])
        await setInvoices(invoices[0]["count"])
        await setPackingLists(packingLists[0]["count"])
      } catch (err) {
        console.log(err)
      }
    }

  }

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
      poData.map(async (po, index) => {
        let label = po.c_order_id
        let value = po.c_order_id
        let status = po.isapproved
        await setStatus(status)
        await setPoList([{ "label": label, "value": value }])
      })
    }

  }

  useEffect(() => {
    getData();
    getPO()
  }, [packingLists])

  useEffect(() => {
    if (status == 'Y') {
      setBackColor(Colors.green400)
      setTick(1)
    } else {
      setBackColor(Colors.blue400)
      setTick(0)
    }
  }, [PO])

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {
        alertVisible && <AlertView title={"WarePort Alert"} message={"Are you sure you want to Exit App?"} exit={true}></AlertView>
      }
      <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
        }}
        title={translation('Purchase Orders')}
        mainContainer={20}
        headerText={60}
      >

      </BackButtonWithTitleAndComponent>

      <View style={styles.mainView}>
        <View style={styles.twoBoxView}>
          <View style={[styles.boxView, { backgroundColor: "#3A6073" }]} >
            <View style={styles.texIconView}>
              <Text style={styles.numberText}>{purchaseOrder}</Text>
              <Icon
                name={'file-multiple-outline'}
                size={50}
                color={'white'}
              ></Icon>
            </View>
            <Text style={styles.textStyle}>{translation("Purchase Orders")}</Text>
          </View>
          <View style={[styles.boxView, { backgroundColor: "#677DB6" }]}>
            <View style={styles.texIconView}>
              <Text style={styles.numberText}>{bookings}</Text>
              <Icon
                name={'file-table-outline'}
                size={50}
                color={'white'}
              ></Icon>
            </View>
            <Text style={styles.textStyle}>{translation("Bookings")}</Text>
          </View>
        </View>
        <View style={styles.twoBoxView}>
          <View style={[styles.boxView, { backgroundColor: "#3A4010" }]}>
            <View style={styles.texIconView}>
              <Text style={styles.numberText}>{invoices}</Text>
              <Icon
                name={'file-document-outline'}
                size={50}
                color={'white'}
              ></Icon>
            </View>
            <Text style={styles.textStyle}>{translation("Invoices")}</Text>
          </View>
          <View style={[styles.boxView, { backgroundColor: "#4B6DB7" }]}>
            <View style={styles.texIconView}>
              <Text style={styles.numberText}>{packingLists}</Text>
              <Icon
                name={'file-document-multiple-outline'}
                size={50}
                color={'white'}
              ></Icon>
            </View>
            <Text style={styles.textStyle}>{translation("Packing Lists")}</Text>
          </View>
        </View>
      </View>
      <View style={styles.POView}>
        <View style={styles.poListButton}>
          <Button title={translation("PO Lists")} onPress={() => {
            navigation.navigate("PoDetailsScreen")
          }}></Button>
        </View>
        <View style={styles.dropDownStyle}>
          <DropDown
            label={"Select PO"}
            mode={"outlined"}
            visible={showPODropDown}
            showDropDown={() => setShowPODropDown(true)}
            onDismiss={() => setShowPODropDown(false)}
            value={PO ? PO : "Noll"}
            setValue={setPO}
            list={poList}
            dropDownStyle={
              { width: "100%", height:100 }
            }
          />
        </View>
      </View>
      <View style={styles.poLifeCycleText}>
        <Text style={{
          fontSize:20,
        }}>{translation("PO LIFE CYCLE")}</Text>
      </View>
      <View style={styles.poLifeCycle}>
        <View style={styles.cirlceWithText}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PoDetailsScreen")
            }}
          >
            <View style={[styles.circle, { backgroundColor: backCol }]}>
              <Icon
                name={'account'}
                size={50}
                color={backCol}
              >
              </Icon>
              <Icon
                name={'check-bold'}
                size={30}
                color={Colors.green600}
                style={{ opacity: tick, marginTop: -38 }}
              >
              </Icon>
            </View>
          </TouchableOpacity>
          <Text style={styles.lifeCycleText}>{translation("Buyer")}</Text>
        </View>
        <Icon
          name={'arrow-right-thin'}
          size={50}
          style={{ paddingBottom: 15 }}
        ></Icon>
        <View style={styles.cirlceWithText}>
          <View style={styles.circle}>
            <Icon
              name={'account-group'}
              size={50}
              color={Colors.blue800}>
            </Icon>
          </View>
          <Text style={styles.lifeCycleText}>{translation("Supplier")}</Text>
        </View>
        <Icon
          name={'arrow-right-thin'}
          size={50}
          style={{ paddingBottom: 15 }}
        ></Icon>
        <View style={styles.cirlceWithText}>
          <View style={styles.circle}>
            <Icon
              name={'web'}
              size={50}
              color={Colors.blue800}>
            </Icon>
          </View>
          <Text style={styles.lifeCycleText}>{translation("Freight Forwarder")}</Text>
        </View>
      </View>
    </ScrollView>
  )

};

export default PoLifeCycleScreen;