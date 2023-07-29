import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, StatusBar, Text, BackHandler, Image } from 'react-native'
import { theme } from '../../core/theme'
import Foundation from 'react-native-vector-icons/Foundation';
import ImagePicker from 'react-native-image-crop-picker'
import { connect } from 'react-redux'
import { setVendorWelcomeCallPopUpToggle } from '../../store/actions/VendorActions'
import { setVendorDrawerToggle } from '../../store/actions/VendorDrawerActions'
import { setAddEditProductImages } from '../../store/actions/AddEditProductActions'
import _ from 'lodash'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import BottomDrawerContent from './BottomDrawerContent'
import ReportingScreen from './ReportingScreen/ReportingScreen'
import {
  setVendorBottomDrawerToggle,
  setVendorBottomDrawerReset,
} from '../../store/actions/VendorBottomDrawerActions'
import { setUserAuthData } from '../../store/actions/UserAuthDataActions'

import { useTranslation } from '../../context/Localization'
import { RoleType } from '../../helpers/RoleType'
import SearchPage from './Search/SearchPage'
import PoLifeCycleScreen from './CreateBooking/PoLifeCycleScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddEditProduct from './ProductAddEditDelete/AddEditProduct/AddEditProduct'
import Sales from './ReportingScreen/Sales/Sales'
import { getLoginUserId } from '../../auth/LocalStorage';
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider';
import { SalesDataContext } from '../../context/SalesDataContextProvider';
import { ProductsRefreshContext } from '../../context/ProductsRefreshContextProvider';
import { CustomerQueryFormContext } from '../../context/CustomerQueryFormContextProvider';
import { gql, useSubscription, useMutation } from '@apollo/client'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: { elevation: 1 },
  btnCircleUp: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cbcbcb4d',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14.41,
  },
  selectedTabIcon: {
    backgroundColor: '#cbcbcb4d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 14.41,
    elevation: 1,
    width: 40,
    height: 40,
    borderRadius: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  topNavContainer: {

  },
  menuBtnIcon: { marginLeft: 5, },
  menuBtn: {

  },
  userFlag: {
    marginRight: 8,
    marginLeft: 0,
  },
  chatBtn: {
    marginRight: 5,
  },
  tabBarText: {
    fontSize: 10,
    color: theme.colors.primary
  },
  tabBarText1: {
    fontSize: 10,
    color: theme.colors.primary,
    paddingTop: 5
  },
  tabBarViewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerContainer: {},

})
const Tab = createBottomTabNavigator();
const BottomTabScreen = () => {
  let userId = getLoginUserId()
  const { salesData, requestSalesDataRefresh, salesDataLoading } = useContext(SalesDataContext)
  const {
    customerQueryFormData,
    customerQueryFormRefresh,
    customerQueryFormLoading,
  } = useContext(CustomerQueryFormContext)
  const { productsData, requestProductsRefresh, productsDataLoading } =
    useContext(ProductsRefreshContext)

  useEffect(() => {
    requestSalesDataRefresh(userId)
    customerQueryFormRefresh(userId)
    requestProductsRefresh(userId)
  }, [])

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        swipeEnabled: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 50,
        },

        tabBarIcon: ({ focused, size, colour }) => {
          let iconName;
          let name;
          if (route.name === 'Home') {
            name = "HOME"
            iconName = focused ? 'home' : 'home';
            size = focused ? size + 8 : size + 2;
            colour = focused ? "#00569F" : "black"
          } else if (route.name === 'Search') {
            name = "Search"
            iconName = focused ? 'page-search' : 'page-search';
            colour = focused ? "#00569F" : "black"
          } else if (route.name === 'Reels') {
            name = "Add Product"
            iconName = focused
              ? 'plus'
              : 'plus';
            colour = focused ? "#00569F" : "black"
          } else if (route.name === 'Activity') {
            name = "Sales Software"
            return focused ? (
              <View style={styles.bottomView}>
                <Image source={require('../../../assets/sales-blue.png')}
                  style={{ resizeMode: 'contain', width: 25, height: 25 }}></Image>
                <Text style={{
                  fontSize: 10,
                  color: focused ? "#00569F" : "black"
                }}>{name}</Text>
              </View>)
              : (
                <View style={styles.bottomView}>
                  <Image source={require('../../../assets/sales-black.png')}
                    style={{ resizeMode: 'contain', width: 25, height: 25 }}></Image>
                  <Text style={{
                    fontSize: 10,
                    // color: focused ? "#00569F" : "black"
                  }}>{name}</Text>
                </View>)
            // iconName = focused ? 'bar-chart-outline' : 'bar-chart-outline';
          } else if (route.name === 'Profile') {
            name = "PO Software"
            iconName = focused
              ? 'social-dropbox'
              : 'social-dropbox';
            colour = focused ? "#00569F" : "black"
          }

          return (
            <View style={styles.bottomView}>
              <Foundation name={iconName} size={size} color={colour} />
              <Text style={{
                fontSize: 10,
                color: focused ? "#00569F" : "black"
              }}>{name}</Text>
            </View>);
        },
      })}>
      <Tab.Screen name="Home" component={ReportingScreen} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Reels" component={AddEditProduct} />
      <Tab.Screen name="Activity" component={Sales} />
      <Tab.Screen name="Profile" component={PoLifeCycleScreen} />
    </Tab.Navigator>
  );
};

