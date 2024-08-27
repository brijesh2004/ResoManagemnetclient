import React, { useEffect, useState } from 'react'
import '../styling/breakfast.css';
import '../styling/bottom.css';
import Bottom from './Bottom';
import Loader from './Loader';

import AddToCart from './AddToCart';

const Dinner = () => {
  const [cusdata , setCusData] = useState({});
  const [isloaded , setIsloader] = useState(false);
  const findDinner = async () =>{
   const res = await fetch(`${process.env.REACT_APP_BACKEDN}/dinner` ,{
    method:'GET',
    credentials:'include',
    headers:{
      'Origin':[`${process.env.REACT_APP_BACKEDN}`],
      'Content-Type':'application/json'
    }
   })
   setIsloader(false)
   const data = await res.json();
  setCusData(data);
  setIsloader(true);
  }

  useEffect(()=>{
    findDinner();
  },[])
  return (
    <>{
      !isloaded&&<Loader/>
    }
   {isloaded&& <div>
    <center><h1 className='font-monospace'>Dinner</h1></center>
    <div className='breakfast_page'>
       {Array.isArray(cusdata)&&cusdata.map((elem ,index)=>(
        <div className='container_box' key={index}>
          <img src={elem.imageurl} alt="images" />
          <h1 className='font-monospace'>{elem.name}</h1>
          <p className='font-monospace'>Price :- {elem.price} ₹</p>

          <AddToCart elem={elem} />
        </div>
       ))}
    </div>
    </div>}
    <br />
    <Bottom/>
    </>
  )
}

export default Dinner
