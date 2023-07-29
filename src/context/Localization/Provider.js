import React, { createContext, useCallback, useEffect, useState } from 'react'
import { EN, languages } from './languages'
import { LS_KEY, fetchLocale, getLanguageCodeFromLS } from './helpers'
import enUS from "../../assets/locales/en-US.json"
import SyncStorage from "sync-storage"

const initialState = {
  isFetching: true,
  currentLanguage: EN,
}

// Export the translations directly
export const languageMap = new Map()
languageMap.set(EN.locale, enUS)

export const LanguageContext = createContext(undefined)

export const LanguageProvider = ({ children }) => {

  const [state, setState] = useState( () => {
    const codeFromStorage = getLanguageCodeFromLS()

    return {
      ...initialState, 
      currentLanguage: languages[codeFromStorage],    
    }
  })

  const { currentLanguage } = state
 
  useEffect(() => {
    const fetchInitialLocales =  () => {
      const codeFromStorage =   getLanguageCodeFromLS()

      if (codeFromStorage !== EN.locale) {
        const enLocale = languageMap.get(EN.locale)
        const currentLocale =  fetchLocale(codeFromStorage)
        languageMap.set(codeFromStorage, { ...enLocale, ...currentLocale })
      }
    
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
      }))
    }

   fetchInitialLocales()
   
  }, [setState])


  const setLanguage = async (language) => {

    if (!languageMap.has(language.locale)) {

      setState((prevState) => ({
        ...prevState,
        isFetching: true,
      }))

      const locale = fetchLocale(language.locale)
      const enLocale = languageMap.get(EN.locale)

      // Merge the EN locale to ensure that any locale fetched has all the keys
      languageMap.set(language.locale, { ...enLocale, ...locale })
      await SyncStorage.set(LS_KEY, language.locale)

      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))

    } else {

      await SyncStorage.set(LS_KEY, language.locale)
      setState((prevState) => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }))

    }
  }

  const translate = useCallback(
    (key, data) => {

      const translationSet = languageMap.has(currentLanguage.locale)
        ? languageMap.get(currentLanguage.locale)
        : languageMap.get(EN.locale)
      const translatedText = translationSet[key] || key

      // Check the existence of at least one combination of %%, separated by 1 or more non space characters
      const includesVariable = translatedText.match(/%\S+?%/gm)

      if (includesVariable && data) {
        let interpolatedText = translatedText
        Object.keys(data).forEach((dataKey) => {
          const templateKey = new RegExp(`%${dataKey}%`, 'g')
          interpolatedText = interpolatedText.replace(templateKey, data[dataKey].toString())
        })

        return interpolatedText
      }

      return translatedText
    },
    [currentLanguage],
  )

  return <LanguageContext.Provider value={{ ...state, setLanguage, translation: translate }}>{children}</LanguageContext.Provider>
}
