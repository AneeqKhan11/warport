import React, { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { getLoginUserId } from '../auth/LocalStorage';

const SalesDataContext = React.createContext({
  salesData: null,
  requestSalesDataRefresh: null,
  salesDataLoading: true,
});

const SalesDataContextProvider = ({ children }) => {
  const [salesData, setSalesData] = useState(null);
  let userId = getLoginUserId()
  const GET_SALES_DATA = gql`
    query get_sales_by_users_id($users_id: Int!) {
      get_sales_by_users_id(users_id: $users_id) {
        product_id
        product_name
        customer_name
        sales_quantity
        users_id
        uom
        sales_price
        createdAt
      }
    }
  `;

  let [
    getSalesData,
    {
      loading: salesDataQueryLoading,
      error: salesDataQueryError,
      data: salesDataResult,
    },
  ] = useLazyQuery(GET_SALES_DATA, {
    fetchPolicy: 'network-only',
  })

  const { loading: salesDataLoading, data: salesDataQueryResult } = useQuery(GET_SALES_DATA, {
    variables: {
      users_id: parseInt(userId),
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (salesDataQueryResult && salesDataQueryResult.get_sales_by_users_id) {
      setSalesData(salesDataQueryResult.get_sales_by_users_id);
    }
    if (salesDataResult && salesDataResult.get_sales_by_users_id) {
      setSalesData(salesDataResult.get_sales_by_users_id);
    }
  }, [salesDataQueryResult, salesDataResult]);

  const requestSalesDataRefresh = async (users_id) => {
    try {
      await getSalesData({
        variables: {
          users_id: parseInt(users_id),
        },
      });
    } catch (ex) {
      console.log('fetch sales data', ex);
    }
  };

  useEffect(() => {
    if (!salesDataLoading && salesData === null) {
      setSalesData(salesDataQueryResult?.get_sales_by_users_id || []);
    }
  }, [salesDataLoading, salesData, salesDataQueryResult]);

  return (
    <SalesDataContext.Provider
      value={{
        salesData,
        requestSalesDataRefresh,
        salesDataLoading,
      }}
    >
      {children}
    </SalesDataContext.Provider>
  );
};

export { SalesDataContext, SalesDataContextProvider };
