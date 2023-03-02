import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../context/UserContext.js'
import Input from '../../form/Input.js'

import styles from '../../form/Form.module.css'

function Login () {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="Email"
          type="email"
          name="email"
          placeholder="Email"
          handleOnChange={handleChange}
        />
        <Input 
          text="Password"
          type="password"
          name="password"
          placeholder="Password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Log in" />
      </form>
      <p>
        <Link to="/register">I don't have an account</Link>
      </p>
    </section>
  )
}

export default Login