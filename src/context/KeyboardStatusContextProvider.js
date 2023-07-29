import React, { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'
const KeyboardStatusContext = React.createContext({ keyboardHidden: true })

const KeyboardStatusContextProvider = ({ children }) => {
  const [keyboardHidden, setKeyboardHidden] = useState(true)

  var _keyboardDidShowListener = null
  var _keyboardDidHideListener = null
  const onKeyboardDidShow = () => {
    setKeyboardHidden(false)
  }
  const onKeyboardDidHide = () => {
    
    setKeyboardHidden(true)
  }
  useEffect(() => {
  
    _keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardDidShow
    )
    _keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardDidHide
    )
    return () => {
 
      _keyboardDidShowListener.remove()
      _keyboardDidHideListener.remove()
    }
  }, [])
  return (
    <KeyboardStatusContext.Provider value={{ keyboardHidden }}>
      {children}
    </KeyboardStatusContext.Provider>
  )
}

export { KeyboardStatusContext, KeyboardStatusContextProvider }
