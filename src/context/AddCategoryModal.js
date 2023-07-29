import React, {useEffect, useState} from 'react';
import {Modal,StyleSheet,Text, TouchableOpacity, View,Image, BackHandler} from 'react-native'
import { Button, Colors, Divider, TextInput } from 'react-native-paper';
import HeaderLogo from '../components/HeaderLogo';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import AlertView from './AlertView';
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
        fontSize:20,

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
      button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
})

function AddCategoryModal({ACat,BCat,CCat,onClose}) {
    const [alertVisible, setAlertVisible] = useState(true)
    const [categoryName, setCategoryName] = useState('')
    const [title, setTitle] = useState('')
    const navigation = useNavigation()
    const [alertMessage , setAlertMessage] = useState("")
    const [mainAlertVisible,setMainAlertVisible] = useState(true)
    const alertVisibility =(state)=>{
      setAlertVisible(state)
    }
    const { translation } = useTranslation()
    useEffect(()=>{
      if(ACat){
        setTitle("Add A category")
      }else if(BCat){
        setTitle("Before adding please check all A categories")
      }else if(CCat){
        setTitle("Before adding please check all A and B cateogories")
      }else{
        setTitle("Before adding please check all A and B cateogories")
      }
    },[])

    const addCCategoryMutation = gql`
    mutation AddCategoryC($b_category_id:String!, $name: String!) {
        add_category_c(b_category_id: $b_category_id , name: $name) {
          id
          name
        }
      }
  `
  const [
    addCCategory,
    {
      loading: addCCategoryMutationLoading,
      error: addCCategoryMutationError,
      data: addCCategoryMutationResult,
    },
  ] = useMutation(addCCategoryMutation)

  useEffect(() => {
    if (addCCategoryMutationError) {
      addCCategoryMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addCCategoryMutationError])

    const addBCategoryMutation = gql`
    mutation AddCategoryB($a_category_id:String!, $name: String!) {
        add_category_b(a_category_id: $a_category_id , name: $name) {
          id
          name
        }
      }
  `
  const [
    addBCategory,
    {
      loading: addBCategoryMutationLoading,
      error: addBCategoryMutationError,
      data: addBCategoryMutationResult,
    },
  ] = useMutation(addBCategoryMutation)

  useEffect(() => {
    if (addBCategoryMutationError) {
      addBCategoryMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addBCategoryMutationError])

  const addACategoryMutation = gql`
    mutation AddCategoryA($name: String!) {
        add_category_a(name: $name) {
          id
          name
        }
      }
  `
  const [
    addACategory,
    {
      loading: addACategoryMutationLoading,
      error: addACategoryMutationError,
      data: addACategoryMutationResult,
    },
  ] = useMutation(addACategoryMutation)

  useEffect(() => {
    if (addACategoryMutationError) {
      addACategoryMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addACategoryMutationError])

  const addCategory = async() => {
    if(ACat){
      try {
        await addACategory({
          variables: {
            name: categoryName,
          },
        })
        setAlertVisible(false)
      } catch (ex) {
        
        if (ex.networkError) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
        }
      }
    }else if(BCat){
        try {
          await addBCategory({
            variables: {
              a_category_id: BCat,
              name: categoryName,
            },
          })
          setAlertVisible(false)
        } catch (ex) {
          if (ex.networkError) {
            setAlertMessage("Check your Internet Connection")
            setAlertVisible(true)
            }
        }
      }else if(CCat){
        try {
          await addCCategory({
            variables: {
              b_category_id: CCat,
              name: categoryName,
            },
          })
          setAlertVisible(false)
        } catch (ex) {
          if (ex.networkError) {
            setAlertMessage("Check your Internet Connection")
            setAlertVisible(true)
            }
        }
      }
}

    return (
        <View style={styles.centeredView}>
          {
            alertVisible && <AlertView message={alertMessage} visible={alertVisibility} ></AlertView>
          } 
            <Modal
            animationType='slide'
            transparent={true}
            visible={mainAlertVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../../assets/logo.png')} style={styles.image} />
                        </View>
                        <Text style={styles.textStyle}>{title}</Text>
                        <View style={{flex:1}}>
                            <TextInput
                                placeholder='Type New Category'
                                value={categoryName}
                                onChangeText={text => {setCategoryName(text)}}
                            ></TextInput>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:20}}>
                            <TouchableOpacity onPress={() => {
                                setAlertVisible(false)
                                onClose()
                            }   
                                 } style={[styles.button, {backgroundColor:'red'}]}>
                                <Text style={styles.okStyle}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                addCategory()
                                onClose()
                            }} style={[styles.button, {backgroundColor:'green'}]}>
                                <Text style={styles.okStyle}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default AddCategoryModal;