import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../../context/UserContext.js'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

function Navbar () {

  const { authentication, logout } = useContext(Context)

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link to="/">
          <img src={Logo} alt="CondoShare" />
        </Link>
      </div>
      <ul>
        { authentication ? (
          <>
            <li>
              <Link to='/'>Claim</Link>
            </li>
            <li>
              <Link to='/tool/mytools'>My tools</Link>
            </li>
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
            <li onClick={logout}>
              Log off
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar