import React from 'react'
import AuthContext from '../context/AuthContext'
import { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import TextTruncate from 'react-text-truncate'; 
//bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const HrDashboard = () => {
  let {user} = useContext(AuthContext)
  let [tests, setTests] = useState()
  let getTests = async ()=>{
    let response = await fetch("http://127.0.0.1:8000/api/jobs-all", {
        method : "GET",
        headers : {
          "Content-Type": "application/json" 
      },
     
        })
    let data = await response.json() 
    setTests(data)
    }

  useEffect(()=>{
    getTests()
   
  }, [])
  
  return (
    <>
    <br/><br/><br/><br/>
    <h1 className='baseText' style={{fontSize:"200%", marginLeft:"12%"}}>Hey {user.username}, Take a look at some recent job openings</h1>
    
    {tests && tests.map((test) =>{
      let url = `/quiz/${test.url}`
    
      return(
        <Card style={{ width: '75%' , float:"left",marginLeft:"12%", marginTop:"40px"}}>
    
        <Card.Body>
          <Card.Title>{test.position}</Card.Title>
          <Card.Text>
          <TextTruncate
            line={8}
            element="span"
            truncateText="…"
            text={test.desc}/>
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Company: {test.company.toUpperCase()}</ListGroup.Item>
        </ListGroup>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Duration: {test.duration}</ListGroup.Item>
        </ListGroup>
        <Card.Body style= {{display: "flex", "align-items": "center"}}>
        <Link to = {url}><Button variant="primary" >Take Interview</Button></Link>
        </Card.Body>
      </Card>)
    })}
    </>
  );
  
    
}

export default HrDashboard
