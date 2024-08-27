import React, { useEffect, useState } from 'react';
import '../styling/breakfast.css';
import '../styling/bottom.css';
import Loader from './Loader';
import Bottom from './Bottom';
import AddToCart from './AddToCart';



const Lunch = () => {
  const [cusdata, setCusData] = useState({});
  const [isloaded, setIsloader] = useState(false);
  const findlunchdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEDN}/lunch`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        "Origin": [`${process.env.REACT_APP_BACKEDN}`],
        "Content-Type": 'application/json'
      }
    })
    setIsloader(false)
    const data = await res.json();
    setIsloader(true)
    setCusData(data);
  }




  useEffect(() => {
    findlunchdata();
  }, [])
  return (
    <>
      {
        !isloaded && <Loader />
      }
      {isloaded && <div>
        <center><h1 className='font-monospace'>Lunch</h1></center>
        <div className='breakfast_page'>
          {Array.isArray(cusdata) && cusdata.map((elem, index) => (
            <div className='container_box' key={index}>
              <img src={elem.imageurl} alt="images" />
              <h1 className='font-monospace'>{elem.name}</h1>
              <p className='font-monospace'>Price :- {elem.price} ₹</p>
              
             <AddToCart elem = {elem}/>
            </div>
          ))}
        </div>
      </div>}
      <br />
      <Bottom />
    </>
  )
}

export default Lunch
