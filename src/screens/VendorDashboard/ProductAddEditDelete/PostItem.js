
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert, Dimensions,StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { gql, useMutation } from '@apollo/client'
import { useTranslation } from '../../../context/Localization';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import AlertView from '../../../context/AlertView';


const styles = StyleSheet.create({
  deleteBtn: {
    position: 'absolute',
    zIndex: 10000,
    left: 30,
    top: 20,
    borderWidth: 1,
    borderColor: '#cd3232',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#ff5353',
    borderRadius: 50,
  },
  editBtn: {
    position: 'absolute',
    zIndex: 10000,
    right: 30,
    top: 20,
    borderWidth: 1,
    borderColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 50,
  },
})
// Create a new component for rendering each post
const PostItem = ({index ,data, user_id}) => {
    const { translation } = useTranslation();
    const { width } = Dimensions.get('window');
    const [showOptions, setShowOptions] = useState(false);
    const navigation = useNavigation()
    const [alertMessage , setAlertMessage] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)

    useEffect(() => {
        if (deleteProductMutationError) {
          for (let i = 0; i < deleteProductMutationError.graphQLErrors.length; i++) {
            const { message } = deleteProductMutationError.graphQLErrors[i];
            alertMessage(message)
            alertVisible(true)
            // alertWithType('error', 'WarePort Error', message);
          }
        }
      }, [deleteProductMutationError]);
      
    
    useEffect(() => {
      if (
        deleteProductMutationResult &&
        deleteProductMutationResult.delete_product
      ) {
        requestProductsRefresh(user_id)
        navigation.goBack()
      }
    }, [deleteProductMutationResult])

    let deleteProductMutation = gql`
    mutation delete_product($product_id: ID!) {
      delete_product(product_id: $product_id) {
        success
        error
      }
    }
  `
  
  const [
    deleteProduct,
    {
      loading: deleteProductMutationLoading,
      error: deleteProductMutationError,
      data: deleteProductMutationResult,
    },
  ] = useMutation(deleteProductMutation)

  let imageArray = data.media_serialized? JSON.parse(data.media_serialized): []
  imageArray = imageArray.map(imageName => "http://159.223.93.212:5433/uploads/" + imageName);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
        
  const onSnapToItem = (index) => {
    setCurrentSlideIndex(index);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Image source={{ uri: item }} style={{ width: '100%', height: 400 }} />
      </View>
    );
  };
  
    const getDeleteEditButtons = (itemData) => {
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddEditProduct', {
                editItemData: itemData,
              })
              setShowOptions(false)
            }}
            style={styles.editBtn}
          >
            <Icon name={'pen'} size={17} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={deleteProductMutationLoading}
            onPress={() => {
              Alert.alert(
                translation('Are your sure?'),
                translation('Are you sure you want to delete this product?'),
                [
                  {
                    text: translation('Yes'),
                    onPress: async () => {
                      try {
                        await deleteProduct({
                          variables: {
                            product_id: itemData.id,
                          },
                        })
                      } catch (ex) {
                        if (ex.networkError){
                          setAlertMessage("Check your Internet Connection")
                          setAlertVisible(true)
                        }
                         // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
                      }
                    },
                  },
  
                  {
                    text: translation('No'),
                  },
                ]
              )
              setShowOptions(false)
            }}
            style={styles.deleteBtn}
          >
            <Icon name={'trash'} size={17} color={'white'} />
          </TouchableOpacity>
        </>
      )
    }
    return (
          <View
            key={index}
            style={{
              paddingBottom: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 0.1,
            }}>
              {showOptions&& getDeleteEditButtons(data)}
              {alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15,
                paddingVertical: 20
              }}>
                
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                
                <Image
                  source={{
                    uri: imageArray[0]
                  }}
                  style={{width: 40, height: 40, borderRadius: 100, resizeMode:'contain'}}
                />
                <View style={{paddingLeft: 5}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft:10,color:'#ca460b'}}>
                    {data.title}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
                <Feather name="more-vertical" style={{fontSize: 20}} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Carousel
                data={imageArray}
                renderItem={renderItem}
                sliderWidth={width} // Specify the width of the carousel (e.g., screen width)
                itemWidth={width} // Specify the width of each item in the carousel
                loop={false} // Disable looping through images
                paginationStyle={{ marginBottom: 10 }} // Style for the pagination dots
                dotStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // Style for the individual pagination dot
                activeDotStyle={{ backgroundColor: '#ffffff' }} // Style for the active pagination dot
                onSnapToItem={onSnapToItem} // Handle current slide index change
              />
              <Pagination
              dotsLength={imageArray.length}
              activeDotIndex={currentSlideIndex}
              containerStyle={{ position: 'absolute', bottom: 0 }}
              dotStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              inactiveDotStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
              inactiveDotOpacity={0.6}
              inactiveDotScale={0.8}
            />
              <View style={{ position: 'absolute', top: 20, right: 20, backgroundColor:"black", borderRadius:10, width:40, alignItems:"center"}}>
                <Text style={{ color: 'white' }}>{`${currentSlideIndex + 1}/${imageArray.length}`}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color:'#c51b36'}}>{translation("Product Description")}</Text>
              </View>
              <TouchableOpacity onPress={()=>{
                navigation.navigate('AddEditProduct', {
                  editItemData: data,
                })
              }}>
                <Feather name="edit" style={{fontSize: 20}} />
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text
                style={{
                  fontSize: 14,
                  paddingVertical: 2,
                }}>
                {data.description}
              </Text>
            </View>
          </View>
          
        );
  };

export default PostItem