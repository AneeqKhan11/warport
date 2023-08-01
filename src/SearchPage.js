import axios, { Axios } from "axios";
import React, { useState, useEffect } from "react";
import { TextInput, View, FlatList, Text, Avatar, StyleSheet, Dimensions, Image, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar as AvatarPaper, Colors } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome'
import { getLoginUserId } from "../../../auth/LocalStorage";
import { useTranslation } from "../../../context/Localization";
import { theme } from "../../../core/theme";
import CustomButton from '../../../components/Button'
import { useNavigation } from "@react-navigation/native";
import BackButtonWithTitleAndComponent from "../../../components/BackButtonWithTitleAndComponent";
import RandomImage from "./RandomImage";
import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import AlertView from "./context/AlertView";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [alertMessage,setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const alertVisibility =(state)=>{
    setAlertVisible(state)
  }
  const { translation } = useTranslation()
  const navigation = useNavigation()
  const UserId = getLoginUserId()
  const [images, setImages] = useState([]);
  const getImagesDataQuery = gql`
    query get_search_product {
      get_search_product {
        product_category
        media_serialized
      }
    }
  `;
  
  const [  getImagesData,  { loading: getImagesQueryLoading, error: getImagesQueryError, data: getImagesQueryResult },] = useLazyQuery(getImagesDataQuery, { fetchPolicy: 'network-only' });
  
  async function getImages() {
    try {
      await getImagesData();
    } catch (ex) {
      setAlertMessage("Check your Internet Connection")
      setAlertVisible(true)
      // if (ex.networkError) alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString());
    }
  }
  
  useEffect(() => {
    if (getImagesQueryError) {
      getImagesQueryError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message);
      });
    }
    if (getImagesQueryResult && getImagesQueryResult.get_search_product) {
      getImagesQueryResult.get_search_product.map((product) => {
        if (product.media_serialized && product.media_serialized.length !== 0) {
          const images = JSON.parse(product.media_serialized);
          images.forEach((element) => {
            setImages((old) => [...old, element]);
          });
        }
        
      });
    }
    
  }, [getImagesQueryError, getImagesQueryResult]);
  
  useEffect(() => {
    getImages()
    
  }, []);

  // const RandomImage = ({ data }) => {
  //   return (
  //     <View style={styles.imageContainer}>
  //       {data.type === 'image' && (
  //         <Image style={styles.image} source={{ uri: data.uri }} />
  //       )}
  //       {data.type === 'gif' && (
  //         <WebView style={styles.gif} source={{ uri: data.uri }} />
  //       )}
  //     </View>
  //   );
  // };

  const handleChange = (value) => {
    setSearchTerm(value);
  };

  const handleSubmit = () => {
    // Perform the search here and update the searchResults state
    setSearchResults([
      { id: 1, name: "User 1", username: "user1" },
      { id: 2, name: "User 2", username: "user2" },
      { id: 3, name: "User 3", username: "user3" },
    ]);
  };

  return (
    <ScrollView>
      {
        alertVisible && <AlertView ok={true} message={alertMessage} visible={alertVisibility}></AlertView>
      }
      <View style={styles.container}>
            <Icon name="search" size={20} style={{paddingRight:5, paddingLeft:10}}/>
            <TextInput style={styles.textInputStyle}
             placeholder="Search"
             value={searchTerm}
             onChangeText={handleChange}
             onSubmitEditing={handleSubmit}
            >
            </TextInput>
        </View>
        {/* <Text style={styles.comingSoonText}>{translation('Coming Soon')}</Text> */}
        {
        //   (UserId==2514 || UserId==2515) ?<CustomButton
        //   onPress={() => {
        //     navigation.navigate('AddSearchProduct')
        //   }}
        //   mode={'contained'}
        //   textStyle={styles.welcomeCallBtnText}
        //   style={styles.welcomeCallBtn}
        // >
        //   {translation('Add new Search product')}
        // </CustomButton>:<></>
        }
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => <RandomImage data={item} />}
          onRefresh={getImages}
          refreshing={false}
        />
         <View style={styles.MainImageView}>
          <View style={styles.fourImageView}>
            <View style={styles.twoImageView}>
              <Image style={[styles.imageStyle]} 
              source={require('../../../../assets/1.jpeg')}
              ></Image>
              <Image style={styles.imageStyle} 
              source={require('../../../../assets/2.jpeg')}
              ></Image>
            </View>
            <View style={styles.twoImageView}>
              <Image style={[styles.imageStyle]} 
              source={require('../../../../assets/3.jpeg')}
              ></Image>
              <Image style={styles.imageStyle} 
              source={require('../../../../assets/4.jpeg')}
              ></Image>
            </View>
          </View>
          <View style={styles.largeImage}>
            <Image style={styles.imageStyle1} 
            source={require('../../../../assets/5.jpeg')}
            ></Image>
          </View>
          </View>
          <View style={styles.MainImageView}>
          <View style={styles.largeImage}>
            <Image style={styles.imageStyle1} 
            source={require('../../../../assets/6.jpeg')}
            ></Image>
          </View>
          <View style={styles.fourImageView}>
            <View style={styles.twoImageView}>
              <Image style={[styles.imageStyle]} 
              source={require('../../../../assets/7.jpeg')}
              ></Image>
              <Image style={styles.imageStyle} 
              source={require('../../../../assets/8.jpeg')}
              ></Image>
            </View>
            <View style={styles.twoImageView}>
              <Image style={[styles.imageStyle]} 
              source={require('../../../../assets/9.jpeg')}
              ></Image>
              <Image style={styles.imageStyle} 
              source={require('../../../../assets/10.jpeg')}
              ></Image>
            </View>
          </View>
          </View>
          <View style={styles.MainImageView}>
          <View style={styles.fourImageView}>
            <View style={styles.twoImageView}>
              <Image style={[styles.imageStyle]} 
              source={require('../../../../assets/11.jpeg')}
              ></Image>
              <Image style={styles.imageStyle} 
              source={require('../../../../assets/12.jpeg')}
              ></Image>
            </View>
            <View style={styles.twoImageView}>
              <Image style={[styles.imageStyle]} 
              source={require('../../../../assets/7.jpeg')}
              ></Image>
              <Image style={styles.imageStyle} 
              source={require('../../../../assets/8.jpeg')}
              ></Image>
            </View>
          </View>
          <View style={styles.largeImage}>
            <Image style={styles.imageStyle1} 
            source={require('../../../../assets/2.jpeg')}
            ></Image>
          </View>
          </View>
    </ScrollView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container:{
      flex:1,
      flexDirection:'row',
      alignItems:'flex-start',
      width:'98%',
      margin:10
  },
  containers:{
      flexDirection:'row',
      alignItems:'flex-start',
      width:'98%',
      margin:10,
  },
  boxStyle:{
      padding:10,
      marginLeft:10
  },
  textInputStyle:{
      flex:2,
      marginLeft:10
  },
  imageStyle:{
    flexGrow:1,
    resizeMode:'contain',
    borderColor:Colors.white,
    borderWidth:2,
    borderRadius:2,
  },
  imageStyle1:{
    resizeMode:'contain',
    borderColor:Colors.white,
    borderWidth:2,
    borderRadius:2,
    flexGrow:1,
    width:"100%"
  },
  MainImageView:{
    flexDirection:'row',
    width:"100%"
  },
  fourImageView:{
    flex:2,
  },
  twoImageView:{
    flexDirection:'row'
  },
  largeImage:{
    flex:1,
    flexGrow:1,
  },
  comingSoonText:{
    position:'absolute',
    top:"35%",
    left:"30%",
    fontSize:25,
    color:theme.colors.primary,
    zIndex:1,
    width:200,
    height:100
  },
  welcomeCallBtnText: {
    marginHorizontal: 0,
    fontSize: 12,
    paddingHorizontal: 0,
    height: 14,
    lineHeight: 15,
  },
  imageContainer: {
    flex: 1,
    margin: 2,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  gif: {
    flex: 1,
    aspectRatio: 1,
  },
})

