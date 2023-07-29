import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import BackButtonWithTitleAndComponent from '../../../../components/BackButtonWithTitleAndComponent';
import LoadingButton from '../../../../components/LoadingButton';
import TextInput from '../../../../components/TextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import AlertView from '../../../../context/AlertView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import ButtonWithBadge from '../../../../components/ButtonWithBadge';
import { gql, useMutation } from '@apollo/client';
import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider';


const styles = StyleSheet.create({
    main:{
        backgroundColor:"white"
    },
    submitButton: {
      width: 200,
      minWidth: 55,
      minHeight: 10,
      alignSelf:'center'
    },
    submitButtonText: {
      marginHorizontal: 0,
      fontSize: 18,
      paddingHorizontal: 0,
      height: 30,
    },
    submitButtonContent: {
      height: 50,
    },
    row:{
        flex:1,
        flexDirection:'row',
    },
    heading:{
        fontSize:18,
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'bold',
        margin:10,        
    },
    text:{
        fontSize:16,
        justifyContent:'center',
        alignSelf:'center',
        margin:5
    },
    cell:{
        borderColor:'black',
        borderWidth:2,
        width:"50%"
    }
  })

function ReplyForRfq(props) {

    const navigation = useNavigation()
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [availableQty, setAvailableQty] = useState()
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [note, setNote] = useState()
    const [price,setPrice] = useState(0)
    const [alertMessage , setAlertMessage] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)
    const [back, setBack] = useState(false)
    const {alertWithType} = useDropdownAlert()
    const data = props.route.params.data
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    BackHandler.addEventListener("hardwareBackPress",()=>{
        navigation.goBack()
        return true
    })

    let addBuyerDashboardAddProductsMutation = gql`
    mutation addBuyerDashboardAddProducts(
        $qNo: String
        $customer_query_form_id:Int
        $date_of_issue: String
        $product_id: Int
        $product_name: String
        $quantity: Int
        $uom: String
        $special_instructions: String
        $eoi: String
        $last_date: String
        $file: String
        $note: String
        $price: Int
        $available_qty: Int
        $delivery_date: String
      ) {
        addBuyerDashboardAddProducts(
          qNo: $qNo
          customer_query_form_id:$customer_querry_form_id
          date_of_issue: $date_of_issue
          product_id: $product_id
          product_name: $product_name
          quantity: $quantity
          uom: $uom
          special_instructions: $special_instructions
          eoi: $eoi
          last_date: $last_date
          file: $file
          note: $note
          price: $price
          available_qty: $available_qty
          delivery_date: $delivery_date
        ) {
          qNo
          customer_querry_form_id
          date_of_issue
          product_id
          product_name
          quantity
          uom
          special_instructions
          eoi
          last_date
          file
          note
          price
          available_qty
          delivery_date
        }
      }
    `

    const [
        addBuyerDashboardAddProducts,
      {
        loading: addBuyerDashboardAddProductsLoading,
        error: addBuyerDashboardAddProductsError,
        data: addBuyerDashboardAddProductsResult,
      },
    ] = useMutation(addBuyerDashboardAddProductsMutation)

    useEffect(() => {
      if (addBuyerDashboardAddProductsError) {
        addBuyerDashboardAddProductsError.graphQLErrors.map(({ message }, i) => {
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', message)
          // console.log(message)
        })
      }
    }, [addBuyerDashboardAddProductsError])

    const onReply = async()=>{
        try {
            await addBuyerDashboardAddProducts({
              variables: {
                qNo:(data.id).toString(),
                customer_query_form_id: parseInt(data.id),
                date_of_issue:formattedDate,
                product_id:0,
                product_name:"",
                quantity: 0,
                uom:"",
                special_instructions:"No",
                eoi:"",
                last_date:formattedDate,
                file:"",
                note:note,
                price:parseInt(price),
                available_qty:parseInt(availableQty),
                delivery_date:deliveryDate.toISOString().split('T')[0],
              },
            })
            setAlertMessage("Reply Sent Successfully")
            setBack(true)
            setAlertVisible(true)
          } catch (ex) {
            if (ex.networkError){
              setAlertMessage("Check your Internet Connection")
              setAlertVisible(true)
            } 
            //alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())

          }
        
    }
    return (        
        <ScrollView style={styles.main}>
            {
             alertVisible && <AlertView title={"WarePort Alert"} message={alertMessage} back={back} visible={setAlertVisible}></AlertView>
            }
        <BackButtonWithTitleAndComponent
            goBack={() => {
            navigation.goBack()
            }}
            title={data.company_name}
        >
        <ButtonWithBadge
                iconStyle={styles.chatBtnIcon}
                badgeValue={false}
                iconName={'comment-dots'}
                buttonStyle={styles.chatBtn}
                customerName={data.buyer_name}
                customerId={data.user_id}
              />
        </BackButtonWithTitleAndComponent>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.heading}>DATE OF ISSUE</Text>
                <Text style={styles.text}>Null</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.heading}>Q.NO</Text>
                <Text style={styles.text}>{data.id}</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.heading}>PRODUCT ID</Text>
                <Text style={styles.text}>Null</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.heading}>PRODUCT NAME</Text>
                <Text style={styles.text}>Null</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.heading}>QUANTITY</Text>
                <Text style={styles.text}>Null</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.heading}>UOM</Text>
                <Text style={styles.text}>Null</Text>
            </View>
        </View>
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.heading}>SPECIAL INSTRUCTIONS</Text>
                <Text style={styles.text}>No</Text>
            </View>
            <View style={styles.cell}>
                <Text style={[styles.heading, {color:"red"}]}>LAST DATE</Text>
                <Text style={[styles.text, {color:"red"}]}>Null</Text>
            </View>
        </View>
        <View style={[styles.row,{marginTop:20}]}>
            <View style={[styles.cell,{width:"33%"}]}>
                <Text style={[styles.heading,{color:"blue"}]}>PRICE</Text>
                <TextInput 
                keyboardType='numeric'
                onChangeText={(text)=>{
                    setPrice(text)
                }}
                style={{marginHorizontal:10, marginTop:20}}
                ></TextInput>
            </View>
            <View style={[styles.cell,{width:"33%"}]}>
                <Text style={[styles.heading,{color:"blue"}]}>AVAILABLE QUANTITY</Text>
                <TextInput  style={{marginHorizontal:10}}
                value={availableQty}
                onChangeText={(text)=>{
                    setAvailableQty(text)
                }}
                keyboardType="numeric"
                ></TextInput>
            </View>
            <View style={[styles.cell,{width:"34%"}]}>
                <Text style={[styles.heading,{color:"blue"}]}>DELIVERY DATE</Text>
                <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
          <Text style={{alignSelf:'center', marginHorizontal:10}}>{deliveryDate.toLocaleDateString()}</Text>
          <TouchableOpacity onPress={()=>{
            setShowDatePicker(true)
          }}>
            <Icon name="calendar" size={30} color="black" />
          </TouchableOpacity>
          </View>
            { showDatePicker &&
            <DateTimePicker
                    value={deliveryDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDeliveryDate(currentDate);
                    setShowDatePicker(false)
                    }}
                />
            }
            </View>
        </View>
        <View style={[styles.row, {width:"80%", marginLeft:10}]}>
            <Text style={{alignSelf:'center', color:"blue"}}>Note: </Text>
            <TextInput
            value={note}
            onChangeText={(text)=>{
                setNote(text)
            }}
            ></TextInput>
        </View>
        <View>
        <LoadingButton
            contentStyle={styles.submitButtonContent}
            textStyle={styles.submitButtonText}
            disabled={props.addEditProductLoading}
            loading={props.addEditProductLoading}
            mode="contained"
            onPress={onReply}
            style={styles.submitButton}
          >
            {"Send Quotation"}
          </LoadingButton>
        </View>
        </ScrollView>
    );
}

export default ReplyForRfq;