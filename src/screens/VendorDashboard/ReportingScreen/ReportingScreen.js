import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux'
import { gql, useSubscription, useMutation} from '@apollo/client'
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider'
import { theme } from '../../../core/theme'
import { ActivityIndicator, Colors } from 'react-native-paper'
import ImageSvg from 'react-native-remote-svg'
import { useTranslation } from '../../../context/Localization'
import { setVendorWelcomeCallPopUpToggle } from '../../../store/actions/VendorActions'
import { setVendorFormCallPopUpToggle } from '../../../store/actions/VendorActions'
import { CustomerQueryFormContext } from '../../../context/CustomerQueryFormContextProvider'
import { useNavigation } from '@react-navigation/native'
// import Balls from './Balls'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BackHandler } from 'react-native'
import { SalesDataContext } from '../../../context/SalesDataContextProvider'
import { ProductsRefreshContext } from '../../../context/ProductsRefreshContextProvider'
import { getData, saveData } from '../../../auth/AsyncStorage'
import Stories from './screenComponents/Stories'
import Rfq from './screenComponents/Rfq'
import Drawer from 'react-native-drawer'
import DrawerContent from '../DrawerContent'
import AlertView from '../../../context/AlertView'
import { getLoginUserId } from '../../../auth/LocalStorage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNavLinearContainer: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  topTotalCountBoxesContainer: {
    flexDirection: "row"
  },
  topTotalCountBoxes: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
    width: 140,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    
    backgroundColor: 'white',
  },
  topTotalCount: {
    textAlign: 'center',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 0,
    fontSize: 20,
    color: '#4a4949',
    fontWeight: 'bold',
  },
  contentLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    width: '100%',

    backgroundColor: 'white',
    zIndex: 10000,
    height: 500,
  },
  topTotalCountDescription: {
    textAlign: 'center',
    marginBottom:8,
    marginRight: 5,
    marginLeft: 5,
    color: 'gray',
  },
  scrollViewContainer: {
    paddingVertical: 5,
  },
  welcomeCallBtn: {
    width: 150,
    paddingHorizontal: 0,
    minWidth: 100,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: 'absolute',
    bottom: "14%",
    marginHorizontal: 0,
    
  },
  welcomeCallBtnText: {
    marginHorizontal: 0,
    fontSize: 8,
    paddingHorizontal: 0,
    height: 14,
    lineHeight: 15,
  },
  FormCallBtn: {
    width: 120,
    height: 50,
    paddingHorizontal: 0,
    minWidth: 10,
    borderBottomEndRadius: 8,
    borderTopEndRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: 'absolute',
    bottom: 90,
    right: 10,
    marginHorizontal: 2,
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
  },
  FormCallBtnText: {
    marginHorizontal: 0,
    fontSize: 10,
    paddingHorizontal: 0,
    height: 14,
    lineHeight: 20,
  },
  arrowBox:{
    position:'absolute',
    bottom:100,
    zIndex:2,
    left:220,
  },
  arrowStyle: {
    backgroundColor: 'transparent',
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    marginLeft: -8,
  },
  backgroundStyle: {
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 8,
  },
  contentStyle: {
    padding: 10,
    color:'black'
  },
  toolTipStyle:{
    marginBottom:'20%',
  },
  highStock:{
    position:'absolute',
    top:"45%",
    right:"3%"
  },
  highStockText:{
    color:"#1c1cc3",
    fontSize:16,
    fontFamily:"sans-serif"
  },
  lowStock:{
    position:'absolute',
    top:"69%",
    right:"12%"
  },
  lowStockText:{
    color:"#1c1cc3",
    fontSize:16,
    fontFamily:"sans-serif"
  }
})

