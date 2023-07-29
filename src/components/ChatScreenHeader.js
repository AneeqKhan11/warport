import { useNavigation, useScrollToTop } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme'

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor:"#cccc",
        borderBottomWidth:1,
        padding: 0,
        paddingHorizontal: 0,
        position:'absolute',
        top:"0%",
        zIndex:1
        },
    container: {
        flexDirection: 'row',
        flex:1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 4,
        },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom:5,
        borderWidth: 1,
        borderColor: '#c7c7c7',
    },
    noProfilePicture: {
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.8
    },
    EditLogo:{
        marginLeft:-5,
        marginRight:10,
        fontSize:8,
    },
    addLogo:{
        fontSize:10,
        marginLeft:20
    },
    textStyle:{
        fontSize:12
    },
    userText:{
        alignSelf:'center',
        marginLeft:10
    },
    UserInfo:{
        flexDirection:'row',
    },
    backStyle:{
        marginLeft:10
    }
})

export default function ChatScreenHeader({goBack, userName}) {
  const navigation = useNavigation()
  const  [source, setSource] = useState('')

  return (

    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={styles.backStyle}>
          <Icon name="arrow-left" size={24} color="gray" />
        </TouchableOpacity>
        {source == '' || source == undefined ? (
        <View style={styles.UserInfo}>
        <View style={[styles.profilePicture, styles.noProfilePicture, styles.addLogo]}>
          <Icon name={'user'} size={30} color={theme.colors.primary} />
        </View>
        <Text style={styles.userText}>{userName}</Text>
        </View>
      ) : (
        <View style={styles.EditLogo}>
        <Image style={styles.profilePicture} source={{ uri: source }}></Image>
        <Text style={styles.userText}>{userName}</Text>
        </View>
      )}
      </View>
    </View>
      

  )
}
