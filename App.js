import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import VideoScreen from './src/screens/VideoScreen'
import SelectRegionScreen from './src/screens/SelectRegionScreen'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import RegisterScreenFinal from './src/screens/RegisterScreenFinal'
import ChangePasswordScreen from './src/screens/ChangePasswordScreen'
import VendorScreen from './src/screens/VendorDashboard/VendorScreen'
import NotificationScreen from './src/screens/VendorDashboard/Notification/NotificationScreen'
import PoLifeCycleScreen from './src/screens/VendorDashboard/CreateBooking/PoLifeCycleScreen'
import PoDetailsScreen from './src/screens/VendorDashboard/CreateBooking/PoDetailsScreen'
import PoLinesScreen from './src/screens/VendorDashboard/CreateBooking/PoLinesScreen'
import CreateBookingScreen from './src/screens/VendorDashboard/CreateBooking/CreateBookingScreen'
import AddEditProduct from './src/screens/VendorDashboard/ProductAddEditDelete/AddEditProduct/AddEditProduct'
import MobileConfirmationScreen from './src/screens/MobileConfirmationScreen'
import ContactUsScreen from './src/screens/VendorDashboard/ContactUsScreen'
import infoForQuotation from './src/screens/VendorDashboard/ReportingScreen/Quotation/infoForQuotation'
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'
import CustomerQueryForm from './src/screens/CustomerQueryForm/CustomerQueryForm'
import UserProfileScreen from './src/screens/UserProfile/UserProfileScreen'
import EmailConfirmationScreen from './src/screens/EmailConfirmationScreen'
import InfoForProductsForm from './src/screens/InfoForProductsForm'
import InternalStandardsForm from './src/screens/InternalStandardsForm'
import ReplyForRfq from './src/screens/VendorDashboard/ReportingScreen/screenComponents/ReplyForRfq'
import { Provider as ReduxProvider } from 'react-redux'
import store from './src/store'
import { LanguageProvider } from './src/context/Localization'
import { KeyboardStatusContextProvider } from './src/context/KeyboardStatusContextProvider'
import { ProductsRefreshContextProvider } from './src/context/ProductsRefreshContextProvider'
import { CustomerQueryFormContextProvider } from './src/context/CustomerQueryFormContextProvider'
import { AlertDropdownContextProvider } from './src/context/AlertDropdownContextProvider'
import ImageScreen from './src/screens/VendorDashboard/Search/ImageScreen'
import BottomSheetScreen from './src/components/BottomSheetScreen'

import SyncStorage, { set } from "sync-storage"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  from
} from '@apollo/client'
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from "@apollo/client/utilities";
import config from './config.json'
import * as SplashScreen from 'expo-splash-screen'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'
import ReportingScreen from './src/screens/VendorDashboard/ReportingScreen/ReportingScreen'
import Buyers from './src/screens/VendorDashboard/ReportingScreen/Buyers'
import ChatScreen from './src/screens/VendorDashboard/Chat/ChatScreen'
import ChattingScreen from './src/screens/VendorDashboard/Chat/ChattingScreen'
import ProductCategoryPopUp from './src/screens/VendorDashboard/ProductAddEditDelete/ProductCategoryPopUp'
import Sales, { AddNewRecord } from './src/screens/VendorDashboard/ReportingScreen/Sales/Sales'
import newCustomerForm from './src/screens/CustomerQueryForm/newCustomerForm'
import SalesData from './src/screens/VendorDashboard/ReportingScreen/Sales/SalesData'
import ProductsViewComponent from './src/screens/VendorDashboard/ProductAddEditDelete/ProductsViewComponent'
import AddSearchProduct from './src/screens/VendorDashboard/Search/AddSearchProduct'
import { SalesDataContextProvider } from './src/context/SalesDataContextProvider'
import VideoStoryScreen from './src/screens/VendorDashboard/Search/VideoStoryScreen'
import { ImagesDataContextProvider } from './src/context/ImagesDataContextProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginDataContextProvider } from './src/context/LoginDataContextProvider'
import { CopilotProvider } from 'react-native-copilot'
import Post from './src/screens/VendorDashboard/ProductAddEditDelete/Post'
import ColorGrid from './src/screens/VendorDashboard/ProductAddEditDelete/AddEditProduct/ColorGrid'
import ManageStock from './src/screens/VendorDashboard/ReportingScreen/ManageStock'
import { getData, saveData } from './src/auth/AsyncStorage'
import ProductGraphs from './src/screens/VendorDashboard/ReportingScreen/screenComponents/ProductGraphs'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
})

