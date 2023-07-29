import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Alert
  } from 'react-native'
import { List, Button, Colors, Divider } from "react-native-paper";
import { theme } from "../../../core/theme";
import { BackHandler, Linking } from 'react-native';
import { useTranslation } from "../../../context/Localization";
import Icon from 'react-native-vector-icons/FontAwesome'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import FileViewer from "react-native-file-viewer";
import {getLoginUserId} from "../../../auth/LocalStorage"
import SpinnerOverlay from '../../../components/SpinnerOverlay'
import { useDropdownAlert } from "../../../context/AlertDropdownContextProvider";
import { ProductsRefreshContext } from "../../../context/ProductsRefreshContextProvider";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import SearchBar from "../Search/screenComponents/SearchBar";
import AlertView from "../../../context/AlertView";
const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      subHeaderStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:20,
        paddingRight:20
      },
      subHeaderTextStyle:{
        fontSize:16,
        fontWeight:'bold'
      },
      viewMoreStyle:{
        flexDirection:"row"
      },
      viewMoreTextStyle:{
        fontSize:12,
        color:Colors.white
      },
      viewMoreButtonStyle:{
        alignItems:'center',
        justifyContent:"center",
        backgroundColor:theme.colors.primary,
        borderRadius:10,
        padding:5,
        marginLeft:10
      },
      container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:Dimensions.get('window').width *0.9,
        margin:10
    },
})

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
  header img {width: 15em; height: 5em;padding-top: 1em;padding-right: 27em;}
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
  table.meta, table.balance { float: right; width: 36%; }
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


