import React, { useState, useEffect, useRef, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import QuizResult from './QuizResult';
import './Quiz.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'



const Quiz = () => {
    let {user} = useContext(AuthContext)
    const params = useParams()
    const title = params.title
    const [quizData, setQuizData] = useState()
    const [heading, setHeading] = useState()
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [showResult,setShowResult]=useState(false);
    const [timer, setTimer] = useState()
    const [displayTime, setDisplayTime] = useState("")
    const [allAnswers, setAllAnswers] = useState([])
    const ref = useRef()

    let getQuestions = async ()=>{
        let response = await fetch("http://127.0.0.1:8000/api/questions", {
            method : "POST",
            headers : {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({'url': title, 'username': user.username}),

        })
        let data = await response.json()
        if(response.status === 200){
            
            // const questions = data.map(item => item.questions).flat()
            setQuizData(data.questions);
            setHeading(data.position)
            setTimer(data.duration)
            console.log(data.duration)
                      
                      
        }
        else{
            alert("Something went wrong")
        }
        
    }
    
    const getTimeRemaining = (e)=>{
        const total = Date.parse(e) - Date.parse(new Date())
        const hours = Math.floor((total / 1000 / 60 / 60) % 24)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const seconds = Math.floor((total / 1000) % 60)
        return {total, hours, minutes, seconds}
    }
    
    function startTimer(e){
        let{total, hours, minutes, seconds} = getTimeRemaining(e)
        if(total >= 0){
            setDisplayTime(
                (hours > 9 ? hours : "0" + hours)+ ":"+
                (minutes > 9 ? minutes : "0" + minutes)+ ":"+
                (seconds > 9 ? seconds : "0" + seconds)
    
            )
        }
        else{
            setShowResult(true)
        }
    }
    const clearTimer = (e)=>{
        
        if(ref.current) clearInterval(ref.current)
            const id = setInterval(()=>{
                startTimer(e)
            }, 1000)
            ref.current = id;
        
    }
    const getSeconds = (timer)=>{
        let arr = timer.split(":")
        let arr_int = []
        let i = 0;
        arr.forEach((e)=>{
            arr_int[i] = parseInt(e)
            i++
        })
        return arr_int
    }
    const getDeadTime = ()=>{
        let deadline = new Date();
        let [hours,minutes, seconds] = getSeconds(timer)
        deadline.setSeconds(deadline.getSeconds() + seconds)
        deadline.setMinutes(deadline.getMinutes() + minutes)
        deadline.setHours(deadline.getHours() + hours)
        
        return deadline;
    }
    
    useEffect(()=>{
        getQuestions()
    }, [])
    useEffect(()=>{
        if(timer)
            clearTimer(getDeadTime())
    }, [timer])
    //Quiz code
    
const changeQuestion = (e, i)=>{
    e.preventDefault()
    if(i< quizData.length-1){
        setCurrentQuestion(i+1);
          
        let newAllAnswers = [...allAnswers, e.target.answer.value]
        setAllAnswers(newAllAnswers)
        console.log(allAnswers)
        e.target.answer.value = ''
        
            
        }
    else{
        let newAllAnswers = [...allAnswers, e.target.answer.value]
        setAllAnswers(newAllAnswers)
        console.log(allAnswers)
        setShowResult(true)
    }
    }
    

    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setAllAnswers([])
        setDisplayTime("")
        clearTimer(getDeadTime())
    }
  return (
   
    <div className='quizBody'>
         <br/><br/><br/><br/>
        
            {showResult ? (
                <QuizResult tryAgain={resetAll} allAnswers = {allAnswers} questions={quizData} username = {user.username} url={title}/>
            ):(
            <>
            <div className="containerQuiz">
            <h1 className='baseText'>{heading}</h1>
            <div className='p-20' >
            <br/><h3 className='baseText'>{displayTime}</h3>
      </div>
            {quizData? ( <div className = "question">
                <div style={{display:"inline"}}>
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{quizData[currentQuestion]}</span>
                </div>
            </div>):null}
           <div >
            <Form onSubmit={(e)=>{changeQuestion(e, currentQuestion)}} style={{width:"500px"}}>
            <Form.Group className="mb-3 w-100" style={{display:"inline"}} controlId="formBasicUserName">
            <textarea rows = "3" cols = "150" class="form-control" type="text" placeholder="Write Your Response" name = "answer" />
            </Form.Group>
            <Button className="btn-primary" id="next-button" type="submit" style={{"fontFamily":"Arial", "backgroundColor":"rgb(68, 20, 90)", display:"inline", float:"right", position:"relative", left:"120px", bottom:"80px"}}>Submit</Button>
            </Form>
            </div>
            
           
            </div>
            
            </>)}
       
        
    </div>
  )
}

export default Quiz