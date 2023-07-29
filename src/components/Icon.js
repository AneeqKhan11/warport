import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: 50,
    marginBottom: 8,
  },
});

export default function Icon() {
  return <Image source={require('../../assets/icon.png')} style={styles.image} />
}


