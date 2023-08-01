import axios, { Axios } from "axios";
import React, { useState, useEffect } from "react";
import { TextInput, View, FlatList, Text, Avatar, StyleSheet, Dimensions, Image, Button, BackHandler, SafeAreaView } from "react-native";
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
import AlertView from "../../../context/AlertView";
import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import SearchBar from './screenComponents/SearchBar'

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { translation } = useTranslation()
  const navigation = useNavigation()
  const UserId = getLoginUserId()
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [exit, setExit] = useState(false)
  const [images, setImages] = useState([]);
  const getImagesDataQuery = gql`
      query get_search_product {
        get_search_product {
          id
          product_name
          supplier_name
          product_category
          product_type
          media_serialized
        }
      }
  `;

  BackHandler.addEventListener("hardwareBackPress", () => {
    // setAlertMessage("Are you sure you want to Exit App?")
    // setExit(true)
    // setAlertVisible(!alertVisible)
    navigation.goBack()
    return true
  })
  const [getImagesData, { loading: getImagesQueryLoading, error: getImagesQueryError, data: getImagesQueryResult },] = useLazyQuery(getImagesDataQuery, { fetchPolicy: 'network-only' });

  async function getImages() {
    try {
      await getImagesData();
    } catch (ex) {
      if (ex.networkError) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      }
      // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString());
    }
    setImages(images.sort(() => Math.random() - 0.5))
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
          const id = product.id
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

  const handleChange = (value) => {
    setSearchTerm(value);
  };

  const handleSubmit = () => {
    console.log(`Searching for: ${searchTerm}`);
    // Perform the search here and update the searchResults state
  };

  return (
    <SafeAreaView>
      {
        alertVisible && <AlertView title={"WarePort Alert"} message={alertMessage} visible={setAlertVisible} ok={false} exit={exit}></AlertView>
      }

      <SearchBar />
      {
        (UserId == 2514 || UserId == 2515) ? <CustomButton
          onPress={() => {
            navigation.navigate('AddSearchProduct')
          }}
          mode={'contained'}
          textStyle={styles.welcomeCallBtnText}
          style={{marginLeft:10, width:'94.5%'}}
        >
          {translation('Add new Search product')}
        </CustomButton> : <></>
      }
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        renderItem={({ item, index }) => <RandomImage data={images} index={index} />}
        onRefresh={getImages}
        refreshing={false}
        scrollEnabled={true}
        // getItemLayout={(data, index) => ({
        //   length: Dimensions.get('window').width / 3,
        //   offset: Dimensions.get('window').width / 3 * index,
        //   index,
        // })}
        // onEndReached={getImages}
        style={{ marginBottom: 10 }}
      />
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '98%',
    margin: 10
  },
  textInputStyle: {
    flex: 2,
    marginLeft: 10
  },

  welcomeCallBtnText: {
    marginHorizontal: 0,
    fontSize: 12,
    paddingHorizontal: 0,
    height: 14,
    lineHeight: 15,
  },
})

