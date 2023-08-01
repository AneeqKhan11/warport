import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {

  const handleSearch = (text) => {
    onSearch(text);
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical:10,
        marginTop:10,
        marginBottom:-10,
        position: 'relative',
      }}>
      <Ionic
        name="search"
        style={{
          fontSize: 18,
          opacity: 0.7,
          position: 'absolute',
          zIndex: 1,
          left: 25,
        }}
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#909090"
        style={{
          width: '94%',
          backgroundColor: '#FFF',
          borderRadius: 0,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 15,
          padding: 4,
          // marginTop:30,
          paddingLeft: 40,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            },
            android: {
              elevation: 4,
            },
          }),
        }}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default SearchBar;
