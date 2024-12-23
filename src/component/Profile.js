import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Bottom from './Bottom';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});

  const [yourOrder , setYourOrder] = useState([]);

  const navigate = useNavigate();
  const [isloaded, setIsloader] = useState(false);
  const [photo, setPhoto] = useState("");
  const login = useSelector((data) => data.cartData.login);
  const profiledata = async () => {
    setIsloader(false);
    const res = await fetch(`${process.env.REACT_APP_BACKEDN}/profiledata`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Origin": [`${process.env.REACT_APP_BACKEDN}`],
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    if (res.status === 401 || !data) {
      alert("Data Not found");
    }
    else {
      setProfile(data);
      setIsloader(true);
    }
  }

  const uploadthephoto = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEDN}/profilephoto`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Origin': [`${process.env.REACT_APP_BACKEDN}`],
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo })
    }).then((res) => {
      alert("Profile Image Uploades");
    }).catch((err) => {
      alert("err")
    })
  }



  const getOrder =async ()=>{
    try{
     const res = await fetch(`${process.env.REACT_APP_BACKEDN}/gettheorder` , 
      {
        credentials: 'include',
        method: 'GET',
        headers: {
          "Origin": [`${process.env.REACT_APP_BACKEDN}`],
          "Content-Type": 'application/json'
        }
      })
      const data = await res.json();
      setYourOrder(data.mess);
    }
    catch(err){
     alert(err);
    }
  }

  const HandlePhoto = (e) => {
    let reader = new FileReader();
    reader.onload = function () {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

useEffect(()=>{
    if(login===false){
      navigate('/login');
    }
},[])
  useEffect(() => {
    profiledata();
  }, []);
  
  
  return (
    <>
      {
        !isloaded && <Loader />
      }
      {isloaded && <div>
        <form onSubmit={uploadthephoto} className='upload_image mt-5 mb-10'>
          <p>Change the Profile Image</p>
          <input type="file" name="photo" accept='.jpg, .png, .jpeg' onChange={HandlePhoto} /><br />
          <input type="submit" />
        </form>
        <div className='about_the_user'>
          <img src={profile.photo} alt="img" /> <br />
          <p>  Name - {profile.name} </p>
          <p>Email -  {profile.email}</p>
        </div>
      </div>}
      <button onClick={getOrder}>Get Order</button>
      <div className='container'>
      {
  yourOrder.map((elem, index) => {
    const orderedAtDate = new Date(elem.orderedAt);
    const formattedDate = orderedAtDate.toISOString().slice(0, 10); // Extracts the date
    const formattedTime = orderedAtDate.toTimeString().slice(0, 5); // Extracts the time (HH:MM)

    return (
      <div key={index} className="order-container">
        <h2>Name: {elem.name}</h2>
        <h2>Table: {elem.table}</h2>
        <h2>Ordered At: {formattedDate} {formattedTime}</h2>
        
        {elem.cart.map((elem1) => (
          <div key={elem1._id} className="cart-item">
            <p>Name: {elem1.name}</p>
            <p>Price : {elem1.price} ₹</p> {/* Displaying price with dollar sign */}
            <p>Quantity: {elem1.numberOf}</p> {/* Displaying numberOf with label */}
            <img src={elem1.image} alt={`${elem1.name}`} />
          </div>
        ))}
      </div>
    );
  })
}
</div>



      <Bottom />
    </>
  )
}

export default Profile
