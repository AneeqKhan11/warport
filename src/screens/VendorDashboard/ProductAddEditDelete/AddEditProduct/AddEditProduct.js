import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Image,
  BackHandler,
} from 'react-native'
import { connect } from 'react-redux'
import BackButtonWithLanguageMenu from '../../../../components/BackButtonWithLanguageMenu'
import Background from '../../../../components/Background'
import LoadingButton from '../../../../components/LoadingButton'
import ProductsSlider from '../../../../components/ProductsSlider'
import { Button, Colors, Text } from 'react-native-paper'
import DropdownTwo from "../../../DropdownTwo";
import {
  setAddEditProductImages,
  setAddEditProductActiveSliderThumbnail,
  setAddEditProductCategoryB,
  setAddEditProductCategoryC,
  setAddEditProductProductColor,
  setAddEditProductTitle,
  setAddEditProductPrice,
  setAddEditProductDiscountModalToggle,
  setAddEditProductDiscountQuantity,
  setAddEditProductDiscountPrice,
  setAddEditProductDescription,
  setAddEditProductLoading,
  setAddEditProductLoadingPercentage,
  setAddEditProductReset,
} from '../../../../store/actions/AddEditProductActions'
import AppIntroSlider from 'react-native-app-intro-slider';
import { setCustomerQueryFormProductDetailsAdded } from '../../../../store/actions/CustomerQueryFormActions'
import TextInput from '../../../../components/TextInput'
import BackButtonWithTitleAndComponent from '../../../../components/BackButtonWithTitleAndComponent'
import ProductCategoryPopUp from '../ProductCategoryPopUp'
import AutoCompleteDropDown from '../../../../components/AutoCompleteDropDown'
import BottomDrawerContent from '../../BottomDrawerContent'
import { categoryValidator } from '../../../../helpers/categoryValidator'
import { productTitleValidator } from '../../../../helpers/productTitleValidator'
import { productPriceValidator } from '../../../../helpers/productPriceValidator'
import { productDescriptionValidator } from '../../../../helpers/productDescriptionValidator'
import { useDropdownAlert } from '../../../../context/AlertDropdownContextProvider'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { setVendorBottomDrawerToggle } from '../../../../store/actions/VendorBottomDrawerActions'
import ImagePicker from 'react-native-image-crop-picker'
import _ from 'lodash'
import config from '../../../../../config.json'
import axios from 'axios'
import mime from 'mime'
import CircularProgressOverlay from '../../../../components/CircularProgressOverlay'
import { ProductsRefreshContext } from '../../../../context/ProductsRefreshContextProvider'
import CategoryBAutoCompleteDropDown from './CategoryBAutoCompleteDropDown'
import CategoryCAutoCompleteDropDown from './CategoryCAutoCompleteDropDown'
import { useTranslation } from '../../../../context/Localization'
import ColorPickerMenu from '../../../../components/ColorPicker/ColorPickerMenu'
import AddEditProductDiscountPopUp from './AddEditProductDiscountPopUp'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../../../core/theme';
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import AlertView from '../../../../context/AlertView';
import Tooltip from 'react-native-walkthrough-tooltip';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getData, saveData } from '../../../../auth/AsyncStorage';
import { getValue, setValue1 } from '../../../../auth/LocalStorage';
import CustomDropDown from '../../../../components/customDropdowm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  title: {
    marginTop: 0,
  },
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  scrollContentContainer: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 10,
  },
  submitButton: {
    width: 200,
    minWidth: 55,
    minHeight: 40,
    alignSelf: 'center',
    borderRadius: 5
  },
  submitButton1: {
    width: 80,
    minWidth: 55,
    minHeight: 10,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 40
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  submitButtonText: {
    marginHorizontal: 0,
    fontSize: 13,
    paddingHorizontal: 0,
    height: 25,
  },
  submitButtonText1: {
    marginHorizontal: 0,
    fontSize: 13,
    paddingHorizontal: 0,
    height: 25,
  },

  submitButtonContent: {
    height: 30,
    width: 200
  },
  priceSaleInputContainer: {},
  descriptionInputContainer: {
    flexGrow: 1,
    minHeight: 140,
    maxHeight: 'auto',
    borderRadius: 0
  },
  descriptionInput: {
    flexGrow: 1,
    height: null,
    maxHeight: null,
  },
  textInputPriceContainer: {
    width: '30%',
  },
  textField: {
    marginVertical: 0,
    marginTop: 70,
  },
  titleTextField: {
    flex: 1,
    width: 'auto',
    borderRadius: 5,
  },
  colorPickerContainer: {
    flexDirection: 'row',
    marginRight: 10
  },
  discountModalButtonContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: "center",

    marginBottom: 20
  },
  discountModalButtonLabel: {
    fontSize: 15,

  },
  discountModalButton: {
    maxWidth: "70%",
    borderRadius: 5
  },
  discountDiscription: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  discountCalculationText: {
    fontSize: 12,
  },
  formContainer: {
    paddingRight: 15,
    paddingLeft: 15,
    height: "100%",
  },
  selectCategoryBtn: {
    marginTop: 18,
    padding: 10,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    flex: 1,
    alignItems: "center",
  },
  selectCategoryBtnText: {
    fontSize: 15,
    color: Colors.white
  },
  aCategoryText: {
    marginBottom: -15,
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold'
  },
  contentStyle: {
    padding: 20,
    color: 'black',
  },
  priceTextField: {
    marginVertical: 0,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 0
  },
  // aCategoryText1:{
  //   marginBottom:-15,
  //   marginTop:20,
  //   fontSize:14,
  //   fontWeight:'bold',
  //   color:theme.colors.primary
  // }
})