function Buyers(props) {
    const [buyers,setBuyers] = useState(props.route.params.data)
    const id = props.route.params.id
    const subId = props.route.params.subId
    const buyerId = getLoginUserId()
    const navigation = useNavigation()
    const {translation} = useTranslation()
    const [productName, setProductName] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [loading, setLoading] = useState(false)
    const { alertWithType } = useDropdownAlert()
    const [alertMessage , setAlertMessage] = useState("")
    const [alertVisible, setAlertVisible] = useState(false)
    BackHandler.addEventListener('hardwareBackPress', ()=>{
      props.navigation.goBack()
      return true
    })

    const handleSearch = (searchQuery) => {
      if (searchQuery === '') {
        // If the search query is empty, show all the items
        setBuyers(props.route.params.data)
      } else {
      const filtered = buyers.filter((buyer) =>
        buyer.buyer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBuyers(filtered);
    };
  }

    const { productsData, requestProductsRefresh, productsDataLoading } =
    useContext(ProductsRefreshContext)

    useEffect(() => {
      requestProductsRefresh(buyerId)
    }, [])

    const createPdf = async (buyerName,location,contact_no,buyerId,formId,additional_note,status_of_query,source_of_contact,companyName) => {
        setLoading(true)
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
                <img src="http://159.223.93.212:5433/uploads/logo11.png"/>
                <h1>Quotation</h1>
                <h2>${buyerName}</h2>
                <address>
                  <h3 style="font: 3em bold sans-serif;">Company Details:</h3>
                  <br/>
                  <p>Location:  ${location} </p>
                  <p>Contact No:  ${contact_no}</p>
                </address>
              </header>
              <article>
                <h1>Recipient</h1>
                <address>
                  <p>Quotation For: <br>${companyName}</p>
                </address>
                <table class="meta">
                  <tr>
                      <th><span>Date</span></th>
                      <td><span>${new Date().toLocaleDateString()}</span></td>
                  </tr>
                  <tr>
                    <th><span>Quotation #</span></th>
                    <td><span>${formId}</span></td>
                  </tr>
                  <tr>
                    <th><span>Customer ID #</span></th>
                    <td><span id="prefix"></span><span>${buyerId}</span></td>
                  </tr>
                </table>
  
                <table class="inventory">
                  <thead>
                    <tr>
                      <th><span>Product Name</span></th>
                      <th><span>Quantity</span></th>
                      <th><span>Source of Contact</span></th>
                      <th><span>Other Platform</span></th>
                      <th><span>Status of Query</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>${productName}</span></td>
                      <td><span>${quantity}</span></td>
                      <td><span data-prefix></span><span>${source_of_contact}</span></td>
                      <td><span>${contact_no}</span></td>
                      <td><span data-prefix></span><span>${status_of_query}</span></td>
                    </tr>
                  </tbody>
                </table>
                <table class="balance">
                  <tr>
                    <th><span>Quotation Valid Until</span></th>
                    <td><span data-prefix></span><span>Expiry</span></td>
                  </tr>
                  <tr>
                    <th><span>Prepared</span></th>
                    <td><span data-prefix></span><span>support@wareport.co</span></td>
                  </tr>
                </table>
              </article>
              <aside>
                <h1><span>Additional Note</span></h1>
                <div>
                  <p>${additional_note}</p>
                </div>
              </aside>
            </body>
          </html>
  `
            let options = {
              html: htmlContent,
              fileName: 'Quotation',
              directory: 'Download',
              base64: true
            };
            
            let file = await RNHTMLtoPDF.convert(options)
            setLoading(false)
            Alert.alert('Report Loaded', 'Do you want to View Report?', [
              {
                text:'Cancel',
                style:'cancel',
              },
              {
                text:'Open',
                onPress: ()=>{
                  openPath(file.filePath)
                }
              }
            ], {cancelable:true})
        }catch(e){
          setLoading(false)
          setAlertMessage('unable to make pdf try again')
          alertVisible(true)
          // alertWithType('error','WarePort Error', 'unable to make pdf try again')
      }
    const openPath = async (filePath) =>{
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
      
      

    return(
        <ScrollView>
          <SpinnerOverlay
            visible={loading}
            textContent={translation('Loading...')}
            textStyle={styles.spinnerTextStyle}
          />
          {
            alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} ok={true}></AlertView>
          }
        <List.Section>
          <View style={styles.headerStyle}>
            <List.Subheader>Quotations List</List.Subheader>
            <Button icon={"close-thick"} onPress={() => navigation.goBack()}></Button>
          </View>
          <SearchBar onSearch={handleSearch}/>
          {
            id==0 && 
            <View style={styles.subHeaderStyle}>
              <Text style={styles.subHeaderTextStyle}>{translation("Buyer Name")}</Text>
              <Text style={styles.subHeaderTextStyle}>{translation("Status")}</Text>
              <Text style={styles.subHeaderTextStyle}>{translation("Report")}</Text>
            </View>
          }
          {
            buyers.map((buyer, index) => {
              if(id==0 && subId==0){
                    return (
                      <View key={index}>
                        <List.Item key={index}
                          title={buyer.buyer_name}
                          right={()=>{
                            return(
                            <View style={styles.viewMoreStyle}>
                            <Text style={{alignSelf:"center", paddingRight:30}}>{buyer.status_of_query}</Text>
                            <TouchableOpacity style={styles.viewMoreButtonStyle}
                            onPress={()=>{
                              createPdf(buyer.buyer_name,buyer.city,buyer.contact_no1,buyer.id,buyer.company_name,buyer.address,buyer.contact_no2,buyer.email,buyer.company_name) 
                            }}
                            >
                              <Text style={styles.viewMoreTextStyle}>View More</Text>
                            </TouchableOpacity>
                            </View>
                            )
                        }}
                          onPress={()=>{
                            navigation.navigate('infoForQuotation', { number: index, company_name:buyer.company_name, 
                              additionalNote:buyer.additional_note, buyerName:buyer.buyer_name, contactNo:buyer.contact_no,
                              location:buyer.location,contact:buyer.source_of_contact,status:buyer.status_of_query
                            })
                          }}
                          />
                          <Divider bold={true}></Divider>
                          </View>
                      )
            }else if(subId==1){
                    if(buyer.position == "A"){
                        return (
                          <View key={index}>
                            <List.Item key={index}
                              title={buyer.buyerName}
                              right={()=>{
                                return(
                                <View style={styles.viewMoreStyle}>
                                <Text style={{alignSelf:"center", paddingRight:50}}>{buyer.status}</Text>
                                <TouchableOpacity style={styles.viewMoreButtonStyle}>
                                  <Text style={styles.viewMoreTextStyle} onPress={()=>{
                                   createPdf(buyer.buyerName,buyer.location,buyer.contactNo,buyer.formId,buyer.additionalNote,buyer.status,buyer.contact,buyer.products,buyer.companyName) 
                                  }}>View More</Text>
                                </TouchableOpacity>
                                </View>
                                )
                            }}
                              onPress={()=>{
                                navigation.navigate('infoForQuotation', { number: index, company_name:buyer.companyName, 
                                  additionalNote:buyer.additionalNote, buyerName:buyer.buyerName, contactNo:buyer.contactNo,
                                  location:buyer.location,contact:buyer.contact,status:buyer.status
                                })
                              }}
                              />
                              <Divider bold={true}></Divider>
                          </View>
                          )
                        }
                }else if(subId==2){
                    if(buyer.position == "B"){
                        return (
                          <View key={index}>
                            <List.Item key={index}
                              title={buyer.buyerName}
                              right={()=>{
                                return(
                                <View style={styles.viewMoreStyle}>
                                <Text style={{alignSelf:"center", paddingRight:50}}>{buyer.status}</Text>
                                <TouchableOpacity style={styles.viewMoreButtonStyle}>
                                  <Text style={styles.viewMoreTextStyle}>View More</Text>
                                </TouchableOpacity>
                                </View>
                                )
                            }}
                              onPress={()=>{
                                navigation.navigate('infoForQuotation', { number: index, company_name:buyer.companyName, 
                                  additionalNote:buyer.additionalNote, buyerName:buyer.buyerName, contactNo:buyer.contactNo,
                                  location:buyer.location,contact:buyer.contact,status:buyer.status
                                })
                              }}/>
                              <Divider bold={true}></Divider>
                          </View>
                          )
                        }
                }else if(subId==3){
                    if(buyer.position == "C"){
                        return (
                          <View key={index}>
                            <List.Item key={index}
                              title={buyer.buyerName}
                              onPress={()=>{
                                navigation.navigate('infoForQuotation', { number: index, company_name:buyer.companyName, 
                                  additionalNote:buyer.additionalNote, buyerName:buyer.buyerName, contactNo:buyer.contactNo,
                                  location:buyer.location,contact:buyer.contact,status:buyer.status
                                })
                              }}/>
                              <Divider bold={true}></Divider>
                          </View>
                          )
                        }
                }else{
                    if(buyer.position == "D"){
                        return (
                          <View key={index}>
                            <List.Item key={index}
                              title={buyer.buyerName}
                              onPress={()=>{
                                navigation.navigate('infoForQuotation', { number: index, company_name:buyer.companyName, 
                                  additionalNote:buyer.additionalNote, buyerName:buyer.buyerName, contactNo:buyer.contactNo,
                                  location:buyer.location,contact:buyer.contact,status:buyer.status
                                })
                              }}/>
                              <Divider bold={true}></Divider>
                          </View>
                          )
                        }
                }
                
              
            })
        }
        </List.Section>
        </ScrollView>
    )
}

export default Buyers