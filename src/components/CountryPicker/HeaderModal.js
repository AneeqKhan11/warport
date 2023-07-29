import React, { ReactNode } from 'react'
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle
} from 'react-native'
import CloseButton from './CloseButton'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch'
  }
})


export const HeaderModal = (props) => {
  const {
    withFilter,
    withCloseButton,
    closeButtonImage,
    closeButtonStyle,
    closeButtonImageStyle,
    onClose,
    renderFilter
  } = props
  return (
    <View style={styles.container}>
     
      {withFilter && renderFilter(props)}
      {withCloseButton && <CloseButton
        image={closeButtonImage}
        style={closeButtonStyle}
        imageStyle={closeButtonImageStyle}
        onPress={onClose}
      />}
    </View>
  )
}

HeaderModal.defaultProps = {
  withCloseButton: true
}
