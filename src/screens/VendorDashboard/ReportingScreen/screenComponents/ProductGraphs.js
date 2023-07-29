import React, { useState, useEffect } from 'react';
import { View, Text, processColor, BackHandler,TouchableOpacity } from 'react-native';
  import BarChart  from 'react-native-charts-wrapper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'


const ProductGraphs = (props) => {
  const navigation = useNavigation();
  const productData = props.route.params.data;
  const type = props.route.params.type;
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [startBarIndex, setStartBarIndex] = useState(0);
  const [endBarIndex, setEndBarIndex] = useState(7);

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.goBack();
    return true;
  });

  console.log(filteredProductData)
  useEffect(() => {
    if (productData) {
      if (type === 'HIGH') {
        setFilteredProductData(productData.filter((item) => item.stock > 100));
      } else if (type === 'LOW') {
        setFilteredProductData(productData.filter((item) => item.stock <= 100));
      }
    }
  }, []);

  const handleNext = () => {
    const totalBars = filteredProductData.length;
    const newStartBarIndex = startBarIndex + 8;
    const newEndBarIndex = Math.min(endBarIndex + 8, totalBars - 1);

    if (newStartBarIndex < totalBars) {
      setStartBarIndex(newStartBarIndex);
      setEndBarIndex(newEndBarIndex);
    }
  };

  const handlePrevious = () => {
    const newStartBarIndex = Math.max(startBarIndex - 8, 0);
    const newEndBarIndex = startBarIndex - 1;

    if (newEndBarIndex >= 0) {
      setStartBarIndex(newStartBarIndex);
      setEndBarIndex(newEndBarIndex);
    }
  };

  const chartData = {
    dataSets: [
      {
        values: filteredProductData
          .slice(startBarIndex, endBarIndex + 1)
          .map((item) => ({
            y: typeof item.stock === 'number' ? item.stock : 0,
            marker: item.title || '',
            markerColor: processColor(item.product_color ? item.product_color : 'blue'),
          })),
        label: 'Stock',
        config: {
          colors: filteredProductData
            .slice(startBarIndex, endBarIndex + 1)
            .map((item) => processColor(item.product_color ? item.product_color : 'blue')),
        },
      },
    ],
  };

  const xAxisConfig = {
    valueFormatter: filteredProductData
      .slice(startBarIndex, endBarIndex + 1)
      .map((item) => item.title),
    granularityEnabled: true,
    granularity: 1,
    position: 'BOTTOM',
    drawLabels: true,
    drawAxisLine: false,
    drawGridLines: false,
    wordWrapEnabled: true,
    labelRotationAngle: 40,
  };

  const chartOptions = {
    xAxis: xAxisConfig,
    legend: {
      enabled: false,
    },
    drawGridBackground: false,
    chartBackgroundColor: processColor('white'), 
    marker: {
      enabled: true,
      markerColor: processColor('gray'),
      textColor: processColor('white'),
    },
  };


  const createPdf = async (barData) => {
    console.log(barData)
    // const product = productsData.find(product => product.id == products);
    // if (product) {
    //   const productTitle = product.title;
    //   setProductName(productTitle)
    // } else {
    //   setProductName("No Product")
    //   setQuantity(0)
    // }

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
  header h1 { background: #3382f8; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 5em 0; padding-left: 22em;}
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
              ${array.map((item,index)=>{
                const rowNumber = index+1
                return `<tr>
                  <td><span>${rowNumber}</span></td>
                  <td><span>${item.product_id}</span></td>
                  <td><span data-prefix></span><span>${item.product_name}</span></td>
                  <td><span>${item.customer_name}</span></td>
                  <td><span data-prefix></span><span>${item.sales_price}</span></td>
                  <td><span>${item.sales_quantity}</span></td>
                  <td><span data-prefix></span><span>${item.sales_price*item.sales_quantity}</span></td>
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
      alertWithType('error','WarePort Error', 'unable to make pdf try again'+e)
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
const handleBarPress = (event) => {
  const entry = event.nativeEvent;
  const barData = filteredProductData.slice(startBarIndex, endBarIndex + 1)[entry.x];

  // Call your create PDF function and pass the bar data
  // createPdf(barData);
};

  return (
    <View>
    <View style={{flexDirection:'row',margin:15, alignItems:'center'}}>
                <TouchableOpacity
                onPress={() => {
                navigation.goBack()
                }}
                >
                <Icon
                    name="arrow-left"
                    size={24}
                    color="gray"
                />
                </TouchableOpacity>
                <Text style={{fontSize:24, color:'white', backgroundColor:'#449bb6', marginLeft:"25%", paddingHorizontal:5, borderRadius:5}}>{type} STOCK</Text>
    </View>
    <View style={{ width: '100%', height: 500, marginTop: 50 }}>
      {/* <BarChart
        style={{ flex: 1 }}
        data={chartData}
        xAxis={xAxisConfig}
        chartDescription={{ text: '' }}
        legend={chartOptions.legend}
        marker={chartOptions.marker}
        drawValueAboveBar={false}
        doubleTapToZoomEnabled={false}
        scaleEnabled={false}
        dragEnabled={false}
        pinchZoom={false}
        maxVisibleValueCount={8}
        scaleYEnabled={false}
        scaleY={1}
        scaleValueRanges={{ barWidth: 0.6, spaceRatio: 0.1 }}
        animation={{ durationX: 0 }}
        onSelect={handleBarPress}
      /> */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Button onPress={handlePrevious}>Previous</Button>
        <Button onPress={handleNext}>Next</Button>
      </View>
    </View>
    </View>
  );
};

export default ProductGraphs;
