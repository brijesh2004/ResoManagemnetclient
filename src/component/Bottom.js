import React, { useState } from 'react';
import '../styling/login.css';
import '../styling/bottom.css';
import { Link } from 'react-router-dom';

const Bottom = () => {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    const req = await fetch(`${process.env.REACT_APP_BACKEND}/getnewsdaily`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Origin': `${process.env.REACT_APP_BACKEND}`,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await req.json();
    if (req.status === 401 || !data) {
      alert("Added");
    } else if (req.status === 402) {
      alert("You have already subscribed");
    } else {
      alert("Subscribed");
      setEmail("");
    }
  }

  return (
    <>
      <div className="bottom-container">
        <div className="main-content">
          {/* Your main content here */}
        </div>
        <div className='bottom_page_Start'>
          <div className='left'>
            <p><Link to='/breakfast' style={{ color: 'white' }}>Breakfast</Link></p>
            <p><Link to='/lunch' style={{ color: 'white' }}>Lunch</Link></p>
            <p><Link to='/dinner' style={{ color: 'white' }}>Dinner</Link></p>
          </div>
          <div className='right'>
            <h6>Subscribe for daily updates</h6>
            <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' /><br />
            <button className='bottom_btn' onClick={sendEmail}>Subscribe</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bottom;
