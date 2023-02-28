import Input from '../../form/Input.js'

import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

function Register () {

  function handleChange (e) {}

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form>
        <Input 
          text="Name"
          type="text"
          name="name"
          placeholder="What's your name?"
          handleOnChange={handleChange}
        />
        <Input 
          text="Email"
          type="email"
          name="email"
          placeholder="What's your email?"
          handleOnChange={handleChange}
        />
        <Input 
          text="Phone"
          type="text"
          name="phone"
          placeholder="What's your phone number?"
          handleOnChange={handleChange}
        />
        <Input 
          text="Block"
          type="text"
          name="block"
          placeholder="What's the block you live at?"
          handleOnChange={handleChange}
        />
        <Input 
          text="Apartment"
          type="text"
          name="apartment"
          placeholder="What's the apartment you live in?"
          handleOnChange={handleChange}
        />
        <Input 
          text="Password"
          type="password"
          name="password"
          placeholder="Pick a password"
          handleOnChange={handleChange}
        />
        <Input 
          text="Confirm your password"
          type="password"
          name="confirmpassword"
          placeholder="Confirm the password you picked"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        <Link to="/login">I have an account</Link>
      </p>
    </section>
  )
}

export default Register