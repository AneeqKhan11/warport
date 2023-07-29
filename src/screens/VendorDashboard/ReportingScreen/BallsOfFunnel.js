
import { useNavigation } from "@react-navigation/native";
import React, { useEffect,useRef, useState} from "react";
import { Animated, PanResponder, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "react-native-paper";
import { Dimensions } from "react-native";
import { getBallPosition, setBallPosition } from "../../../auth/LocalStorage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent:'center',
    marginTop:-50,
    width:40,
    height:40
  },
  ball: {
    backgroundColor: Colors.blue700,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginLeft:15
  },
  textStyle: {
    fontSize:10,
    flex:1,
    flexWrap:'wrap'
  }
});

const BallsOfFunnel = (props) => {
  const navigation =  useNavigation()
  const index = props.number
  let xValue = 0
  let yValue = 0
  if(index>=3){
    xValue = index? index*20+165 : 200
    yValue = index? index*13+70 : 110 
  }else{
    xValue = index? index*62+200 : 200
    yValue = index? index*18+70 : 110
  }
  const pan = useRef(new Animated.ValueXY({x:xValue,y:yValue})).current
  console.log(props.buyerName)
  console.log(xValue)
  console.log(yValue)
  useEffect(()=>{
    props.onData({"index":index,"position":"A","buyerName":props.buyerName,"companyName":props.name,"additionalNote":props.additionalNote,"contactNo":props.contactNo,"location":props.location,"contact":props.contact,"status":props.status, "products":props.products, "formId":props.formId})
    setBallPosition(index,"A")
  },[])
  
  const panResponder = useState(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      animation.stop()
      Animated.timing(progress, {toValue:1, useNativeDriver:true}).start();
      pan.setOffset(
        {
          x:pan.x._value,
          y:pan.y._value
        }
      )
      pan.setValue({x:0,y:0})
    },
    onPanResponderMove: (event, gesture)=>{
      pan.setValue({
        x:gesture.dx,
        y:gesture.dy
      })
    },
    onPanResponderRelease: (event, gesture) => {
      if(gesture.moveY == 0){
        pan.setValue({x:0,y:0})
        navigation.navigate('infoForQuotation', { number: index, company_name:props.name, 
          additionalNote:props.additionalNote, buyerName:props.buyerName, contactNo:props.contactNo,
          location:props.location,contact:props.contact,status:props.status, products:props.products
        })
      }else if(gesture.moveY < 250){
        props.onData({"index":index,"position":"A","buyerName":props.buyerName,"companyName":props.name,"additionalNote":props.additionalNote,"contactNo":props.contactNo,"location":props.location,"contact":props.contact,"status":props.status, "products":props.products})
        setBallPosition(index,"A")
        pan.setOffset(
          {
            x: xValue,
            y: yValue
          }
        )
        pan.setValue({x:0,y:0})
      }else if(gesture.moveY < 350){
        props.onData({"index":index,"position":"B","buyerName":props.buyerName,"companyName":props.name,"additionalNote":props.additionalNote,"contactNo":props.contactNo,"location":props.location,"contact":props.contact,"status":props.status, "products":props.products})
        setBallPosition(index,"B")
        pan.setOffset(
          {
            x: Dimensions.get('window').width*0.65,
            y: 260
          }
        )
        pan.setValue({x:0,y:0})
      }
      else if(gesture.moveY > 350){
        props.onData({"index":index,"position":"B","buyerName":props.buyerName,"companyName":props.name,"additionalNote":props.additionalNote,"contactNo":props.contactNo,"location":props.location,"contact":props.contact,"status":props.status, "products":props.products})
        setBallPosition(index,"B")
        pan.setOffset(
          {
            x: Dimensions.get('window').width*0.65,
            y: 380
          }
        )
        pan.setValue({x:0,y:0})
      }
      // }else if(gesture.moveY > 465){
      //   props.onData({"index":index,"position":"C","buyerName":props.buyerName,"companyName":props.name,"additionalNote":props.additionalNote,"contactNo":props.contactNo,"location":props.location,"contact":props.contact,"status":props.status, "products":props.products})
      //   setBallPosition(index,"C")
      //   pan.setOffset(
      //     {
      //       x:Dimensions.get('window').width*0.42,
      //       y:350
      //     }
      //   )
      //   pan.setValue({x:0,y:0})
      // }
      // }else if(gesture.moveY > 465){
      //   props.onData({"index":index,"position":"D","buyerName":props.buyerName,"companyName":props.name,"additionalNote":props.additionalNote,"contactNo":props.contactNo,"location":props.location,"contact":props.contact,"status":props.status})
      //   pan.setOffset(
      //     {
      //       x:Dimensions.get('window').width*0.42,
      //       y:350
      //     }
      //   )
      //   pan.setValue({x:0,y:0})
      // }
      pan.flattenOffset()
    },
  }))[0];

//Creating Animation for the Last Recieved Quotation
let progress = useRef(new Animated.Value(0)).current
let animation = Animated.loop(
  Animated.sequence([
      Animated.timing(progress, {toValue:1, useNativeDriver:true})
    ])
    )
useEffect(()=>{
      animation.start()
},[]);

  if(index != null){
    
    if (props.name == props.last){
      return(
          <Animated.View style={[styles.container,{transform : pan.getTranslateTransform() , opacity:progress}]}
            {...panResponder.panHandlers}
          >
            <View style={[styles.ball, {backgroundColor:Colors.green800}]}></View>
            <Text style={styles.textStyle}>{props.name}</Text>
          </Animated.View>
      )
      
    }else{
      return (
        <Animated.View style={[styles.container,{transform : pan.getTranslateTransform()}]}
          {...panResponder.panHandlers}
        >
          
          <View style={[styles.ball]}></View>
          <Text style={styles.textStyle}>{props.name}</Text>
        </Animated.View>
    );
    }}else{
    return(
      <View></View>
    )
  }
  
};

export default BallsOfFunnel;