import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const Profile = () => {
    const [profile , setProfile] = useState({});
    const [isloaded , setIsloader] = useState(false);
    const [photo , setPhoto] = useState("");
    const profiledata = async () =>{
      setIsloader(false);
        const res = await fetch("https://restomanagementserver.onrender.com/profiledata" , {
          method:'GET',
          credentials:"include",
          headers:{
              "Origin":['https://restomanagementserver.onrender.com'],
              "Content-Type":"application/json"
          }
        })
        const data =await res.json();
         if(res.status===401|| !data){
          alert("Data Not found");
         }
         else{
         setProfile(data);
         setIsloader(true);
         }
      }

      const uploadthephoto = (e) => {
        e.preventDefault();
        fetch("https://restomanagementserver.onrender.com/profilephoto" ,{
          method:'POST',
          credentials:'include',
          headers:{
            'Origin':['https://restomanagementserver.onrender.com'],
            'Content-Type':'application/json'
          },
          body:JSON.stringify({photo})
        }).then((res)=>{
          console.log(res);
          alert("Profile Image Uploades");
        }).catch((err)=>{
          console.log(err);
        })
      }

   const HandlePhoto = (e) =>{
    let reader = new FileReader();
    reader.onload = function(){
        setPhoto(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
   }
      useEffect(()=>{
        profiledata();
      },[]);
  return (
    <>
      {
        !isloaded && <Loader/>
      }
      {isloaded&&<div>
      <form onSubmit={uploadthephoto} className='upload_image'>
      <p>Change the Profile Image</p>
      <input type="file" name="photo" accept='.jpg .png .jpeg' onChange={HandlePhoto} /><br />
      <input type="submit" />
      </form>
      <div className='about_the_user'>
      <img src={profile.photo} alt="img" /> <br />
     <p>  Name - {profile.name} </p>
      <p>Email -  {profile.email}</p>
       </div>
     <center> <h1>Your Orders</h1></center>
      <div className='order_element'>
     {
        Array.isArray(profile.orders) && profile.orders.map((elem ,index)=>(
            // stying in the login .css
            <div className='order_list'>
            
            <p>  Name - {elem.name} </p>
             <p> Price - {elem.price}</p>
             <p>Mobile -  No {elem.mobile1}</p>
             <p>Mobile -  No {elem.mobile2}</p>
             <p>Address - {elem.address}</p>
             <p>Pincode - {elem.pincode}</p>
             <p>Date {elem.date[0]+elem.date[1]+elem.date[2]+elem.date[3]+elem.date[4]+elem.date[5]+elem.date[6]+elem.date[7]+elem.date[8]+elem.date[9]}</p>
            </div>
        ))
     }
     </div>
     </div>}
    </>
  )
}

export default Profile
