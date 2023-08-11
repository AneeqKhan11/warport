import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';


export default function CustomDropDown({ label, value, list, setValue }) {
    const [showDropDown, setShowDropDown] = useState(false);

    const handleColorSelect = (selectedValue) => {
        setValue(selectedValue);
        setShowDropDown(false);
    };

    const changeCustomColor = (color) => {
        setValue(color);
        setShowDropDown(false);
    };

    const navigation = useNavigation();
    const handlePress = () => {
        if (value === 'Custom') {
            navigation.push('ColorGrid', { onSelect: handleColorSelect, changeCustomColor });
        } else {
            setShowDropDown(!showDropDown);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.dropdownContainer, {
            flexDirection: !showDropDown ? 'row' : 'column',
        }]}>
            <TouchableOpacity style={{
                display: 'flex',
            }}>
                <Text style={{ textAlign: "left", fontSize: 16, color: '#6A6A6A' }}>{label}</Text>
            </TouchableOpacity>
            {showDropDown && (
                <View >
                    {list.map((color) => (
                        <TouchableOpacity
                            key={color.value}
                            onPress={() => handleColorSelect(color.value)}
                            style={styles.colorOption}
                        >
                            <View
                                style={[
                                    styles.colorBox,
                                    { backgroundColor: color.value },
                                ]}
                            />
                            <Text>{color.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {value !== "" && (
                <View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                }}>
                    <View style={{
                        height: 20,
                        width: 20,
                        borderRadius: 50,
                        backgroundColor: value === "red" ? "red" : value === "blue" ? 'blue' : value === "green" ? 'green' : value === "black" ? 'black' : 'white'
                    }}>
                    </View>
                    <Text style={styles.selectedColorLabel}>{value}</Text>
                </View>
            )

            }
            <View style={{display: !showDropDown ? "flex":'none'}}>
            <SimpleLineIcons name="arrow-down" size={16} color="#6A6A6A" style={{marginTop:3}}/>
            </View>
        </TouchableOpacity>
    );
}




const styles = StyleSheet.create({
    dropdownContainer: {
        display: 'flex',

        // alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        padding: 15,
        marginTop: 20,
        backgroundColor: "#FFF",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 7,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    colorOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: 'yellow',
        width: 300
    },
    colorBox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        marginRight: 8,
    },
    selectedColorLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10,
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