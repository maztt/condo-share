import { useState, useEffect } from 'react'

import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'
import api from '../../../utils/api.js'

import Input from '../../form/Input.js'
import RoundedImage from '../../layout/RoundedImage.js'
import useFlashMessage from '../../../hooks/useFlashMessage.js'

function Profile() {
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token' || ''))
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/users/check', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then(response => {
        setUser(response.data)
      })
  }, [token])

  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(user).forEach(key => {
      formData.append(key, user[key])
    })

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        msgType = 'error'
        return err.response.data
      })
    
    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>My profile</h1>
        {( user.image || preview ) && (
          <RoundedImage src={preview ? URL.createObjectURL(preview) : `${process.env.REACT_APP_API}/images/users/${user.image}` } alt="Profile photo"/>
          )}
          <h2>{(user.name)}</h2>
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
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
          placeholder="New password"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirm your password"
          type="password"
          name="confirmpassword"
          placeholder="Repeat the password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Edit" />
      </form>
    </section>
  )
}

export default Profile
