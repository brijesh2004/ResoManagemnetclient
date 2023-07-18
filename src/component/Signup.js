import React, { useState } from 'react';
import '../styling/login.css'
import { useNavigate} from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
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
    // console.log(name,email,password,cpassword)
    setRegisterBtn("Registering ...");
    const res = await fetch("https://restomanagementserver.onrender.com/register" , {
      method:'POST',
      credentials:'include',
      headers:{
        'Origin':['https://restomanagementserver.onrender.com'],
        'Content-Type':"application/json"
      },
      body: JSON.stringify({
        name , email,password ,cpassword
      })
    })
    const data =await res.json();
    setRegisterBtn("Register");
    // console.log(data);
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
      navigate("/");
    }
  }
  return (
    <>
      <div className="login_page_start">
        <h2>Register</h2>
        <input type="text" placeholder='Enter Your Name' name='name' value={user.name} onChange={handleInputs}/><br />
        <input type="email" placeholder='Enter Your Email' name='email' onChange={handleInputs} value={user.email}/><br />
        <input type="password" placeholder='Create The Password' name='password' onChange={handleInputs} value={user.password}/><br />
        <input type="password" placeholder='Enter Again Password' name='cpassword' onChange={handleInputs} value={user.cpassword}/><br />
        <button onClick={registerUser}>{registerbtn}</button>
      </div>
    </>
  )
}

export default Signup
