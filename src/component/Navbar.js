import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  // const [showBasic, setShowBasic] = useState(false);
  const [islogin , setIsLogin] = useState(false);
  const isLogin = async ()=>{
    const res = await fetch('https://restomanagementserver.onrender.com/navbar',{
      method:'GET',
      credentials:'include',
      headers:{
        'Origin':['https://restomanagementserver.onrender.com'],
        "Content-Type":"application/json"
      }
    })
    const data =await res.json();
    // console.log(data);
    if(res.status===401 || !data){
        setIsLogin(false);
        // console.log("false");
    }
    else{
      setIsLogin(true);
      // console.log("true");
    }
  }
  
useEffect(()=>{
  isLogin();
},[]);
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">BS Resto Services</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/types">Service</Link>
        </li>
        {
          islogin&& <div className='divpage'><li className="nav-item">
          <Link className="nav-link" to="/logout" >Logout</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        </div>
          
        }
        {
          !islogin&&<div className='divpage'> <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        
        </div>
        }
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Items
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/breakfast">Breakfast</Link></li>
            <li><Link className="dropdown-item" to="/lunch">Lunch</Link></li>
            <li><Link className="dropdown-item" to="dinner">Dinner</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  );
}