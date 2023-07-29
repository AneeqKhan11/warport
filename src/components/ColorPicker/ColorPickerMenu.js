import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
    width:"60%"
  },
  radioButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  radioButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 8,
    marginLeft: 8,
  },
});

const initialColorOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
  { label: 'Black', value: 'black' },
  { label: 'Custom', value: 'white' },
];

export default function ColorPickerMenu({ selectedColor, onColorChangeComplete }) {

  const [colorOptions, setColorOptions] = useState(initialColorOptions);

  const RadioButton = ({ label, value, selected, onSelect }) => {

    const changeCustomColor=(color)=>{
      const updatedOptions = colorOptions.map((option) => {
        if (option.label === 'Custom') {
          return { ...option, value: color };
        }
        return option;
      });
      setColorOptions(updatedOptions);
    }
    const navigation = useNavigation();
    const handlePress = () => {
      if (label === 'Custom') {
        navigation.push('ColorGrid', { onSelect, changeCustomColor });
      } else {
        onSelect(value);
        if (label !== 'Custom') {
          const existingOption = colorOptions.find((option) => option.value === value);
          if (!existingOption) {
            setColorOptions((prevOptions) => [
              ...prevOptions,
              { label, value },
            ]);
          }
        }
      };
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.radioButton}>
          <View
            style={[
              styles.radioButtonCircle,
              { backgroundColor:selected ? value:'white'}
            ]}
          />
          <Text style={[
            { color: selected ? value : 'blue' }
      ]}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      {colorOptions.map((colorOption) => (
        <RadioButton
          key={colorOption.value}
          label={colorOption.label}
          value={colorOption.value}
          selected={selectedColor === colorOption.value}
          onSelect={onColorChangeComplete}
        />
      ))}
    </View>
  );
}
