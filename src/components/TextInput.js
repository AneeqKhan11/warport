import React, { useEffect, useRef, useContext, useState } from 'react'
import { View, StyleSheet, Text, Keyboard } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'
import { KeyboardStatusContext } from '../context/KeyboardStatusContextProvider'
import Icon from 'react-native-vector-icons/FontAwesome'
const styles = StyleSheet.create({
  container: {
    height:50,
    marginVertical:20,
    width: '100%',
    borderRadius: 50, // Numeric value for borderRadius
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  input: {
    backgroundColor: theme.colors.surface,
    width:'100%'
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})

export default function TextInput({
  containerStyle,
  errorText,
  description,
  inputStyle,
  secureTextEntry,
  ...props
}) {
  const { keyboardHidden } = useContext(KeyboardStatusContext)
  const [allowSecureTextEntry, setAllowSecureTextEntry] = useState(true)
  useEffect(() => {
    if (keyboardHidden) inputRef.current.blur()
  }, [keyboardHidden])

  const inputRef = useRef()

  return (
    <View style={[styles.container, containerStyle]}>
      <Input
        ref={inputRef}
        style={[styles.input, inputStyle]}
        right={
          secureTextEntry && allowSecureTextEntry ? (
            <Input.Icon onPress={() => {
              setAllowSecureTextEntry(false)
            }} color="gray" name="eye" />
          ) : (
            secureTextEntry && <Input.Icon onPress={() => {
              setAllowSecureTextEntry(true)
            }} color="gray" name="eye-off" />
          )
        }

        secureTextEntry={allowSecureTextEntry && secureTextEntry}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}
