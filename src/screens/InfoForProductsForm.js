import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native'
import { RadioButton, Divider, TextInput as Input } from 'react-native-paper'
import Background from '../components/Background'
import BackButtonWithTitleAndComponent from '../components/BackButtonWithTitleAndComponent'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import {
  setInfoForProductsFormValueCodeId,
  setInfoForProductsFormName,
  setInfoForProductsFormProductCategory,
  setInfoForProductsFormUOM,
  setInfoForProductsFormLength,
  setInfoForProductsFormWidth,
  setInfoForProductsFormHeight,
  setInfoForProductsFormBrand,
  setInfoForProductsFormVendor,
  setInfoForProductsFormSOUM,
  setInfoForProductsFormUnits,
  setInfoForProductsFormCaseWeight,
  setInfoForProductsFormManufactureName,
  setInfoForProductsFormProductPrice,
  setInfoForProductsFormLoading,
  setInfoForProductsFormReset,
} from '../store/actions/InfoForProductsFormActions'
import LoadingButton from '../components/LoadingButton'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { useDropdownAlert } from '../context/AlertDropdownContextProvider'
import { useTranslation } from '../context/Localization'
import PhoneNumberInput from '../components/PhoneNumberInput'
import TextInput from '../components/TextInput'
import { formRequiredFieldValidator } from '../helpers/formRequiredFieldValidator'
import { languages } from '../context/Localization/languages'
import ListProduct from './CustomerQueryForm/ListProduct'
import { useNavigation } from '@react-navigation/native'
import CustomerQueryFormProductList from './CustomerQueryForm/CustomerQueryFormProductList'
import DropDown from "react-native-paper-dropdown";
import AlertView from '../context/AlertView'
import DropdownTwo from './DropdownTwo'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    marginTop: 0,
  },
  textField: {
    marginVertical: 0,
    marginTop: 20,
    borderRadius: 5,
    height: 40,
  },
  submitButton: {
    borderRadius: 5,
    marginTop: 40,
    height: 45
  },
  submitButtonText: {
    marginHorizontal: 0,
    fontSize: 13,
    paddingHorizontal: 0,
    // height: 25,
  },
  submitButtonContent: {
  },
  formFieldTitle: {
    paddingVertical: 5,
    fontSize: 17,
    marginHorizontal: 10,
  },
  scroll: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 40
  },
  scrollContentContainer: {
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
})

