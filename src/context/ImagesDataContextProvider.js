import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const ImagesDataContext = React.createContext({
  imagesData: null,
  requestImagesDataRefresh: null,
  imagesDataLoading: true,
});

const ImagesDataContextProvider = ({ children }) => {
  const [imagesData, setImagesData] = useState(null);

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

  let [
    getImagesData,
    {
      loading: getImagesQueryLoading,
      error: getImagesQueryError,
      data: getImagesQueryResult,
    },
  ] = useLazyQuery(getImagesDataQuery, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (getImagesQueryResult && getImagesQueryResult.get_search_product) {
      const images = [];
      getImagesQueryResult.get_search_product.forEach((product) => {
            images.push({
              id: product.id,
              product_name: product.product_name,
              supplier_name: product.supplier_name,
              product_category: product.product_category,
              product_type: product.product_type,
              media_serialized: product.media_serialized
            });
          });
      setImagesData(images);
    }
  }, [getImagesQueryResult]);

  const requestImagesDataRefresh = async () => {
    try {
      await getImagesData();
    } catch (ex) {
      console.log('fetch images data', ex);
    }
  };

  return (
    <ImagesDataContext.Provider
      value={{
        imagesData,
        requestImagesDataRefresh,
        imagesDataLoading: getImagesQueryLoading,
      }}
    >
      {children}
    </ImagesDataContext.Provider>
  );
};

export { ImagesDataContext, ImagesDataContextProvider };
