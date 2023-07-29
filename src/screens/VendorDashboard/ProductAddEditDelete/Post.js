import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useContext, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, StatusBar, BackHandler, Modal, StyleSheet, Alert, Dimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { gql, useMutation } from '@apollo/client'
import { useTranslation } from '../../../context/Localization';
import { ProductsRefreshContext } from '../../../context/ProductsRefreshContextProvider';
import { connect } from 'react-redux'
import SearchBar from '../Search/screenComponents/SearchBar';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import PostItem from './PostItem';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 80,
  },
  listItem: {},
  noProductText: {},
  addProductBtn: {
    width: 110,
  },
  addProductBtnText: {
    marginHorizontal: 0,
    fontSize: 12,
    paddingHorizontal: 0,
    height: 20,
    lineHeight: 20,
  },
  productAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
  },
  listItemProductTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productInfoContainer: {
    padding: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  pricesContainer: { flexDirection: 'row', alignItems: 'center' },
  productDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginTop: 5,
  },
  discountQuantity: {
    marginTop: 5,
    fontSize: 14,
  },
  deleteBtn: {
    position: 'absolute',
    zIndex: 10000,
    left: 30,
    top: 100,
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
    top: 100,
    borderWidth: 1,
    borderColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 50,
  },
  itemDivider: { marginVertical: 8 },
  itemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})



const Post = (props) => {

  const navigation = useNavigation()
  const id = props.route.params.id;

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack();
    return true;
  });

  const { productsData, requestProductsRefresh, productsDataLoading } =
  useContext(ProductsRefreshContext)

  useEffect(() => {
    requestProductsRefresh(props.userAuthData.id)
  }, [])

  const [postInfo, setPostInfo] = useState(moveProductToStart(productsData, id));


function moveProductToStart(products, id) {
    const productToMove = products.find(product => product.id === id);
    if (productToMove) {
      const filteredProducts = products.filter(product => product.id !== id);
      return [productToMove, ...filteredProducts];
    }
    return products;
  } 
  const handleSearch = (searchQuery) => {
    if (searchQuery === '') {
      setPostInfo(moveProductToStart(productsData, id));
    } else {
      const filtered = postInfo.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPostInfo(filtered)
    };
  }
  
  return (
    <ScrollView>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SearchBar onSearch={handleSearch}/>
      {postInfo.map((data, index) => {
       return <PostItem key={index} index={index} data={data} user_id={props.userAuthData.id}/>
      })}
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    ...state.UserAuthDataReducer,
  }
}

export default connect(mapStateToProps)(Post)


  
      {/* <Modal visible={showOptions} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={() => setShowOptions(false)}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              position:'absolute',
              top:"3%",
              right:"5%"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // Handle edit option
                navigation.navigate('AddEditProduct', {
                  editItemData: postInfo[0],
                })
                setShowOptions(false);
              }}
              style={{ marginBottom: 10 }}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // Handle delete option
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
                          if (ex.networkError)
                            alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
                        }
                      },
                    },
    
                    {
                      text: translation('No'),
                    },
                  ]
                )
                setShowOptions(false);
              }}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal> */}