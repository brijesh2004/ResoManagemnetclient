import React, { useEffect, useState } from 'react';
import '../styling/login.css'
import { useNavigate} from 'react-router-dom';
import Bottom from './Bottom';
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const login = useSelector((data)=>data.cartData.login);
  const [user , setUser] = useState({
    name:"",email:"",password:"",cpassword:""
  });
  const [registerbtn , setRegisterBtn] = useState("Register");
  let name,value;
  const handleInputs = (e) =>{
    name = e.target.name;
    value = e.target.value;
    setUser({...user , [name]:value});
  }
  const registerUser = async (e) => {
    e.preventDefault();
    const {name,email,password , cpassword} = user;
    setRegisterBtn("Registering ...");
    const res = await fetch(`${process.env.REACT_APP_BACKEDN}/register` , {
      method:'POST',
      credentials:'include',
      headers:{
        'Origin':[`${process.env.REACT_APP_BACKEDN}`],
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        name , email,password ,cpassword
      })
    })
    const data =await res.json();
    setRegisterBtn("Register");
    if(res.status===422){
      alert("User already exist");
    }
   else if(res.status===421){
    alert("password must be same");
   } else if(res.status === 401 || !data){
      alert("Registration failed");
    }
    else{
      alert("Registration successfull");
      navigate("/login");
    }
  }

  useEffect(()=>{
    if(login===true){
      navigate("/");
    }
  })
  return (
    <>
      <div className="login_page_start">
        <h2>Register</h2>
        <label htmlFor="name" className='label'>Email:</label>
        <input type="text" placeholder='Enter Your Name' name='name' value={user.name} onChange={handleInputs}/><br />
        <label htmlFor="email" className='label'>Email:</label>
        <input type="email" placeholder='Enter Your Email' name='email' onChange={handleInputs} value={user.email}/><br />
        <label htmlFor="password" className='label'>Password:</label>
        <input type="password" placeholder='Create The Password' name='password' onChange={handleInputs} value={user.password}/><br />
        <label htmlFor="cpassword" className='label'>Confirm Password</label>
        <input type="password" placeholder='Enter Again Password' name='cpassword' onChange={handleInputs} value={user.cpassword}/><br />
        <button onClick={registerUser}>{registerbtn}</button>
      </div>
      <Bottom/>
    </>
  )
}

export default Signup
