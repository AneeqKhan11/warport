import React, { useEffect, useContext } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {  Text, Divider, Colors } from 'react-native-paper'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider'
import { ProductsRefreshContext } from '../../../context/ProductsRefreshContextProvider'
import { useTranslation } from '../../../context/Localization'
import { useNavigation } from '@react-navigation/native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: '52%',
    backgroundColor: 'white',
    padding: 5,
    borderTopRightRadius: 10,
    borderTopWidth: 1,

    borderBottomWidth: 1,

    borderRightWidth: 1,
    borderColor: '#c3c3c3',
  },
  productItemContainer: {
    flexDirection: 'row',
  },
  productItem: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 5,
  },
  productItemText: {
    fontSize: 12,
    fontWeight: '900',
  },
})

function ReportingScreenProductsByColor(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const navigation = useNavigation()
  const userId = getLoginUserId()
  const { productsData, requestProductsRefresh, productsDataLoading } =
    useContext(ProductsRefreshContext)

  useEffect(() => {
      requestProductsRefresh(userId)
  }, [])
  
  return (
    <View style={styles.container}>
     
      {productsData?.length > 0 &&
        productsData.slice(0,3).map((product) => {
          {
        
            return (
     
                <View style={styles.productItemContainer}>
                  <View
                    style={[
                      { backgroundColor: product.product_color },
                      styles.productItem,
                    ]}
                  >
                    {!product.product_color && (
                      <Icon name={'ban'} size={22} color={'gray'} />
                    )}
                  </View>
                  <Text style={styles.productItemText}>
                    {product.title.toUpperCase()}
                  </Text>
                </View>

            )
          }
        })
        }
        {
          productsData?.length>3 ? (
            <TouchableOpacity
            onPress={()=>{navigation.navigate('ProductsViewComponent', {
            })}}
          >
          <View style={styles.productItemContainer}>
            
              <View
                      style={[
                        { backgroundColor: Colors.blue700 },
                        styles.productItem,
                      ]}
                    >
                    </View>
                    <Text style={styles.productItemText}>
                      View more
                    </Text>
          
                  
        </View>
        </TouchableOpacity>
          ): <View></View>
        }

      <TouchableOpacity
                  onPress={()=>{navigation.navigate('AddEditProduct', {
                    addInCustomerQueryFormProductDetailsAdded: true,
                  })}}
                >
         <View style={styles.productItemContainer}>
          
             <View
                    style={[
                      { backgroundColor: Colors.blue700 },
                      styles.productItem,
                    ]}
                  >
                  </View>
                  <Text style={styles.productItemText}>
                    Add Product
                  </Text>
         
                 
      </View>
      </TouchableOpacity>
    </View>
  )
}
const mapStateToProps = (state) => {
  return { ...state.AddEditProductReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, null)(ReportingScreenProductsByColor)
