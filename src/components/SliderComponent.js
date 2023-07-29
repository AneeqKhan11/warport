import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider"
import { useNavigation } from '@react-navigation/native';
import { gql, useMutation } from '@apollo/client'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider';
import ManageStockPopUp from '../context/ManageStockPopUp';
import AlertView from '../context/AlertView';
import { useTranslation } from '../context/Localization';

const SliderComponent = (props) => {

  const navigation = useNavigation()
  const { alertWithType } = useDropdownAlert()


  let color = props.color ? props.color : "blue"
  let stock = props.stock ? props.stock : 0
  let id = props.productId
  let name = props.productName
  let userId = props.userId

  console.log(userId)
  console.log(name)
  console.log(id)
  const [manageStockalertVisible, setManageStockalertVisible] = useState(false)
  const [ok, setok] = useState(true)
  const [success, setSuccess] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const { translation } = useTranslation()
  const alertVisibility = (state) => {
    setAlertVisible(state)
  }
  const [sliderValue, setSliderValue] = useState(stock);
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };


  const visible = (state) => {
    setManageStockalertVisible(state)
  }
  let updateProductStock = gql`
  mutation update_product_stock(
    $product_id: Int!,
    $stock:Int,
    ) {
      update_product_stock(
        product_id: $product_id
        stock: $stock
      ) {
          success
          error
          result
      }
    }
  `

  let addManageStockMutation = gql`
      mutation manageStock(
        $user_id: Int,
        $product_id:Int,
        $product_name:String,
        $stock:Int,
        ) {
          manageStock(
            user_id: $user_id
            product_id: $product_id
            product_name: $product_name
            stock: $stock
          ) {
              stock
          }
        }
`

  const [
    updateStockMutation,
    {
      loading: updateStockMutationLoading,
      error: updateStockMutationError,
      data: updateStockMutationResult,
    },
  ] = useMutation(updateProductStock)

  useEffect(() => {
    if (updateStockMutationError) {
      updateStockMutationError.graphQLErrors.map(
        ({ message }, i) => {
          setAlertMessage(message)
          setAlertVisible(true)
          setok(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [updateStockMutationError])

  const [
    ManageStockMutation,
    {
      loading: ManageStockMutationLoading,
      error: ManageStockMutationError,
      data: ManageStockMutationResult,
    },
  ] = useMutation(addManageStockMutation)

  useEffect(() => {
    if (ManageStockMutationError) {
      ManageStockMutationError.graphQLErrors.map(
        ({ message }, i) => {
          console.log(message)
          setAlertMessage(message)
          setAlertVisible(true)
          setok(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [ManageStockMutationError])

  const onSavePress = async () => {
    try {
      await ManageStockMutation({
        variables: {
          user_id: parseInt(userId),
          product_id: parseInt(id),
          product_name: name,
          stock: parseInt(sliderValue),
        },
      });
      await updateStockMutation({
        variables: {
          product_id: parseInt(id),
          stock: parseInt(sliderValue),
        },
      });
      setAlertMessage("Saved Stock Successfully")
      setok(false)
      setSuccess(true)
      setAlertVisible(true)
      // alertWithType('success', 'WarePort Success', 'Saved Stock Successfully');
      props.updateStock();
    } catch (ex) {
      const errorMessage = ex.message || ex.graphQLErrors[0].message;
      setAlertMessage(errorMessage)
      setok(true)
      setSuccess(false)
      setAlertVisible(true)
      // alertWithType('error', 'WarePort Error', errorMessage);
    }
  };

  const handleTextInputChange = (text) => {
    // Convert the text to a number and update the slider value
    setSliderValue(parseInt(text) || 0);
  };

  return (
    <View>
      {
        manageStockalertVisible && <ManageStockPopUp visible={visible} title={"Product Specs"} product_id={id} user_id={userId} />
      }
      {
        alertVisible && <AlertView message={alertMessage} visible={alertVisibility} ok={ok} success={success} />
      }
      <View style={{
        height: 190,
        padding: 10
      }}>
        <View style={{
          flex: 1,
          borderRadius: 20,
          backgroundColor: "#FFF",
          elevation: 5,
          ...Platform.select({
            ios: {
              shadowColor: 'rgba(0, 0, 0, 0.44)',
              shadowOffset: { width: 6, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 5,
            },
            android: {
              elevation: 5,
            },
          }),
        }}>
          <Text style={{
            fontSize: 20,
            textAlign: "center",
          }}>{name + "+"}</Text>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Count Stocks</Text>
            </View>
            <View style={styles.oval}>
              <TextInput
                style={styles.input}
                value={sliderValue.toString()}
                onChangeText={handleTextInputChange}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={{
              height: 40,
              backgroundColor: '#F2F2F2',
              borderRadius: 100,
              overflow: "hidden",
              paddingHorizontal: 10,
              marginHorizontal: 10
            }}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={500}
                step={1}
                value={sliderValue}
                minimumTrackTintColor={color}
                thumbTintColor={color}
                trackStyle={styles.track}
                thumbStyle={styles.thumb}
                onValueChange={handleSliderChange}
              />
            </View>
            <View style={{ paddingHorizontal: 10, marginHorizontal: 10 }}>
              <View style={styles.labelsContainer}>
                {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((label) => (
                  <Text key={label} style={styles.labelText}>{label}</Text>
                ))}
              </View>
            </View>
            <View style={{
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10
            }}>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 150,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F2F2F2"
                }}
                onPress={() => {
                  onSavePress()
                }}><Text style={{ color: color }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:20
  },
  titleContainer: {
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10
  },
  oval: {
    width: 40,
    height: 30,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: "blue"
  },
  slider: {
    backgroundColor: '',
    height: 40,
    borderRadius: 100,
    overflow: 'hidden'
    // width: "80%"
  },
  inputContainer: {
    marginTop: 5
  },

  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 30,
  },
  labelText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default SliderComponent;
