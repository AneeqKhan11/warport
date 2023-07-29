import React, { ReactNode } from 'react'
import { FlagButtonProps } from './FlagButton'
import {
  TranslationLanguageCode,
  CountryCode,
  Country,
  Region,
  Subregion,
} from './types'
import { CountryProvider, DEFAULT_COUNTRY_CONTEXT } from './CountryContext'
import { ThemeProvider, DEFAULT_THEME, Theme } from './CountryTheme'
import { CountryFilterProps } from './CountryFilter'
import { StyleProp, ViewStyle, ModalProps, FlatListProps } from 'react-native'
import { CountryPicker } from './CountryPicker'


const Main = ({ theme, translation, ...props }) => {
  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, ...theme }}>
      <CountryProvider value={{ ...DEFAULT_COUNTRY_CONTEXT, translation }}>
        <CountryPicker {...props} />
      </CountryProvider>
    </ThemeProvider>
  )
}

Main.defaultProps = {
  onSelect: () => {},
  withEmoji: true,
}

export default Main
export {
  getCountriesAsync as getAllCountries,
  getCountryCallingCodeAsync as getCallingCode,
} from './CountryService'
export { CountryModal } from './CountryModal'
export { DARK_THEME, DEFAULT_THEME } from './CountryTheme'
export { CountryFilter } from './CountryFilter'
export { CountryList } from './CountryList'
export { FlagButton } from './FlagButton'
export { Flag } from './Flag'
export { HeaderModal } from './HeaderModal'
export { CountryModalProvider } from './CountryModalProvider'
export * from './types'
