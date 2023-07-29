import React, { useRef, useState, useEffect, memo, useContext } from 'react'
import { useColorScheme, View, StyleSheet, Keyboard } from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import CountryModal, { DARK_THEME } from './CountryPicker'
import TextInputMask from 'react-native-text-input-mask'
import { theme } from '../core/theme'
import { KeyboardStatusContext } from '../context/KeyboardStatusContextProvider'
const styles = StyleSheet.create({
  container: {
    height:50,
    width: '100%',
    borderRadius: 50, // Numeric value for borderRadius
    overflow: 'hidden',
    paddingHorizontal:12,
    display: 'flex',
    alignItems: 'center',
    backgroundColor:'#FFF', 
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  countryModalContainer: { marginTop: 16 },
  input: {
    backgroundColor: theme.colors.surface,
    width: '100%',
    
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  closeButtonStyle: {
    marginLeft: 'auto',
  },
})

const mask = '[000] [000] [00000]'
const PhoneNumberInput = (
  {
    isCountryPicker = true,
    onChangeText,
    masks: propMasks,
    initialCountryCode = 'PK',
    initialCallingCode = '+92',
    errorText,
    error,
    placeholder,
    containerStyle,
    value,
  },
  props
) => {
  const { keyboardHidden } = useContext(KeyboardStatusContext)


  useEffect(() => {
    if (keyboardHidden) phoneOuterRef.current.blur()
  }, [keyboardHidden])

  const phoneOuterRef = useRef()
  const phoneRef = useRef()
  const [callingCode, setCallingCode] = useState(initialCallingCode)
  const [countryCode, setCountryCode] = useState(initialCountryCode)
  const [extracted, setExtracted] = useState(value)


  useEffect(() => {
    setCallingCode(initialCallingCode)
  }, [initialCallingCode])

  useEffect(() => {
    setCountryCode(initialCountryCode)
  }, [initialCountryCode])

  useEffect(() => {
    setExtracted(value)
  }, [value])

  useEffect(() => {
    if (initialCountryCode) setCountryCode(initialCountryCode)
  }, [initialCountryCode])

  useEffect(() => {
    onChangeText && onChangeText(extracted, countryCode, callingCode)
  }, [extracted, countryCode])
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        ref={phoneOuterRef}
        value={extracted}
        keyboardType="phone-pad"
        style={styles.input}
        error={error}
        render={(props_) => {
          return (
            <View style={styles.innerContainer}>
              {isCountryPicker && (
                <View style={styles.countryModalContainer}>
                  <CountryModal
                    disableNativeModal={false}
                    withFilter={true}
                    closeButtonStyle={styles.closeButtonStyle}
                    onSelect={(country) => {
                      setCallingCode('+' + country.callingCode)
                      setCountryCode(country.cca2)
                      phoneRef.current && phoneRef.current.focus()
                    }}
                    countryCode={countryCode}
                    translation="eng"
                    cancelText="Cancel"
                    visible={false}
                    withCountryNameButton={true}
                    withFlagButton
                    withCallingCodeButton
                    withFlag
                    withCallingCode
                    withEmoji={false}
                  />
                </View>
              )}
              <TextInputMask
                {...props_}
                refInput={phoneRef}
                mask={mask}
                placeholder={placeholder}
                value={extracted}
                onChangeText={(text) => {
                  setExtracted(text)
                }}
              />
            </View>
          )
        }}
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

export default memo(PhoneNumberInput)