function InfoForProductsForm(props) {
  const { translation } = useTranslation()
  const { alertWithType } = useDropdownAlert()
  const [selectedUom, setSelectedUom] = useState('');
  const [cCatId, setCcatId] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showDropDown, setShowDropDown] = useState(false);
  const uomList = [
    {
      label: "Meter",
      value: "Meter"
    },
    {
      label: "PCs",
      value: "PCs"
    },
    {
      label: "Kg",
      value: "Kg"
    },
    {
      label: "Dzn",
      value: "Dzn"
    },
    {
      label: "Box",
      value: "Box"
    },
    {
      label: "CTN",
      value: "CTN"
    },
    {
      label: "Ft",
      value: "Ft"
    },
    {
      label: "Inch",
      value: "Inch"
    }
  ]
  const navigation = useNavigation()
  const handleBackPress = () => {
    props.navigation.goBack()
    return true
  }

  const getCCategoriesQuery = gql`
  query get_c_category($c_category_id: String!) {
    get_c_category(c_category_id: $c_category_id) {
      id
      name
    }
  }
`
  let [
    getCCategories,
    {
      loading: getCCategoriesQueryLoading,
      error: getCCategoriesQueryError,
      data: getCCategoriesQueryResult,
    },
  ] = useLazyQuery(getCCategoriesQuery, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    console.log(getCCategoriesQueryResult)
    if (
      getCCategoriesQueryResult &&
      getCCategoriesQueryResult.get_c_category
    ) {
      props.setInfoForProductsFormProductCategory({
        value: getCCategoriesQueryResult.get_c_category[0].name,
        error: "",
      })
      console.log(getCCategoriesQueryResult.get_c_category[0].name)
    }
  }, [getCCategoriesQueryResult, cCatId])


  // const findCategoryNameById = (id) => {
  //   if (cCategories.length > 0) {
  //     const category = cCategories.find((category) => category.id === id);
  //     return category ? category.name : null;
  //   }
  //   return null;
  // };

  BackHandler.addEventListener('hardwareBackPress', handleBackPress)

  let addInfoForProductsFormsMutation = gql`
    mutation add_info_for_products_forms(
      $value_code_id: String
      $name: String
      $product_category: String
      $uom: String
      $length: String
      $width: String
      $height: String
      $brand: String
      $vendor: String
      $soum: String
      $units: String
      $case_weight: String
      $manufacture_name: String
      $product_price: String
    ) {
      add_info_for_products_forms(
        value_code_id: $value_code_id
        name: $name
        product_category: $product_category
        uom: $uom
        length: $length
        width: $width
        height: $height
        brand: $brand
        vendor: $vendor
        soum: $soum
        units: $units
        case_weight: $case_weight
        manufacture_name: $manufacture_name
        product_price: $product_price
      ) {
        success
        error
        result
      }
    }
  `

  const [
    addInfoForProductsForms,
    {
      loading: addInfoForProductsFormsMutationLoading,
      error: addInfoForProductsFormsMutationError,
      data: addInfoForProductsFormsMutationResult,
    },
  ] = useMutation(addInfoForProductsFormsMutation)

  useEffect(() => {
    if (addInfoForProductsFormsMutationError) {
      addInfoForProductsFormsMutationError.graphQLErrors.map(
        ({ message }, i) => {
          props.setInfoForProductsFormLoading(false)
          setAlertMessage(message)
          setAlertVisible(true)
          // alertWithType('error', 'WarePort Error', translation(message))
        }
      )
    }
  }, [addInfoForProductsFormsMutationError])

  useEffect(() => {
    if (
      addInfoForProductsFormsMutationResult &&
      addInfoForProductsFormsMutationResult.add_info_for_products_forms
    ) {
      if (
        addInfoForProductsFormsMutationResult.add_info_for_products_forms
          .success
      ) {
        setAlertMessage('Form Saved Successfully')
        setAlertVisible(true)
        props.setInfoForProductsFormReset()
      }
    }
  }, [addInfoForProductsFormsMutationResult])

  const getProductDetails = async (detailsArray) => {
    setCcatId(detailsArray[0].category_c_id)
    console.log(cCatId)
    await getCCategories({
      variables: {
        c_category_id: detailsArray[0].category_c_id,
      },
    })
    props.setInfoForProductsFormValueCodeId({
      value: detailsArray[0].id,
      error: "",
    })
    props.setInfoForProductsFormName({
      value: detailsArray[0].title,
      error: "",
    })
    props.setInfoForProductsFormProductPrice({
      value: "Rs." + String(detailsArray[0].price), error: ""
    })
  }
  const removePressed = () => {
    props.setInfoForProductsFormReset()
  }

  const onSubmitPress = async () => {

    // const infoForProductsFormValueCodeIdError = formRequiredFieldValidator(
    //   props.infoForProductsFormValueCodeId.value
    // )
    // const infoForProductsFormNameError = formRequiredFieldValidator(
    //   props.infoForProductsFormName.value
    // )
    // const infoForProductsFormProductCategoryError = formRequiredFieldValidator(
    //   props.infoForProductsFormProductCategory.value
    // )
    // const infoForProductsFormUOMError = formRequiredFieldValidator(
    //   selectedUom
    // )
    // const infoForProductsFormLengthError = formRequiredFieldValidator(
    //   props.infoForProductsFormLength.value
    // )
    // const infoForProductsFormWidthError = formRequiredFieldValidator(
    //   props.infoForProductsFormWidth.value
    // )
    // const infoForProductsFormHeightError = formRequiredFieldValidator(
    //   props.infoForProductsFormHeight.value
    // )
    // const infoForProductsFormBrandError = formRequiredFieldValidator(
    //   props.infoForProductsFormBrand.value
    // )

    // const infoForProductsFormVendorError = formRequiredFieldValidator(
    //   props.infoForProductsFormVendor.value
    // )
    // const infoForProductsFormSOUMError = formRequiredFieldValidator(
    //   props.infoForProductsFormSOUM.value
    // )
    // const infoForProductsFormUnitsError = formRequiredFieldValidator(
    //   props.infoForProductsFormUnits.value
    // )
    // const infoForProductsFormCaseWeightError = formRequiredFieldValidator(
    //   props.infoForProductsFormCaseWeight.value
    // )
    // // const infoForProductsFormManufactureNameError = formRequiredFieldValidator(
    // //   props.infoForProductsFormManufactureName.value
    // // )
    // const infoForProductsFormProductPriceError = formRequiredFieldValidator(
    //   props.infoForProductsFormProductPrice.value
    // )

    // if (
    //   infoForProductsFormValueCodeIdError ||
    //   infoForProductsFormNameError ||
    //   infoForProductsFormProductCategoryError ||
    //   infoForProductsFormUOMError ||
    //   infoForProductsFormLengthError ||
    //   infoForProductsFormWidthError ||
    //   infoForProductsFormHeightError ||
    //   infoForProductsFormBrandError ||
    //   infoForProductsFormVendorError ||
    //   infoForProductsFormSOUMError ||
    //   infoForProductsFormUnitsError ||
    //   infoForProductsFormCaseWeightError ||
    //   // infoForProductsFormManufactureNameError ||
    //   infoForProductsFormProductPriceError
    // ) {
    //   props.setInfoForProductsFormValueCodeId({
    //     value: props.infoForProductsFormValueCodeId.value,
    //     error: infoForProductsFormValueCodeIdError,
    //   })
    //   props.setInfoForProductsFormName({
    //     value: props.infoForProductsFormName.value,
    //     error: infoForProductsFormNameError,
    //   })
    //   props.setInfoForProductsFormProductCategory({
    //     value: props.infoForProductsFormProductCategory.value,
    //     error: infoForProductsFormProductCategoryError,
    //   })
    //   props.setInfoForProductsFormUOM({
    //     value: selectedUom,
    //     error: infoForProductsFormUOMError,
    //   })

    //   props.setInfoForProductsFormLength({
    //     value: props.infoForProductsFormLength.value,
    //     error: infoForProductsFormLengthError,
    //   })

    //   props.setInfoForProductsFormWidth({
    //     value: props.infoForProductsFormWidth.value,
    //     error: infoForProductsFormWidthError,
    //   })
    //   props.setInfoForProductsFormHeight({
    //     value: props.infoForProductsFormHeight.value,
    //     error: infoForProductsFormHeightError,
    //   })
    //   props.setInfoForProductsFormBrand({
    //     value: props.infoForProductsFormBrand.value,
    //     error: infoForProductsFormBrandError,
    //   })
    //   props.setInfoForProductsFormVendor({
    //     value: props.infoForProductsFormVendor.value,
    //     error: infoForProductsFormVendorError,
    //   })

    //   props.setInfoForProductsFormSOUM({
    //     value: props.infoForProductsFormSOUM.value,
    //     error: infoForProductsFormSOUMError,
    //   })
    //   props.setInfoForProductsFormUnits({
    //     value: props.infoForProductsFormUnits.value,
    //     error: infoForProductsFormUnitsError,
    //   })

    //   props.setInfoForProductsFormCaseWeight({
    //     value: props.infoForProductsFormCaseWeight.value,
    //     error: infoForProductsFormCaseWeightError,
    //   })
    //   // props.setInfoForProductsFormManufactureName({
    //   //   value: props.infoForProductsFormManufactureName.value,
    //   //   error: infoForProductsFormManufactureNameError,
    //   // })
    //   props.setInfoForProductsFormProductPrice({
    //     value: props.infoForProductsFormProductPrice.value,
    //     error: infoForProductsFormProductPriceError,
    //   })
    //   return
    // }

    try {
      props.setInfoForProductsFormLoading(true)
      await addInfoForProductsForms({
        variables: {
          value_code_id: props.infoForProductsFormValueCodeId.value,
          name: props.infoForProductsFormName.value,
          product_category: props.infoForProductsFormProductCategory.value,
          uom: props.infoForProductsFormUOM.value ? props.infoForProductsFormUOM.value : selectedUom,
          length: props.infoForProductsFormLength.value,
          width: props.infoForProductsFormWidth.value,
          height: props.infoForProductsFormHeight.value,
          brand: props.infoForProductsFormBrand.value,
          vendor: props.infoForProductsFormVendor.value,
          soum: props.infoForProductsFormSOUM.value,
          units: props.infoForProductsFormUnits.value,
          case_weight: props.infoForProductsFormCaseWeight.value,
          manufacture_name: props.infoForProductsFormVendor.value,
          product_price: props.infoForProductsFormProductPrice.value,
        },
      })
    } catch (ex) {
      props.setInfoForProductsFormLoading(false)
      setAlertMessage(ex.toString())
      setAlertVisible(true)
      //  alertWithType('error', 'WarePort Error', ex.toString())
    }
  }

  return (
    <ScrollView style={styles.mainContainer}>
      {
        alertVisible && <AlertView message={alertMessage} back={false} ok={true}></AlertView>
      }
      <BackButtonWithTitleAndComponent
        goBack={() => {
          props.setInfoForProductsFormReset()
          props.navigation.goBack()
        }}
        title={translation('Product Specifications')}
        mainContainers={0}
        headerText={30}
      >

      </BackButtonWithTitleAndComponent>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scroll}
      >
        {/* <ListProduct details={getProductDetails} remove={removePressed}/>
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Value (Code ID)')}
          returnKeyType="next"
          value={props.infoForProductsFormValueCodeId.value}
          error={!!props.infoForProductsFormValueCodeId.error}
          errorText={translation(props.infoForProductsFormValueCodeId.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormValueCodeId({ value: text, error: '' })
          }
        />
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Name')}
          returnKeyType="next"
          value={props.infoForProductsFormName.value}
          error={!!props.infoForProductsFormName.error}
          errorText={translation(props.infoForProductsFormName.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormName({ value: text, error: '' })
          }
        /> */}
        {/* <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Product Category')}
          returnKeyType="next"
          value={props.infoForProductsFormProductCategory.value}
          error={!!props.infoForProductsFormProductCategory.error}
          errorText={translation(
            props.infoForProductsFormProductCategory.error
          )}
          onChangeText={(text) =>
            props.setInfoForProductsFormProductCategory({
              value: text,
              error: '',
            })
          }
        /> */}
        <DropdownTwo
          placeholder={"UOM"}
          // mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={selectedUom}
          setValue={setSelectedUom}
          list={uomList}
          style={{
            height: 43,
            backgroundColor:'#FFF',
            borderRadius:5,
            ...Platform.select({
              ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },
              android: {
                elevation: 4,
              },
            }),
          }}
          dropDownStyle={{
            marginTop: 35
          }}
        />
        {/* <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter UOM')}
          returnKeyType="next"
          value={props.infoForProductsFormUOM.value}
          error={!!props.infoForProductsFormUOM.error}
          errorText={translation(props.infoForProductsFormUOM.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormUOM({ value: text, error: '' })
          }
        /> */}
        <TextInput
          keyboardType='numeric'
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Length')}
          returnKeyType="next"
          value={props.infoForProductsFormLength.value}
          error={!!props.infoForProductsFormLength.error}
          errorText={translation(props.infoForProductsFormLength.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormLength({ value: text, error: '' })
          }
        />
        <TextInput
          disabled={props.infoForProductsFormLoading}
          keyboardType='numeric'
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Width')}
          returnKeyType="next"
          value={props.infoForProductsFormWidth.value}
          error={!!props.infoForProductsFormWidth.error}
          errorText={translation(props.infoForProductsFormWidth.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormWidth({ value: text, error: '' })
          }
        />
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Height')}
          keyboardType='numeric'
          returnKeyType="next"
          value={props.infoForProductsFormHeight.value}
          error={!!props.infoForProductsFormHeight.error}
          errorText={translation(props.infoForProductsFormHeight.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormHeight({ value: text, error: '' })
          }
        />
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Model Number')}
          returnKeyType="next"
          value={props.infoForProductsFormBrand.value}
          error={!!props.infoForProductsFormBrand.error}
          errorText={translation(props.infoForProductsFormBrand.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormBrand({ value: text, error: '' })
          }
        />
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Batch Number')}
          returnKeyType="next"
          value={props.infoForProductsFormVendor.value}
          error={!!props.infoForProductsFormVendor.error}
          errorText={translation(props.infoForProductsFormVendor.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormVendor({ value: text, error: '' })
          }
        />
        {/* <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={styles.textField}
          placeholder={translation('Please Enter Manufacturer Name')}
          returnKeyType="next"
          value={props.infoForProductsFormManufactureName.value}
          error={!!props.infoForProductsFormManufactureName.error}
          errorText={translation(
            props.infoForProductsFormManufactureName.error
          )}
          onChangeText={(text) =>
            props.setInfoForProductsFormManufactureName({
              value: text,
              error: '',
            })
          }
        /> */}
        {/* <Text style={{
          marginTop:10,
          fontSize:16,
        }}>Please Enter Product Price Range (PKR)</Text>
        <View style={{flex:1, flexDirection:'row'}}>
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={[styles.textField, {width:150}]}
          placeholder={translation('From')}
          returnKeyType="next"
          value={props.infoForProductsFormProductPrice.value}
          error={!!props.infoForProductsFormProductPrice.error}
          errorText={translation(props.infoForProductsFormProductPrice.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormProductPrice({ value: text, error: '' })
          }
        />
        <Text style={{justifyContent:'center',alignSelf:'center', marginHorizontal:10}}>To</Text>
        <TextInput
          disabled={props.infoForProductsFormLoading}
          containerStyle={[styles.textField, {width:150}]}
          placeholder={translation('To')}
          returnKeyType="next"
          value={props.infoForProductsFormProductPrice.value}
          error={!!props.infoForProductsFormProductPrice.error}
          errorText={translation(props.infoForProductsFormProductPrice.error)}
          onChangeText={(text) =>
            props.setInfoForProductsFormProductPrice({ value: text, error: '' })
          }
        />
        </View> */}
        <LoadingButton
          contentStyle={styles.submitButtonContent}
          textStyle={styles.submitButtonText}
          disabled={props.infoForProductsFormLoading}
          loading={props.infoForProductsFormLoading}
          mode="contained"
          onPress={() => {
            onSubmitPress()
          }}
          style={styles.submitButton}
        >
          {!props.infoForProductsFormLoading && translation('Save')}
        </LoadingButton>
      </ScrollView>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
  return { ...state.InfoForProductsFormReducer, ...state.UserAuthDataReducer }
}
export default connect(mapStateToProps, {
  setInfoForProductsFormValueCodeId,
  setInfoForProductsFormName,
  setInfoForProductsFormProductCategory,
  setInfoForProductsFormUOM,
  setInfoForProductsFormLength,
  setInfoForProductsFormWidth,
  setInfoForProductsFormHeight,
  setInfoForProductsFormBrand,
  setInfoForProductsFormVendor,
  setInfoForProductsFormSOUM,
  setInfoForProductsFormUnits,
  setInfoForProductsFormCaseWeight,
  setInfoForProductsFormManufactureName,
  setInfoForProductsFormProductPrice,
  setInfoForProductsFormLoading,
  setInfoForProductsFormReset,
})(InfoForProductsForm)
