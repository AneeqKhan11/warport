import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import { getData, saveData } from '../../../../auth/AsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Rfq = (props) => {
  const navigation = useNavigation();
  let rfqData = props.data
  const [rfq,setRfq] = useState(0)
  const [newVal, setNewVal] = useState("")

 const fetchData = async () => {
  try {
    const rfqVal = await getData('RFQ');
    console.log(rfqVal);
    if (rfqVal != null) {
      setRfq(parseInt(rfqVal));
    }
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};

useEffect(() => {
  fetchData();
}, [newVal,rfqData]);

  
  
  const newRfq =
    {
      id: 1,
      company_name: '',
      image: require('../../../../../assets/RFQ.png'),
    }

  if (!rfqData) {
    rfqData = []; // Set a default value, such as an empty array
  }
  
  const updatedRfqData = [newRfq, ...rfqData];
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      >
      {updatedRfqData.map((data, index) => {
        const imageSource = data.id === 1 ? data.image: { uri:data.logo? data.logo:'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG'};
        return (
          <TouchableOpacity
            style={{paddingTop:15}}
            key={index}
            onPress={() =>{
              if(data.id==1){

              }else{
                navigation.push('ReplyForRfq', {
                  data:data
                })
                let newVal = updatedRfqData.length
                saveData('RFQ',newVal.toString())
                setNewVal(newVal.toString())
              }
            }}>
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 8,
                position: 'relative',
              }}>
              {data.id == 1 ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 10,
                    zIndex: 1,
                  }}>
                  {/* <Entypo
                    name="circle-with-plus"
                    style={{
                      fontSize: 20,
                      color: '#405de6',
                      backgroundColor: 'white',
                      borderRadius: 100,
                    }}
                  /> */}
                </View>
              ) : null}
              { index == 1 && rfq<updatedRfqData.length &&
                <Text style={{fontSize:12, color:"red", alignSelf:"center", marginTop:-15}}>
                  NEW
                </Text>
              }
              
              <View
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: 'white',
                  borderWidth: 1.8,
                  borderRadius: 100,
                  borderColor: '#c13584',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={imageSource}
                  style={{
                    resizeMode: 'contain',
                    width: '92%',
                    height: '92%',
                    borderRadius: 100,
                    backgroundColor: 'orange',
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  opacity: data.id == 0 ? 1 : 0.5,
                }}>
                {data.company_name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Rfq;
