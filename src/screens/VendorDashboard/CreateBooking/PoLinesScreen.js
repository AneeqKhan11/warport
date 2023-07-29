import React, { useState, useEffect} from 'react';
import { Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import { StyleSheet, ScrollView } from 'react-native';
import BackButtonWithTitleAndComponent from '../../../components/BackButtonWithTitleAndComponent'
import { ip } from './Constants';
import axios from 'axios';
import { BackHandler } from 'react-native';
import { useTranslation } from '../../../context/Localization'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tableStyle:{
    borderWidth:1,
    marginTop:20,
    overflow:"scroll"
  },
  rowStyle:{
    backgroundColor:'lightgray',
    height:40,
    flex:1,
  },
  rowTextStyle:{
    textAlign:'center'
  }
})

function PoLinesScreen(props) {
const [PO, setPO] = useState(props.route.params.po_number? props.route.params.po_number:props.po_number);
const [poData, setPoData] = useState(null)
const headers = ["S.No","Item No","Item Description","UOM","Quantity","Line No","Volume","Extension","Line Status"]
const [tableData, setTableData] = useState([[]]) 
const {translation} = useTranslation()

BackHandler.addEventListener("hardwareBackPress",()=>{
  props.navigation.goBack()
  return true
})

const getPOLines = async () => {

    try {
      const response = await (await axios(`http://${ip}/poLines/${PO}`)).data
      await setPoData(response)
    } catch (err) {
      console.log(err.message)
    }


}

function getTableData(){
  if (poData != null) {
    poData.map((po, index) => {
      const sNo = String(index+1) 
      const ItemNo = po["m_product_id"]
      const ItemDesc = po["description"]
      const UOM = po["name"]
      const Quantity = po["qtyentered"]
      const LineNo = po["countline"]
      const Volume = String (po["heightpo"] * po["lengthpo"] * po["widthpo"])
      const Extension = po["skuno"]
      const LineStatus = "A"
      setTableData([[sNo,ItemNo,ItemDesc,UOM,Quantity,LineNo,Volume,Extension,LineStatus]])
    })
    
  }
      
}


useEffect(() => {
  getTableData()
}, [poData])



useEffect(() => {
  getPOLines();
}, [PO])
  
  return (
    <ScrollView style={styles.mainContainer}>
        <BackButtonWithTitleAndComponent
          goBack={() => {
            props.navigation.goBack()
          }}
          title={translation("PO Details")}
        />
        <Table borderStyle={styles.tableStyle}>
          <Row data={headers} style={styles.rowStyle} textStyle={styles.rowTextStyle}/>
          <TableWrapper>
            <Rows data={tableData}></Rows>
          </TableWrapper>
        </Table>
  </ScrollView>
  )
}

export default PoLinesScreen;
