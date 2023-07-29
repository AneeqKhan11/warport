import React, { useEffect, useContext, useRef } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native'
import {
  RadioButton,
  Text,
  TextInput as Input,
  Button,
} from 'react-native-paper'
import { connect } from 'react-redux'
import {
    setListOneProductDetailsAdded,
    setListOneProductDetailsData,
    setListOneProductAddProductModalSearch,
    setListOneProductAddProductModalToggle,
} from '../../store/actions/ListOneProductFormActions'
import config from '../../../config.json'
import { gql, useMutation } from '@apollo/client'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../context/Localization'
import { ProductsRefreshContext } from '../../context/ProductsRefreshContextProvider'
import TextInput from '../../components/TextInput'
import Fuse from 'fuse.js'
import _ from 'lodash'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 4,
  },
  formFieldContainer: {
    paddingVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formFieldTitle: {
    fontSize: 17,
  },
  addProductButtonText: {
    padding: 0,
    fontSize: 11,
    height: 17,
    marginHorizontal: 0,
  },
  addProductButtonContent: {
    height: 23,
    paddingHorizontal: 5,
  },
  productItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#c5c5c5',
    borderTopWidth: 1,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: '#cd3232',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#ff5353',
    borderRadius: 50,
  },

  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noProductFoundText: {
    padding: 10,
    color: '#8f8f8f',
    borderTopColor: '#c5c5c5',
    borderColor: '#c5c5c5',
    borderTopWidth: 1,
  },
  modalInnerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalProductCloseButton: {
    marginHorizontal: 20,
  },
  modalProductSearchInputContainerStyle: {
    width: 'auto',
    flex: 1,
  },
  modalProductSearchInput: {
    backgroundColor: 'white',
    borderRadius: 0,
  },
  productImage: {
    borderColor: 'transparent',
    height: 40,
    width: 70,
    borderRadius: 4,
  },
  listProductItemText: {
    fontSize: 18,
    marginLeft: 10,
    marginBottom: 6,
  },
  listProductItemsContainer: {
    padding: 10,
    borderColor: '#c3c3c3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productList: {
    borderTopWidth: 1,
    borderTopColor: '#c3c3c3',
  },
  modalProductAddInInventoryText: {
    marginHorizontal: 10,
    marginBottom: 8,
    color: '#0969da',
  },
})

