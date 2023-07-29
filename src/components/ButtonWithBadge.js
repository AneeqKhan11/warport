import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Badge,Button } from 'react-native-paper';
import { theme } from '../core/theme';
import { useNavigation } from '@react-navigation/native';
import ChatScreen from '../screens/VendorDashboard/Chat/ChatScreen';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 10,
    top:-3
  },
});

export default function ButtonWithBadge({
  iconStyle,
  badgeValue,
  iconName,
  buttonStyle,
  customerName,
  customerId
}) {
  const navigation = useNavigation()
  return (
    <View>
      {badgeValue != 0 && <Badge style={styles.badge}>{badgeValue}</Badge>}
      <Button onPress={() => {
        navigation.navigate("ChattingScreen",{customerName,customerId})
      }} mode="text" style={buttonStyle}>
        <Icon
          style={iconStyle}
          name={iconName}
          size={21}
          color={theme.colors.primary}
        />
      </Button>
    </View>
  )
}


