import React from 'react'
import '../styling/breakfast.css';
import {useNavigate} from 'react-router-dom';
import Bottom from './Bottom';
import Loader from './Loader';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <center><h1>BreakFast</h1></center>
     <div className='breakfast_page'>
       <div className='container_box'>
          <h2>Tea</h2>
          <img src="https://th.bing.com/th/id/OIP.qm3ug0amNLMPqe2j7sHPVwHaGi?pid=ImgDet&rs=1" alt="images" />
          <p>Price :- 15 ₹</p>
        </div>
        <div className='container_box'>
          <h2>Coffee</h2>
          <img src="https://cdn.zmescience.com/wp-content/uploads/2018/04/Cappuccino_at_Sightglass_Coffee.jpg" alt="images" />
          <p>Price :- 30 ₹</p>
        </div>
        </div>
        <center><button className='buy_btn' onClick={()=>{navigate("/breakfast")}}>View All</button></center>


        <center><h1>Lunch</h1></center>
     <div className='breakfast_page'>
       <div className='container_box'>
          <h2>Sambar Rice</h2>
          <img src="https://th.bing.com/th/id/OIP.QTjz61wv6sgCnzN8SxIh-QHaHa?pid=ImgDet&rs=1" alt="images" />
          <p>Price :- 160 ₹</p>
        </div>
        <div className='container_box'>
          <h2>Rajma Rice</h2>
          <img src="https://th.bing.com/th/id/OIP.FH3nQROIfgeC9tIkJ0kWXgAAAA?pid=ImgDet&rs=1" alt="images" />
          <p>Price :- 140 ₹</p>
        </div>
        </div>
        <center><button className='buy_btn' onClick={()=>{navigate("/lunch")}}>View All</button></center>



        <center><h1>Dinner</h1></center>
     <div className='breakfast_page'>
       <div className='container_box'>
          <h2>fried chicken</h2>
          <img src="https://wallpapercave.com/wp/wp2055348.jpg" alt="images" />
          <p>Price :- 120 ₹</p>
        </div>
        <div className='container_box'>
          <h2>Omelet</h2>
          <img src="https://i1.wp.com/news365.co.za/wp-content/uploads/2020/07/omelette-1.jpg?fit=1500%2C1125&ssl=1" alt="images" />
          <p>Price :- 40 ₹</p>
        </div>
        </div>
        <center><button className='buy_btn' onClick={()=>{navigate("/dinner")}}>View All</button></center>
    <Loader/>
        <Bottom/>

    </>


  )
}

export default Home
