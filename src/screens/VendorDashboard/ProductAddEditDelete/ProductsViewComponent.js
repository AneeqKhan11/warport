import React, { useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native'
import { Modal, Text, Divider } from 'react-native-paper'
import _ from 'lodash'
import { connect } from 'react-redux'
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider'
import { gql, useMutation } from '@apollo/client'
import { ProductsRefreshContext } from '../../../context/ProductsRefreshContextProvider'
import ProductsSlider2 from '../../../components/ProductsSlider2'
import config from '../../../../config.json'
import Button from '../../../components/Button'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTranslation } from '../../../context/Localization'
import { useNavigation } from '@react-navigation/native'
import BackButtonWithTitleAndComponent from '../../../components/BackButtonWithTitleAndComponent'
import Flag from 'react-native-flags'
import LogoDashboard from '../../../components/LogoDashboard'
import ButtonWithBadge from '../../../components/ButtonWithBadge'
import { ScrollView } from 'react-native-gesture-handler'
import AlertView from '../../../context/AlertView'

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
  itemDivider: { marginVertical: 8 },
  itemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
})

function ProductsViewComponent(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const navigation = useNavigation()
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  BackHandler.addEventListener("hardwareBackPress", ()=>{
    navigation.goBack()
    return true
  })

  const { productsData, requestProductsRefresh, productsDataLoading } =
    useContext(ProductsRefreshContext)

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

  useEffect(() => {
    if (deleteProductMutationError) {
      deleteProductMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [deleteProductMutationError])

  useEffect(() => {
    if (
      deleteProductMutationResult &&
      deleteProductMutationResult.delete_product
    ) {
      requestProductsRefresh(props.userAuthData.id)
    }
  }, [deleteProductMutationResult])

  useEffect(() => {
    requestProductsRefresh(props.userAuthData.id)
  }, [])
  const addProductButton = () => {
    return (
      <Button
        textStyle={styles.addProductBtnText}
        style={styles.addProductBtn}
        mode={'outlined'}
        onPress={() => {
          props.navigation.navigate('AddEditProduct')
        }}
      >
        {translation('Add Product')}
      </Button>
    )
  }
  const getDeleteEditButtons = (itemData) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('AddEditProduct', {
              editItemData: itemData,
            })
            requestProductsRefresh(props.userAuthData.id)
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
          }}
          style={styles.deleteBtn}
        >
          <Icon name={'trash'} size={17} color={'white'} />
        </TouchableOpacity>
      </>
    )
  }
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
      }
    <BackButtonWithTitleAndComponent
            goBack={() => {
              props.navigation.goBack()
            }}
            // title="PO Life Cycle"
          >
                <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Flag
                      code={translation("PK")}
                      size={24}
                      style={styles.userFlag}
                    />
                    <LogoDashboard />
                  </View>
                  <ButtonWithBadge
                    iconStyle={styles.chatBtnIcon}
                    badgeValue={false}
                    iconName={'comment-dots'}
                    buttonStyle={styles.chatBtn}
                  />
          </BackButtonWithTitleAndComponent>
    <View style={styles.container}>
      {productsData?.length == 0 ? (
        <View style={styles.productAddContainer}>
          <Text style={styles.noProductText}>
            {translation('No products added yet.')}
          </Text>
          {addProductButton()}
        </View>
      ) : (
        <>
          <View style={styles.productAddContainer}>
            <Text>
              {productsData
                ? productsData.length +
                (productsData.length > 1
                  ? ` ${translation('products are found')}`
                  : ` ${translation('product is found')}`)
                : translation('Loading...')}
            </Text>
            {addProductButton()}
          </View>
          <FlatList
            data={productsData}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
              <View key={item.id}>
                {getDeleteEditButtons(item)}
                <ProductsSlider2
                  imagesArray={_.map(
                    JSON.parse(item.media_serialized),
                    (item) =>
                      "http://159.223.93.212:5433/uploads" +
                      '/' +
                      item
                  )}
                  
                />
                <View style={styles.productInfoContainer}>
                  <View style={styles.itemHeaderContainer}>
                    <Text style={styles.listItemProductTitle}>
                      {item.title}
                    </Text>
                    <View style={styles.pricesContainer}>
                      <Text
                        style={[
                          styles.productPrice,
                          (parseInt(item.discount_price) || 0) != 0
                            ? {
                              fontSize: 10,
                              textDecorationLine: 'line-through',
                              color: 'gray',
                              marginRight: 4,
                              marginTop: -5,
                            }
                            : null,
                        ]}
                      >
                        Rs.{item.price}
                      </Text>
                      {(parseInt(item.discount_price) || 0) != 0 && (
                        <Text>
                          Rs.
                          {item.price -
                            (item.price * item.discount_price) / 100}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={styles.productDescription}>
                      {item.description}
                    </Text>
                    {(parseInt(item.discount_price) || 0) != 0 && (
                      <Text style={styles.discountQuantity}>
                        {`Discount apply on Qty >= ${item.discount_quantity}`}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            )}
            refreshing={productsDataLoading}
            onRefresh={() => {
              requestProductsRefresh(props.userAuthData.id)
            }}
            onEndReached={() => {
              // setResults(5)
              // setPage(page + 1)
            }}
            ItemSeparatorComponent={() => (
              <Divider style={styles.itemDivider} />
            )}
          //  ListFooterComponent={() => (loading ? ListFooterComponent : null)}
          />
        </>
      )}
    </View>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
  return { ...state.AddEditProductReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, null)(ProductsViewComponent)
