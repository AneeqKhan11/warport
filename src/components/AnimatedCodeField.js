import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { Text } from 'react-native-paper'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { KeyboardStatusContext } from '../context/KeyboardStatusContextProvider'

const CELL_COUNT = 6
const CELL_SIZE = 33
const CELL_BORDER_RADIUS = 8
const DEFAULT_CELL_BG_COLOR = '#d8d7d7'
const NOT_EMPTY_CELL_BG_COLOR = '#3557b7'
const ACTIVE_CELL_BG_COLOR = '#f7fafe'

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 21,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
})

export default function AnimatedCodeField({ onChangeText, valueText }) {
  const [value, setValue] = useState('')

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })

  const { keyboardHidden } = useContext(KeyboardStatusContext)

  useEffect(() => {
    if (keyboardHidden) ref.current.blur()
  }, [keyboardHidden])

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  useEffect(() => {
    setValue(valueText)
  }, [valueText])

  useEffect(() => {
    onChangeText && onChangeText(value)
  }, [value])
  
  const { Value, Text: AnimatedText } = Animated
  const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0))
  const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1))
  const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250,
      }),
    ]).start()
  }
  const AnimatedTextCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol)
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    }

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused })
    }, 0)

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    )
  }
  return (
    <View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={AnimatedTextCell}
      />
    </View>
  )
}
