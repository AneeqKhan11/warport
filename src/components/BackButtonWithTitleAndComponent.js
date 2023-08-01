import React from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme'
import HeaderLogo from './HeaderLogo'
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',

    // backgroundColor: 'white',
    // borderBottomColor:"#cccc",
    // borderBottomWidth:1,
    // paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    marginLeft: 40
  },
})

export default function BackButtonWithTitleAndComponent({
  goBack,
  children,
  title,
  mainContainer,
  headerText
}) {
  return (
    <View style={[styles.mainContainer, { paddingHorizontal: mainContainer }]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-left" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={[styles.header,{marginLeft:headerText}]}>{title}</Text>
        {children}
      </View>
    </View>
  )
}
