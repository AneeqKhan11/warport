import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BackHandler, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Divider, TextInput, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native-paper';
import { useTranslation } from '../../../../context/Localization';
import { DataTable } from 'react-native-paper';
import { ProductsRefreshContext } from '../../../../context/ProductsRefreshContextProvider'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import SalesTable from './SalesTable';
import { gql, useMutation } from '@apollo/client';
import { getLoginUserId } from '../../../../auth/LocalStorage';
import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { SalesDataContext } from '../../../../context/SalesDataContextProvider';
import { theme } from '../../../../core/theme';
import { CustomerQueryFormContext } from '../../../../context/CustomerQueryFormContextProvider';
import AlertView from '../../../../context/AlertView';
import SpinnerOverlay from '../../../../components/SpinnerOverlay';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import { connect } from 'react-redux'
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import BackButtonWithTitleAndComponent from '../../../../components/BackButtonWithTitleAndComponent';

const styles = StyleSheet.create({
  scrollViewMain: {
    flex: 2,
    // backgroundColor:"grey"
  },
  DropDown: {
    marginLeft: 5,
    marginRight: 5,
    alignSelf: "flex-start",
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
  saveChangesBtn: {
    margin: 50
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
    fontSize: 12
  },
  fieldsContainer: {
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 20,
    // paddingBottom: 120

  },
  fields: {
    width: "100%",
    marginVertical: 5
  },
  addLinebtn: {
    marginTop: 15,
    height: 40,
    backgroundColor: '#402798',
    borderRadius: 5
  },
  btnText: {
    fontSize: 8,
  },
  addProductbtnContent: {
    marginTop: 0,
    fontSize: 12,
  },
  addProductbtnText: {
    fontSize: 10,
  },
  tableHeaderText: {
    color: Colors.white,
    fontSize: 10,
    paddingRight: 5
  },
  textStyle: {
    fontSize: 10,
    height: 40,
    width: "100%",
    textAlign: "left",
  },
  priceStyle: {
    marginLeft: 2
  },
  tableRowStyle: {
    backgroundColor: '#d6c187',
    marginLeft: 2,
    marginRight: 2,
    zIndex: -1,
    width: '98%',
  },
  cellStyle: {
    borderRightColor: Colors.white,
    borderRightWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    flex: 2,
    justifyContent: 'center'
  },
  firstCell: {
    borderRightColor: Colors.white,
    borderRightWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginLeft: -15,
    justifyContent: 'center'
  },
  lastCell: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginRight: -15,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    marginTop: 3
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderColor: 'grey',
    borderWidth: 1
  },
  quantityButtonText: {
    fontSize: 20,
    color: 'black',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topTotalCountBoxesContainer: {
    flexDirection: "row"
  },
  topTotalCountBoxes: {
    marginHorizontal: 10,
    marginVertical: 4,
    width: 140,
    height: 60,
    borderRadius: 13,
    backgroundColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  topTotalCount: {
    textAlign: 'center',
    marginTop: 3,
    // marginRight: 5,
    marginLeft: 5,
    marginBottom: 0,
    fontSize: 20,
    color: '#4a4949',
    fontWeight: 'bold',
  },
  topTotalCountDescription: {
    textAlign: 'center',
    marginBottom: 8,
    marginRight: 5,
    marginLeft: 5,
    color: 'gray',
  },
  scrollViewContainer: {
    paddingVertical: 5,
    // backgroundColor:'red'
  },
})



function Sales(props) {
  const navigation = useNavigation()
  const { translation } = useTranslation()
  const [refresh, setRefresh] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedUOM, setSelectedUOM] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);
  const [productList, setProductList] = useState([])
  const [quantityList, setQuantityList] = useState([])
  const [customerList, setCustomerList] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [price, setPrice] = useState()
  const { alertWithType } = useDropdownAlert()
  const dropdownRef1 = useRef(null)
  const dropdownRef2 = useRef(null)
  const dropdownRef3 = useRef(null)
  const dropdownRef4 = useRef(null)
  const [dailySale, setDailySale] = useState(0)
  const [weeklySale, setWeeklySale] = useState(0)
  const [monthlySale, setMonthlySale] = useState(0)
  const [yearlySale, setYearlySale] = useState(0)
  const [dailySaleArray, setDailySaleArray] = useState([])
  const [weeklySaleArray, setWeeklySaleArray] = useState([])
  const [monthlySaleArray, setMonthlySaleArray] = useState([])
  const [yearlySaleArray, setYearlySaleArray] = useState([])
  const [alertMessage, setAlertMessage] = useState("")
  const [exit, setExit] = useState(false)
  const [alertVisible, setAlertVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  let userId = getLoginUserId()

  const uomList = [
    {
      id: "Meter",
      title: "Meter"
    },
    {
      id: "PCs",
      title: "PCs"
    },
    {
      id: "Kg",
      title: "Kg"
    },
    {
      id: "Dzn",
      title: "Dzn"
    },
    {
      id: "Box",
      title: "Box"
    },
    {
      id: "CTN",
      title: "CTN"
    },
    {
      id: "Ft",
      title: "Ft"
    },
    {
      id: "Inch",
      title: "Inch"
    }
  ]

  const createPdf = async (array) => {
    setLoading(true)
    // const product = productsData.find(product => product.id == products);
    // if (product) {
    //   const productTitle = product.title;
    //   setProductName(productTitle)
    // } else {
    //   setProductName("No Product")
    //   setQuantity(0)
    // }

    console.log(props.userAuthData.avatar)

    const htmlStyle = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
  }
  h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase;font-size: larger;}
  /* table */
  table { font-size: 75%; table-layout: fixed; width: 100%; }
  table { border-collapse: separate; border-spacing: 2px; }
  th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
  th, td { border-radius: 0.25em; border-style: solid; }
  th { background: #5897f5; border-color: #BBB; }
  td { border-color: #DDD; }
  /* page */
  html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
  html { background: #999; cursor: default; }
  body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
  body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }
  /* header */
  header { margin: 0 0 3em;}
  header:after { clear: both; content: ""; display: table; }
  header img {width: 15em; height: 10em;padding-top: 1em;padding-right: 27em;}
  header h1 { background: #6599ff; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 5em 0; padding-left: 22em;}
  header h2 {color: #FFF; margin-top:-5em; margin-bottom:5em; margin-left:2em; font: bold 100% sans-serif; letter-spacing: 0.2em; text-transform: uppercase;font-size: larger;}
  header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
  header address p { margin: 0 0 0.25em; }
  header span, header img { display: block; float: right; }
  header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
  header img { max-height: 100%; max-width: 100%; }
  /* article */
  article, article address, table.meta, table.inventory { margin: 0 0 3em; }
  article:after { clear: both; content: ""; display: table; }
  article h1 { clip: rect(0 0 0 0); position: absolute; }
  article address { float: left; font-size: 125%; font-weight: bold; }
  /* table meta & balance */
  table.meta, table.balance, table.meta1 { float: right; width: 36%; }
  table.meta:after, table.balance:after { clear: both; content: ""; display: table; }
  /* table meta */
  table.meta th { width: 40%; }
  table.meta td { width: 60%; }
  /* table items */
  table.inventory { clear: both; width: 100%; }
  table.inventory th { font-weight: bold; text-align: center; }
  table.inventory td:nth-child(1) { width: 26%; }
  table.inventory td:nth-child(2) { width: 38%; }
  table.inventory td:nth-child(3) { text-align: right; width: 12%; }
  table.inventory td:nth-child(4) { text-align: right; width: 12%; }
  table.inventory td:nth-child(5) { text-align: right; width: 12%; }
  /* table balance */
  table.balance th, table.balance td { width: 50%; }
  table.balance td { text-align: right; }
  /* aside */
  aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
  aside h1 { border-color: #999; border-bottom-style: solid; }
`

    try {
      const htmlContent = `
    <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice</title>
          <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
          <style>
             ${htmlStyle}
          </style>
        </head>
        <body>
          
          <header>
            <img src="${props.userAuthData.avatar}"/>
            <h1>Company Sales</h1>
            <address>
            <table class="meta1">
              <tr>
                  <th><span>Date: </span></th>
                  <td><span>${new Date().toLocaleDateString()}</span></td>
              </tr>
            </table>
            </address>
          </header>
          <article>
            <h1>Recipient</h1>
            <table class="meta">
              <tr>
                  <th><span>Sales Total: </span></th>
                  <td><span>${weeklySale}</span></td>
              </tr>
            </table>

            <table class="inventory">
              <thead>
                <tr>
                  <th><span>S.No</span></th>
                  <th><span>Product Code</span></th>
                  <th><span>Product Name</span></th>
                  <th><span>Customer Name</span></th>
                  <th><span>Sales Price</span></th>
                  <th><span>Sales Quantity</span></th>
                  <th><span>Sales Amount</span></th>
                </tr>
              </thead>
              <tbody>
              ${array.map((item, index) => {
        const rowNumber = index + 1
        return `<tr>
                  <td><span>${rowNumber}</span></td>
                  <td><span>${item.product_id}</span></td>
                  <td><span data-prefix></span><span>${item.product_name}</span></td>
                  <td><span>${item.customer_name}</span></td>
                  <td><span data-prefix></span><span>${item.sales_price}</span></td>
                  <td><span>${item.sales_quantity}</span></td>
                  <td><span data-prefix></span><span>${item.sales_price * item.sales_quantity}</span></td>
                </tr>`
      })}
              </tbody>
            </table>
            <table class="balance">
              <tr>
                <th><span>Page No: </span></th>
                <td><span data-prefix></span><span>1</span></td>
              </tr>
            </table>
          </article>
          <aside>
            <h1><span></span></h1>
          </aside> 
        </body>
      </html>
`
      let options = {
        html: htmlContent,
        fileName: 'Sales',
        directory: 'Download',
        base64: true
      };

      let file = await RNHTMLtoPDF.convert(options)
      setLoading(false)
      Alert.alert(translation("Report Loaded"), translation("Do you want to View Report?"), [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open',
          onPress: () => {
            openPath(file.filePath)
          }
        }
      ], { cancelable: true })
    } catch (e) {
      setLoading(false)
      setAlertMessage('unable to make pdf try again')
      setAlertVisible(true)
      // alertWithType('error','WarePort Error', 'unable to make pdf try again'+e)
    }
    const openPath = async (filePath) => {
      try {
        // Check if the file exists
        const fileExists = await RNFS.exists(filePath);
        if (!fileExists) {
          console.log('File does not exist');
          return;
        }

        // Open the file using the default app
        await Share.open({
          url: 'file://' + filePath,
        });
        console.log('File opened successfully');
      } catch (error) {
        console.log('Error opening file:', error);
      }
    }
  }

  const { salesData, requestSalesDataRefresh, salesDataLoading } = useContext(SalesDataContext)

  console.log(salesData)

  const {
    customerQueryFormData,
    customerQueryFormRefresh,
    customerQueryFormLoading,
  } = useContext(CustomerQueryFormContext)
  const { productsData, requestProductsRefresh, productsDataLoading } =
    useContext(ProductsRefreshContext)

  BackHandler.addEventListener("hardwareBackPress", () => {
    // setExit(true)
    // setAlertVisible(!alertVisible)
    navigation.goBack()
    return true
  })

  useEffect(() => {
    // let userId = getLoginUserId()
    requestSalesDataRefresh(userId)
    customerQueryFormRefresh(userId)
    requestProductsRefresh(userId)
  }, [])

  // Calculate total sales Price
  useEffect(() => {
    let dailyPrice = 0
    let WeeklyPrice = 0
    let MonthlyPrice = 0
    let yearlyPrice = 0
    if (salesData) {
      salesData.forEach((item) => {
        const timestamp = parseInt(item.createdAt);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        const Week = new Date(currentDate);
        Week.setDate(currentDate.getDate() - 7);
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        const previousYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
        const salesDate = new Date(timestamp);
        if (salesDate >= currentDate) {
          dailyPrice += parseInt(item.sales_price)
          setDailySale(dailyPrice)
          setDailySaleArray((prevArray) => [...prevArray, item]);
        } else if (salesDate >= Week && salesDate <= yesterday) {
          WeeklyPrice += parseInt(item.sales_price);
          setWeeklySale(dailyPrice + WeeklyPrice);
          setWeeklySaleArray((prevArray) => [...prevArray, item]);
        } else if (salesDate >= previousMonth) {
          MonthlyPrice += parseInt(item.sales_price)
          setMonthlySale(WeeklyPrice + MonthlyPrice)
          setMonthlySaleArray((prevArray) => [...prevArray, item]);
        } else if (salesDate >= previousYear) {
          yearlyPrice += parseInt(item.sales_price)
          setYearlySale(yearlyPrice)
          setYearlySaleArray((prevArray) => [...prevArray, item]);
        }
      });
    }

  }, [salesData]);


  let salesMutation = gql`
    mutation addSales(
      $product_id: Int!
      $product_name: String!
      $sales_quantity: String!
      $uom:String!
      $users_id: Int!
      $sales_price: String!
      $customer_name: String!
    ) {
      addSales(
        product_id: $product_id
        product_name: $product_name
        customer_name: $customer_name
        sales_quantity: $sales_quantity
        uom: $uom
        users_id: $users_id
        sales_price: $sales_price
      ) {
          product_id
          product_name
          customer_name
          uom
      }
    }
    `

  const [
    addSale,
    {
      loading: addSaleMutationLoading,
      error: addSaleMutationError,
      data: addSaleMutationResult,
    },
  ] = useMutation(salesMutation)

  useEffect(() => {
    if (addSaleMutationError) {
      addSaleMutationError.graphQLErrors.map(({ message }, i) => {
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [addSaleMutationError])

  useEffect(() => {
    setRefreshTable(!refreshTable);
    setRefresh(refresh + 1)
    const CustomerData = customerQueryFormData ? customerQueryFormData : []
    const uniqueBuyerNames = [];
    const uniqueBuyers = CustomerData.filter(element => {
      const isDuplicate = uniqueBuyerNames.includes(element.buyer_name)

      if (!isDuplicate) {
        uniqueBuyerNames.push(element.buyer_name)
        return true
      }
      return false
    })
    uniqueBuyers.map((customer, index) => {
      let id = index
      let title = customer.buyer_name
      setCustomerList(old => [...old, { id: id, title: title }])
    })
    productsData && productsData.map((product) => {
      let id = product.id
      let title = product.title
      setProductList(old => [...old, { id: id, title: title }])
    })
  }, [])

  function handleButtonClick() {
    setRefreshTable(!refreshTable);
  }

  useEffect(() => {
    for (let i = 1; i < 1000; i++) {
      let StringValue = String(i)
      setQuantityList(old => [...old, { id: StringValue, title: StringValue }])
    }
  }, [])

  const handleAdd = async () => {
    if (selectedProduct.title && selectedQuantity.title && selectedCustomer.title && price && selectedUOM.title) {
      try {
        await addSale({
          variables: {
            product_id: parseInt(selectedProduct.id),
            product_name: selectedProduct.title,
            sales_quantity: selectedQuantity.title,
            users_id: parseInt(userId),
            sales_price: price,
            customer_name: selectedCustomer.title,
            uom: selectedUOM.title
          },
        })

        setRefresh(refresh + 1)
        dropdownRef1.current.clear()
        dropdownRef2.current.clear()
        dropdownRef3.current.clear()
        dropdownRef4.current.clear()
        setPrice('')
        handleButtonClick();
        requestSalesDataRefresh(userId)
      } catch (ex) {
        if (ex.networkError) {
          setAlertMessage("Check your Internet Connection")
          setAlertVisible(true)
        }
        //alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
      }
    }
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack()
    return true
  })

  return (
    <ScrollView style={styles.scrollViewMain}>
      <SpinnerOverlay
        visible={loading}
        textContent={translation('Loading...')}
        textStyle={styles.spinnerTextStyle}
      />
      {
        alertVisible && <AlertView title={"WarePort Alert"} message={alertMessage} visible={setAlertVisible} exit={exit}></AlertView>
      }
      <View style={{ flex: 1, alignItems: 'center', marginVertical: "1%" }}>
        <BackButtonWithTitleAndComponent
          goBack={() => {
            props.navigation.goBack()
          }}
          title={translation('Sales Box')}
          mainContainer={20}
          headerText={90}
        >

        </BackButtonWithTitleAndComponent>
        {/* <Text style={{fontSize:30,marginLeft:-10, borderColor:'blue', borderRadius:5, backgroundColor:'blue', color:'white', paddingHorizontal:10, marginVertical:5}}>{translation("Sales Box")}</Text> */}
      </View>
      <Divider ></Divider>
      <View >
        <ScrollView
          // horizontal={true}
          styles={styles.topTotalCountBoxesContainer}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={{
            flexDirection: "row",
            paddingLeft: 24,
          }}>

            <TouchableOpacity onPress={() => {
              createPdf(dailySaleArray)
            }}>
              <Text style={styles.topTotalCountDescription}>
                {translation('Daily Sales')}
              </Text>
              <View style={styles.topTotalCountBoxes}>
                <Text style={styles.topTotalCount}>{"PKR " + (dailySale ? dailySale : 0)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                createPdf(weeklySaleArray)
              }}
            >
              <Text style={styles.topTotalCountDescription}>
                {translation('Weekly Sales')}
              </Text>
              <View style={styles.topTotalCountBoxes}>

                <Text style={styles.topTotalCount}>{"PKR " + (weeklySale ? weeklySale : 0)}</Text>

              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: "row",
            paddingLeft: 24,
          }}>
            <TouchableOpacity
              onPress={() => {
                createPdf(monthlySaleArray)
              }}
            >
              <Text style={styles.topTotalCountDescription}>
                {translation('Monthly Sales')}
              </Text>
              <View style={styles.topTotalCountBoxes}>
                <Text style={styles.topTotalCount}>{"PKR " + (monthlySale ? monthlySale : 0)}</Text>

              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                createPdf(yearlySaleArray)
              }}
            >
              <Text style={styles.topTotalCountDescription}>
                {translation('Yearly Sales')}
              </Text>
              <View style={styles.topTotalCountBoxes}>
                <Text style={styles.topTotalCount}>{"PKR " + (yearlySale ? yearlySale : 0)}</Text>

              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View >
      <ScrollView
        showsHorizontalScrollIndicator={false}
      >
        {/* <DataTable >
          <DataTable.Header style={styles.headerStyle}>
            <DataTable.Title style={[styles.headerTitle]}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('AddEditProduct', {
                  addInCustomerQueryFormProductDetailsAdded: true,
                })
              }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={'email-variant'} size={13} color={'white'}></Icon>
                <Text style={styles.headerText}>{translation("Product +")} </Text>
              </TouchableOpacity>
            </DataTable.Title>
            <DataTable.Title style={[styles.headerTitle, { marginLeft: -20 }]}
            ><Text style={styles.headerText}>{translation("Qty")}</Text></DataTable.Title>
            <DataTable.Title style={[styles.headerTitle, { marginLeft: -50 }]}
            ><Text style={styles.headerText}>{translation("UOM")}</Text></DataTable.Title>
            <DataTable.Title style={[styles.headerTitle, { marginLeft: -50 }]}>
              <TouchableOpacity onPress={() => {
                navigation.push('newCustomerForm')
              }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={'email-variant'} size={13} color={'white'}></Icon>
                <Text style={styles.headerText}> {translation("Customer +")} </Text>
              </TouchableOpacity>
            </DataTable.Title>
            <DataTable.Title style={[styles.headerTitle, { marginRight: -30 }]}
            ><Text style={styles.headerText}>{translation("Price")}</Text>
            </DataTable.Title>
          </DataTable.Header>
        </DataTable> */}
        {/* <View style={styles.fieldsContainer}>
          <View style={styles.fields}>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1 }}
              onPress={() => setIsDropdownOpen(false)}
            >
              <AutocompleteDropdown
                ref={dropdownRef1}
                clearOnFocus={false}
                closeOnBlur={false}
                closeOnSubmit={true}
                showChevron={false}
                showClear={false}
                suggestionsListTextStyle={{ fontSize: 15 }}
                onSelectItem={item => {
                  item && setSelectedProduct(item)
                }}
                dataSet={productList}
                textInputProps={{
                  placeholder: 'Add name of Product',
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: {
                    fontSize: 15,
                    backgroundColor: Colors.white,
                    ...Platform.select({
                      ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 20 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                      },
                      android: {
                        elevation: 4,
                      },
                    }),
                  },
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.fields]}>
            <TextInput style={[styles.textStyle, { color: 'black', fontSize: 15, backgroundColor: "#FFF", borderBottom: 0, borderRadius: 0 }]}
              value={price}
              placeholder={"Rs."}
              onChangeText={newText => { setPrice(newText) }}
              keyboardType='numeric'
            />
          </View>
          <View style={styles.fields}>
            <AutocompleteDropdown
              ref={dropdownRef2}
              clearOnFocus={false}
              closeOnBlur={false}
              closeOnSubmit={true}
              showChevron={false}
              showClear={false}
              suggestionsListTextStyle={{ fontSize: 15 }}
              initialValue={selectedQuantity} // or just '2'
              onSelectItem={item => {
                item && setSelectedQuantity(item)
              }}
              dataSet={quantityList}
              textInputProps={{
                placeholder: 'Selected Quantity',
                autoCorrect: false,
                autoCapitalize: 'none',
                keyboardType: "number-pad",
                style: {
                  fontSize: 15,
                  backgroundColor: Colors.white,
                  ...Platform.select({
                    ios: {
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 20 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: 4,
                    },
                  }),
                },
              }}
            />
            
          </View>
          <View style={styles.fields}>
            <AutocompleteDropdown
              ref={dropdownRef3}
              clearOnFocus={false}
              closeOnBlur={false}
              closeOnSubmit={true}
              showChevron={false}
              showClear={false}
              suggestionsListTextStyle={{ fontSize: 10, }}
              initialValue={selectedUOM}
              onSelectItem={item => {
                item && setSelectedUOM(item)
              }}
              dataSet={uomList}
              textInputProps={{
                placeholder: 'UOM',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  fontSize: 15,
                  backgroundColor: "white",
                  ...Platform.select({
                    ios: {
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 20 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: 4,
                    },
                  }),
                },
              }}
            />
          </View>
          <View style={styles.fields}>
            <AutocompleteDropdown
              ref={dropdownRef4}
              clearOnFocus={false}
              closeOnBlur={false}
              closeOnSubmit={true}
              showChevron={false}
              showClear={false}
              suggestionsListTextStyle={{ fontSize: 15 }}
              initialValue={selectedCustomer}
              onSelectItem={item => {
                item && setSelectedCustomer(item)
              }}
              dataSet={customerList}
              textInputProps={{
                placeholder: 'Select Customer',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  fontSize: 15,
                  backgroundColor: '#FFF',
                  ...Platform.select({
                    ios: {
                      shadowColor: 'black',
                      shadowOffset: { width: 0, height: 20 },
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: 4,
                    },
                  }),
                },
              }}
            />
          </View>
          <TouchableOpacity
            style={[styles.addLinebtn, { justifyContent: 'center', alignItems: 'center' }]}
            onPress={handleAdd}>
            <Text style={{ fontSize: 14, color: 'white' }}>{translation("Save")}</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
      <TouchableOpacity
        style={[styles.addLinebtn, { justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }]}
        onPress={handleAdd}>
        <Text style={{ fontSize: 17, color: 'white' }}>{translation("Some Text about add")}</Text>
      </TouchableOpacity>
      <Divider ></Divider>
      <Divider style={{ zIndex: -1, marginTop: 20 }}></Divider>
      <SalesTable Data={salesData} refresh={refresh} refreshTable={refreshTable} />
    </ScrollView >
  );
}
const mapStateToProps = (state) => {
  return { ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps)(
  Sales
)
