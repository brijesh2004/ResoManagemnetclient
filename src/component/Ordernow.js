import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { EmptyCartItem } from '../redux/slice';
const Ordernow = () => {
    const cart = useSelector((data)=>data.cartData.cart);
    const login = useSelector((data)=>data.cartData.login);
    const dispatch = useDispatch();
    const [orderData , setOrderData] = useState({
      name:'',
      table:''
    });

    const onChangeTheInput = (e) => {
      const { name, value } = e.target;
      setOrderData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };


    const OrderIT = async (e)=>{
     try{
      e.preventDefault();
      const {name , table} = orderData;
      if(!name || !table ||cart.length===0){
         alert("Fill the all field or add item to the cart");
         return;
      }
         const res = await fetch(`${process.env.REACT_APP_BACKEDN}/order` , {
          method: "POST",
          credentials: "include",
          headers: {
            "Origin": [`${process.env.REACT_APP_BACKEDN}`],
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cart , name , table
          })
        })

        await res.json();
        if(res.status!==201){
          alert("Errpr");
        }
        else{
          dispatch(EmptyCartItem())
          alert("Ordered");
        }
     }
     catch(err){
      alert("Error");
     }
    }
  return (
    <div>
    {cart.length===0?<h3>Please Add the Item To Cart first</h3>:''}
    <label htmlFor="name">Name:</label><br />
       <input type="text" placeholder='Enter Name' value={orderData.name} name="name" onChange={onChangeTheInput}/><br /><br />
       <label htmlFor="tabel_number">Table Number:</label><br />
       <input type="number" placeholder='Enter the Table Number' value={orderData.table} name="table" onChange={onChangeTheInput}/><br /><br />
       <button type='submit' onClick={OrderIT} disabled={!login}>Confirm</button>
       {!login?<h3>Login For Order</h3>:''}
    </div>
  )
}

export default Ordernow
