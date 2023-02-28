import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

function Navbar () {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="CondoShare" />
      </div>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/'>Claim</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar