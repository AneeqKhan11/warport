import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'

import { useTranslation } from '../../../../context/Localization'
import { useNavigation } from '@react-navigation/native'
import { Colors } from 'react-native-paper'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    left: '5%',
    top: '12%',
  },
  container: {
    alignItems:"center",
    width:150,
    height:100,
    marginTop:10,
    marginLeft:-20
  },
  Text:{
    marginLeft:5,
    marginRight:5,
    padding:5,
    paddingLeft:18,
    width:100,
    color:Colors.white,
    borderColor:Colors.black,
    borderWidth:2,
    borderRadius:8,
    backgroundColor:Colors.black
  },
  textView:{
    borderColor:Colors.black,
    borderRadius:5,
    alignItems:'center',
  },
  buttonContainer:{
    flexDirection:"row",
  },
  touchStyle:{
    width:80,
    height:50,
  }
})

function SalesBox(props) {
  const { translation } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.touchStyle}
      onPress={()=>{
        navigation.navigate("Sales", {data:props.data})
      }}
      >
      <View style={styles.container}>
         <Text style={styles.Text}>{translation("Sales Box")}</Text>
      </View>
      </TouchableOpacity>
    </View>
    
  )
}

export default SalesBox


