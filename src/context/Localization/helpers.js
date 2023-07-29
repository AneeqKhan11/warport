import { EN,languages } from './languages'
import SyncStorage from "sync-storage"

export const LS_KEY = 'wareport_language'

export const fetchLocale = (locale) => {
  const language = languages[locale]; 
  const data =language.file;

  return data
}

export const getLanguageCodeFromLS =  () => {
  try {
    const codeFromStorage = SyncStorage.get(LS_KEY)
  
    return codeFromStorage == null ?  EN.locale :codeFromStorage 
   
  } catch {
    return EN.locale
  }
}
