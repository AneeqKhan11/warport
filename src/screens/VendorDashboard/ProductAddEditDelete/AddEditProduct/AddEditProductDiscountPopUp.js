import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Modal, Colors} from 'react-native-paper'
import { connect } from 'react-redux'
import {
  setAddEditProductDiscountModalToggle,
  setAddEditProductDiscountPrice,
  setAddEditProductDiscountQuantity,
} from '../../../../store/actions/AddEditProductActions'
import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../../../context/Localization'
import TextInput from '../../../../components/TextInput'
import LoadingButton from '../../../../components/LoadingButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import { productDiscountPriceValidator } from '../../../../helpers/productDiscountPriceValidator'
import { productDiscountQuantityValidator } from '../../../../helpers/productDiscountQuantityValidator'
import DropDown from "react-native-paper-dropdown";

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
  },
  modalInnerContainer: {
    marginHorizontal: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  modalContainerStyle: {
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
  },
  textInputMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signText: {
    fontSize: 50,
    marginHorizontal: 5,
    textAlignVertical: 'center',
  },
  closeIcon: {
    marginTop: 5,
    marginBottom: 10,
  },
  percentageSymbol:{
    textAlignVertical:"center",
    fontSize:20,
    marginLeft:5
  }
})

function AddEditProductDiscountPopUp(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [selectedUom, setSelectedUom] = useState('');
  const [discountQuantity, setDiscountQuantity] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(0)
  const dropdownRef1 = useRef(null)
  const [showPercentDropDown, setShowPercentDropDown] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false);
  const [percentList, setPercentList] = useState([])
  const uomList = [
    {
        label:"Meter",
        value:"Meter"
    },
    {
        label:"PCs",
        value:"PCs"
    },
    {
        label:"Kg",
        value:"Kg"
    },
    {
        label:"Dzn",
        value:"Dzn"
    },
    {
        label:"Box",
        value:"Box"
    },
    {
        label:"CTN",
        value:"CTN"
    },
    {
        label:"Ft",
        value:"Ft"
    },
    {
        label:"Inch",
        value:"Inch"
    }
]

useEffect(()=>{
  for (let i=1; i<100; i++){
    let StringValue = String(i)
    setPercentList(old => [...old,{label:StringValue,value:StringValue}])
  }
},[])

  const onSavePressed = async () => {
    const discountPriceError = productDiscountPriceValidator(discountPrice)
    const discountQuantityError =
      productDiscountQuantityValidator(discountQuantity)

    if (discountPriceError || discountQuantityError) {
      props.setAddEditProductDiscountQuantity({
        value: '',
        error: discountQuantityError,
      })

      props.setAddEditProductDiscountPrice({
        value: '',
        error: discountPriceError,
      })
      return
    }
    props.setAddEditProductDiscountQuantity({
      value: discountQuantity,
      error: '',
    })
    props.setAddEditProductDiscountPrice({
      value: discountPrice,
      error: '',
    })
    props.setAddEditProductDiscountModalToggle(false)
  }

  useEffect(() => {
    if (props.addEditProductDiscountModalToggle) {
      setDiscountQuantity(props.addEditProductDiscountQuantity.value)
      setDiscountPrice(props.addEditProductDiscountPrice.value)
    }
  }, [props.addEditProductDiscountModalToggle])

  return (
    <Modal
      visible={props.addEditProductDiscountModalToggle}
      dismissable={true}
      contentContainerStyle={styles.modalContainerStyle}
    >
      <View style={styles.modalInnerContainer}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() => {
            props.setAddEditProductDiscountModalToggle(false)
          }}
        >
          <Icon
            name="arrow-left"
            style={styles.closeIcon}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
        <Text style={{fontSize:24, color:'white', backgroundColor:'#449bb6', marginLeft:20, paddingTop:3, paddingHorizontal:5, borderRadius:5}}>{translation("Discount Box")}</Text>
        </View>
        <View style={styles.textInputMainContainer}>
          <TextInput
            label={translation('Quantity')}
            keyboardType={'numeric'}
            containerStyle={[styles.textInputContainer, styles.textField]}
            value={discountQuantity}
            error={!!props.addEditProductDiscountQuantity.error}
            errorText={translation(props.addEditProductDiscountQuantity.error)}
            onChangeText={(text) => {
              setDiscountQuantity(text.replace(/[^0-9]/g, ''))
              props.setAddEditProductDiscountQuantity({
                value: props.addEditProductDiscountQuantity,
                error: '',
              })

              props.setAddEditProductDiscountPrice({
                value: props.addEditProductDiscountPrice,
                error: '',
              })
              
            }}
          />
        <View style={{marginTop:8,marginLeft:20}}>
        <DropDown
                ref={dropdownRef1}
                label={"UOM"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={selectedUom}
                setValue={setSelectedUom}
                list={uomList}
          />
        </View>
          <Text style={styles.signText}>∝</Text>
          <View style={{marginTop:8,marginLeft:20}}>
            <DropDown
                    label={"%"}
                    mode={"outlined"}
                    visible={showPercentDropDown}
                    error={!!props.addEditProductDiscountPrice.error}
                    errorText={translation(props.addEditProductDiscountPrice.error)}
                    showDropDown={() => setShowPercentDropDown(true)}
                    onDismiss={() => setShowPercentDropDown(false)}
                    value={discountPrice}
                    setValue={(text)=>{
                      setDiscountPrice(text.replace(/[^0-9]/g, ''))
                      props.setAddEditProductDiscountQuantity({
                        value: props.addEditProductDiscountQuantity,
                        error: '',
                      })
        
                      props.setAddEditProductDiscountPrice({
                        value: props.addEditProductDiscountPrice,
                        error: '',
                      })}}
                    list={percentList}
              />
          </View>
          <TextInput
            label={translation('Percentage')}
            keyboardType={'numeric'}
            containerStyle={[styles.textInputContainer, styles.textField]}
            value={discountPrice}
            error={!!props.addEditProductDiscountPrice.error}
            errorText={translation(props.addEditProductDiscountPrice.error)}
            onChangeText={(text) => {
              setDiscountPrice(text.replace(/[^0-9]/g, ''))
              props.setAddEditProductDiscountQuantity({
                value: props.addEditProductDiscountQuantity,
                error: '',
              })

              props.setAddEditProductDiscountPrice({
                value: props.addEditProductDiscountPrice,
                error: '',
              })
            }}
          /><Text style={styles.percentageSymbol}>%</Text>
        </View>
        <LoadingButton
          onPress={onSavePressed}
          style={styles.submitButton}
          mode="contained"
        >
          {translation('Save')}
        </LoadingButton>
      </View>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  return { ...state.AddEditProductReducer }
}
export default connect(mapStateToProps, {
  setAddEditProductDiscountModalToggle,
  setAddEditProductDiscountPrice,
  setAddEditProductDiscountQuantity,
})(AddEditProductDiscountPopUp)
