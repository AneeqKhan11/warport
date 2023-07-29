import React, { useState, useEffect } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native';
import BackButtonWithTitleAndComponent from '../../../../components/BackButtonWithTitleAndComponent'
import { ip } from '../../CreateBooking/Constants';
import { BackHandler } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#FFF'
  },
  headingStyle: {
    fontSize: 30,
    fontWeight: "700",
    paddingTop: 30,
    paddingBottom: 30,
    alignSelf: "center"
  },
  tableStyle: {
    borderWidth: 1,
    marginTop: 20,
  },
  rowStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
  },
  rowTextStyle: {
    flex: 1,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 40

  }
})

function infoForQuotation(props) {

  const id = props.route.params.number + 1
  const buyerName = props.route.params.buyerName
  const comapnyName = props.route.params.company_name
  const contactNo = props.route.params.contactNo
  const additionalNote = props.route.params.additionalNote
  const location = props.route.params.location
  const contact = props.route.params.contact
  const status = props.route.params.status
  const products = props.route.params.products
  const handleBackPress = () => {
    props.navigation.goBack()
    return true
  }

  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  return (
    <ScrollView style={styles.mainContainer} showsHorizontalScrollIndicator={false}>
      <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
        }}
      // title="Quotation"
      />
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={styles.headingStyle}>Quotation</Text>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>ID : </Text>
          <Text style={styles.rowTextStyle}>{id}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Buyer Name : </Text>
          <Text style={styles.rowTextStyle}>{buyerName}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Company Name : </Text>
          <Text style={styles.rowTextStyle}>{comapnyName}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Contact Number : </Text>
          <Text style={styles.rowTextStyle}>{contactNo}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Additional Note : </Text>
          <Text style={styles.rowTextStyle}>{additionalNote}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Location : </Text>
          <Text style={styles.rowTextStyle}>{location}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Prefered platform : </Text>
          <Text style={styles.rowTextStyle}>{contact}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Status of Query : </Text>
          <Text style={styles.rowTextStyle}>{status}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.rowTextStyle}>Products : </Text>
          <Text style={styles.rowTextStyle}>{products ? products : "No product"}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default infoForQuotation;