function VendorScreen(props) {
  const { translation } = useTranslation()

  const addImagePathToAddProductScreen = (navigation, path) => {
    var cloneArray = _.cloneDeep(props.addEditProductImages)
    cloneArray[0] = path
    props.setVendorBottomDrawerReset()
    props.setAddEditProductImages(cloneArray)
    navigation.navigate('AddEditProduct')
  }

  let meMutation = gql`
    mutation me($id: ID!) {
      me(id: $id) {
        id
        avatar
        company_name
        country_code
        contact_no
        contact_no_verified
        email
        email_verified
        role
        password
        category_a_id
      }
    }
  `

  const [
    me,
    {
      loading: meMutationLoading,
      error: meMutationError,
      data: meMutationResult,
    },
  ] = useMutation(meMutation)

  useEffect(() => {
    if (meMutationError) {
      meMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [meMutationError])


  useEffect(() => {
    ; (async () => {
      if (meMutationResult) {
        if (meMutationResult.me) {
          if (meMutationResult.me.role == RoleType.Vendor) {
            props.setUserAuthData(meMutationResult.me)
          }
          props.setUserAuthData(meMutationResult.me)
        } else {
          console.log("No user")
        }
      }
    })()
  }, [meMutationResult])

  const getUserByUserId = async (userId) => {
    try {

      await me({
        variables: {
          id: userId,
        },
      })
    } catch (ex) {
      if (ex.networkError) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
        // setTimeout(() => {
        //   getUserByUserId(userId)
        // }, 1000)
      }
    }
  }

  const fetchData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userId = await getLoginUserId();
      if (userId != null) {
        await getUserByUserId(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <BottomSheetModalProvider>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      {/* {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
      } */}
      <BottomTabScreen />
      {/* <BottomDrawerContent
            onCameraPress={() => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then((image) => {
                addImagePathToAddProductScreen(props.navigation, image.path)
              })
              props.setVendorBottomDrawerToggle(false)
            }}
            onGalleryPress={() => {
              ImagePicker.openPicker({
                multiple: false,
                cropping: true,
              }).then((image) => {
                addImagePathToAddProductScreen(props.navigation, image.path)
              })
              props.setVendorBottomDrawerToggle(false)
            }}
            navigation={props.navigation}
          /> */}
    </BottomSheetModalProvider>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state.AddEditProductReducer,
    ...state.VendorDrawerReducer,
    ...state.VendorReducer,
    ...state.UserAuthDataReducer,
  }
}
export default connect(mapStateToProps, {
  setVendorDrawerToggle,
  setAddEditProductImages,
  setVendorBottomDrawerToggle,
  setVendorWelcomeCallPopUpToggle,
  setVendorBottomDrawerReset,
  setUserAuthData,
})(VendorScreen)
