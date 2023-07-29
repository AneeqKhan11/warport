import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, BackHandler, TurboModuleRegistry, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-snap-carousel';
import BackButtonWithTitleAndComponent from '../../../components/BackButtonWithTitleAndComponent'
import { useTranslation } from '../../../context/Localization';
import LoadingButton from '../../../components/LoadingButton';
import axios from 'axios';
import { useDropdownAlert } from '../../../context/AlertDropdownContextProvider';
import SpinnerOverlay from '../../../components/SpinnerOverlay';
import AlertView from '../../../context/AlertView';

const AddSearchProduct = (props) => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const {translation} = useTranslation()
BackHandler.addEventListener('hardwareBackPress',()=>{
    navigation.goBack()
    return true
})
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [images, setImages] = useState([]);
  const [imagesToSend, setImagesToSend] = useState([])
  const { alertWithType } = useDropdownAlert()
  const [success, setSuccess] = useState(false)
  const [alertMessage , setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)

  const handleSubmit = async () =>{
    setLoading(true)
    try{
      const formData = new FormData();
      await formData.append('product_name', productName);
      await formData.append('supplier_name', supplierName);
      await formData.append('product_category', productCategory);
      await formData.append('product_type', productType);
      var productFilenames = []
      imagesToSend.forEach((image, index) => {
        formData.append('images', {
          uri: image.path,
          type: image.mime,
          name: Date.now() +
          '_' +`image_${index}.${image.mime.split('/')[1]}`
        });
        productFilenames.push(Date.now() +
        '_' +`image_${index}.${image.mime.split('/')[1]}`)
      });
      await formData.append('media_serialized', productFilenames);
      await axios({
        method: 'POST',
        url: "http://159.223.93.212:5433" + '/upload_search',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      })
        setAlertMessage('Data Saved Successfully')
        setSuccess(true)
        setAlertVisible(true)
        // alertWithType('success', 'WarePort Success', 'Data Saved Successfully')
        setProductName('')
        setImages([])
        setImagesToSend([])
        setProductCategory('')
        setProductType('')
        setSupplierName('')
        setLoading(false)
    }catch(error){
        setAlertMessage('Data Saved Successfully, It will take some time to show')
        setSuccess(true)
        setAlertVisible(true)
        // alertWithType('success', 'WarePort Success', 'Data Saved Successfully, It will take some time to show')
        setProductName('')
        setImages([])
        setImagesToSend([])
        setProductCategory('')
        setProductType('')
        setSupplierName('')
        setLoading(false)
    }
  }
    const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
      maxFiles: 3,
    }).then((selectedImages) => {
      setImages(selectedImages.map((image) => ({ uri: image.path })));
      selectedImages.map((image) => {
        setImagesToSend(old => [...old, image])
      })
    });
  };

  const renderItem = ({ item }) => (
    <Image style={styles.carouselImage} source={item} resizeMode="contain" />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SpinnerOverlay
            visible={loading}
            textContent={translation('Loading...')}
            textStyle={styles.spinnerTextStyle}
          />
      {
        alertVisible && <AlertView message={alertMessage} visible={setAlertVisible} success={success}></AlertView>
      }
        <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
        }}
        // title={translation('Add Search Product')}
      >
        <LoadingButton
            contentStyle={styles.submitButtonContent}
            textStyle={styles.submitButtonText}
            loading={false}
            mode="contained"
            onPress={()=>{
              handleSubmit()
              }}
            style={styles.submitButton}
          >
            {translation('Add')}
          </LoadingButton>
      </BackButtonWithTitleAndComponent>
      
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <Text style={styles.label}>Supplier Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter supplier name"
        value={supplierName}
        onChangeText={(text) => setSupplierName(text)}
      />
      <Text style={styles.label}>Product Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product category"
        value={productCategory}
        onChangeText={(text) => setProductCategory(text)}
      />
      <Text style={styles.label}>Product Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product type"
        value={productType}
        onChangeText={(text) => setProductType(text)}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {images.length > 0 && (
        <>
          <Text style={styles.label}>Selected Images</Text>
          <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={200}
            layout="default"
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  carouselImage: {
    width: '100%',
    height: 200,
  },
  submitButton: {
    width: 40,
    minWidth: 55,
    minHeight: 10,
  },
  submitButtonText: {
    marginHorizontal: 0,
    fontSize: 13,
    paddingHorizontal: 0,
    height: 25,
  },
  submitButtonContent: {
    height: 30,
  },
});

export default AddSearchProduct;