function AddEditProduct(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const navigation = useNavigation();
  const [firstShow, setFirstShow] = useState(false)
  const [ok, setok] = useState(true)
  const [success, setSuccess] = useState(false)
  const [back, setBack] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [aCategory, setAcategory] = useState()
  const [toolTipVisible1, setToolTipVisible1] = useState(false)
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [modelNumber, setModelNumber] = useState("")
  const [batchNumber, setBatchNumber] = useState("")
  const [value, setValue] = useState(1)
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedUom, setSelectedUom] = useState("");
  const [stock, setStock] = useState("")
  const [price2, setPrice2] = useState(0)
  const [exitAlert, setExitAlert] = useState(false)
  const [showSlider, setShowSlider] = useState(true)
  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' },
    { label: 'Custom', value: 'Custom' },
  ];
  const [selectedColor, setSelectedColor] = useState([]);
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
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
  const { productsData, requestProductsRefresh, productsDataLoading } =
    useContext(ProductsRefreshContext)
  const env = process.env.NODE_ENV
  const config_ = config[env]

  const addImagePathToAddProductScreen = (path) => {
    var cloneArray = _.cloneDeep(props.addEditProductImages)
    cloneArray[props.addEditProductActiveSliderThumbnail] = path
    props.setAddEditProductImages(cloneArray)
  }

  const getACategoriesQuery = gql`
  query get_a_categories {
    get_a_categories {
      id
      name
    }
  }
`
  let [
    getACategories,
    {
      loading: getACategoriesQueryLoading,
      error: getACategoriesQueryError,
      data: getACategoriesQueryResult,
    },
  ] = useLazyQuery(getACategoriesQuery, {
    fetchPolicy: 'network-only',
  })


  useEffect(() => {
    if (
      getACategoriesQueryResult &&
      getACategoriesQueryResult.get_a_categories
    ) {
      getACategoriesQueryResult.get_a_categories.map((item) => {
        if (item.id == props.userAuthData.category_a_id) {
          setAcategory(item.name)
        }
      })
    }

  }, [getACategoriesQueryResult])

  useEffect(() => {
    getACategories()
  }, [])

  useEffect(() => {
    let shown = getValue()
    if (value == 1 && (shown == 1 || shown == undefined) && firstShow) {
      setToolTipVisible1(true)
    } else if (value == 2) {
      setToolTipVisible2(true)
    } else if (value == 3) {
      setToolTipVisible3(true)
    } else if (value == 4) {
      setToolTipVisible4(true)
    } else if (value == 5) {
      setToolTipVisible5(true)
      setValue1(0)
    }

  }, [value, firstShow])

  const setVal = () => {
    setFirstShow(true)
  }

  const handleAcatPopUpClose = () => {
    setFirstShow(true)
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    // setExitAlert(!alertVisible)
    navigation.goBack()
    return true
  })

  useEffect(() => {
    if (props.route && props.route.params && props.route.params.editItemData) {
      var alreadyAddedMedia = JSON.parse(
        props.route.params.editItemData.media_serialized
      )
      props.setAddEditProductImages(
        _.map(
          alreadyAddedMedia,
          (item) =>
            "http://159.223.93.212:5433/uploads" +
            '/' +
            item
        )
      )
      setLength(props.route.params.editItemData.length ? props.route.params.editItemData.length.toString() : 0)
      setWidth(props.route.params.editItemData.width ? props.route.params.editItemData.width.toString() : 0)
      setHeight(props.route.params.editItemData.height ? props.route.params.editItemData.height.toString() : 0)
      setSelectedUom(props.route.params.editItemData.uom ? props.route.params.editItemData.uom : "")
      setBatchNumber(props.route.params.editItemData.batch_number ? props.route.params.editItemData.batch_number : "")
      setModelNumber(props.route.params.editItemData.model_number ? props.route.params.editItemData.model_number : "")
      setPrice2(props.route.params.editItemData.price2 ? props.route.params.editItemData.price2.toString() : 0)
      setStock(props.route.params.editItemData.stock ? props.route.params.editItemData.stock.toString() : 0)

      props.setAddEditProductCategoryB({
        value: props.route.params.editItemData.category_b_id.toString(),
        error: '',
      })
      props.setAddEditProductCategoryC({
        value: props.route.params.editItemData.category_c_id.toString(),
        error: '',
      })
      if (props.route.params.editItemData.product_color) {
        props.setAddEditProductProductColor(
          props.route.params.editItemData.product_color.toString()
        )
      }

      if (props.route.params.editItemData.title) {
        props.setAddEditProductTitle({
          value: props.route.params.editItemData.title,
          error: '',
        })
      }
      if (props.route.params.editItemData.price1) {
        props.setAddEditProductPrice({
          value: props.route.params.editItemData.price1.toString(),
          error: '',
        })
      }
      if (props.route.params.editItemData.discount_quantity) {
        props.setAddEditProductDiscountQuantity({
          value: props.route.params.editItemData.discount_quantity.toString(),
          error: '',
        })
      }
      if (props.route.params.editItemData.discount_price) {
        props.setAddEditProductDiscountPrice({
          value: props.route.params.editItemData.discount_price.toString(),
          error: '',
        })
      }
      if (props.route.params.editItemData.description) {
        props.setAddEditProductDescription({
          value: props.route.params.editItemData.description,
          error: '',
        })
      }

    }
  }, [])

  const validateAll = () => {
    const categoryAError = categoryValidator(
      aCategory
    )
    const categoryBError = categoryValidator(
      props.addEditProductCategoryB.value
    )
    const categoryCError = categoryValidator(
      props.addEditProductCategoryC.value
    )
    // const titleError = productTitleValidator(props.addEditProductTitle.value)
    // const priceError = productPriceValidator(props.addEditProductPrice.value)
    // const descriptionError = productDescriptionValidator(
    //   props.addEditProductDescription.value
    // )
    if (
      categoryBError ||
      categoryCError
      // titleError ||
      // priceError ||
      // descriptionError
    ) {
      props.setAddEditProductCategoryB({
        value: props.addEditProductCategoryB.value,
        error: categoryBError,
      })
      props.setAddEditProductCategoryC({
        value: props.addEditProductCategoryC.value,
        error: categoryCError,
      })

      // props.setAddEditProductTitle({
      //   value: props.addEditProductTitle.value,
      //   error: titleError,
      // })
      // props.setAddEditProductPrice({
      //   value: props.addEditProductPrice.value,
      //   error: priceError,
      // })

      // props.setAddEditProductDescription({
      //   value: props.addEditProductDescription.value,
      //   error: descriptionError,
      // })

      return
    }
    console.log(props.addEditProductImages.length)
    if (props.addEditProductImages.length == 0) {
      setAlertMessage('Must attach atleast 1 product image')
      setAlertVisible(!alertVisible)
      return
    }
    return true
  }
  const onEditPressed = () => {
    if (validateAll()) {
      props.setAddEditProductLoadingPercentage(0)
      props.setAddEditProductLoading(true)

      const formData = new FormData()
      var productFilenames = []
      props.addEditProductImages.map((image) => {
        const trimmedImageURI =
          Platform.OS === 'android' ? image : image.replace('file://', '')
        var fileName = trimmedImageURI.split('/').pop()
        var customName =
          props.userAuthData.company_name +
          '_' +
          props.addEditProductTitle.value +
          '_' +
          Date.now() +
          '_' +
          fileName
        if (image.startsWith('file://')) {
          fileName = customName
          formData.append('images', {
            name: customName,
            type: mime.getType(trimmedImageURI),
            uri: image,
          })
        }
        productFilenames.push(fileName)
      })
      formData.append('product_id', props.route.params.editItemData.id)
      formData.append('product_filenames', JSON.stringify(productFilenames))
      formData.append('product_user_id', props.userAuthData.id)
      formData.append('product_category_b', props.addEditProductCategoryB.value)
      formData.append('product_category_c', props.addEditProductCategoryC.value)
      if (props.addEditProductProductColor) {
        formData.append('product_color', props.addEditProductProductColor)
      } else {
        formData.append('product_color', "blue")
      }
      formData.append('product_title', props.addEditProductTitle.value)
      if (props.addEditProductPrice.value) {
        formData.append('price1', props.addEditProductPrice.value)
      }
      if (props.addEditProductDiscountQuantity.value) {
        formData.append(
          'product_discount_quantity',
          props.addEditProductDiscountQuantity.value
        )
      }
      if (props.addEditProductDiscountPrice.value) {
        formData.append(
          'product_discount_price',
          props.addEditProductDiscountPrice.value
        )
      }
      formData.append(
        'product_description',
        props.addEditProductDescription.value
      )
      formData.append('discount_percentage', props.addEditProductDiscountPrice.value / 100)
      formData.append('price2', parseInt(price2))
      formData.append('uom', selectedUom)
      formData.append('model_number', modelNumber)
      formData.append('batch_number', batchNumber)
      formData.append('stock', parseInt(stock))
      formData.append('length', length ? parseInt(length) : 0)
      formData.append('width', width ? parseInt(width) : 0)
      formData.append('height', height ? parseInt(height) : 0)
      axios({
        method: 'POST',
        url: "http://159.223.93.212:5433" + '/upload_edit',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          props.setAddEditProductLoadingPercentage(percentCompleted)
        },
      })
        .then((response) => {
          if (response.status === 200) {
            requestProductsRefresh(props.userAuthData.id)
            setAlertMessage('Product edit successfully.')
            setSuccess(true)
            setAlertVisible(true)
            // alertWithType(
            //   'success',
            //   'WarePort Success',
            //   translation('Product edit successfully.')
            // )
            props.setAddEditProductReset()
            props.navigation.goBack()
          } else {
            setAlertMessage('Error while updating product. Try again.')
            setSuccess(false)
            setok(true)
            setAlertVisible(true)
            // alertWithType(
            //   'error',
            //   'WarePort Error',
            //   translation('Error while updating product. Try again.')
            // )
            props.setAddEditProductLoading(false)
          }
        })
        .catch((e) => {
          setAlertMessage('Error while updating product. Try again.')
          setSuccess(false)
          setok(true)
          setAlertVisible(true)
          // alertWithType(
          //   'error',
          //   'WarePort Error',
          //   translation('Error while updating product. Try again.')
          // )
          props.setAddEditProductLoading(false)
        })
    }
  }
  const onAddPressed = () => {
    if (validateAll()) {
      props.setAddEditProductLoadingPercentage(0)
      props.setAddEditProductLoading(true)
      const formData = new FormData()
      props.addEditProductImages.map((image) => {
        const trimmedImageURI =
          Platform.OS === 'android' ? image : image.replace('file://', '')
        const fileName = trimmedImageURI.split('/').pop()
        formData.append('images', {
          name:
            props.userAuthData.company_name +
            '_' +
            props.addEditProductTitle.value +
            '_' +
            Date.now() +
            '_' +
            fileName,
          type: mime.getType(trimmedImageURI),
          uri: image,
        })
      })
      formData.append('product_user_id', props.userAuthData.id)
      formData.append('product_category_b', props.addEditProductCategoryB.value)
      formData.append('product_category_c', props.addEditProductCategoryC.value)
      if (props.addEditProductProductColor) {
        formData.append('product_color', props.addEditProductProductColor)
      } else {
        formData.append('product_color', "blue")
      }
      formData.append('product_title', props.addEditProductTitle.value)
      if (props.addEditProductPrice.value) {
        formData.append('price1', props.addEditProductPrice.value)
      }
      if (props.addEditProductDiscountQuantity.value) {
        formData.append(
          'product_discount_quantity',
          props.addEditProductDiscountQuantity.value
        )
      }
      if (props.addEditProductDiscountPrice.value) {
        formData.append(
          'product_discount_price',
          props.addEditProductDiscountPrice.value
        )
      }
      formData.append(
        'product_description',
        props.addEditProductDescription.value
      )
      formData.append('discount_percentage', props.addEditProductDiscountPrice.value / 100)
      formData.append('price2', parseInt(price2))
      formData.append('uom', selectedUom)
      formData.append('model_number', modelNumber)
      formData.append('batch_number', batchNumber)
      formData.append('stock', parseInt(stock))
      formData.append('length', length ? parseInt(length) : 0)
      formData.append('width', width ? parseInt(width) : 0)
      formData.append('height', height ? parseInt(height) : 0)
      axios({
        method: 'POST',
        url: "http://159.223.93.212:5433" + '/upload_add',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          props.setAddEditProductLoadingPercentage(percentCompleted)
        },
      })
        .then((response) => {
          if (response.status === 200) {
            if (
              props.route &&
              props.route.params &&
              props.route.params.addInCustomerQueryFormProductDetailsAdded
            ) {
              props.navigation.goBack()
              props.customerQueryFormProductDetailsAdded.splice(
                0,
                0,
                response.data.product
              )
              props.setCustomerQueryFormProductDetailsAdded(
                _.cloneDeep(props.customerQueryFormProductDetailsAdded)
              )
            }

            requestProductsRefresh(props.userAuthData.id)
            setAlertMessage('Product added successfully.')
            setSuccess(true)
            setAlertVisible(true)
            // alertWithType(
            //   'success',
            //   'WarePort Success',
            //   translation('Product added successfully.')
            // )
            props.setAddEditProductReset()
            setStock("")
            props.navigation.goBack()
          } else {
            setAlertMessage('Error while uploading product. Try again. You can try different A and B categories for your C category')
            setSuccess(false)
            setok(true)
            setAlertVisible(true)
            // alertWithType(
            //   'error',
            //   'WarePort Error',
            //   translation('Error while uploading product. Try again. You can try different A and B categories for your C category')
            // )
            props.setAddEditProductLoading(false)

          } s
        })
        .catch((error) => {
          // console.log('Error:', error)
          // alertWithType(
          //   'error',
          //   'WarePort Error',
          //   translation('Error while uploading product. Try again.')
          // )
          props.setAddEditProductLoading(false)
        })
    } else {
      setAlertMessage("Add product Stock or select B and C categories to save the product")
      setSuccess(false)
      setok(true)
      setAlertVisible(true)
    }
    // props.setAddEditProductReset()
    // setStock("")
  }
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  const slides = [
    {
      key: 1,
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      // image: require('./assets/1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Title 2',
      text: 'Other cool stuff',
      // image: require('./assets/2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      // image: require('./assets/3.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];

  const handleDisplayAppIntro = () => {
    AsyncStorage.setItem("showSlider", JSON.stringify(showSlider))
  }


  return (
    <>{!showSlider ?
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        showSkipButton={true}
        onDone={() => { setShowSlider(false) }}
        onSkip={() => { setShowSlider(false) }}
      />
      :
      <BottomSheetModalProvider>
        <ScrollView style={styles.mainContainer}>

          {
            alertVisible && <AlertView message={alertMessage} back={back} ok={ok} success={success} visible={setAlertVisible}></AlertView>
          }
          {
            exitAlert && <AlertView title={"WarePort Alert"} message={"Are you sure you want to Exit App?"} exit={true}></AlertView>
          }
          <CircularProgressOverlay
            visible={props.addEditProductLoading}
            progressValue={props.addEditProductLoadingPercentage}
            textContent={
              (props.route && props.route.params && props.route.params.editItemData
                ? translation('Updating')
                : translation('Adding')) +
              ' ' +
              translation('products...')
            }
            textStyle={styles.spinnerTextStyle}
          />
          <BackButtonWithTitleAndComponent
            goBack={() => {
              props.navigation.goBack()
              props.setAddEditProductReset()
            }}
            title={
              (props.route && props.route.params && props.route.params.editItemData
                ? translation('Edit')
                : translation('Add')) +
              ' ' +
              translation('Product')

            }
            mainContainers={14}
            headerText={80}
          >
            {props.route &&
              props.route.params &&
              props.route.params.editItemData ? (
              <LoadingButton
                contentStyle={styles.submitButtonContent}
                textStyle={styles.submitButtonText}
                disabled={props.addEditProductLoading}
                loading={props.addEditProductLoading}
                mode="contained"
                onPress={onEditPressed}
                style={styles.submitButton}
              >
                {!props.addEditProductLoading && translation('Edit')}
              </LoadingButton>
            ) : (
              <></>
            )}
          </BackButtonWithTitleAndComponent>


          <View
            style={styles.formContainer}
          >
            {/* <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContentContainer}
          style={styles.scroll}
        > */}
            <View style={{ marginBottom: 100, marginTop: 10 }}>
              <ProductsSlider
                onAddImagePress={() => {
                  props.setVendorBottomDrawerToggle(true)
                }}
                onEditPress={() => {
                  ImagePicker.openCropper({
                    width: 300,
                    height: 400,
                    path: props.addEditProductImages[props.addEditProductActiveSliderThumbnail],
                  }).then((image) => {
                    addImagePathToAddProductScreen(image.path)
                  })
                }}
                onDeletePress={() => {
                  var cloneArray = _.cloneDeep(props.addEditProductImages)

                  cloneArray.splice(props.addEditProductActiveSliderThumbnail, 1)
                  props.setAddEditProductImages(cloneArray)
                }}
                activeTab={props.addEditProductActiveSliderThumbnail}
                activeTabChanged={(i) => {
                  props.setAddEditProductActiveSliderThumbnail(i)
                }}
                imagesArray={props.addEditProductImages}
              />
              <View>
                <TextInput
                  containerStyle={[styles.titleTextField, styles.textField]}
                  placeholder={translation('Enter Product Name')}
                  value={props.addEditProductTitle.value}
                  error={!!props.addEditProductTitle.error}
                  errorText={translation(props.addEditProductTitle.error)}
                  onChangeText={(text) =>
                    props.setAddEditProductTitle({ value: text, error: '' })
                  }
                />
              </View>
              <CustomDropDown
                label={"Select Color :"}
                value={selectedColor}
                list={colorOptions}
                setValue={handleColorChange}
              />

              <TextInput
                multiline={true}
                containerStyle={[
                  styles.descriptionInputContainer,
                ]}
                inputStyle={styles.descriptionInput}
                placeholder={translation('Enter Product Description')}
                value={props.addEditProductDescription.value}
                error={!!props.addEditProductDescription.error}
                errorText={translation(props.addEditProductDescription.error)}
                onChangeText={(text) =>
                  props.setAddEditProductDescription({
                    value: text,
                    error: '',
                  })
                }
              />
              <Text style={{
                fontSize: 14,
                color: 'white',
                backgroundColor: "#000000",
                width: '55%',
                padding: 5,
                marginBottom: 10
              }}>{translation('Product Price Range (PKR)')}</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <TextInput
                  containerStyle={[styles.priceTextField, { width: 150 }]}
                  placeholder={translation('Rs.')}
                  keyboardType={'numeric'}
                  returnKeyType="next"
                  value={props.addEditProductPrice.value}
                  error={!!props.addEditProductPrice.error}
                  errorText={translation(props.addEditProductPrice.error)}
                  onChangeText={(text) =>
                    props.setAddEditProductPrice({ value: text, error: '' })
                  }
                />
                <Text style={{ justifyContent: 'center', alignSelf: 'center', marginHorizontal: 10 }}>To</Text>
                <TextInput
                  disabled={false}
                  containerStyle={[styles.priceTextField, { width: 150 }]}
                  placeholder={translation('Rs.')}
                  keyboardType={'numeric'}
                  returnKeyType="next"
                  value={price2}
                  onChangeText={(text) =>
                    setPrice2(text)
                  }
                />
              </View>
              <View style={[styles.discountModalButtonContainer, props.addEditProductDiscountQuantity.value != '' &&
                props.addEditProductDiscountPrice.value != '' ? null : { marginTop: 6 }]}>
                {props.addEditProductDiscountQuantity.value != '' &&

                  props.addEditProductDiscountQuantity.value > 0 &&
                  props.addEditProductDiscountPrice.value != '' &&
                  props.addEditProductDiscountPrice.value > 0
                  && (
                    <View style={styles.discountDiscription}>
                      <Text
                        style={styles.discountCalculationText}
                      >{`Discount Qty >= ${props.addEditProductDiscountQuantity.value
                        } Price = ${props.addEditProductPrice.value -
                        (props.addEditProductPrice.value *
                          props.addEditProductDiscountPrice.value) /
                        100
                        }`}</Text>
                    </View>
                  )}
                <Button
                  mode="contained"
                  style={styles.discountModalButton}
                  labelStyle={styles.discountModalButtonLabel}
                  onPress={() => {
                    props.setAddEditProductDiscountModalToggle(true);
                  }}
                >
                  {`${props.addEditProductDiscountQuantity.value != '' &&
                    props.addEditProductDiscountQuantity.value > 0 &&
                    props.addEditProductDiscountPrice.value != ''
                    &&
                    props.addEditProductDiscountPrice.value > 0
                    ? 'Edit'
                    : 'Add'
                    } Discount`}
                </Button>
              </View>
              <DropdownTwo
                placeholder={"UOM"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={selectedUom}
                setValue={setSelectedUom}
                list={uomList}
                style={{
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  height: 50,
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
              />

              <TextInput
                containerStyle={styles.titleTextField}
                placeholder={translation('Enter Model Number')}
                returnKeyType="next"
                value={modelNumber}
                onChangeText={(text) =>
                  setModelNumber(text)
                }
              />
              <TextInput
                containerStyle={styles.titleTextField}
                placeholder={translation('Enter Batch Number')}
                returnKeyType="next"
                value={batchNumber}
                onChangeText={(text) =>
                  setBatchNumber(text)
                }
              />

              <ProductCategoryPopUp getACategories={getACategories} value={false} setVal={setVal} />
              <CategoryBAutoCompleteDropDown route={props.route} />
              <CategoryCAutoCompleteDropDown route={props.route} />

              <TextInput
                containerStyle={[styles.titleTextField]}
                label={translation('Enter Product Stock')}
                keyboardType='numeric'
                value={stock}
                // error={stock==""}
                // errorText={stock =="" ? "Stock cannot be zero or empty":""}
                onChangeText={(text) =>
                  setStock(text)
                }
              />
              <LoadingButton
                contentStyle={styles.submitButtonContent}
                textStyle={styles.submitButtonText}
                disabled={props.addEditProductLoading}
                loading={props.addEditProductLoading}
                mode="contained"
                onPress={onAddPressed}
                style={styles.submitButton}
              >
                {!props.addEditProductLoading && translation('Save')}
              </LoadingButton>

              <View style={{
                alignItems: 'center',
              }}>
                <Text style={{
                  marginTop: 15,
                  fontSize: 14,
                  color: 'white',
                  backgroundColor: "#000000",
                  width: '30%',
                  padding: 10,
                  textAlign: 'center'
                }}>Optional</Text>
              </View>
              <View style={{
                alignItems: 'center'
              }}>
                <TextInput
                  keyboardType='numeric'
                  containerStyle={[styles.titleTextField, { width: "100%" }]}
                  placeholder={translation('Enter Length')}
                  returnKeyType="next"
                  value={length}
                  onChangeText={(text) =>
                    setLength(text)
                  }
                />
                <TextInput
                  keyboardType='numeric'
                  containerStyle={[styles.titleTextField, { width: "100%" }]}
                  placeholder={translation('Enter Width')}
                  returnKeyType="next"
                  value={width}
                  onChangeText={(text) =>
                    setWidth(text)
                  }
                />
                <TextInput
                  containerStyle={[styles.titleTextField, { width: "100%" }]}
                  placeholder={translation('Enter Height')}
                  keyboardType='numeric'
                  returnKeyType="next"
                  value={height}
                  onChangeText={(text) =>
                    setHeight(text)
                  }
                />
              </View>
            </View>
          </View>
          {/* <BottomDrawerContent
          onCameraPress={() => {
            //props.setVendorBottomDrawerIndex(1)
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
              freeStyleCropEnabled: true,
            }).then((image) => {
              addImagePathToAddProductScreen(image.path)
            })

            props.setVendorBottomDrawerToggle(false)
          }}
          onGalleryPress={() => {
            ImagePicker.openPicker({
              multiple: true,
              cropping: true,
              maxFiles: 7,
              cropping: true,
              freeStyleCropEnabled: true,
            }).then((response) => {
              if (response.length < 8) {
                var cloneArray = _.cloneDeep(props.addEditProductImages)
                response.map((image, index) => {
                  if (cloneArray.length == 0) {
                    cloneArray[index] = image.path
                  } else if (response.length == 1) {
                    cloneArray[props.addEditProductActiveSliderThumbnail] = image.path
                  } else {
                    cloneArray[props.addEditProductActiveSliderThumbnail + index] = image.path
                  }
                })
                props.setAddEditProductImages(cloneArray)
              } else {
                // Alert.alert("Max images", "You can upload maximum 7 images")
                setAlertMessage('Must attach atleast 1 product image')
                setAlertVisible(true)
              }
            })
            props.setVendorBottomDrawerToggle(false)
          }}
          navigation={props.navigation}
        /> */}
          <AddEditProductDiscountPopUp />
        </ScrollView>
      </BottomSheetModalProvider>

    }</>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state.AddEditProductReducer,
    ...state.UserAuthDataReducer,
    ...state.CustomerQueryFormReducer,
  }
}
export default connect(mapStateToProps, {
  setAddEditProductImages,
  setAddEditProductActiveSliderThumbnail,
  setAddEditProductCategoryB,
  setAddEditProductCategoryC,
  setAddEditProductProductColor,
  setAddEditProductTitle,
  setAddEditProductPrice,
  setAddEditProductDiscountModalToggle,
  setAddEditProductDiscountQuantity,
  setAddEditProductDiscountPrice,
  setAddEditProductDescription,
  setAddEditProductLoading,
  setAddEditProductLoadingPercentage,
  setAddEditProductReset,
  setVendorBottomDrawerToggle,
  setCustomerQueryFormProductDetailsAdded,
})(AddEditProduct)
