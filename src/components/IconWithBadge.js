import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-paper';
import { theme } from '../core/theme';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    top: -14,
  },
});

export default function IconWithBadge({ iconStyle, badgeValue, iconName }) {
  return (
    <View>
      {badgeValue != 0 && <Badge style={styles.badge}>{badgeValue}</Badge>}
      <Icon
        name={iconName}
        style={iconStyle}
        size={26}
        color={theme.colors.primary}
      />
    </View>
  )
}


