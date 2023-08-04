import React, { useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native'
import { Text, ActivityIndicator, Divider, Colors } from 'react-native-paper'
import BackButtonWithTitleAndComponent from '../../components/BackButtonWithTitleAndComponent'
import Background from '../../components/Background'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import LoadingButton from '../../components/LoadingButton'
import { companyNameValidator } from '../../helpers/companyNameValidator'
import { contactNoValidator } from '../../helpers/contactNoValidator'
import { emailValidator } from '../../helpers/emailValidator'
import ProfileAvatarWithEdit from '../../components/ProfileAvatarWithEdit'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple'
import InternalStandardsForm from '../InternalStandardsForm'
import {
  setUserProfileProfileAvatar,
  setUserProfileCompanyName,
  setUserProfileContactNo,
  setUserProfileContactNoVerified,
  setUserProfileEmail,
  setUserProfileEmailVerified,
  setUserProfileLoading,
  setUserProfileContentLoading,
  setUserProfileReset,
  setUserProfileAddress
} from '../../store/actions/UserProfileActions'
import { setUserAuthData } from '../../store/actions/UserAuthDataActions'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { getCountryCallingCodeAsync } from '../../components/CountryPicker/CountryService'
import { gql, useMutation } from '@apollo/client'
import VerifyContactNo from './VerifyContactNo'
import VerifyEmail from './VerifyEmail'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomDrawerContent from '../VendorDashboard/BottomDrawerContent'
import {
  setVendorBottomDrawerToggle,
  setVendorBottomDrawerIndex,
} from '../../store/actions/VendorBottomDrawerActions'
import ImagePicker from 'react-native-image-crop-picker'
import { useTranslation } from '../../context/Localization'
import { BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getUserAddress, setAddressAuth } from '../../auth/LocalStorage'
import Lottie from 'lottie-react-native';
import AlertView from '../../context/AlertView'

const styles = StyleSheet.create({
  avatar: {
    marginTop: 20,
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    marginTop: -30
  },
  scrollContentContainer: {
    alignItems: 'center',
    // marginBottom: Dimensions.get('window').height * 0.18
  },
  submitButton: {
    height: 40,
    borderRadius: 5,
    minWidth: 55,
    minHeight: 10,
    marginTop:30
  },
  container: {
    paddingHorizontal: 20,
    width: '100%',
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
  flexInput: {
    flex: 1,
    height:45,
    borderRadius: 5

  },
  inputWithVerifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    
  },
  contentLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  menuBtn: {
    paddingVertical: 18,
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  menuBtnIcon: {
    marginLeft: 10,
    padding: 7,
    borderRadius: 8,
  },
  menuBtnIconOrange: {
    backgroundColor: '#ff3d00',
  },
  menuText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
    marginTop: 3,
  },
  internalStandardView: {
    marginTop: -200
  },
  lottieView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: "75%"
  },
  FormView: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
  }
})

