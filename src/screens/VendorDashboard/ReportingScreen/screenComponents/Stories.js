import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const Stories = (props) => {
  const navigation = useNavigation();
  let productData = props.data;
  let logo = props.logo;
  const newProduct = {
    id: 1,
    title: 'Add Product',
    image: logo,
  };

  if (!productData) {
    productData = [];
  }

  const updatedProductData = [newProduct, ...productData];

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingVertical: 30 }}
    >
      {updatedProductData.map((data, index) => {
        let imageArray = data.media_serialized ? JSON.parse(data.media_serialized) : [];
        const imageSource =
          data.id === 1 ? { uri: logo } : { uri: 'http://159.223.93.212:5433/uploads/' + imageArray[0] };
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (data.id === 1) {
                navigation.navigate('AddEditProduct', {
                  addInCustomerQueryFormProductDetailsAdded: true,
                });
              } else {
                navigation.push('Post', {
                  name: data.title,
                  id: data.id,
                  description: data.product_description,
                  productData: productData,
                });
              }
            }}
          >
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 8,
                position: 'relative',
              }}
            >
              {data.id === 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 10,
                    zIndex: 1,
                  }}
                >
                  <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#405de6',
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                  />
                </View>
              ) : null}

              {index < 10 ? (
                <View>
                  <View
                    style={{
                      width: 68,
                      height: 68,
                      backgroundColor: 'white',
                      borderWidth: 1.8,
                      borderRadius: 100,
                      borderColor: data.product_color ? data.product_color : 'blue',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={imageSource}
                      style={{
                        resizeMode: 'contain',
                        width: '92%',
                        height: '92%',
                        borderRadius: 100,
                        backgroundColor: data.product_color ? data.product_color : 'orange',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 10,
                      opacity: data.id === 1 ? 1 : 0.5,
                    }}
                  >
                    {data.title}
                  </Text>
                </View>
              ) : index === 11 ? (
                <TouchableOpacity
                  onPress={() => {
                    // Handle "View More" button press
                    navigation.push('Post', {
                      name: data.title,
                      id: data.id,
                      description: data.product_description,
                      productData: productData,
                    });
                  }}
                >
                  <View
                    style={{
                      width: 68,
                      height: 68,
                      backgroundColor: 'white',
                      borderWidth: 1.8,
                      borderRadius: 100,
                      borderColor: data.product_color ? data.product_color : 'blue',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={require("../../../../../assets/ViewMore.png")}
                      style={{
                        resizeMode: 'contain',
                        width: '92%',
                        height: '92%',
                        borderRadius: 100,
                        backgroundColor: data.product_color ? data.product_color : 'orange',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Stories;
