import { useNavigate } from "react-router-dom"
import { useState } from "react"
import App from "./App"


function SignUp() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()


    
  async function handleSignUp(){


    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'
    const settings = {
        method: 'POST',
            body: JSON.stringify( {
                username: username,
                password: password
       })
      }

    const response = await fetch(url,settings)
    const data = await response.json()
    console.log(data)

if(data.success){
    navigate('/')
}

  }


  async function handleLogIn(){

    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login'

    const settings = {
      method: 'POST',
      body: JSON.stringify( {
          username: username,
          password: password
      })
    }
    const response = await fetch(url,settings)
    const data = await response.json()
    console.log(data)

    if(data.success === true){
        localStorage.setItem('tokenId',data.token)
        navigate('/')
    }
  }
 
 



  return(
    <div>
        <h1>Sign up</h1>
        <input type="text" placeholder="username" value={username} onChange = {(event)=>{
            setUserName(event.target.value)}}></input>
        <br />
        <input type="text"placeholder="password" value={password} onChange = {(event)=>{
            setPassword(event.target.value)}}></input>
        <br />
        <button onClick={handleSignUp}>Sign in</button>
        <button onClick={handleLogIn}>Log in</button>
        <br />
        <button onClick={()=> navigate('/')}>back</button>
       
    </div>
  )
}

export default SignUp