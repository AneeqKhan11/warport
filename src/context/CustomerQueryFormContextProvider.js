import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { gql, useLazyQuery, useSubscription } from '@apollo/client'
import _ from "lodash";
const CustomerQueryFormContext = React.createContext({
  customerQueryFormData: null,
  customerQueryFormRefresh: null,
  customerQueryFormLoading: true,
})

const CustomerQueryFormContextProvider = ({ children }) => {
  const [customerForms, setCustomerForms] = useState(null)



  const getAllCustomerQueryFormsByUserIdQuery = gql`
    query get_all_customer_query_forms_by_user_id($user_id: ID!) {
      get_all_customer_query_forms_by_user_id(user_id: $user_id) {
        id
        user_id
        company_name
        buyer_name
        contact_no1
        contact_no2
        email
        city
        address
        logo
        }
      }
  `
  let [
    getAllCustomerQueryFormsByUserId,
    {
      loading: getAllCustomerQueryFormsByUserIdQueryLoading,
      error: getAllCustomerQueryFormsByUserIdQueryError,
      data: getAllCustomerQueryFormsByUserIdQueryResult,
    },
  ] = useLazyQuery(getAllCustomerQueryFormsByUserIdQuery, {
    fetchPolicy: 'network-only',
  })

  const customerQueryFormRefresh = async (user_id) => {
    try {
      await getAllCustomerQueryFormsByUserId({
        variables: {
          user_id: user_id,
        },
      })
    } catch (ex) {
      console.log('fetch customer query forms ', ex)
    }
  }
  useEffect(() => {
    if (
      getAllCustomerQueryFormsByUserIdQueryResult &&
      getAllCustomerQueryFormsByUserIdQueryResult.get_all_customer_query_forms_by_user_id
    ) {
      setCustomerForms(
        getAllCustomerQueryFormsByUserIdQueryResult.get_all_customer_query_forms_by_user_id
      )
    }
  }, [getAllCustomerQueryFormsByUserIdQueryResult])

  return (
    <CustomerQueryFormContext.Provider
      value={{
        customerQueryFormData: customerForms,
        customerQueryFormRefresh,
        customerQueryFormLoading: getAllCustomerQueryFormsByUserIdQueryLoading,
      }}
    >
      {children}
    </CustomerQueryFormContext.Provider>
  )
}

export { CustomerQueryFormContext, CustomerQueryFormContextProvider }
