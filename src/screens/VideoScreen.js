import { useNavigation } from "@react-navigation/native";
import React, { useEffect,useRef, useState} from "react";
import { Animated, PanResponder, StyleSheet, View, Text, Button, SafeAreaView } from "react-native";
import { Colors } from "react-native-paper";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Video from "react-native-video";
// import BackButtonWithTitleAndComponent from "../../../components/BackButtonWithTitleComponentAndLogo";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "../context/Localization";
import { theme } from "../core/theme";

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
        height:Dimensions.get('window').height*0.1,
        paddingLeft:20
    },
    paragraphText:{
        fontWeight:'300',
        marginBottom:10
    },
    backgroundVideo:{
        flex:1,
        width:Dimensions.get('window').width
    },
    continueButton:{
        marginVertical:50
    }
});

const VideoScreen = (props) => {
  const navigation = useNavigation()
  const {translation} = useTranslation()
  const player = useRef(null)
  return(
        <ScrollView>
            <View style={styles.heading}>
                <Text style={styles.headingText}>{translation("Welcome to the")}</Text>
                <Text style={styles.headingText}>{translation("Wareport App")}</Text>
            </View>
            <View style={styles.paragraph}>
                <Text style={styles.paragraphText}>{translation("List Products, Get Quotations, Respond and create Bookings, and more -All from your Mobile Phone")}</Text>
                <Text style={styles.paragraphText}>{translation("Here's how it works:")}</Text>
            </View>
            <Video
                source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1' }}
                style={{ width:Dimensions.get('window').width, height: 300 }}
                controls={true}
                audioOnly={true}
                poster={"../../assets/logo.png"}
                ref={player}
                />
            <View style={styles.continueButton}>
            <Button 
                color={theme.colors.primary}
                onPress={()=>{
                    navigation.navigate("SelectRegionScreen")
                }}
                title={translation("Continue")}
            ></Button>
            </View>
        </ScrollView>
  )

};

export default VideoScreen;