import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Modal, Text, Button } from 'react-native-paper'
import _ from 'lodash'
import { connect } from 'react-redux'
import { useDropdownAlert } from '../../context/AlertDropdownContextProvider'
import { useTranslation } from '../../context/Localization'
import Background from '../../components/Background'
import { theme } from '../../core/theme'
import { setVendorWelcomeCallPopUpToggle } from '../../store/actions/VendorActions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    marginHorizontal: 2,
  },
  modalContainerStyle: {
    backgroundColor: 'white',
    height: '100%',
  },
  modalInnerContainer: {
    padding: 15,
    justifyContent: 'flex-start',
  },
  closeIcon: {
    textAlign: 'right',
    padding: 15,
  },
  welcomeCallHeading: {
    color: theme.colors.primary,
    fontSize: 30,
    fontWeight: '900',
    marginBottom:15
  },
  addAttachmentsBtn: {
    paddingVertical: 5,
  },

  attachmentList: {
    flex: 1,
    marginVertical:15,
    backgroundColor:"#ffffff70",
    width:"100%"
  },


  noAttachmentText:{
    textAlign:"left",

  }
})

function WelcomeCallPopUp(props) {
  const { alertWithType } = useDropdownAlert()
  const { translation } = useTranslation()

  return (
    <Modal
      visible={props.vendorWelcomeCallPopUpToggle}
      dismissable={true}
      contentContainerStyle={styles.modalContainerStyle}
    >
      <TouchableOpacity
        onPress={() => {
          props.setVendorWelcomeCallPopUpToggle(false)
        }}
      >
        <Icon name="times" style={styles.closeIcon} size={24} color="black" />
      </TouchableOpacity>

      <Background containerStyle={styles.modalInnerContainer}>
        <Text style={styles.welcomeCallHeading}>Welcome Call</Text>
        <View style={styles.attachmentList}>
          <Text style={styles.noAttachmentText}>No attachment added yet.</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            ImagePicker.openPicker({
              multiple: true,
              cropping: false,
              mediaType: 'any',
            }).then((image) => {})
          }}
          style={styles.addAttachmentsBtn}
          icon={({ size, color }) => (
            <Icon name="link" size={24} color={'white'} />
          )}
        >
          Click Here To Add Attacments
        </Button>
      </Background>
    </Modal>
  )
}
const mapStateToProps = (state) => {
  return { ...state.VendorReducer }
}
export default connect(mapStateToProps, {
  setVendorWelcomeCallPopUpToggle,
})(WelcomeCallPopUp)
