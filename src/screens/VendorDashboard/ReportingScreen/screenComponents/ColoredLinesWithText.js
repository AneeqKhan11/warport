import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ColoredLinesWithText = () => {
  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', position:'absolute', top:"40.7%",left:'5.5%'}}>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:-5}}>
            <Text style={{ marginHorizontal: 4}}>Product 1</Text>
            <View
                style={{
                    width: 201,
                    height: 0,
                    borderTopWidth: 10,
                    borderBottomColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderBottomWidth: 0,
                    borderTopColor: 'green',
                }}
                >
                <Text style={{ fontSize: 8, color: 'white', position: 'absolute', bottom: 0, left:83 }}>500</Text>
                </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:-5}}>
            <Text style={{ marginHorizontal: 4}}>Product 2</Text>
            <View
                style={{
                    width: 188,
                    height: 0,
                    borderTopWidth: 10,
                    borderBottomColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderBottomWidth: 0,
                    borderTopColor: 'red',
                    marginTop:-8
                }}
                >
                <Text style={{ fontSize: 8, color: 'white', position: 'absolute', bottom: 0, left:76 }}>400</Text>
                </View>
        </View>

        <View style={{flexDirection:'row', alignItems:'center', marginBottom:-5}}>
            <Text style={{ marginHorizontal: 4}}>Product 3</Text>
            <View
                style={{
                    width: 173,
                    height: 0,
                    borderTopWidth: 10,
                    borderBottomColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderBottomWidth: 0,
                    borderTopColor: 'blue',
                    marginTop:-18
                }}
                >
                <Text style={{ fontSize: 8, color: 'white', position: 'absolute', bottom: 0, left:69 }}>200</Text>
                </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', marginBottom:-5}}>
            <Text style={{ marginHorizontal: 4}}>Product 4</Text>
            <View
                style={{
                    width: 160,
                    height: 0,
                    borderTopWidth: 10,
                    borderBottomColor: 'transparent',
                    borderLeftWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightWidth: 10,
                    borderRightColor: 'transparent',
                    borderBottomWidth: 0,
                    borderTopColor: 'black',
                    marginTop:-26
                }}
                >
                <Text style={{ fontSize: 8, color: 'white', position: 'absolute', bottom: 0, left:63 }}>100</Text>
                </View>
        </View>
        <View style={{flexDirection:'row',marginTop:60, marginLeft:70}}>
        <TouchableOpacity style={{backgroundColor:'lightblue',
            borderRadius:5,
            width:20,
            height:20,
            alignItems:'center',
            marginHorizontal:10
            }} onPress={()=>{

        }}><Text>1</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'lightblue',
            borderRadius:5,
            width:20,
            height:20,
            alignItems:'center',
            marginRight:10
            }} onPress={()=>{

        }}><Text>2</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'lightblue',
            borderRadius:5,
            width:20,
            height:20,
            alignItems:'center'
            }} onPress={()=>{

        }}><Text>3</Text></TouchableOpacity>
        </View>
        
    </View>
  );
};

export default ColoredLinesWithText;
