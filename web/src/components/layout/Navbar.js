import { Link } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'

function Navbar () {
  return (
    <nav>
      <div>
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