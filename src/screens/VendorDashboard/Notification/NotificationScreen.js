import { useNavigation } from "@react-navigation/native";
import React, { useEffect,useRef, useState} from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert} from "react-native";
import { Dimensions, BackHandler} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Menu, Divider, Provider, Colors  } from 'react-native-paper';
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import ActionSheet from "react-native-actions-sheet";
import { useTranslation } from "../../../context/Localization";
import AlertView from "../../../context/AlertView";

const styles = StyleSheet.create({
    NotificationView:{
        flex:1,
        flexDirection:"row",
        width:"100%",
    },
    imageStyle:{
        borderRadius:10,
        width:30,
        height:30,
        marginLeft:10,
        marginTop:10
    },
    textStyle:{
        margin:8,
        flexGrow:1,
        marginLeft:20,
        marginTop:15,
    },
    timeTextStyle:{
        color:Colors.blue500
    },
    dotsStyle:{
        margin:10
    },
    mainContainer:{
        alignItems:"flex-start"
    },
    heading:{
        fontSize:18,
        fontWeight:"bold",
        alignSelf:"center",
        marginBottom:5
    },
    iconTextContainer:{
        flexDirection:"row",
        justifyContent:"flex-start",
        padding:5,
        margin:2,
    },
    textHeader:{
        margin:10
    }
});



const NotificationScreen = (props) => {
  const navigation = useNavigation()
  const {translation} = useTranslation()
  const [alertVisible, setAlertVisible] = useState(false)
  let actionSheet = useRef()

  const showActionSheet = ()=>{
    actionSheet.current.show()
  }

  BackHandler.addEventListener("hardwareBackPress",()=>{
        setAlertVisible(!alertVisible)
        return true
  })

  return(
        <ScrollView>
            {
             alertVisible && <AlertView title={"WarePort Alert"} message={"Are you sure you want to Exit App?"} exit={true}></AlertView>
            }
            <Text style={styles.textHeader}>New</Text>
            <Divider style={{borderColor:Colors.black}}></Divider>
            <View style={styles.NotificationView}>
                <Image 
                    source={require("../../../../assets/bell.png")}
                    style={styles.imageStyle}
                ></Image>
                <View style={styles.textStyle}>
                <Text numberOfLines={3}>You Have No new Notifications</Text>
                {/* <Text style={styles.timeTextStyle}>3pm</Text> */}
                </View>
                {/* <TouchableOpacity style={styles.dotsStyle}
                onPress={()=>{
                    showActionSheet()
                }}
                >
                    <Icon 
                        name="dots-horizontal-circle-outline"
                        size={30}
                    ></Icon>
                </TouchableOpacity> */}
            </View>
            {/* <ActionSheet 
            ref={actionSheet}
            destructionButtonIndex={1}
            closeOnPressBack={true}
            headerAlwaysVisible={true}
            >
            <View style={styles.mainContainer}>
                <Text style={styles.heading}>Notification Details</Text>
                <View style={styles.container}>
                    <TouchableOpacity 
                    onPress={()=>{
                        actionSheet.current.hide()
                    }}
                    >
                        <View style={styles.iconTextContainer}>
                        <Icon
                        name="close-box"
                        size={20}
                        style={{marginRight:10}}
                        ></Icon>
                        <Text>{translation('Remove This Notification')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </ActionSheet>
            <Text style={styles.textHeader}>Earlier</Text>
            <Divider style={{borderColor:Colors.black}}></Divider>
            <View style={styles.NotificationView}>
                <Image 
                    source={require("../../../../assets/bell.png")}
                    style={styles.imageStyle}
                ></Image>
                <View style={styles.textStyle}>
                <Text numberOfLines={3}>Last Notification</Text>
                <Text style={styles.timeTextStyle}>3pm</Text>
                </View>
                <TouchableOpacity style={styles.dotsStyle}
                onPress={()=>{
                    showActionSheet()
                }}
                >
                    <Icon 
                        name="dots-horizontal-circle-outline"
                        size={30}
                    ></Icon>
                </TouchableOpacity>
            </View> */}
        </ScrollView>
  )

};

export default NotificationScreen;