function UserProfileScreen(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()
  const [userAddress, setUserAddress] = useState(getUserAddress())
  const navigation = useNavigation()
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const [back, setBack] = useState(false)
  const emailVerified = true
  // const animationRef = useRef(null)

  // useEffect(() => {
  //   animationRef.current?.play()
  // }, [])

  const handleBackPress = () => {
    navigation.goBack()
    return true
  }

  BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  let updateProfileMutation = gql`
    mutation update_profile(
      $user_id: ID!
      $avatar: String
      $company_name: String!
      $country_code: String!
      $contact_no: String!
      $contact_no_verified: Boolean!
      $email: String
      $email_verified: Boolean!
      $address:String
    ) {
      update_profile(
        user_id: $user_id
        avatar: $avatar
        company_name: $company_name
        country_code: $country_code
        contact_no: $contact_no
        contact_no_verified: $contact_no_verified
        email: $email
        email_verified: $email_verified
        address: $address
      ) {
        id
        avatar
        company_name
        country_code
        contact_no
        contact_no_verified
        email
        email_verified
        role
        password
        category_a_id
        address
      }
    }
  `

  const [
    updateProfile,
    {
      loading: updateProfileMutationLoading,
      error: updateProfileMutationError,
      data: updateProfileMutationResult,
    },
  ] = useMutation(updateProfileMutation)

  useEffect(() => {
    if (updateProfileMutationError) {
      updateProfileMutationError.graphQLErrors.map(({ message }, i) => {
        props.setUserProfileLoading(false)
        setAlertMessage(message)
        setAlertVisible(true)
        // alertWithType('error', 'WarePort Error', message)
      })
    }
  }, [updateProfileMutationError])

  useEffect(() => {
    if (
      updateProfileMutationResult &&
      updateProfileMutationResult.update_profile
    ) {
      props.setUserAuthData(updateProfileMutationResult.update_profile)
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'VendorScreen' }],
      })
      props.setUserProfileReset()
    }
  }, [updateProfileMutationResult])

  useEffect(() => {
    setInitialEntry()
    props.setUserProfileContentLoading(false)
  }, [props.userAuthData])

  const setInitialEntry = async () => {
    const userCountryCode = await getCountryCallingCodeAsync(
      props.userAuthData.country_code
    )

    props.setUserProfileProfileAvatar(props.userAuthData.avatar)
    props.setUserProfileCompanyName({
      value: props.userAuthData.company_name,
      error: '',
    })
    if (props.userProfileContactNoVerifiedNo != null) {
      props.setUserProfileContactNo({
        value: props.userProfileContactNoVerifiedNo.value,
        error: '',
        country_code: props.userProfileContactNoVerifiedNo.country_code,
        calling_code: props.userProfileContactNoVerifiedNo.calling_code,
      })
    } else {
      props.setUserProfileContactNo({
        value: props.userAuthData.contact_no.replace(`+${userCountryCode}`, ''),
        error: '',
        country_code: props.userAuthData.country_code,
        calling_code: `+${userCountryCode}`,
      })
    }
    if (props.userProfileEmailVerifiedEmail != null) {
      props.setUserProfileEmail({
        value: props.userProfileEmail.value,
        error: '',
      })
    } else {
      props.setUserProfileEmail({
        value: props.userAuthData.email,
        error: '',
      })
    }
    if (props.userAddress != null) {
      props.setUserProfileAddress({
        value: props.userAddress.value,
        error: '',
      })
    } else {
      props.setUserProfileAddress({
        value: props.userAuthData.address,
        error: ''
      })
    }
  }

  const onSavePressed = async () => {
    const companyNameError = companyNameValidator(
      props.userProfileCompanyName.value
    )
    const contactNoError = contactNoValidator(props.userProfileContactNo.value)
    // const emailError = emailValidator(props.userProfileEmail.value, true)

    if (companyNameError || contactNoError) {
      props.setUserProfileCompanyName({
        value: props.userProfileCompanyName.value,
        error: companyNameError,
      })
      props.setUserProfileContactNo({
        value: props.userProfileContactNo.value,
        error: contactNoError,
        country_code: props.userProfileContactNo.country_code,
        calling_code: props.userProfileContactNo.calling_code,
      })

      props.setUserProfileEmail({
        value: props.userProfileEmail.value,
        error: emailError,
      })

      return
    }
    if (
      props.userProfileContactNo.value &&
      !props.userProfileContactNoVerified
    ) {
      props.setUserProfileContactNo({
        value: props.userProfileContactNo.value,
        error: 'Verify contact no',
        country_code: props.userProfileContactNo.country_code,
        calling_code: props.userProfileContactNo.calling_code,
      })
      // return
    }
    // if (props.userProfileEmail.value && !props.userProfileEmailVerified) {
    //   props.setUserProfileEmail({
    //     value: props.userProfileEmail.value,
    //     error: 'Verify email address',
    //   })
    //   return
    // }


    try {
      props.setUserProfileLoading(true)
      if (userAddress != null) {
        await setAddressAuth(userAddress)
      }
      await updateProfile({
        variables: {
          user_id: props.userAuthData.id,
          avatar: props.userProfileProfileAvatar,
          company_name: props.userProfileCompanyName.value,
          country_code: props.userProfileContactNo.country_code,
          contact_no: (
            props.userProfileContactNo.calling_code +
            props.userProfileContactNo.value
          ).replace(/\s/g, ''),
          contact_no_verified: props.userProfileContactNoVerified,
          email: props.userProfileEmail.value,
          email_verified: emailVerified,
          address: userAddress,
        },
      })
      setBack(true)
      setAlertMessage("Profile Saved Successfully")
      setAlertVisible(true)
    } catch (ex) {
      props.setUserProfileLoading(false)
      if (ex.networkError) {
        setAlertMessage("Check your Internet Connection")
        setAlertVisible(true)
      }
      // alertWithType('error', 'WarePort Error', "Check your Internet Connection"+ex.toString())
    }
  }

  return (
    <ScrollView style={{ flexGrow: 1 ,backgroundColor:'#FFF'}}>
      {
        alertVisible && <AlertView message={alertMessage} back={back} visible={setAlertVisible}></AlertView>
      }
      <BackButtonWithTitleAndComponent
        goBack={() => {
          props.navigation.goBack()
          props.setUserProfileReset()
        }}
        title={translation('Profile')}
        mainContainers={20}
        headerText={95}
      >
      </BackButtonWithTitleAndComponent>

      <Background>


        <BottomSheetModalProvider>
          {/* <KeyboardAvoidingView
              behavior="height"
              style={styles.contentContainer}
            > */}

          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
          >

            <View style={{
              paddingVertical: 20,
              backgroundColor: '#D5D5D5',
              borderRadius: 12,
              width: "100%",
              alignItems: 'center'
            }}>
              <ProfileAvatarWithEdit
                onEditPressed={() => {
                  props.setVendorBottomDrawerToggle(true)
                }}
                style={styles.avatar}
                source={props.userProfileProfileAvatar}
              />
            </View>
            <View style={styles.FormView}>
              <TextInput
                containerStyle={styles.flexInput}
                placeholder={translation('Please Enter Company Name')}
                returnKeyType="next"
                value={props.userProfileCompanyName.value}
                disabled={props.userProfileLoading}
                onChangeText={(text) =>
                  props.setUserProfileCompanyName({ value: text, error: '' })
                }
                error={!!props.userProfileCompanyName.error}
                errorText={translation(props.userProfileCompanyName.error)}
              />
              <View style={styles.inputWithVerifyContainer}>

                <PhoneNumberInput
                  isTrue={true}
                  containerStyle={styles.flexInput}
                  placeholder={translation('Contact Number')}
                  value={props.userProfileContactNo.value}
                  disabled={props.userProfileLoading}
                  initialCallingCode={props.userProfileContactNo.calling_code}
                  initialCountryCode={props.userProfileContactNo.country_code}
                  error={!!props.userProfileContactNo.error}
                  errorText={translation(props.userProfileContactNo.error)}
                  onChangeText={(text, countryCode, callingCode) =>
                    props.setUserProfileContactNo({
                      value: text,
                      error: '',
                      country_code: countryCode,
                      calling_code: callingCode,
                    })
                  }
                />
                {/* <VerifyContactNo navigation={props.navigation} /> */}
              </View>
              <TextInput
                placeholder={translation('Please Enter Address')}
                containerStyle={styles.flexInput}
                returnKeyType="next"
                value={userAddress}
                onChangeText={setUserAddress}
              />
              <View style={styles.inputWithVerifyContainer}>
                <TextInput
                  placeholder={translation('Please Enter Company Adress')}
                  containerStyle={[styles.flexInput, {marginTop:0}]}
                  returnKeyType="next"
                  value={props.userProfileEmail.value}
                  onChangeText={(text) =>
                    props.setUserProfileEmail({ value: text, error: '' })
                  }
                  error={!!props.userProfileEmail.error}
                  errorText={props.userProfileEmail.error}
                />
                {/* <VerifyEmail navigation={props.navigation} /> */}
              </View>

              <LoadingButton
                contentStyle={[
                  styles.submitButtonContent,
                  props.userProfileLoading ? { width: 40 } : null,
                ]}
                textStyle={styles.submitButtonText}
                disabled={props.userProfileLoading || props.userProfileContentLoading}
                loading={props.userProfileLoading}
                mode="contained"
                onPress={onSavePressed}
                style={styles.submitButton}

              >
                {!props.userProfileLoading && translation('Save')}
              </LoadingButton>
            </View>
            {/* <Ripple
                  style={styles.menuBtn}
                  onPress={() => {
                    props.navigation.navigate('InternalStandardsForm')
                  }}
                >
                  <Icon
                    style={[styles.menuBtnIcon, styles.menuBtnIconOrange]}
                    name={'plus'}
                    size={17}
                    color={'white'}
                  />
                  <Text style={styles.menuText}> {translation('Internal Standards')}</Text>
                </Ripple> */}

          </ScrollView>
          <Lottie
            style={styles.lottieView}
            autoPlay={true}
            loop={true}
            source={require('../../../assets/scroll-down-arrow.json')}
          />
          {/* </KeyboardAvoidingView> */}
          <BottomDrawerContent
            onCameraPress={() => {
              props.setVendorBottomDrawerToggle(false)
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
              }).then((image) => {
                props.setUserProfileProfileAvatar(
                  `data:${image.mime};base64,` + image.data
                )
              })
            }}
            onGalleryPress={() => {
              props.setVendorBottomDrawerToggle(false)
              ImagePicker.openPicker({
                multiple: false,
                cropping: true,
                includeBase64: true,
              }).then((image) => {
                props.setUserProfileProfileAvatar(
                  `data:${image.mime};base64,` + image.data
                )
              })
            }}
            navigation={props.navigation}
          />

        </BottomSheetModalProvider>

      </Background>
      <View style={styles.internalStandardView}>
        <Background>
          <InternalStandardsForm />
        </Background>
      </View>
    </ScrollView>
  )
}
const mapStateToProps = (state) => {
  return {
    ...state.UserProfileReducer,
    ...state.UserAuthDataReducer,
  }
}
export default connect(mapStateToProps, {
  setUserProfileProfileAvatar,
  setUserProfileCompanyName,
  setUserProfileLoading,
  setUserProfileContentLoading,
  setUserProfileContactNo,
  setUserProfileContactNoVerified,
  setUserProfileEmail,
  setUserProfileEmailVerified,
  setUserProfileReset,
  setVendorBottomDrawerToggle,
  setUserAuthData,
  setUserProfileAddress,
})(UserProfileScreen)
