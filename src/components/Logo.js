import React from 'react'
import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
    marginTop: 50
  },
})

export default function Logo() {
  return (
    <Image source={require('../../assets/logo.png')}
      style={styles.image} />
  )
}
