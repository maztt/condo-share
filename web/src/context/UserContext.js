import { createContext } from 'react'

import useAuth from '../hooks/useAuth.js'

const Context = createContext()

function UserProvider({ children }) {
  const { authentication, register, logout } = useAuth()

  return (
    <Context.Provider value={{ authentication, register, logout }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }
