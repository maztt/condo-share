import api from '../utils/api.js'

import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export default function useAuth() {
  async function register(user) {

    try {
      await api.post('/users/register', user).then((response) => {
        return response.data
      })   
    } catch (error) {
      console.error(error)
    }
  }

  return { register }

}