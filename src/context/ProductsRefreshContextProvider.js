import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { gql, useLazyQuery } from '@apollo/client'
const ProductsRefreshContext = React.createContext({
  productsData: null,
  requestProductsRefresh: null,
  productsDataLoading: true,
})

const ProductsRefreshContextProvider = ({ children }) => {
  const [productsData, setProductsData] = useState(null)
  const getProductsByUserIdQuery = gql`
    query get_products_by_user_id($user_id: ID!) {
      get_products_by_user_id(user_id: $user_id) {
        id
        product_color
        category_b_id
        category_c_id
        title
        price1
        price2
        discount_quantity
        discount_price
        description
        user_id
        media_serialized
        stock
        uom
        model_number
        batch_number
        length
        width
        height
      }
    }
  `
  let [
    getProductsByUserId,
    {
      loading: getProductsByUserIdQueryLoading,
      error: getProductsByUserIdQueryError,
      data: getProductsByUserIdQueryResult,
    },
  ] = useLazyQuery(getProductsByUserIdQuery, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (
      getProductsByUserIdQueryResult &&
      getProductsByUserIdQueryResult.get_products_by_user_id
    ) {
      setProductsData(getProductsByUserIdQueryResult.get_products_by_user_id)
    }
  }, [getProductsByUserIdQueryResult])

  const requestProductsRefresh = async (user_id) => {
    try {
      await getProductsByUserId({
        variables: {
          user_id: user_id,
        },
      })
    } catch (ex) {
      console.log('fetch product ', ex)
    }
  }

  return (
    <ProductsRefreshContext.Provider
      value={{
        productsData,
        requestProductsRefresh,
        productsDataLoading: getProductsByUserIdQueryLoading,
      }}
    >
      {children}
    </ProductsRefreshContext.Provider>
  )
}

export { ProductsRefreshContext, ProductsRefreshContextProvider }
