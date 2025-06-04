import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Login() {
 
  let navigate = useNavigate()

    let {user} = useParams()
    let HandleNavigate =()=>{
      navigate("/")
    }
  return (
    <div>
    <h1>Welcome to react Js {user}</h1>
    <div>Login</div>
    <button onClick={HandleNavigate}>Move to Home</button>
    </div>
  )
}

export default Login