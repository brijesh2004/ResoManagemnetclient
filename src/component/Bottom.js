import React, { useState } from 'react';
import '../styling/login.css';
import '../styling/bottom.css';
import { Link } from 'react-router-dom';
const Bottom = () => {
  const [email , setEmail] = useState("");
    const sendEmail = async ()=>{
      const req = await fetch("https://restomanagementserver.onrender.com/getnewsdaily",{
        method:'POST',
        credentials:'include',
        headers:{
          'Origin':['https://restomanagementserver.onrender.com'],
          "Content-Type":'application/json'
        },
        body:JSON.stringify({
          email
        })
       })
       const data = await req.json();
       console.log(data);
       if(req.status===401 || !data){
        alert("added ");
       }
       else if(req.status===402){
        alert("You Have already Subcribed");
       }
       else{
        alert("Subscibed");
        setEmail("");
       }
    }
   
  return (
    <>
      <div className='bottom_page_Start mt-5 '>
        <div className='left'>
         <p><Link to='/breakfast' style={{color:'white'}}>BreakFast</Link></p>
         <p><Link to='/lunch' style={{color:'white'}}>Lunch</Link></p>
         <p><Link to='/dinner' style={{color:'white'}}>Dinner</Link></p>
        </div>
        <div className='right'>
            <h6>Subscribe for daily Update</h6>
            <input type="text" name='email'  value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Email'/><br />
            <button className='bottom_btn' onClick={sendEmail}>Subscribe</button>
        </div>
      </div>
    </>
  )
}

export default Bottom
