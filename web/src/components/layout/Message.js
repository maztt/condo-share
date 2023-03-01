import { useState, useEffect } from 'react'
import bus from '../../utils/bus.js'

function Message() {
  let [visibility, setVisibility] = useState(false)
  let [message, setMessage] = useState('')
  let [type, setType] = useState('')

  useEffect(() => {

    bus.addListener('flash', ({ message, type }) => {
      setVisibility(true)
      setMessage(message)
      setType(type)

      setTimeout(() => {
        setVisibility(false)
      }, 3000)
    })

  }, [])

  return (
    visibility && (
      <div>{message}</div>
    )
  )
}

export default Message
