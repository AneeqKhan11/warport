import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal
} from 'react-native'
import _ from 'lodash'
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../../context/Localization'
import { useNavigation } from '@react-navigation/native'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, TextInput } from 'react-native-paper'
import { getBallPosition, getName1, getName2, setInputName1, setInputName2 } from '../../../auth/LocalStorage'
import { theme } from '../../../core/theme'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'absolute',
    left: '11%',
    top: '20%',
    justifyContent:'space-evenly',
  },
  mainContainer1: {
    top: '-10%',
    justifyContent:'space-evenly',
    zIndex:0,
  },
  mainContainer2: {
    top: '30%',
    justifyContent:'space-evenly',
  },
  container: {
    paddingTop:15,
    alignItems:"center",
    flexDirection:'row',
    width:50,
    height:40,
  },
  numberText:{
    marginLeft:5,
    marginRight:5,
  },
  boxTextStyle:{
    borderColor:Colors.black,
    borderBottomWidth:2,
    borderRadius:20
  },
  textStyle:{
    fontSize:12,
    height:30,
    width:50,
    paddingTop:5,
    backgroundColor:'#d4c9ab',
    borderColor:Colors.black,
    justifyContent:'center',
    textAlign:"center",
    fontWeight:"bold",
    color:theme.colors.primary
  },
  buttonContainer:{
    flexDirection:"row",
  },
})

function BallsPlacement(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const navigation = useNavigation()
  const [Anumber, setAnumber] = useState(0)
  const [Bnumber, setBnumber] = useState(0)
  const [Cnumber, setCnumber] = useState(0)
  const [Dnumber, setDnumber] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [name1, setName1] = useState()
  const [name2, setName2] = useState()

  useEffect(()=>{
    getNumbers()
  },[props.ballsData])

  useEffect(()=>{
    let Name1 = getName1()
    let Name2 = getName2()
    setName1(Name1)
    setName2(Name2)
  },[])

  const getNumbers = ()=>{
    let Anumber = 0
    let Bnumber = 0
    let Cnumber = 0
    let Dnumber = 0
    
    for (let i = 0; i < props.number; i++) {
      let position= getBallPosition(i)  
      if(position == "A"){
        Anumber++
      }else if(position == "B"){
        Bnumber++
      }else if(position == "C"){
        Cnumber++
      }else if(position == "D"){
        Dnumber++
      }
    }
    
    setAnumber(Anumber)
    setBnumber(Bnumber)
    setCnumber(Cnumber)
    setDnumber(Dnumber)

  }

  return (
  <View style={styles.mainContainer}>
    <View style={styles.mainContainer1}>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate("Buyer" ,{data:props.ballsData,id:0, subId:1})
      }}
      >
      <View style={styles.container}>
      <Text style={styles.numberText}>{Anumber}</Text>
      <Icon
        name="arrow-down-drop-circle-outline"
        size={20}
      />
      </View>
      </TouchableOpacity>
      <View style={[{zIndex:2}]}>
        <Text style={styles.textStyle}>
          Debit
        </Text>
      {/* <TextInput mode='outlined' style={[styles.textStyle, {color:Colors.blue900}]}
        placeholder={"Add Name"} onChangeText={(text)=>{setName1(text)}} value={name1} onEndEditing={()=>{
          setInputName1(name1)}}
        ></TextInput> */}
        </View>
    </View>
    <View style={styles.mainContainer2}>
    <TouchableOpacity
    onPress={()=>{
        navigation.navigate("Buyer" ,{data:props.ballsData,id:0, subId:2})
    }}
    >
    <View style={styles.container}>
    <Text style={styles.numberText}>{Bnumber}</Text>
    <Icon
      name="arrow-down-drop-circle-outline"
      size={20}
    />
    </View>
    </TouchableOpacity>
    <View style={{zIndex:2}}>
    {/* <TextInput mode='outlined' style={[styles.textStyle, {color:Colors.blue900}]}
      placeholder={"Add Name"} onChangeText={(text)=>{setName2(text)}} value={name2} onEndEditing={()=>{
        setInputName2(name2)}}
      ></TextInput> */}
      <Text style={styles.textStyle}>
          Credit
        </Text>
      </View>
  </View>
  </View>  
  )
}

export default BallsPlacement
