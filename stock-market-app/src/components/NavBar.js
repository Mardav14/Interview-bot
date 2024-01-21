import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
      {user ? <div onClick={logoutUser}>Logout </div>: <Link to="/login">Login </Link>}
      <span>|</span>
      <Link to="/"> Home</Link>
      
    </div>
  )
}

export default NavBar
