import React, {useEffect, useState} from 'react';
import {Modal,StyleSheet,Text, TouchableOpacity, View,Image, BackHandler} from 'react-native'
import { Button, Colors, Divider } from 'react-native-paper';
import HeaderLogo from '../components/HeaderLogo';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from './Localization';

const styles = StyleSheet.create({
    centeredView:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        flex:1,
    },
    modalView:{
        width:'80%',
        margin:10,
        backgroundColor:Colors.white,
        borderRadius:10,
        padding:15,
        alignItems:'center',
        shadowColor:Colors.black,
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.85,
        elevation:5
    },
    textStyle:{
        color:Colors.black,
        textAlign:'center',
        fontSize:12,
        marginTop:20,

    },
    okStyle:{
        color:Colors.white,
        textAlign:'center',
        fonstSize:20,

    },
    modalText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        shadowColor: Colors.black,
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity:0.3,
        shadowRadius:3.84,
        elevation:5
    },
    image: {
        width: '40%',
        height: 30,
        resizeMode: 'contain',
        marginLeft:-130
      },
})

function AlertView({ok,success,message,visible,route,back, exit}) {
    const [alertVisible, setAlertVisible] = useState(true)
    const navigation = useNavigation()
    const { translation } = useTranslation()
    return (
        <View style={styles.centeredView}>
            <Modal
            animationType='slide'
            transparent={true}
            visible={alertVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection:'row'}}>
                        <Image source={require('../../assets/logo.png')} style={styles.image} />
                        </View>
                        <Divider></Divider>
                        <Text style={styles.textStyle}>{translation(message)}</Text>
                        <Divider></Divider>
                        <View style={{flexDirection:'row'}}>
                            {ok? <View></View>:<TouchableOpacity 
                            onPress={()=>{
                                setAlertVisible(!alertVisible)
                                visible(false)
                            }}
                            >
                            <Button>{translation("Cancel")}</Button>
                            </TouchableOpacity>}
                            {success? <View></View>:<TouchableOpacity 
                            onPress={()=>{
                                if(route){
                                    props.navigation.reset({
                                        index: 1,
                                        routes: [{ name: 'StartScreen' }, { name: 'LoginScreen' }],
                                      })
                                }else if(exit){
                                    BackHandler.exitApp()
                                }
                                if(back){
                                    navigation.goBack()
                                }
                                if(!back){
                                    setAlertVisible(false)
                                    visible(false)
                                }
                            }}
                            >
                                <Button>{translation("OK")}</Button>
                            </TouchableOpacity>}
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

export default AlertView;