function ListOneProduct(props) {
    const { translation } = useTranslation()
    const { alertWithType } = useDropdownAlert()
    const id = props.id
    const productItemHeight = 20
  
    const flatListRef = useRef(null)
    const onScrollToIndexFailed = (_info) => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd()
      }
    }
    const { productsData, requestProductsRefresh, productsDataLoading } =
      useContext(ProductsRefreshContext)

    useEffect(() => {
    let productsDataFiltered = _.filter(productsData, (item) => {
        const findFromAddedProduct = _.find(
        props.ListOneProductDetailsAdded,
        (itemAdded) => itemAdded.id == item.id
        )

        if (!findFromAddedProduct) {
        return item
        }
    })

    if (props.ListOneProductAddProductModalSearch != '') {
        productsDataFiltered = _.filter(productsDataFiltered, (item) => {
        if (
            item.title
            .toLowerCase()
            .includes(
                props.ListOneProductAddProductModalSearch.toLowerCase()
            )
        )
            return item
        })
    }
    setListOneProductDetailsAdded(productsDataFiltered)
    }, [
    productsData,
    props.ListOneProductDetailsAdded,
    props.ListOneProductAddProductModalSearch,
    ])

    return (
        <View style={styles.mainContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.formFieldContainer}>
              <Text style={styles.formFieldTitle}>
                { id? translation('Select One Product'):translation('List of Products')}
              </Text>
              <Button
                onPress={() => {
                  props.setListOneProductAddProductModalToggle(true)
                }}
                contentStyle={styles.addProductButtonContent}
                labelStyle={styles.addProductButtonText}
              >
                {translation('Add Product')}
              </Button>
            </View>
            {props.ListOneProductDetailsAdded.length == 0 ? (
              <Text style={styles.noProductFoundText}>
                {' '}
                {translation('No product added yet.')}
              </Text>
            ) : (
              <View style={styles.productItemContainer}>
                {
                
                 props.ListOneProductDetailsAdded.map((item) => {
                  const imageSrc = JSON.parse(item.media_serialized)[0]
                  return (
                    <View style={styles.productItemContainer} key={item.id}>
                      <View style={styles.productItem}>
                        <Image
                          resizeMode={'cover'}
                          style={styles.productImage}
                          source={{
                            uri:
                              "http://159.223.93.212:5433/uploads"+
                              '/' +
                              imageSrc,
                          }}
                        />
                        <Text style={styles.listProductItemText}>{item.title}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          _.remove(
                            props.ListOneProductDetailsAdded,
                            (itemRemove) => itemRemove.id == item.id
                          )
                          props.setListOneProductDetailsAdded(
                            _.cloneDeep(props.ListOneProductDetailsAdded)
                          )
                        }}
                        style={styles.deleteBtn}
                      >
                        <Icon name={'trash'} size={17} color={'white'} />
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            )}
          </View>
          <Modal
            presentationStyle="overFullScreen"
            animationType="slide"
            statusBarTranslucent={false}
            visible={props.ListOneProductAddProductModalToggle}
            dismissable={false}
            transparent={false}
          >
            <View style={styles.modalInnerContainer}>
              <View style={styles.modalHeaderContainer}>
                <TextInput
                  theme={{ roundness: 0 }}
                  autoCorrect={false}
                  placeholder={translation('Search Product')}
                  containerStyle={styles.modalProductSearchInputContainerStyle}
                  style={styles.modalProductSearchInput}
                  value={props.ListOneProductAddProductModalSearch}
                  onChangeText={(text) =>
                    props.setListOneProductAddProductModalSearch(text)
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    props.setListOneProductAddProductModalToggle(false)
                    props.setListOneProductAddProductModalSearch('')
                  }}
                  style={styles.modalProductCloseButton}
                >
                  <Icon name={'close'} size={30} color={'gray'} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.setListOneProductAddProductModalToggle(false)
    
                  props.navigation.navigate('AddEditProduct', {
                    addInCustomerQueryFormProductDetailsAdded: true,
                  })
                }}
              >
                <Text style={styles.modalProductAddInInventoryText}>
                  {translation('Add product in inventory')}
                </Text>
              </TouchableOpacity>
              <FlatList
                onScrollToIndexFailed={onScrollToIndexFailed}
                ref={flatListRef}
                style={styles.productList}
                testID="list-products"
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={1}
                getItemLayout={(_data, index) => ({
                  length: productItemHeight,
                  offset: productItemHeight * index,
                  index,
                })}
                renderItem={({ item, index }) => {
                  const imageSrc = JSON.parse(item.media_serialized)[0]
    
                  return (
                    <View style={styles.listProductItemsContainer}>
                      <View style={styles.listProductItem}>
                        <Image
                          resizeMode={'cover'}
                          style={styles.productImage}
                          source={{
                            uri:
                            "http://159.223.93.212:5433/uploads"+
                            '/' +
                              imageSrc,
                          }}
                        />
                        <Text style={styles.listProductItemText}>{item.title}</Text>
                      </View>
                      <Button
                        onPress={() => {
                          props.ListOneProductDetailsAdded.splice(0,0,item)
                          props.setListOneProductDetailsAdded(
                            _.cloneDeep(props.ListOneProductDetailsAdded)
                          )
                        }}
                      >
                        {translation('Add')}
                      </Button>
                    </View>
                  )
                }}
                data={props.ListOneProductDetailsAdded}
              />
            </View>
          </Modal>
        </View>
      )
    }
    const mapStateToProps = (state) => {
      return { ...state.ListOneProductFormReducer }
    }
    export default connect(mapStateToProps, {
        setListOneProductDetailsAdded,
        setListOneProductDetailsData,
        setListOneProductAddProductModalSearch,
        setListOneProductAddProductModalToggle,
    })(ListOneProduct)

