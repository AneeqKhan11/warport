import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import { View , Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { BackHandler } from 'react-native';
import { CustomerQueryFormContext } from '../../../context/CustomerQueryFormContextProvider';
import BackButtonWithTitleAndComponent from '../../../components/BackButtonWithTitleAndComponent';
import Flag from 'react-native-flags';
import LogoDashboard from '../../../components/LogoDashboard';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Divider } from 'react-native-paper';
import { gql, useLazyQuery } from '@apollo/client';
import { getLoginUserId } from '../../../auth/LocalStorage';
import { useTranslation } from '../../../context/Localization';
import AlertView from '../../../context/AlertView';

const styles = StyleSheet.create({
    LineView:{
        flexDirection:'row',
        alignItems:'center',
        margin:5
    },
    imageStyle:{
        borderRadius:10,
        width:30,
        height:30,
        marginLeft:10,
        marginTop:10
    },
    textStyle:{
        marginTop:10,
        marginLeft:10
    },
    userFlag: {
        marginRight: 30,
        marginLeft: 0,
      },
})

function ChatScreen(props) {
    const [buyersData, setBuyersData] = useState(null)
    const navigation = useNavigation()
    const {translation} = useTranslation()
    const userId = getLoginUserId()
    const [alertMessage , setAlertMessage] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)
    const getBuyersDataQuerry = gql`
    query get_buyers_by_user_id($user_id:Int!) {
      get_buyers_by_user_id(
        user_id: $user_id
      ){
         buyer_id
         buyer_name
      }
    }
    `

    let [
      getBuyersData,
      {
        loading: getBuyersQueryLoading,
        error: getBuyersQueryError,
        data: getBuyersQueryResult,
      },
    ] = useLazyQuery(getBuyersDataQuerry, {
      fetchPolicy: 'network-only',
    })

    async function getBuyers(){
      try {
        await getBuyersData({
          variables: {
            user_id:parseInt(userId)
          },
        })
      } catch (ex) {
        
        if (ex.networkError){
          setAlertMessage("Check your Internet Connection")
          setAlertVisible(true)
        }
        // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
      }
    }

    useEffect(() => {
      if (getBuyersQueryError) {
        getBuyersQueryError.graphQLErrors.map(({ message }, i) => {
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', message)
        })
      }
    }, [getBuyersQueryError])

    async function getData(){
      if(getBuyersQueryResult && getBuyersQueryResult.get_buyers_by_user_id){
        await setBuyersData(getBuyersQueryResult.get_buyers_by_user_id)
      }
    }

    useEffect(()=>{
      getBuyers()
    },[])
    
    useEffect(()=>{
      getData()
    },[getBuyersQueryResult])


    const {
        customerQueryFormData,
        customerQueryFormRefresh,
        customerQueryFormLoading,
      } = useContext(CustomerQueryFormContext)
    const uniqueBuyerNames = [];

    const uniqueBuyers = buyersData? buyersData.filter(element =>{
      const isDuplicate = uniqueBuyerNames.includes(element.buyer_name)

      if(!isDuplicate) {
        uniqueBuyerNames.push(element.buyer_name)
        return true
      }
      return false
    }): []

    BackHandler.addEventListener("hardwareBackPress",()=>{
        navigation.goBack()
        return true
      })

    return(
        <ScrollView  style={{backgroundColor:Colors.white}}>
        {
          alertVisible && <AlertView message={alertMessage} ok={ok} visible={setAlertVisible}></AlertView>
        }
        <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
        }}
        // title="PO Life Cycle"
      >
            <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flag
                  code={translation("PK")}
                  size={24}
                  style={styles.userFlag}
                />
                <LogoDashboard />
              </View>
      </BackButtonWithTitleAndComponent>
      { 
            uniqueBuyers &&   uniqueBuyers.map((buyer, index) => {
              if(buyer.buyer_id!=null) {
                return (
                  <View key ={index}>
                    <TouchableOpacity onPress={()=>{
                      navigation.navigate("ChattingScreen", {customerName:buyer.buyer_name, customerId:buyer.buyer_id})
                    }}>
                      <View style={styles.LineView}>
                      <Image 
                          source={require("../../../../assets/noprofile.png")}
                          style={styles.imageStyle}
                      ></Image>
                      <Text style={styles.textStyle}>{buyer.buyer_name}</Text>
                      </View>
                    </TouchableOpacity>
                    <Divider></Divider>
                  </View>
                  
                )
              }
            })
        }
        </ScrollView>
    )
}

export default ChatScreen;