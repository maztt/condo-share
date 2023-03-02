import { createContext } from 'react'

import useAuth from '../hooks/useAuth.js'

const Context = createContext()

function UserProvider({ children }) {
  const { authentication, register, login, logout } = useAuth()

  return (
    <Context.Provider value={{ authentication, register, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }
