import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ScrollView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {useTranslation} from '../../../../context/Localization'
const ColorGrid = (props) => {
  const navigation = useNavigation()
  const {translation} = useTranslation()
  const [availableColors, setAvailableColors] = useState([
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#FFC0CB', '#FF4500', '#800000',
    '#000080', '#FF69B4', '#808080', '#008080', '#FFD700', '#FF6347',
    '#00CED1', '#FF8C00', '#4B0082', '#DC143C', '#FF1493', '#008B8B',
    '#B8860B', '#9400D3', '#00FF7F', '#8A2BE2', '#D2691E', '#32CD32',
    '#7FFF00', '#9932CC', '#FF00FF', '#FF7F50', '#ADFF2F', '#BA55D3',
    '#4169E1', '#F0E68C', '#9370DB', '#20B2AA', '#778899', '#FA8072',
    '#00FF00', '#E9967A', '#FFDAB9', '#FF4500', '#7CFC00', '#9932CC',
    '#FF1493', '#00BFFF', '#48D1CC', '#C71585'
    // ... (add more colors here)
  ]);

  useEffect(() => {
    retrieveSelectedColors();
  }, []);

  const retrieveSelectedColors = async () => {
    try {
      const selectedColors = await AsyncStorage.getItem('selectedColors');
      if (selectedColors) {
        const parsedColors = JSON.parse(selectedColors);
        setAvailableColors(parsedColors);
      }
    } catch (error) {
      console.log('Error retrieving selected colors:', error);
    }
  };

  const storeSelectedColors = async (colors) => {
    try {
      const colorsToStore = JSON.stringify(colors);
      await AsyncStorage.setItem('selectedColors', colorsToStore);
    } catch (error) {
      console.log('Error storing selected colors:', error);
    }
  };

  const handleColorPress = (color) => {
    const updatedColors = availableColors.filter((c) => c !== color);
    setAvailableColors(updatedColors);
    storeSelectedColors(updatedColors);
    props.route.params.onSelect(color)
    props.route.params.changeCustomColor(color)
    navigation.goBack()
    // Perform any action you want when a color is pressed
  };

  const renderColorItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleColorPress(item)}
        style={{
          flex: 1,
          aspectRatio: 1,
          backgroundColor: item,
          borderRadius: 10,
          margin: 5,
        }}
      />
    );
  };

  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontWeight: 'bold',backgroundColor:'black', borderRadius:5, color:'white',marginLeft:20, padding:5 }}>{translation("Select Color")}</Text>
      </View>
    </View>
    <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
      <FlatList
        data={availableColors}
        numColumns={3}
        renderItem={renderColorItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
    </ScrollView>
  );
};

export default ColorGrid;
