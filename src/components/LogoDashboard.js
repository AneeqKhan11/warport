import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {

    width:"70%",
    height: 40,
    resizeMode: 'contain'
  },
});

export default function LogoDashboard() {
  return <Image  source={require('../../assets/logo.png')} style={styles.image} />
}


