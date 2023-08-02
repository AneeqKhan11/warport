import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, BackHandler } from 'react-native';
import { DataTable, Searchbar } from 'react-native-paper';
import { Colors } from 'react-native-paper';
import { getLoginUserId } from '../../../../auth/LocalStorage';
import SpinnerOverlay from '../../../../components/SpinnerOverlay'
import { useTranslation } from '../../../../context/Localization';
import { SalesDataContext } from '../../../../context/SalesDataContextProvider';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  scrollViewMain: {
    flex: 1,
  },
  labelStyle: {
    alignSelf: 'center',
    marginLeft: -10,
    fontSize: 14,
  },
  noOfContainer: {
    width: 100,
  },
  rowContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'center'
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
  },
  tableStyle: {
    borderWidth: 1,
    marginTop: 20,
    overflow: "scroll"
  },
  rowStyle: {
    backgroundColor: Colors.cyanA700,
    fontSize: 14,
    fontWeight: 'bold'
  },
  rowTextStyle: {
    textAlign: 'center'
  },
  headerStyle: {
    backgroundColor: '#25354f',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    height: 45,
    margin: 2,
    marginBottom: 0,
    zIndex: -1,
    width: '98%'
  },
  headerTitle: {
    height: 100,
  },
  headerText: {
    color: Colors.white,
  },
  tableHeaderText: {
    color: Colors.white,
    fontSize: 10,
    paddingRight: 50
  },
  textStyle: {
    fontSize: 10,
    height: 41,
    width: 60,
    // textAlign: "left",
    // marginTop: -5
  },
  priceStyle: {
    marginLeft: 2
  },
  tableRowStyle: {
    // backgroundColor: 'red',
    zIndex: -1,
    width: '98%',
  },
  cellStyle: {
    width: 60,
    borderRightColor: Colors.white,
    borderRightWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    flex: 2,
  },
  firstCell: {
    width: 60,

    // backgroundColor: 'yellow'
    // borderRightColor: Colors.white,
    // borderRightWidth: 1,
    // borderBottomColor: Colors.white,
    // borderBottomWidth: 1,
    // marginLeft: -15,
    // justifyContent: 'center'
  },
  lastCell: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    width: 50
    // justifyContent: 'center',
  }
})

