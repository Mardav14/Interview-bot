import AuthContext from '../context/AuthContext'
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';


const CreateJob = () => {
    let {user} = useContext(AuthContext)
    let createJob = async (e)=>{
        
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/create-job", {
            method : "POST",
            headers : {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({'position': e.target.position.value, 'desc':e.target.desc.value,'url':e.target.url.value,'duration':e.target.duration.value, 'company': user.username, 'scores': [{}]}),
    
        })
        let data = await response.json()
        if(response.status === 201){
            alert("New Job Opening Added")
        }
        else{
            alert("Something went wrong")
        }
        
    }
  return (
    <div className='container py-5' style={{width: "50%"}}>
    <Form onSubmit={createJob}>
      <br/><br/>
    <Form.Group className="mb-3">
        <Form.Label><div className='baseText'>Enter Job Position</div> </Form.Label>
        <Form.Control type="text" placeholder="Enter Job Position" name = "position" />
       </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label><div className='baseText'>Enter Job Description</div> </Form.Label>
        <Form.Control type="text" placeholder="Enter Job Description" name = "desc" />
       </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label><div className='baseText'>Enter Interview Duration</div> </Form.Label>
        <Form.Control type="text" placeholder="Enter Interview Duration" name = "duration" />
       </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label><div className='baseText'>Enter URL for the Job Entry</div> </Form.Label>
        <Form.Control type="text" placeholder="Enter URL" name = "url" />
       </Form.Group>
      
      <Button variant="primary" type="submit">
        Create Job Opening
      </Button>
    </Form>
    </div>
  )
}

export default CreateJob
