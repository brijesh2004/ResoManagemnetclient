import React, { useEffect, useState } from 'react';
import '../styling/breakfast.css';
import '../styling/bottom.css';
import '../styling/login.css';
import Bottom from './Bottom';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Breakfast = () => {
  const navigate = useNavigate();
  const [paybutton , setPayButton ] = useState("Pay Now");
  const [cusdata,setCusData] = useState({});
  const [payment , setPayment] = useState({
    mobile1:"",mobile2:"",address:"",pincode:""
  });
  const [isordered , setOrdered] = useState(false);
  const [name,setName] = useState("");
  const [price , setPrice] = useState(0);
  const [isloaded , setIsloader] = useState(false);
  const findbreakfast =async () =>{
    const req = await fetch(`${process.env.REACT_APP_BACKEDN}/breakfast`,{
      method:'GET',
      credentials:'include',
      headers:{
        'Origin':[`${process.env.REACT_APP_BACKEDN}`],
        'Content-Type':'application/json'
      }
    })
    setIsloader(false);
    const data =await req.json();
    setCusData(data);
    setIsloader(true);
    // console.log(data);
  }

  const InputHandel = (e) =>{
    let name , value;
    name = e.target.name;
    value = e.target.value;
    setPayment({...payment , [name]:value});
   }
  const ordernow = async () =>{
    const {mobile1 , mobile2 , address , pincode}  = payment;
    setPayButton("Paying ...");
    const res = await fetch(`${process.env.REACT_APP_BACKEDN}/ordernow`,{
      credentials:"include",
      method:'POST',
      headers:{
        "Origin":[`${process.env.REACT_APP_BACKEDN}`],
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
      navigate("/breakfast");
      window.location.reload();
     }
  }
 

  useEffect(()=>{
    findbreakfast();
  },[]);
  return (
    <>
    {
      !isloaded &&<Loader/>
    }

   { !isordered&&isloaded&& <div>
    <center><h1 className='font-monospace'>Breakfast</h1></center>
    <div className='breakfast_page'>
       {Array.isArray(cusdata)&&cusdata.map((elem ,index)=>(
        <div className='container_box' key={index}>
          <img src={elem.imageurl} alt="images" />
          <h1 className='font-monospace'>{elem.name}</h1>
          <p className='font-monospace'>Price :- {elem.price} ₹</p>
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
     <h2>Pay On Develery</h2>
     <input type="text" name=""  value={name} contentEditable="false" disabled/><br />
      <input type="number" name=""  value={price} contentEditable="false" disabled/> <br />
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

export default Breakfast
