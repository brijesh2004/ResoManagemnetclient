import React, { useEffect, useState } from 'react'
import '../styling/breakfast.css';
import '../styling/bottom.css';
import Bottom from './Bottom';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';


const Dinner = () => {
  const navigate = useNavigate();
  const [paybutton , setPayButton ] = useState("Pay Now");
  const [cusdata , setCusData] = useState({});
  const [payment , setPayment] = useState({
    mobile1:"",mobile2:"",address:"",pincode:""
  });
  const [isordered , setOrdered] = useState(false);
  const [name,setName] = useState("");
  const [price , setPrice] = useState(0);
  const [isloaded , setIsloader] = useState(false);
  const findDinner = async () =>{
   const res = await fetch('http://https://restomanagementserver.onrender.com/dinner' ,{
    method:'GET',
    credentials:'include',
    headers:{
      'Origin':['http://https://restomanagementserver.onrender.com'],
      'Content-Type':'application/json'
    }
   })
   setIsloader(false)
   const data = await res.json();
  setCusData(data);
  setIsloader(true);
  }

  const InputHandel = (e) =>{
    let name , value;
    name = e.target.name;
    value = e.target.value;
    setPayment({...payment , [name]:value});
   }

   const ordernow = async () =>{
    setPayButton("Paying ...");
    const {mobile1 , mobile2 , address , pincode}  = payment;
    const res = await fetch('http://https://restomanagementserver.onrender.com/ordernow',{
      credentials:"include",
      method:'POST',
      headers:{
        "Origin":['http://https://restomanagementserver.onrender.com'],
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,price ,mobile1 , mobile2 ,address ,pincode
      })
    })
    const data =await res.json();
    setPayButton("Pay Now");
    if(res.status===402){
      alert("Login First");
    }
     else if(res.status===401 || !data ) {
      alert("Order not booked check login or fill al the fields");
     }
     else {
      alert("Order Booked . Thanks");
      navigate("/dinner");
      window.location.reload();
     }
  }
 

  useEffect(()=>{
    findDinner();
  },[])
  return (
    <>{
      !isloaded&&<Loader/>
    }
   { !isordered&&isloaded&& <div>
    <center><h1>Dinner</h1></center>
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
    <h2>Pay On Delevery</h2>
    <input type="text" name=""  value={name} contentEditable="false" disabled="true"/><br />
      <input type="number" name=""  value={price} contentEditable="false" disabled="true"/> <br />
      <input type="number" name="mobile1"  value={payment.mobile1} onChange={InputHandel}  placeholder='Enter Mobile Number' /><br />
      <input type="number" name="mobile2" value={payment.mobile2} onChange={InputHandel}  placeholder='Enter Alternate Mobile Number'/><br />
      <input type="text" name="address" value={payment.address} onChange={InputHandel} placeholder='Enter the Address'/><br />
      <input type="number" name="pincode" value={payment.pincode} onChange={InputHandel} placeholder='Enter Pincode '/><br />
        {/* <select name="" id="">
          <option value="">Master Card</option>
          <option value="">Rupay Card</option>
          <option value="">VISA Card</option>
        </select> <br />
      <input type="text" name="" id=""  placeholder='Enter the Card Number'/><br />
      <input type="date" data-date-inline-picker="true"  placeholder='Enter the card expiry date'/> <br /> */}
      <button onClick={ordernow}>{paybutton}</button>
    </div>}
    <Bottom/>
    </>
  )
}

export default Dinner
