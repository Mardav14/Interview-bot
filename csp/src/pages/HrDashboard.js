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
    let response = await fetch("http://127.0.0.1:8000/api/jobs", {
        method : "POST",
        headers : {
          "Content-Type": "application/json" 
      },
      body : JSON.stringify({'company': user.username}),
        })
    let data = await response.json() 
    setTests(data)
    console.log(data)
    }

  useEffect(()=>{
    getTests()
   
  }, [])
  
  return (
    <>
    <br/><br/><br/><br/>
    <h1 className='baseText' style={{fontSize:"200%", display:"flex", justifyContent:"center"}}>{user.username.toUpperCase()} DASHBOARD</h1>
    <Link to="/create-job"><Button className='btn-success' style={{marginLeft:"12%", marginTop:"10px"}}>Create New Job Opening</Button></Link>
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
            <ListGroup.Item>Duration: {test.duration}</ListGroup.Item>
        </ListGroup>
        <Card.Body style= {{display: "flex", "align-items": "center"}}>
        <ListGroup>Top Candidates: 
            <table style={{marginLeft:"30%", width:"100%"}}>
            <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Email</th>
            </tr>
            {test.scores.map((e) => (
        <tr> 
        <td>{e.username}</td> 
        <td>{e.score}</td> 
        <td>{e.email}</td> 
        </tr>
))}
            </table></ListGroup>
        </Card.Body>
      </Card>)
    })}
    </>
  );
  
    
}

export default HrDashboard
