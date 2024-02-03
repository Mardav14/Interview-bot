import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/AuthContext';


const Register = () => {
  const {register} = useContext(AuthContext)
  return (
    <div className='container py-5' style={{width: "50%"}}>
    <Form onSubmit={register}>
    <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name = "username" />
       
      </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name = "email"/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
        

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name = "password"/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
    </div>

  )
}

export default Register
