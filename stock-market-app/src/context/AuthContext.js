import {createContext, useState, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')):null)
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    let loginUser = async (e)=>{
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method : "POST",
            headers : {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({'username': e.target.username.value, 'password':e.target.password.value,}),

        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            navigate('/user')
        }
        else{
            alert("Something went wrong")
        }
        
    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate('/login')
    }

    let UpdateToken = async ()=>{
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method : "POST",
            headers : {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({'refresh': authTokens?.refresh}),

        })
        let data = await response.json()
        if(response.status === 200){
            data.refresh = authTokens.refresh
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
        }
        else{
           logoutUser()
        }
        if(loading){
            setLoading(false)
        }
    }

    let register = async (e)=>{
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/api/register/", {
            method : "POST",
            headers : {
                "Content-Type": "application/json" 
            },
            body : JSON.stringify({'username': e.target.username.value, 'email':e.target.email.value,'password':e.target.password.value,}),

        })
        let data = await response.json()
        if(response.status === 201){
           alert("account created!")
        }
        else{
            alert("Something went wrong")
        }
        
    }
    

    let contextData = {
        user : user,
        authTokens : authTokens,
        loginUser : loginUser,
        logoutUser : logoutUser,
        register : register
    }

    useEffect(()=>{
    if(loading){
        UpdateToken()
    }

        let fourMin = 1000 * 60 * 4 
        let interval = setInterval(()=>{
            if(authTokens){
                UpdateToken()
            }
        },fourMin)
        return ()=>clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value = {contextData} >
            {loading? null : children}
        </AuthContext.Provider>
    )
}