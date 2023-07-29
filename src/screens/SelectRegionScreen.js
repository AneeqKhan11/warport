import { useNavigation } from "@react-navigation/native";
import React, { useEffect,useRef, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Button, SafeAreaView } from "react-native";
import { Colors, Divider } from "react-native-paper";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "../context/Localization";
import { theme } from "../core/theme";
import { languageList } from '../context/Localization/languages'
import { setFirstTime } from "../auth/LocalStorage";
import { getFirstTime } from "../auth/LocalStorage";
import { StartScreen } from "./StartScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    heading:{
        width:"100%",
        height:Dimensions.get('window').height*0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    headingText:{
        fontSize:20,
        fontWeight:'600'
    },
    paragraph:{
        width:"100%",
        paddingLeft:20
    },
    paragraphText:{
        fontWeight:'300',
        marginBottom:10
    },
    divider:{
        borderColor:"black"
    },
    lineStyle:{
        flexDirection:"row",
        height:50,
        alignItems:"center",
        marginLeft:10
    },
    imageStyle:{
        width:20,
        height:20,
        resizeMode:"contain",
        margin:5
    },
    continueButton:{
        marginVertical:50
    }
});



const SelectRegionScreen = (props) => {
  const navigation = useNavigation()
  const { setLanguage } = useTranslation()
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);


  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.log(error);
    }
  };

  async function refresh(userId){
    let first = await getFirstTime()
    console.log(first)
    if(first || userId){
        setShowWelcomeScreen(false)
    }else{
        setShowWelcomeScreen(true)
    }
    }

    useEffect(() => {
        let userId = getUserId()
        refresh(userId)
      }, [])


      return(
            <ScrollView>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Wareport Suppliers</Text>
                </View>
                <View style={styles.paragraph}>
                    <Text style={styles.paragraphText}>Select Your MarketPlace</Text>
                </View>
                <Divider style={styles.divider}></Divider>
                <TouchableOpacity style={styles.lineStyle} onPress={async ()=>{
                    await setLanguage(languageList[0])
                    await setFirstTime(true)
                    navigation.navigate("StartScreen")
                }}>
                    <Image style={styles.imageStyle} source={require("../../assets/pakistan.png")}></Image>
                    <Text>Pakistan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lineStyle} onPress={async ()=>{
                    await setLanguage(languageList[2])
                    await setFirstTime(true)
                    navigation.navigate("StartScreen")
                }}>
                    <Image style={styles.imageStyle} source={require("../../assets/vietnam.png")}></Image>
                    <Text>Vietnam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lineStyle} onPress={async ()=>{
                    await setLanguage(languageList[1])
                    await setFirstTime(true)
                    navigation.navigate("StartScreen")
                }}>
                    <Image style={styles.imageStyle} source={require("../../assets/south-korea.png")}></Image>
                    <Text>Korea</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lineStyle} onPress={async ()=>{
                    await setLanguage(languageList[2])
                    await setFirstTime(true)
                    navigation.navigate("StartScreen")
                }}>
                    <Image style={styles.imageStyle} source={require("../../assets/Malaysia.jpg")}></Image>
                    <Text>Malaysia</Text>
                </TouchableOpacity>
                <View style={styles.continueButton}>
                <Button 
                    color={theme.colors.primary}
                    onPress={()=>{
                        navigation.navigate("StartScreen")
                    }}
                    title="Continue"
                ></Button>
                </View>
            </ScrollView>
      )
//   }else{
//     navigation.navigate("StartScreen")
//     return(<></>)
//   }


};

export default SelectRegionScreen;