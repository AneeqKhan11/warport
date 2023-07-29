import * as React from 'react';
import { Animated, Dimensions, StyleSheet,StatusBar } from 'react-native';

const duration = 300
const useNativeDriver = true

export const AnimatedModal = ({ children, visible }) => {
  const { height } = Dimensions.get('window') 
  const translateY = new Animated.Value(height )

  const showModal = Animated.timing(translateY, {
    toValue: 0,
    duration,
    useNativeDriver,
  }).start

  const hideModal = Animated.timing(translateY, {
    toValue: height,
    duration,
    useNativeDriver,
  }).start

  React.useEffect(() => {
    if (visible) {
      showModal()
    } else {
      hideModal()
    }
  }, [visible])

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        transform: [{ translateY }],
        zIndex: 99,
        borderTopColor:"black",
        borderTopWidth:1
      }}
    >
      {children}
    </Animated.View>
  )
}

AnimatedModal.defaultProps = {
  visible: false,
}
