import React, { useState, useEffect, useContext } from 'react'
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  UIManager,
  Dimensions,
} from 'react-native'
import { theme } from '../core/theme'
import { KeyboardStatusContext } from '../context/KeyboardStatusContextProvider'
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    // paddingBottom: 200,
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 340,
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
})
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}
export default function Background({ children, containerPaddingZero, containerStyle }) {
  const { keyboardHidden } = useContext(KeyboardStatusContext)

  return (
    // <ImageBackground
    //   source={require('../assets/background.jpeg')}
    //   resizeMode="repeat"
    //   style={[
    //     styles.background,
    //     keyboardHidden ? { justifyContent: 'center' } : null,
    //   ]}
    // >
      <View style={{
        height: "100%",
        paddingBottom: 100,

      }}>
        <TouchableWithoutFeedback
          style={{
            paddingBottom: 100
          }}
          onPress={() => {
            Keyboard.dismiss()
          }}>
          <View
            style={[
              styles.container,
              keyboardHidden && !containerPaddingZero ? { justifyContent: 'center' } : null,
              { paddingVertical: containerPaddingZero ? 0 : Dimensions.get('window').height * 0.07 }, containerStyle
            ]}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      </View>
    // </ImageBackground>
  )
}
