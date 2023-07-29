import * as React from 'react'



export const CountryModalContext = React.createContext({
  gate: undefined,
  teleport: undefined,
})


export const CountryModalProvider = ({ children }) => {
  const [gate, setGate] = React.useState(undefined)
  const teleport = (element) => setGate(element)
  return (
    <CountryModalContext.Provider value={{ gate, teleport }}>
      {children}
      {gate}
    </CountryModalContext.Provider>
  )
}
