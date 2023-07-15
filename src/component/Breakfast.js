import React, { useEffect, useState } from 'react';
import '../styling/breakfast.css';
import '../styling/bottom.css';
import '../styling/login.css';
import Bottom from './Bottom';

const Breakfast = () => {
  const [cusdata,setCusData] = useState({});
  const [isordered , setOrdered] = useState(false);
  const [name,setName] = useState("");
  const [price , setPrice] = useState(0);
  const findbreakfast =async () =>{
    const req = await fetch('https://restomanagementserver.onrender.com/breakfast',{
      method:'GET',
      credentials:'include',
      headers:{
        'Origin':['https://restomanagementserver.onrender.com'],
        'Content-Type':'application/json'
      }
    })
    const data =await req.json();
    setCusData(data);
    // console.log(data);
  }
  useEffect(()=>{
    findbreakfast();
  },[]);
  return (
    <>
   { !isordered&& <div>
    <center><h1>Breakfast</h1></center>
    <div className='breakfast_page'>
       {Array.isArray(cusdata)&&cusdata.map((elem ,index)=>(
        <div className='container_box'>
          <h1>{elem.name}</h1>
          <img src={elem.imageurl} alt="images" />
          <p>Price :- {elem.price} ₹</p>
          <button className='buy_btn' onClick={async ()=>{
          setName(elem.name);
          setPrice(elem.price)
          setOrdered(true);
          }}>Order Now</button>
        </div>
       ))}
    </div>
    </div>}
    <br />
    {isordered&&<div className='login_page_start'>
    
      <input type="text" name="" id="" value={name} contentEditable="false" disabled="true"/><br />
      <input type="number" name="" id="" value={price} contentEditable="false" disabled="true"/> <br />
      <input type="number" name="" id="" placeholder='Enter Mobile Number'/><br />
      <input type="text" name="" id="" placeholder='Enter the Address'/><br />
      <input type="number" name="" id="" placeholder='Enter Pincode '/><br />
        <select name="" id="">
          <option value="">Master Card</option>
          <option value="">Rupay Card</option>
          <option value="">VISA Card</option>
        </select> <br />
      <input type="text" name="" id=""  placeholder='Enter the Card Number'/><br />
      <input type="date" data-date-inline-picker="true"  placeholder='Enter the card expiry date'/> <br />
      <button>Pay Now</button>
    </div>}
    <Bottom/>
    </>
  )
}

export default Breakfast
