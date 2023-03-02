import api from '../utils/api.js'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage.js'

export default function useAuth() {
  const [authentication, setAuthentication] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthentication(true)
    }

  }, [])

  async function register(user) {
    let msgText = 'Account was created!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/register', user).then(response => {
        return response.data
      })

      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  async function authUser(data) {
    setAuthentication(true)

    localStorage.setItem('token', JSON.stringify(data.token))

    navigate('/')
  }

  function logout() {
    const msgText = 'Logging off...'
    const msgType = 'success'

    setAuthentication(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/')

    setFlashMessage(msgText, msgType)
  }

  return { authentication, register, logout }
}
