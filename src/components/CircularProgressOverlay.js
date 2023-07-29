import * as React from 'react'
import {
  View,
  Text,
  Modal,

  StyleSheet
} from 'react-native'
import {

  ActivityIndicator,

} from 'react-native-paper'
import CircularProgress from 'react-native-circular-progress-indicator';
const transparent = 'transparent'
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: transparent,
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContent: {
    color:"gray",
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:30,
    height: 50,
    top: 80,
  },
})

const CircularProgressOverlay = ({
  cancelable = false,
  animation = 'none',
  overlayColor = 'rgba(255,255,255, 0.55)',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey,
  text,
  progressValue
}) => {
  const [spinnerVisible, setSpinnerVisibility] = React.useState(visible)
  const close = () => {
    setSpinnerVisibility(false)
  }

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close()
    }
  }

  React.useEffect(() => {
    setSpinnerVisibility(visible)
  }, [visible])
  const _renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {customIndicator || (
        <CircularProgress
        value={progressValue}
        radius={55}
        activeStrokeWidth={20}
        activeStrokeColor={'#557dbf'}
        inActiveStrokeOpacity={0.7}
        inActiveStrokeWidth={10}
        progressValueColor={'#557dbf'}
      />
        )}
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    )
  }

  const _renderSpinner = () => {
    const spinner = (
      <View
        style={[styles.container, { backgroundColor: overlayColor }]}
        key={spinnerKey || `spinner_${Date.now()}`}
      >
        {children || _renderDefaultContent()}
      </View>
    )

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => _handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}
      >
        {spinner}
      </Modal>
    )
  }

  return _renderSpinner()
}

export default CircularProgressOverlay
