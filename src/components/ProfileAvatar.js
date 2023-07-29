import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme'

const styles = StyleSheet.create({
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: 'white',
    marginTop: 5,
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
    fontSize:10,
  },
  addLogo:{
    fontSize:10,
    marginRight:10,
    justifyContent:'center'
  },
  textStyle:{
    fontSize:12
  }
})

export default function ProfileAvatar({ source, style }) {
  const navigation = useNavigation()
  return (
    <>
      {source == '' || source == undefined ? (
        <View style={[styles.profilePicture, styles.noProfilePicture, style, styles.addLogo, {zIndex:-1}]}>
          <Icon name={'user'} size={50} color={theme.colors.primary} />
          <TouchableOpacity onPress={()=>{
            navigation.navigate("UserProfileScreen")
          }}>
          <Text style={styles.addLogo}>Add Company Logo</Text>
        </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.EditLogo, {zIndex:-1}]}>
        <Image style={styles.profilePicture} source={{ uri: source }}></Image>
        <TouchableOpacity onPress={()=>{
            navigation.navigate("UserProfileScreen")
          }}>
          <Text style={styles.addLogo}>Edit Company Logo</Text>
        </TouchableOpacity>
        </View>
      )}
    </>
  )
}
