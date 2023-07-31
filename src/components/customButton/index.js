import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { theme } from "../../core/theme"
import { useNavigation } from "@react-navigation/native"


const CustomButton = ({ heading, navScreen }) => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.colors.primary,
                paddingVertical: 10,
                borderRadius: 10,
            }}
            onPress={() => {
                navigation.navigate(navScreen)
            }}
        >
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>{heading}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton