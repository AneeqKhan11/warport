import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
import { gql, useLazyQuery } from '@apollo/client'
const PoRefreshContext = React.createContext({
  PoData: null,
  requestPoRefresh: null,
  PoDataLoading: true,
})

const PoRefreshContextProvider = ({ children }) => {
  const [PoData, setPoData] = useState(null)
  const getPoQuery = gql`
        query getAllPo{
            get_all_po{
            po_number
            description
            status
            }
        }
  `
  let [
    getPo,
    {
      loading: getPoQueryLoading,
      error: getPoQueryError,
      data: getPoQueryResult,
    },
  ] = useLazyQuery(getPoQuery, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (
      getPoQueryResult &&
      getPoQueryResult.get_po
    ) {
      setPoData(getPoQueryResult.get_po)
    }
  }, [getPoQueryResult])

  const requestPoRefresh = async () => {
    try {
      await getPo()
    } catch (ex) {
      console.log('fetch product ', ex)
    }
  }

  return (
    <PoRefreshContext.Provider
      value={{
        PoData,
        requestPoRefresh,
        PoDataLoading: getPoQueryLoading,
      }}
    >
      {children}
    </PoRefreshContext.Provider>
  )
}

export { PoRefreshContext, PoRefreshContextProvider }
