import React from 'react';
import loading from '../Images/loading.gif';
import '../styling/bottom.css';

const Loader = () => {
  return (
    <div className='loading'>
       <img src={loading} alt="loading..." />
    </div>
  )
}

export default Loader
