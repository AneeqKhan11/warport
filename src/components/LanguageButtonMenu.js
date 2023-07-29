import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme'
import { languageList } from '../context/Localization/languages'
import { getLanguageCodeFromLS } from '../context/Localization/helpers'
import { useTranslation } from '../context/Localization'

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  selectedLanguageMenu: {
    backgroundColor: '#b7b7b7',
    color: 'white',
  },
  textStyle:{
    color: theme.colors.primary,
    marginRight:10,
    fontSize:12
  }
})

export default function LanguageButtonMenu({
  languageButtonStyle,
}) {
  const [visible, setVisible] = React.useState(false)

  const { setLanguage } = useTranslation()

  const {translation} = useTranslation()
  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  const selectedLanguageLocale = getLanguageCodeFromLS()
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity
          onPress={openMenu}
          style={[styles.container, languageButtonStyle]}
        >
          <Text style={styles.textStyle}>{translation("Change Language")}</Text>
          <Icon name="globe" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      }
    >
      {languageList.map((language) => {
        return (
          <Menu.Item
            style={
              selectedLanguageLocale == language.locale
                ? styles.selectedLanguageMenu
                : null
            }
            key={language.code}
            onPress={async () => {
              await setLanguage(language)
              closeMenu()
            }}
            title={language.language}
          />
        )
      })}
    </Menu>
  )
}
