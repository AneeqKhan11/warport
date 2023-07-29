import React, {
  useRef,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react'
import DropdownAlert from 'react-native-dropdownalert'
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  dropdownAlertImage: { width: 20, height: 20, marginTop: 8 },
})

const AlertContext = createContext({
  alertWithType() {},
})
export const AlertDropdownContextProvider = ({ children }) => {
  const [alertType, setAlertType] = useState('')
  const dropdown = useRef()
  const contextValue = useMemo(
    () => ({
      alertWithType: (type, title, message, payload, interval) => {
        setAlertType(type)
        dropdown?.current?.alertWithType(
          type,
          title,
          message,
          payload,
          interval
        )
      },
    }),
    [dropdown]
  )
  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <DropdownAlert
        imageStyle={styles.dropdownAlertImage}
        ref={dropdown}
        alertType={alertType}
      />
    </AlertContext.Provider>
  )
}

export const useDropdownAlert = () => {
  const context = useContext(AlertContext)

  if (context === undefined) {
    throw new Error(
      'useDropdownAlert was used outside of its Provider -> DropdownAlertProvider'
    )
  }

  return context
}
