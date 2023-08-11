import React, { useEffect } from 'react';
import { StyleSheet, View, DeviceEventEmitter } from 'react-native';
import { AppTour, AppTourSequence } from 'react-native-app-tour';

// import Top from './components/Top';
// import Center from './components/Center';
// import Bottom from './components/Bottom';

const AppToure = ({ onTourComplete }) => {
  const appTourTargets = [];

  useEffect(() => {
    const registerSequenceStepEvent = () => {
      const sequenceStepListener = DeviceEventEmitter.addListener(
        'onShowSequenceStepEvent',
        (e) => {
          console.log(e);
        },
      );
      return sequenceStepListener;
    };

    const registerFinishSequenceEvent = () => {
      const finishSequenceListener = DeviceEventEmitter.addListener(
        'onFinishSequenceEvent',
        (e) => {
          console.log(e);
          if (onTourComplete) {
            onTourComplete();
          }
        },
      );
      return finishSequenceListener;
    };

    const sequenceStepListener = registerSequenceStepEvent();
    const finishSequenceListener = registerFinishSequenceEvent();

    setTimeout(() => {
      const appTourSequence = new AppTourSequence();
      appTourTargets.forEach(appTourTarget => {
        appTourSequence.add(appTourTarget);
      });

      AppTour.ShowSequence(appTourSequence);
    }, 1000);

    return () => {
      sequenceStepListener.remove();
      finishSequenceListener.remove();
    };
  }, []);

  const addAppTourTarget = (appTourTarget) => {
    appTourTargets.push(appTourTarget);
  };

  return (
    <View style={styles.container}>
      {/* <Top style={styles.top} addAppTourTarget={addAppTourTarget} />
      <Center style={styles.center} addAppTourTarget={addAppTourTarget} />
      <Bottom style={styles.bottom} addAppTourTarget={addAppTourTarget} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
  },
  center: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
});

export default AppToure;
