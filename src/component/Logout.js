import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const logoutfun = async () =>{
        const res = await fetch('http://https://restomanagementserver.onrender.com/logout',{
            method:'GET',
            credentials:'include',
            headers:{
                'Origin':['http://https://restomanagementserver.onrender.com'],
                "Content-Type":'application/json'
            }
        })
        await res.json();
        if(res.status===401){
            alert('Logout failed');
        }
        else{
            navigate('/');
            window.location.reload();
        }
    }
    useEffect(()=>{
        logoutfun();
    },[])
  return (
    <div>
        <h1>Logout page</h1>
    </div>
  )
}

export default Logout
