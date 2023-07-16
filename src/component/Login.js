import React, { useState } from 'react'
import '../styling/login.css';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const loginUser = async () =>{
    const req = await fetch("https://restomanagementserver.onrender.com/login",{
      method:"POST",
      credentials:"include",
      headers:{
        "Origin":['https://restomanagementserver.onrender.com'],
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    })
    const data =await req.json();
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
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter the Email'/> <br />
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter the Password'/><br />
        <button onClick={loginUser}>Login</button>
      </div>
      </div>
    </>
  )
}

export default Login