function ReportingScreen(props) {

  const [alertMessage , setAlertMessage] = useState("")
  const [exit, setExit] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)

  BackHandler.addEventListener("hardwareBackPress",()=>{
    setAlertMessage("Are you sure you want to Exit App?")
    setExit(true)
    setAlertVisible(!alertVisible)
    return true
  })


  const { translation } = useTranslation()
  const [vendorDrawerToggle,setVendorDrawerToggle] = useState(false)
  const { productsData, requestProductsRefresh, productsDataLoading } =
  useContext(ProductsRefreshContext)

  const {
    customerQueryFormData,
    customerQueryFormRefresh,
    customerQueryFormLoading,
  } = useContext(CustomerQueryFormContext)

  useEffect(() => {
    requestProductsRefresh(props.userAuthData.id)
    customerQueryFormRefresh(props.userAuthData.id);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await customerQueryFormRefresh(props.userAuthData.id);
      // The data might not be immediately available here
      await requestProductsRefresh(props.userAuthData.id)
    };

    fetchData();
  }, []);

  useEffect(() => {
  }, [customerQueryFormData]);

  console.log(customerQueryFormData)

  const CustomerQueryFormsAddedSubscription = gql`
    subscription CustomerQueryFormsAdded {
      customerqueryformsadded {
        user_id
      }
    }
  `

  const { data: customerQueryFormsAddedSubscriptionResult, error: eroooraa, loading } =
    useSubscription(CustomerQueryFormsAddedSubscription)

  useEffect(() => {
    if (props.userAuthData.id != null) {

      if (
        customerQueryFormsAddedSubscriptionResult &&
        customerQueryFormsAddedSubscriptionResult.customerqueryformsadded
      ) {
        if (
          customerQueryFormsAddedSubscriptionResult.customerqueryformsadded
            .user_id == props.userAuthData.id
        ) {
          customerQueryFormRefresh(props.userAuthData.id);
        }
      }
    }
  }, [customerQueryFormsAddedSubscriptionResult])

  const quotationsData = customerQueryFormData ? customerQueryFormData : []
  const navigation = useNavigation()
  

  
  return (
    
    <Drawer
      type="displace"
      onOpen={()=>{
        
      }}
      onClose={() => {
        setVendorDrawerToggle(false)
      }}
      content={<DrawerContent navigation={props.navigation} />}
      open={vendorDrawerToggle}
      tapToClose={true}
      openDrawerOffset={0.2} // 20% gap on the right side of drawer
      panCloseMask={0.2}
      closedDrawerOffset={-3}
      styles={styles.drawerContainer}
      tweenHandler={(ratio) => ({
        main: { opacity: (2 - ratio) / 2 },
      })}
    >
      {
             alertVisible && <AlertView title={"WarePort Alert"} message={alertMessage} visible={setAlertVisible} exit={exit} ok={false}></AlertView>
      }
    <GestureHandlerRootView style={{backgroundColor:Colors.white}}>
    <StatusBar
    backgroundColor="white"
    barStyle="dark-content"
    animated={true}
  />
  
      <View style={styles.container}>
          <View>
            <View style={styles.topNavLinearContainer}>
              {
                vendorDrawerToggle? 
                <Button
                onPress={() => {
                  setVendorDrawerToggle(true)
                }}
                mode="text"
                style={styles.menuBtn}
              >
                <Icon
                  style={styles.menuBtnIcon}
                  name={'arrow-left'}
                  size={20}
                  color={theme.colors.primary}
                />
              </Button>
              :<Button
                onPress={() => {
                  setVendorDrawerToggle(true)
                }}
                mode="text"
                style={styles.menuBtn}
              >
                <Icon
                  style={styles.menuBtnIcon}
                  name={'bars'}
                  size={20}
                  color={theme.colors.primary}
                />
              </Button>
              }
              <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width:"35%"
              }}>
              <Image
              style={{
                marginTop:10,
                marginRight:40,
                width:150,
                height:80,
                justifyContent:'center',
                aspectRatio:4/1
              }}
              source={require("../../../../assets/logo.png")}
              ></Image>
              <TouchableOpacity
                style={{ backgroundColor: '#423480', borderRadius: 10, padding: 10, marginTop:10, marginLeft:-10}}
                onPress={() => {
                  // Handle button press event
                  navigation.navigate("Buyer" ,{data:quotationsData,id:0, subId:0})
                }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontSize:12}}>Quotation History</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View> 
          </View>
      <View style={{marginTop:"10%"}}>
        <Stories data={productsData} logo={props.userAuthData.avatar}/>
        <Rfq  data={quotationsData}/>
        <TouchableOpacity style={{
          position:'absolute',
          top:'33%',
          left:'5%',
          backgroundColor:'#423480',
          padding:5,
          borderRadius:10
        }} onPress={()=>{
          navigation.push("ManageStock")
        }}>
          <Text style={{fontSize:16, color:'white'}}>Add Stock</Text>
        </TouchableOpacity>
        {/* <StockImage/> */}
        <ImageSvg 
            
            source={{
              uri:
                `data:image/svg+xml;utf8,

          <svg width="200" height="120" filter="url(#shadow2)" viewBox="-260 350 1240 716">
          
  <ellipse  class="cls-upperpart-circle-container" cx="338.98" cy="88.39" rx="327.28" ry="29.29">
  <animate id="upperpart-circle-container-animate" attributeName="fill"
  from="#709ec3" to="#003560" begin="0s" dur="1s"
  fill="freeze" repeatCount="1" />
  </ellipse>
  <path    class="cls-upperpart-mid-white-bg" d="M351.43,108.94C104.61,118.68,27.65,94.17,13.16,88.38a.91.91,0,0,0-1.1,1.34L173.3,343.51a11.77,11.77,0,0,0,6.26,4.88c153.85,50.12,291.37,8.37,316,.05a11.79,11.79,0,0,0,6.07-4.72L665.22,92.84a.92.92,0,0,0-.86-1.41C543.15,103.12,438.88,108,351.48,108.94Z"/>
  <path    class="cls-upperpart-mid-white-bg-gradient" d="M351.43,108.94C104.61,118.68,27.65,94.17,13.16,88.38a.91.91,0,0,0-1.1,1.34L173.3,343.51a11.77,11.77,0,0,0,6.26,4.88c153.85,50.12,291.37,8.37,316,.05a11.79,11.79,0,0,0,6.07-4.72L665.22,92.84a.92.92,0,0,0-.86-1.41C543.15,103.12,438.88,108,351.48,108.94Z"/>

  
  <ellipse  class="cls-upperpart-inner-circle" cx="337.32" cy="87.98" rx="221.16" ry="12.3"/>
  <defs>
  <filter id="shadow2">
  <feDropShadow in="SourceGraphic" 
  dx="8" dy="12" stdDeviation="25" 
  flood-color="gray" />
</filter>

  <linearGradient id="upperpart-funnelbg" x1="0%" y1="0%" x2="0%" y2="100%">

  <stop offset="100%" style="stop-color:white;stop-opacity:0" >
  <animate
  dur="2s"
  attributeName="offset"
  fill="freeze"
  repeatCount="0"
  from="1"
  to="0.3"
/>
  </stop>
 
  <stop offset="100%" style="stop-color:#0a8ddf;stop-opacity:0.8" >
  <animate
  dur="2s"
  attributeName="offset"
  fill="freeze"
  repeatCount="0"
  from="1"
  to="0.3"
/>
  </stop>
  <stop offset="100%" style="stop-color:#00588f;stop-opacity:1" >
  <animate
  dur="2s"
  begin={"1s"}
  attributeName="offset"
  fill="freeze"
  repeatCount="0"
  from="1"
  to="0.3"
/>
  </stop>
</linearGradient>
<linearGradient id="upperpart-upperpart-mid-white-bg" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.5" />
<stop offset="100%" style="stop-color:#a7becd;stop-opacity:1" />
</linearGradient>
<linearGradient id="upperpart-inner-circle" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#b7b7b8;stop-opacity:0.5" />
<stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
</linearGradient>
  <style>
  .cls-upperpart-circle-container{fill:#003560;stroke:#005e9e;strokeWidth: 2;stroke-miterlimit:10;}
  .cls-upperpart-mid-white-bg-gradient{fill:url(#upperpart-funnelbg);stroke:#005e9e;strokeWidth: 2;stroke-miterlimit:10;}
  .cls-upperpart-inner-circle{fill:url(#upperpart-inner-circle);}
.cls-upperpart-mid-white-bg{fill:url(#upperpart-upperpart-mid-white-bg);}
  </style>
  </defs>
  </svg>

<svg width="120" height="120" filter="url(#shadow2)" viewBox="-350 50 950 3">
 
 
  <animate id="bottompart-circle-container-animate" attributeName="fill"
  from="#709ec3" to="#003560" begin="0s" dur="1s"
  fill="freeze" repeatCount="1" />
  </ellipse>
  <path class="cls-bottompart-mid-white-bg" d="M68.54,134.6v77.85s9.55,18.11,53.58,17.53,53.15-15.76,53.15-15.76l.3-77.48s-17.59,7-55.19,6.07C88.5,142,68.54,134.6,68.54,134.6Z M232.23,48.39,204.46,120a7.31,7.31,0,0,1-2.13,3c-5.91,5-29.66,21.77-78.3,20.09-45.69-1.58-71.47-13.69-79.13-17.91a7.22,7.22,0,0,1-3.33-3.9L16.49,51.84Z"/>
  <path class="cls-bottompart-mid-white-bg-gradient" d="M68.54,134.6v77.85s9.55,18.11,53.58,17.53,53.15-15.76,53.15-15.76l.3-77.48s-17.59,7-55.19,6.07C88.5,142,68.54,134.6,68.54,134.6Z M232.23,48.39,204.46,120a7.31,7.31,0,0,1-2.13,3c-5.91,5-29.66,21.77-78.3,20.09-45.69-1.58-71.47-13.69-79.13-17.91a7.22,7.22,0,0,1-3.33-3.9L16.49,51.84Z"/>
 
  <ellipse class="cls-bottompart-circle-container" cx="122.71" cy="42.95" rx="111.46" ry="29.26"/>
  <ellipse class="cls-bottompart-inner-circle" cx="122.12" cy="41.8" rx="47.85" ry="13.1"/>
  
  <defs>
  <filter id="shadow2">
  <feDropShadow in="SourceGraphic" 
  dx="8" dy="12" stdDeviation="25" 
  flood-color="gray" />
</filter>

  <linearGradient id="bottompart-funnelbg" x1="0%" y1="0%" x2="0%" y2="100%">

  <stop offset="100%" style="stop-color:white;stop-opacity:0" >
  <animate
  dur="2s"
  attributeName="offset"
  fill="freeze"
  repeatCount="0"
  from="1"
  to="0.3"
/>
  </stop>
 
  <stop offset="100%" style="stop-color:#0a8ddf;stop-opacity:0.8" >
  <animate
  dur="2s"
  attributeName="offset"
  fill="freeze"
  repeatCount="0"
  from="1"
  to="0.3"
/>
  </stop>
  <stop offset="100%" style="stop-color:#00588f;stop-opacity:1" >
  <animate
  dur="2s"
  begin={"1s"}
  attributeName="offset"
  fill="freeze"
  repeatCount="0"
  from="1"
  to="0.3"
/>
  </stop>
</linearGradient>
<linearGradient id="bottompart-bottompart-mid-white-bg" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.5" />
<stop offset="100%" style="stop-color:#a7becd;stop-opacity:1" />
</linearGradient>
<linearGradient id="bottompart-inner-circle" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:#b7b7b8;stop-opacity:0.5" />
<stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
</linearGradient>
  <style>
  .cls-bottompart-circle-container{fill:#003560;stroke:#005e9e;strokeWidth: 2;stroke-miterlimit:10;}
  .cls-bottompart-mid-white-bg-gradient{fill:url(#bottompart-funnelbg);stroke:#005e9e;strokeWidth: 2;stroke-miterlimit:10;}
  .cls-bottompart-inner-circle{fill:url(#bottompart-inner-circle);}
.cls-bottompart-mid-white-bg{fill:url(#bottompart-bottompart-mid-white-bg);}
  </style>
  </defs>
  </svg>
  <svg height="20" width="200" viewBox="-400 640 1100 3">
  <style>
  .textStyle{
    font: bold 70px sans-serif
  }
  </style>
  <text x="0" y="15" fill="#c0580b" class="textStyle" >In Stock</text>
  </svg>
          `,
            }}
            style={{
              width: 390,
              height: 500,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        {/* <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <Ionic
            name="ios-reload-circle-sharp"
            style={{fontSize: 60, opacity: 0.2}}
          />
        </View> */}
        {/* <ColoredLinesWithText/> */}
      </View>
{/*        
        {customerQueryFormLoading && (
          <View style={styles.contentLoadingContainer}>
            <ActivityIndicator animating={true} />
          </View>
        )} */}

        <TouchableOpacity style={styles.highStock} onPress={()=>{
          navigation.navigate("ProductGraphs", {data:productsData, type:"HIGH"})
        }}>
          <Text style={styles.highStockText}>High Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.lowStock} onPress={()=>{
          navigation.navigate("ProductGraphs",{data:productsData, type:"LOW"})
        }}>
          <Text style={styles.lowStockText}>Low Stock</Text>
        </TouchableOpacity>

    </GestureHandlerRootView>
    </Drawer>
  )
}
const mapStateToProps = (state) => {
  return { ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, { setVendorWelcomeCallPopUpToggle, setVendorFormCallPopUpToggle })(
  ReportingScreen
)