function SalesTable(props) {
  const [data, setData] = useState(props.Data)
  let showSearch = props.showSearch
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('');
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [sort, setSort] = useState({ index: 0, direction: 'ascending' });
  const userId = getLoginUserId()
  const [totalSalesQuantity, setTotalSalesQuantity] = useState(0);
  const [totalSalesPrice, setTotalSalesPrice] = useState(0);
  const [loading, setLoading] = useState(true)
  const { translation } = useTranslation()
  const { salesData, requestSalesDataRefresh, salesDataLoading } = useContext(SalesDataContext)
  BackHandler.addEventListener('hardwareBackPress', () => {
    3
    navigation.goBack()
    return true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        let userId1 = getLoginUserId()
        await requestSalesDataRefresh(userId1);
        setLoading(false);
      } catch (error) {
        // Handle any errors that occurred during data fetching
        console.error(error);
      }
    };
    fetchData()
  }, [props.refreshTable, props.refresh])

  useEffect(() => {
    requestSalesDataRefresh(userId)
    setLoading(false)
  }, [props.refreshTable, props.refresh])

  useEffect(() => {
    setData(salesData)
    console.log(salesData)
  }, [salesData])

  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = data.filter((item) => item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        || item.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
        || item.sales_quantity.toLowerCase().includes(searchQuery.toLowerCase())
        || item.sales_price.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filteredData);
    } else {
      requestSalesDataRefresh(userId)
      setData(salesData)
    }
  }, [searchQuery])

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  // Calculate total sales quantity and price
  useEffect(() => {
    let totalQuantity = 0;
    let totalPrice = 0;
    {
      data &&
        data.forEach((item) => {
          totalQuantity += parseInt(item.sales_quantity);
          totalPrice += parseInt(item.sales_price * item.sales_quantity);
        });
    }

    setTotalSalesQuantity(totalQuantity);
    setTotalSalesPrice(totalPrice);
  }, [data]);

  const handleSort = (index) => {
    const direction =
      sort.index === index && sort.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    setSort({ index, direction });
    setData(
      data.sort((a, b) => {
        if (a[Object.keys(a)[index]] > b[Object.keys(b)[index]]) {
          return direction === 'ascending' ? 1 : -1;
        }
        if (a[Object.keys(a)[index]] < b[Object.keys(b)[index]]) {
          return direction === 'ascending' ? -1 : 1;
        }
        return 0;
      })
    );
  };

  return (
    <View>
      <SpinnerOverlay
        visible={loading}
        textContent={translation('Loading...')}
        textStyle={styles.spinnerTextStyle}
      />
      {
        showSearch ? <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        /> : <></>
      }
      <View style={{
        maxWidth: 370,
        paddingHorizontal: 10
      }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <DataTable style={{ minWidth: 700 }}>
            <DataTable.Header style={{
              height: 50,
              backgroundColor: '#25354f'
            }}>
              <DataTable.Title
                style={{
                  width: 50
                }}
                onPress={() => handleSort(0)} ><Text style={styles.headerText}> S.no</Text></DataTable.Title>
              <DataTable.Title
                style={{
                  width: 50
                }}
                onPress={() => handleSort(0)} ><Text style={styles.headerText}>Date</Text></DataTable.Title>
              <DataTable.Title
                style={{
                  width: 50
                }}
                onPress={() => handleSort(1)} ><Text style={styles.headerText}>Product</Text></DataTable.Title>
              <DataTable.Title
                style={{
                  width: 50
                }}
                onPress={() => handleSort(2)} numberOfLines={2}><Text style={styles.headerText}>Qty</Text></DataTable.Title>
              <DataTable.Title
                style={{
                  width: 50
                }}
                onPress={() => handleSort(2)} numberOfLines={2}><Text style={styles.headerText}>UOM</Text></DataTable.Title>
              <DataTable.Title
                style={{
                  width: 50
                }}
                onPress={() => handleSort(3)} numberOfLines={2}><Text style={styles.headerText}>Customer</Text></DataTable.Title>
              <DataTable.Title
                style={{
                  width: 50,paddingLeft:20
                }}
                onPress={() => handleSort(4)}><Text style={styles.headerText}>Price</Text></DataTable.Title>
            </DataTable.Header>
            {data != null ? data.map((item, index) => (
              <DataTable.Row style={{
                height: 60,
                backgroundColor: '#FFF'
              }}>
                <DataTable.Cell style={{
                  width: 100,
                }}>{index + 1}</DataTable.Cell>
                <DataTable.Cell style={{
                  width: 100,
                }}><View ><Text style={{ fontSize: 12 }}>{new Date(parseInt(item.createdAt)).toLocaleDateString()}</Text></View></DataTable.Cell>
                <DataTable.Cell style={{
                  width: 100,
                }}>{item.product_name}</DataTable.Cell>
                <DataTable.Cell style={{
                  width: 100,
                }}>{item.sales_quantity}</DataTable.Cell>
                <DataTable.Cell style={{
                  width: 100,
                }}>{item.uom}</DataTable.Cell>
                <DataTable.Cell style={{
                  width: 100,
                }}>{item.customer_name}</DataTable.Cell>
                <DataTable.Cell style={{
                  width: 100,
                  paddingLeft:20
                }}>{item.sales_price}</DataTable.Cell>
              </DataTable.Row>
            )) :
              <DataTable.Row key={1} style={styles.tableRowStyle}>
                <DataTable.Cell borderless={true}>No Data Added</DataTable.Cell>
              </DataTable.Row>
            }
            <DataTable.Row style={{
              height: 60,
              backgroundColor: '#FFF'
            }}>
              <DataTable.Cell style={{
                width: 100,
              }}>Total</DataTable.Cell>
              <DataTable.Cell style={{
                width: 100,
              }}></DataTable.Cell>
              <DataTable.Cell style={{
                width: 100,
              }}></DataTable.Cell>
              <DataTable.Cell style={{
                width: 100,
              }}>{totalSalesQuantity}</DataTable.Cell>
              <DataTable.Cell style={{
                width: 100,
              }}></DataTable.Cell>
              <DataTable.Cell style={{
                width: 100,
              }}></DataTable.Cell>
              <DataTable.Cell style={{
                width: 100,
                paddingLeft:20
              }}>{totalSalesPrice}</DataTable.Cell>

            </DataTable.Row>

            <View>
              <DataTable.Pagination
                style={{ zIndex: -1, backgroundColor: '#FFF' }}
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1 of 2"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPaginationControls={true}
                optionsLabel={'Rows per page'}
              />
            </View>
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
}

export default SalesTable;