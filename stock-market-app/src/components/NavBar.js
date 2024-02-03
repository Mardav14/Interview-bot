import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
//bootstrap imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'

const NavBar = () => {
    const {user, logoutUser} = useContext(AuthContext)
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Stock Market App</Navbar.Brand>
          <Nav className="me-auto">
            <Link  className='nav-link' to='/user'>Home</Link>
            <Link className='nav-link' to='/register'>Register</Link>
            {user ? <Button variant="link" className='nav-link' onClick={logoutUser}>Logout</Button>: <Link className='nav-link' to="/login">Login</Link>}
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar
