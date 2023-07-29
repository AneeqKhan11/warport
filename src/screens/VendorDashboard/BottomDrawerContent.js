import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  setVendorBottomDrawerToggle,
  setVendorBottomDrawerIndex,
  setVendorBottomDrawerReset,
} from '../../store/actions/VendorBottomDrawerActions';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from '../../context/Localization';
import { theme } from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuBtn: {
    paddingVertical: 18,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flexDirection: 'row',
    backgroundColor: '#dddddd',
  },
  menuText: {
    fontSize: 16,
    color: theme.colors.primary,
    marginTop: 3,
  },
  menuItemDivider: {
    backgroundColor: '#c6c6c6',
    marginVertical: 1,
  },
  menuBtnIcon: {
    marginLeft: 10,
    padding: 7,
    borderRadius: 8,
  },
});

function BottomDrawerContent(props) {
  const { translation } = useTranslation();
  const bottomSheetModalRef = useRef(null);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT', 'CONTENT_HEIGHT']);

  // Add a cleanup function to dismiss the BottomSheetModal when the component is unmounted
  useEffect(() => {
    return () => {
      bottomSheetModalRef.current?.dismiss();
    };
  }, []);


  useEffect(() => {
    if (props.vendorBottomDrawerToggle) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [props.vendorBottomDrawerToggle]);

  const handleSheetChanges = (index) => { };

  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onDismiss={() => {
          props.setVendorBottomDrawerReset();
        }}
        enablePanDownToClose={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop opacity={0.1} {...props} pressBehavior="close" />
        )}
        index={1}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainerStyle} onLayout={handleContentLayout}>
          <View style={styles.contentContainer}>
            <Ripple style={styles.menuBtn} onPress={props.onCameraPress}>
              <Icon
                style={[styles.menuBtnIcon, styles.menuBtnIconGreen]}
                name={'camera'}
                size={17}
                color={'white'}
              />
              <Text style={styles.menuText}>{translation('Add Products Through Camera')}</Text>
            </Ripple>
            <Divider style={styles.menuItemDivider} />
            <Ripple style={styles.menuBtn} onPress={props.onGalleryPress}>
              <Icon
                style={[styles.menuBtnIcon, styles.menuBtnIcon]}
                name={'images'}
                size={17}
                color={'white'}
              />
              <Text style={styles.menuText}>{translation('Add Products From Gallery')}</Text>
            </Ripple>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.VendorBottomDrawerReducer,
    ...state.AddEditProductReducer,
  };
};

export default connect(mapStateToProps, {
  setVendorBottomDrawerToggle,
  setVendorBottomDrawerIndex,
  setVendorBottomDrawerReset,
})(BottomDrawerContent);
