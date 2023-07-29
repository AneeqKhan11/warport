import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Image, StyleSheet, SafeAreaView } from "react-native";
import { Surface, IconButton, useTheme, Provider as PaperProvider, Colors } from "react-native-paper";
import { ImageBackground } from "react-native";
import DocumentPicker from 'react-native-document-picker';
import ChatScreenHeader from "../../../components/ChatScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { gql, useLazyQuery , useMutation} from '@apollo/client';
import { getLoginUserId, getLoginUserName } from '../../../auth/LocalStorage';
import AlertView from "../../../context/AlertView";
import { useTranslation } from "../../../context/Localization";

const styles = StyleSheet.create({
  mainView:{
     flex: 1 
  },
  formContainer:{
    paddingRight:15,
    paddingLeft:15,
    paddingBottom:60,
  },
  textView:{
    position:'absolute',
    bottom:"0%",
    width:"100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor:Colors.white
  },
})

const ChattingScreen = (props) => {
  let customer = props.route.params.customerName
  let customerId = props.route.params.customerId
  const theme = useTheme();
  const navigation = useNavigation()
  const [fileUri, setFileUri] = useState('');
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0)
  const [messageData, setMessageData] = useState([])
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const {translation} = useTranslation()
  const userId = getLoginUserId()
  const userName = getLoginUserName()
  const getChatDataQuerry = gql`
  query get_chat_detail($sender_id:Int!, $customer_id:Int!) {
    get_chat_detail(
      sender_id: $sender_id
      customer_id:$customer_id
    ){
        message
        time
        attachment_data
        media_serialized
    }
  }
  `

  let chatMutation = gql`
  mutation addChatDetail(
    $sender_name: String,
    $sender_id:Int,
    $customer_name:String,
    $customer_id:Int,
    $message:String,
    $time:String,
    $attachment_data:String,
    $media_serialized:String
    ) {
      addChatDetail(
        sender_name: $sender_name
        sender_id: $sender_id
        customer_name: $customer_name
        customer_id: $customer_id
        message: $message
        time: $time
        attachment_data:$attachment_data
        media_serialized:$media_serialized
      ) {
          time
          message
          attachment_data
      }
    }
  `

  const [
    addChatDetail,
    {
      loading: addChatDetailMutationLoading,
      error: addChatDetailMutationError,
      data: addChatDetailMutationResult,
    },
  ] = useMutation(chatMutation)

  useEffect(() => {
    if (addChatDetailMutationError) {
      addChatDetailMutationError.graphQLErrors.map(({ message }, i) => {
        alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addChatDetailMutationError])

  let [
    getChatData,
    {
      loading: getChatQueryLoading,
      error: getChatQueryError,
      data: getChatQueryResult,
    },
  ] = useLazyQuery(getChatDataQuerry, {
    fetchPolicy: 'network-only',
  })

  async function getChat(){
    try {
      await getChatData({
        variables: {
          sender_id:parseInt(userId),
          customer_id: customerId
        },
      })
    } catch (ex) {
      if (ex.networkError){
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      }
      // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
    }
  }

  useEffect(() => {
    if (getChatQueryError) {
      getChatQueryError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [getChatQueryError])

  async function getData(){
    if(getChatQueryResult && getChatQueryResult.get_chat_detail){
      await setMessageData(getChatQueryResult.get_chat_detail)
    }
  }

  useEffect(()=>{
    getChat()
  },[refresh])
  
  useEffect(()=>{
    getData()
  },[getChatQueryResult])


  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello!",
      user: customer,
      type: "text"
    },
    {
      id: 2,
      text: "Welcome to wareport Chatting!",
      user: customer,
      type: "text"
    },
  ]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFileUri(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Error!
      }
    }
  };

  const handleSendMessage = async() => {
    if(message!=""){
      const currentTime = new Date().toLocaleTimeString();
      try {
        await addChatDetail({
          variables: {
            sender_name: userName,
            sender_id: parseInt(userId),
            customer_name:customer,
            customer_id: customerId,
            message: message,
            time: currentTime,
            attachment_data: fileUri? fileUri:"",
            media_serialized:""
          },
        })
        setMessage("");
        setRefresh(refresh+1)
      } catch (ex) {
        if (ex.networkError){
          setAlertMessage("Check your Internet Connection")
          setAlertVisible(true)
        } 
        //alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
      }
    }
    // setMessages([
    //   ...messages,
    //   {
    //     id: messages.length + 1,
    //     text: message,
    //     user: "You",
    //     type: "text"
    //   }
    // ]);

    }

  return (
    <PaperProvider>
    <SafeAreaView>
      {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
      }
    <ChatScreenHeader goBack={()=>{
      navigation.goBack()
    }} 
    userName={customer}
    />
    
      <ImageBackground
        source={require('../../../assets/background.jpeg')}
        resizeMode="repeat" 
        style={styles.formContainer}>
        <ScrollView  style={{height:"100%"}}>
        <Surface
                  style={{
                    marginTop:70,
                    padding: 8,
                    borderRadius: 10,
                    backgroundColor: theme.colors.primary
                  }}
                >
                  <Text style={{ color: "#fff", alignSelf:'center' }}>Welcome to wareport</Text>
          </Surface>
          {messageData.map((m, index) => (
            <View
              key={index}
              style={{
                alignItems:"flex-end",
                marginVertical: 8,
                marginHorizontal: 16
              }}
            >
              {m.message && (
                <Surface
                  style={{
                    padding: 8,
                    borderRadius: 10,
                    backgroundColor:Colors.green800
                  }}
                >
                  <Text style={{ color: "#fff" }}>{m.message}</Text>
                  <Text style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                      {m.time}
                    </Text>
                </Surface>
              )}
              {m.attachment_data != "" && (
                <Image source={{ uri: m.url }} style={{ width: 200, height: 200 }} />
              )}
              
            </View>
          ))}
          
          </ScrollView>
        </ImageBackground>
        
        <View
          style={styles.textView}
        >
          <IconButton icon="attachment" onPress={pickDocument} color={Colors.black} />
          <TextInput
            placeholder={translation("Type a message Here")}
            value={message}
            onChangeText={setMessage}
            style={{ flex: 1, marginHorizontal: 8, backgroundColor: "#fff", borderRadius: 10 }}
          />
          <IconButton icon="send" onPress={handleSendMessage} color={Colors.black}/>
      </View>

</SafeAreaView>
</PaperProvider>
);
};

export default ChattingScreen;