// const link = from([
//   errorLink,
//   new HttpLink({uri:"https://159.223.93.212:8080/graphql"})
// ])

// const client = new ApolloClient({
//   link,
//   cache:new InMemoryCache()
// })


SplashScreen.preventAutoHideAsync()

const Stack = createStackNavigator()

const env = process.env.NODE_ENV
const config_ = config[env]


// const graphQLLink = new HttpLink({
//   uri: `${config_.backend_domain}${
//     config_.port != '' ? `:${config_.port}` : ''
//   }/${config_.graphql_endpoint}`,
// })

const graphQLLink = new HttpLink({
  uri: "http://159.223.93.212:5433/graphql/",
})

const wsLink = new WebSocketLink({
  uri: "ws://159.223.93.212:5433/subscriptions",
  options: {
    timeout: 600000,
    minTimeout: 600000,
    reconnect: true,
    lazy: true
  },
})
const splitLink = split(
  ({ query }) => {

    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  graphQLLink
);
wsLink.subscriptionClient.on('connecting', () => {
  console.log('connecting subs ' + new Date().toString())
})

wsLink.subscriptionClient.on('connected', () => {
  console.log('connected subs ' + new Date().toString())
})

wsLink.subscriptionClient.on('reconnecting', () => {
  console.log('reconnecting subs ' + new Date().toString())
})

wsLink.subscriptionClient.on('reconnected', () => {
  console.log('reconnected subs ' + new Date().toString())
})

wsLink.subscriptionClient.on('disconnected', () => {
  console.log('disconnected subs ' + new Date().toString())
})
wsLink.subscriptionClient.on('onError', (error) => {
  console.log(error.message + '  ' + new Date().toString())
})

wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
  wsLink.subscriptionClient.maxConnectTimeGenerator.max

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
})
export default function App() {
  const [initialRoute, setInitialRoute] = useState('');
  const [appReady, setAppReady] = useState(false);
  console.log(initialRoute)

  useLayoutEffect(() => {
    init();
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate("ReplyForRfq", { data: remoteMessage });
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      })
  }, []);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();


  }, []);

  useEffect(() => {
    const getFcmToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      saveData("TOKEN", token)
      console.log('FCM Token:', token);
    };
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  const init = async () => {
    SyncStorage.init();
    // try {
    //   const userId = await getLoginUserId();
    //   console.log(userId);
    //   if (userId !== null) {
    //     setInitialRoute("VendorScreen");
    //   }

    // } catch (error) {
    //   console.log(error);
    // }
    const getInitialRoute = await getData('ROUTE');
    const initialRoute = getInitialRoute ? getInitialRoute : 'SelectRegionScreen';
    setInitialRoute(initialRoute);
    await SplashScreen.hideAsync();
    setAppReady(true);
  };

  return (
    <>
      {appReady && (
        <LanguageProvider>
          <KeyboardStatusContextProvider>
            <AlertDropdownContextProvider>
              <CopilotProvider overlay="svg">
                <ApolloProvider client={apolloClient}>
                  <ReduxProvider store={store}>
                    <LoginDataContextProvider>
                      <ProductsRefreshContextProvider>
                        <SalesDataContextProvider>
                          <CustomerQueryFormContextProvider>
                            <ImagesDataContextProvider>
                              <Provider theme={theme}>
                                <NavigationContainer>
                                  <Stack.Navigator
                                    initialRouteName={initialRoute}
                                    screenOptions={{
                                      headerShown: false,
                                    }}
                                  >
                                    <Stack.Screen
                                      name="SelectRegionScreen"
                                      component={SelectRegionScreen}
                                    />
                                    <Stack.Screen
                                      name="BottomSheetScreen"
                                      component={BottomSheetScreen}
                                    />
                                    <Stack.Screen
                                      name="StartScreen"
                                      component={StartScreen}
                                    />
                                    <Stack.Screen
                                      name="LoginScreen"
                                      component={LoginScreen}
                                    />
                                    <Stack.Screen
                                      name="RegisterScreen"
                                      component={RegisterScreen}
                                    />
                                    <Stack.Screen
                                      name="ManageStock"
                                      component={ManageStock}
                                    />
                                    <Stack.Screen
                                      name="RegisterScreenFinal"
                                      component={RegisterScreenFinal}
                                    />
                                    <Stack.Screen
                                      name="NotificationScreen"
                                      component={NotificationScreen}
                                    />
                                    <Stack.Screen
                                      name="VendorScreen"
                                      component={VendorScreen}
                                    />
                                    <Stack.Screen
                                      name="ProductsViewComponent"
                                      component={ProductsViewComponent}
                                    />
                                    <Stack.Screen
                                      name="ChatScreen"
                                      component={ChatScreen}
                                    />
                                    <Stack.Screen
                                      name="ChattingScreen"
                                      component={ChattingScreen}
                                    />
                                    <Stack.Screen
                                      name="Home"
                                      component={ReportingScreen}
                                    />
                                    <Stack.Screen
                                      name="AddNewRecord"
                                      component={AddNewRecord}
                                    />
                                    <Stack.Screen
                                      name="Post"
                                      component={Post}
                                    />
                                    <Stack.Screen
                                      name="Buyer"
                                      component={Buyers}
                                    />
                                    <Stack.Screen
                                      name="PoLifeCycleScreen"
                                      component={PoLifeCycleScreen}
                                    />
                                    <Stack.Screen
                                      name="PoDetailsScreen"
                                      component={PoDetailsScreen}
                                    />
                                    <Stack.Screen
                                      name="PoLinesScreen"
                                      component={PoLinesScreen}
                                    />
                                    <Stack.Screen
                                      name="CreateBookingScreen"
                                      component={CreateBookingScreen}
                                    />
                                    <Stack.Screen
                                      name="ContactUsScreen"
                                      component={ContactUsScreen}
                                    />
                                    <Stack.Screen
                                      name="ResetPasswordScreen"
                                      component={ResetPasswordScreen}
                                    />
                                    <Stack.Screen
                                      name="MobileConfirmationScreen"
                                      component={MobileConfirmationScreen}
                                    />
                                    <Stack.Screen
                                      name="ChangePasswordScreen"
                                      component={ChangePasswordScreen}
                                    />
                                    <Stack.Screen
                                      name="AddEditProduct"
                                      component={AddEditProduct}
                                    />
                                    <Stack.Screen
                                      name="AddSearchProduct"
                                      component={AddSearchProduct}
                                    />
                                    <Stack.Screen
                                      name="ColorGrid"
                                      component={ColorGrid}
                                    />
                                    <Stack.Screen
                                      name="UserProfileScreen"
                                      component={UserProfileScreen}
                                    />
                                    <Stack.Screen
                                      name="CustomerQueryForm"
                                      component={CustomerQueryForm}
                                    />
                                    <Stack.Screen
                                      name="ReplyForRfq"
                                      component={ReplyForRfq}
                                    />
                                    <Stack.Screen
                                      name="newCustomerForm"
                                      component={newCustomerForm}
                                    />
                                    <Stack.Screen
                                      name="infoForQuotation"
                                      component={infoForQuotation}
                                    />
                                    <Stack.Screen
                                      name="Sales"
                                      component={Sales}
                                    />
                                    <Stack.Screen
                                      name="ImageScreen"
                                      component={ImageScreen}
                                    />
                                    <Stack.Screen
                                      name="ProductGraphs"
                                      component={ProductGraphs}
                                    />
                                    <Stack.Screen
                                      name="VideoStoryScreen"
                                      component={VideoStoryScreen}
                                    />

                                    <Stack.Screen
                                      name="SalesData"
                                      component={SalesData}
                                    />
                                    <Stack.Screen
                                      name="EmailConfirmationScreen"
                                      component={EmailConfirmationScreen}
                                    />
                                    <Stack.Screen
                                      name="InfoForProductsForm"
                                      component={InfoForProductsForm}
                                    />
                                    <Stack.Screen
                                      name="InternalStandardsForm"
                                      component={InternalStandardsForm}
                                    />
                                  </Stack.Navigator>
                                </NavigationContainer>
                              </Provider>
                            </ImagesDataContextProvider>
                          </CustomerQueryFormContextProvider>
                        </SalesDataContextProvider>
                      </ProductsRefreshContextProvider>
                    </LoginDataContextProvider>
                  </ReduxProvider>
                </ApolloProvider>
              </CopilotProvider>
            </AlertDropdownContextProvider>
          </KeyboardStatusContextProvider>
        </LanguageProvider>
      )}
    </>
  )
}
