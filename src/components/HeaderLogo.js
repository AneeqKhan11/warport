import React from 'react'
import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  image: {
    width: '30%',
    height: 50,
    marginLeft:20,
    resizeMode: 'contain',
  },
})

export default function HeaderLogo() {
  return (
    <Image source={require('../../assets/logo.png')} style={styles.image} />
  )
}
