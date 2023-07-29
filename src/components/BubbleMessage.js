import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BubbleMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    zIndex:999,
    top:40,
    right:30
  },
  bubble: {
    backgroundColor: '#007aff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft:200
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BubbleMessage;
