import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme'
import HeaderLogo from './HeaderLogo'
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor:"#cccc",
    borderBottomWidth:1,
    padding: 0,
    paddingHorizontal: 0,
  },
  container: {
    flexDirection: 'row',
    flex:1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})

export default function BackButtonWithTitleAndComponent({
  goBack,
  children,
  title,
}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={styles.header}>{title}</Text>
        <HeaderLogo></HeaderLogo>
        {children}
      </View>
    </View>
  )
}
