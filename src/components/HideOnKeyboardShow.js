import React, { useContext } from 'react'
import { StyleSheet, View, Keyboard, Platform } from 'react-native'
import { theme } from '../core/theme'
import { KeyboardStatusContext } from '../context/KeyboardStatusContextProvider'
const styles = StyleSheet.create({
  container: {
    marginTop:100,
  },
})

function HideOnKeyboardShow({ children }) {
  const { keyboardHidden } = useContext(KeyboardStatusContext)
  return keyboardHidden ? <>{children}</> : <>{<View style={styles.container}></View>}</>
}

export default HideOnKeyboardShow
