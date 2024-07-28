import React, { useState } from 'react'
import '../styling/login.css';
import {useNavigate} from 'react-router-dom';
import Bottom from './Bottom';
const Login = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
   const [button , setButton] = useState("Login");
  const loginUser = async () =>{
    setButton("Login ...")
    const req = await fetch(`${process.env.REACT_APP_BACKEDN}/login`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Origin":[`${process.env.REACT_APP_BACKEDN}`],
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })
    const data =await req.json();
    setButton("Login")
     if(req.status===401 || !data){
      alert("user login failed");
     }
     else{
      alert("user Login Successfull");
      navigate("/");
      window.location.reload();
     }
  }
  return (
    <>
      <div className="login_page_start">
      <div className="login_start">
        <h2>Login Page</h2>
        <label htmlFor="email" className='label'>Email:</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter the Email'/> <br />
        <label htmlFor="password" className='label'>Password:</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the Password'/><br />
        <button onClick={loginUser}>{button}</button>
      </div>
      </div>
      <Bottom/>
    </>
  )
}

export default Login
