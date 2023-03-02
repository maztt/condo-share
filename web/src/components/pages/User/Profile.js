import { useState, useEffect } from 'react'

import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import api from '../../../utils/api.js'

import Input from '../../form/Input.js'

function Profile() {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem(('token') || ''))

  useEffect(() => {

    api.get('/users/check', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data)
    })

  }, [token])

  function onFileChange(e) {
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <section>
      <div  className={styles.profile_header}>
        <h1>My profile</h1>
      </div> 
      <form className={formStyles.form_container}>
        <Input 
          text="Photo"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="What's your name?"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Email"
          type="email"
          name="email"
          placeholder="What's your email?"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="What's your phone number?"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        <Input
          text="Block"
          type="text"
          name="block"
          placeholder="What's the block you live at?"
          handleOnChange={handleChange}
          value={user.block || ''}
        />
        <Input
          text="Apartment"
          type="text"
          name="apartment"
          placeholder="What's the apartment you live in?"
          handleOnChange={handleChange}
          value={user.apartment || ''}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Pick a password"
          handleOnChange={handleChange}
          value={user.password || ''}
        />
        <Input
          text="Confirm your password"
          type="password"
          name="confirmpassword"
          placeholder="Confirm the password you picked"
          handleOnChange={handleChange}
          value={user.confirmpassword || ''}
        />
        <input type="submit" value="Edit" />
      </form>
    </section>
  )
}

export default Profile