import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme'

const styles = StyleSheet.create({
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#c7c7c7',
  },
  noProfilePicture: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity:0.8
  },
  editIconContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 35,
    position: 'absolute',
    right: 2,
    bottom: 0,
  },
})

export default function ProfileAvatarWithEdit({
  source,
  style,
  onEditPressed,
}) {

  return (
    <TouchableOpacity onPress={onEditPressed}>
      {source == '' || source == undefined ? (
        <View style={[styles.profilePicture, styles.noProfilePicture, style]}>
          <Icon name={'user'} size={70} color={theme.colors.primary} />
          <View style={styles.editIconContainer}>
            <Icon name={'camera'} size={20} color="gray" />
          </View>
        </View>
      ) : (
        <View style={[styles.profilePicture, styles.noProfilePicture, style]}>
          <Image source={{ uri: source }} style={styles.profilePicture}></Image>
          <View style={styles.editIconContainer}>
            <Icon name={'camera'} size={20} color="gray" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}
