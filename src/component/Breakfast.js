import React, { useEffect, useState } from 'react';
import '../styling/breakfast.css';
import '../styling/bottom.css';
import '../styling/login.css';
import Bottom from './Bottom';
import Loader from './Loader';

import AddToCart from './AddToCart';

const Breakfast = () => {
  const [cusdata, setCusData] = useState({});
  const [isloaded, setIsloader] = useState(false);

  const findbreakfast = async () => {
    const req = await fetch(`${process.env.REACT_APP_BACKEDN}/breakfast`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Origin': [`${process.env.REACT_APP_BACKEDN}`],
        'Content-Type': 'application/json'
      }
    })
    setIsloader(false);
    const data = await req.json();
    setCusData(data);
    setIsloader(true);
  }


  useEffect(() => {
    findbreakfast();
  }, []);
  return (
    <>
      {
        !isloaded && <Loader />
      }

      { isloaded && <div>
        <center><h1 className='font-monospace'>Breakfast</h1></center>
        <div className='breakfast_page'>
          {Array.isArray(cusdata) && cusdata.map((elem) => (
            <div className='container_box' key={elem.id}>
              <img src={elem.imageurl} alt="images" />
              <h1 className='font-monospace'>{elem.name}</h1>
              <p className='font-monospace'>Price :- {elem.price} ₹</p>
             <AddToCart elem={elem}/>
            </div>
          ))}
        </div>
      </div>}
      <br />
      <Bottom />
    </>
  )
}

export default Breakfast
