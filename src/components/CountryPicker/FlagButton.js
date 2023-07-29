import React, { useState, useEffect, ReactNode, memo } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextProps,
} from 'react-native'
import { CountryCode } from './types'
import { Flag } from './Flag'
import { useContext } from './CountryContext'
import { CountryText } from './CountryText'
import { useTheme } from './CountryTheme'

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerWithEmoji: {
    marginTop: 0,
  },
  containerWithoutEmoji: {
    marginTop: 5,
  },
  flagWithSomethingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  something: { fontSize: 16 },
})



const FlagText = (props) => (
  <CountryText {...props} style={styles.something} />
)

const FlagWithSomething = memo(
  ({
    allowFontScaling,
    countryCode,
    withEmoji,
    withCountryNameButton,
    withCurrencyButton,
    withCallingCodeButton,
    withFlagButton,
    flagSize,
    placeholder,
  }) => {
    const { translation, getCountryInfoAsync } = useContext()
    const [state, setState] = useState({
      countryName: '',
      currency: '',
      callingCode: '',
    })
    const { countryName, currency, callingCode } = state
    useEffect(() => {
      if (countryCode) {
        getCountryInfoAsync({ countryCode, translation })
          .then(setState)
          .catch(console.warn)
      }
    }, [
      countryCode,
      withCountryNameButton,
      withCurrencyButton,
      withCallingCodeButton,
    ])

    return (
      <View style={styles.flagWithSomethingContainer}>
        {countryCode ? (
          <Flag
            {...{ withEmoji, countryCode, withFlagButton, flagSize: flagSize }}
          />
        ) : (
          <FlagText allowFontScaling={allowFontScaling}>{placeholder}</FlagText>
        )}

        {withCountryNameButton && countryName ? (
          <FlagText allowFontScaling={allowFontScaling}>
            {countryName + ' '}
          </FlagText>
        ) : null}
        {withCurrencyButton && currency ? (
          <FlagText
            allowFontScaling={allowFontScaling}
          >{`(${currency}) `}</FlagText>
        ) : null}
        {withCallingCodeButton && callingCode ? (
          <FlagText
            allowFontScaling={allowFontScaling}
          >{`+${callingCode}`}</FlagText>
        ) : null}
      </View>
    )
  },
)



export const FlagButton = ({
  allowFontScaling,
  withEmoji,
  withCountryNameButton,
  withCallingCodeButton,
  withCurrencyButton,
  withFlagButton,
  countryCode,
  containerButtonStyle,
  onOpen,
  placeholder,
}) => {
  const { flagSizeButton: flagSize } = useTheme()
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onOpen}>
      <View
        style={[
          styles.container,
          withEmoji ? styles.containerWithEmoji : styles.containerWithoutEmoji,
          containerButtonStyle,
        ]}
      >
        <FlagWithSomething
          {...{
            allowFontScaling,
            countryCode,
            withEmoji,
            withCountryNameButton,
            withCallingCodeButton,
            withCurrencyButton,
            withFlagButton,
            flagSize: flagSize,
            placeholder,
          }}
        />
      </View>
    </TouchableOpacity>
  )
}

FlagButton.defaultProps = {
  withEmoji: true,
  withCountryNameButton: false,
  withCallingCodeButton: false,
  withCurrencyButton: false,
  withFlagButton: true,
}
