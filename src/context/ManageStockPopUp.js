import React, {useEffect, useState} from 'react';
import {Modal,StyleSheet,Text, TouchableOpacity, View,Image, BackHandler} from 'react-native'
import { Button, Colors, Divider, TextInput } from 'react-native-paper';
import HeaderLogo from '../components/HeaderLogo';
import { useNavigation } from "@react-navigation/native";
import DocumentPicker from 'react-native-document-picker';
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from './AlertDropdownContextProvider';
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
        fontSize:15,
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
      quantityButtonText: {
        fontSize: 20,
        color: 'black',
      },
      quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderColor:'grey',
        borderWidth:1
      },
      quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
})

function ManageStockPopUp({visible,route,product_id,user_id,product_name}) {
    const [lowStock, setLowStock] = useState(0)
    const [note, setNote] = useState('')
    const[unitPrice, setUnitPrice] = useState('')
    const navigation = useNavigation()
    const [fileResponse, setFileResponse] = useState([]);
    const {alertWithType} = useDropdownAlert()
    const [ok,setok] = useState(true)
    const [success, setSuccess] = useState(false)
    const [alertMessage , setAlertMessage] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)
    const { translation } = useTranslation()

    let updateProductStock = gql`
  mutation update_product_stock(
    $product_id: Int!,
    $stock:Int,
    ) {
      update_product_stock(
        product_id: $product_id
        stock: $stock
      ) {
          success
          error
          result
      }
    }
  `
  const [
    updateStockMutation,
    {
      loading: updateStockMutationLoading,
      error: updateStockMutationError,
      data: updateStockMutationResult,
    },
  ] = useMutation(updateProductStock)
  
  useEffect(() => {
    if (updateStockMutationError) {
      updateStockMutationError.graphQLErrors.map(
        ({ message }, i) => {
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [updateStockMutationError])

    let addManageStockMutation = gql`
      mutation manageStock(
        $user_id: Int,
        $product_id:Int,
        $product_name:String,
        $low_stock:Int,
        $note:String,
        $attachment:String
        ) {
          manageStock(
            user_id: $user_id
            product_id: $product_id
            product_name: $product_name
            low_stock:$low_stock,
            note:$note,
            attachment:$attachment
          ) {
              note
          }
        }
`
const [
    ManageStockMutation,
    {
      loading: ManageStockMutationLoading,
      error: ManageStockMutationError,
      data: ManageStockMutationResult,
    },
  ] = useMutation(addManageStockMutation)
  
  useEffect(() => {
    if (ManageStockMutationError) {
        ManageStockMutationError.graphQLErrors.map(
        ({ message }, i) => {
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [ManageStockMutationError])

  const onSavePress = async () => {
    try {

      await ManageStockMutation({
        variables: {
          user_id: parseInt(user_id),
          product_id: parseInt(product_id),
          product_name: product_name,
          low_stock: parseInt(lowStock),
          note: note,
          unit_price:parseInt(unitPrice),
          attachment:fileResponse.toString()
        },
      });
      await updateStockMutation({
        variables: {
          product_id: parseInt(product_id),
          stock: parseInt(lowStock),
        },
      });
      setAlertMessage('Saved Data Successfully')
      setAlertVisible(true)
      setok(false)
      setSuccess(true)
      // alertWithType('success', 'WarePort Success', 'Saved Data Successfully');
    } catch (ex) {
      console.error(ex);
      const errorMessage = ex.message || ex.graphQLErrors[0].message;
      setAlertMessage(errorMessage)
      setAlertVisible(true)
      // alertWithType('error', 'WarePort Error', errorMessage);
    }
  };

    const handleDocumentSelection = async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
          });
          setFileResponse(response);
        } catch (err) {
          console.warn(err);
        }
      };
    const handleIncrement= () =>{
        setLowStock(lowStock+1)
    }

    const handleDecrement = () =>{
        if(lowStock>0){
            setLowStock(lowStock-1)
        }
    }

    return (
        <View style={styles.centeredView}>
          {
            alertVisible && <AlertView message={alertMessage} ok={ok} success={success} visible={setAlertVisible}></AlertView>
          }
            <Modal
            animationType='slide'
            transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{flexDirection:'row'}}>
                        <Image source={require('../../assets/logo.png')} style={styles.image} />
                        </View>
                        <Divider></Divider>
                        <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={styles.textStyle}>Low Stock :</Text>
                        <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{lowStock}</Text>
                        <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.textStyle}>{useTranslation('Per Unit Price : ')}</Text>
                            <TextInput
                            placeholder= {useTranslation('Add Price')}
                            keyboardType='numeric'
                            value={unitPrice}
                            style={{height:25, marginVertical:10, width:"60%"}}
                            onChangeText={(text)=>{
                                setUnitPrice(text)
                            }}
                            ></TextInput>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.textStyle}>{useTranslation('Note :')}</Text>
                            <TextInput
                            placeholder={useTranslation('Add notes Here')}
                            value={note}
                            style={{height:25, marginVertical:10, width:"80%"}}
                            onChangeText={(text)=>{
                                setNote(text)
                            }}
                            ></TextInput>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={styles.textStyle}>{useTranslation('Attachment : ')}</Text>
                            <Button onPress={handleDocumentSelection}>{useTranslation('Add Attachment')}</Button>
                        </View>
                        {fileResponse.map((file, index) => (
                            <Text
                            key={index.toString()}
                            style={styles.uri}
                            numberOfLines={1}
                            ellipsizeMode={'middle'}>
                            {file?.uri}
                            </Text>
                        ))}
                        <Divider></Divider>
                        <View style={{flexDirection:'row'}}>
                            {route? <View></View>:<TouchableOpacity 
                            onPress={()=>{
                                visible(false)
                            }}
                            >
                            <Button>Cancel</Button>
                            </TouchableOpacity>}
                            <TouchableOpacity 
                            onPress={async()=>{
                                await onSavePress()
                                visible(false)
                            }}
                            >
                                <Button>{useTranslation('SAVE')}</Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

export default ManageStockPopUp;