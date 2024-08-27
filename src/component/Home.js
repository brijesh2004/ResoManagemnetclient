import React from 'react'
import '../styling/breakfast.css';
import {useNavigate} from 'react-router-dom';
import Bottom from './Bottom';


const Home = () => {
  const navigate = useNavigate();

  return (
    <>

<div className='container text-center my-5'>
        <h6>Home Delivery Unavailable</h6>
        <p>This website is for placing orders within our restaurant only.</p>
        <p>Please order only if you are dining with us.</p>

      </div>
      
    <center><h1>BreakFast</h1></center>
     <div className='breakfast_page'>

        <div className='container_box'>
          <img src="https://th.bing.com/th/id/OIP.qm3ug0amNLMPqe2j7sHPVwHaGi?pid=ImgDet&rs=1" alt="images" />
          <hr /><h2 className='font-monospace'>Tea</h2>
          <p className='font-monospace'>Price :- 15 ₹</p>
        </div>

        <div className='container_box'>
          <img src="https://cdn.zmescience.com/wp-content/uploads/2018/04/Cappuccino_at_Sightglass_Coffee.jpg" alt="images" />
          <hr /><h2 className='font-monospace'>Coffee</h2>
          <p className='font-monospace'>Price :- 30 ₹</p>
        </div>
        </div>
        <center><button className='buy_btn' onClick={()=>{navigate("/breakfast")}}>View All</button></center>


        <center><h1>Lunch</h1></center>
     <div className='breakfast_page'>
       <div className='container_box'>
          <img src="https://th.bing.com/th/id/OIP.QTjz61wv6sgCnzN8SxIh-QHaHa?pid=ImgDet&rs=1" alt="images" />
          <hr /> <h2 className='font-monospace'>Sambar Rice</h2>
          <p className='font-monospace'>Price :- 160 ₹</p>
        </div>
        <div className='container_box'>
          <img src="https://th.bing.com/th/id/OIP.FH3nQROIfgeC9tIkJ0kWXgAAAA?pid=ImgDet&rs=1" alt="images" />
          <hr /><h2 className='font-monospace'>Rajma Rice</h2>
          <p className='font-monospace'>Price :- 140 ₹</p>
        </div>
        </div>
        <center><button className='buy_btn' onClick={()=>{navigate("/lunch")}}>View All</button></center>



        <center><h1>Dinner</h1></center>
     <div className='breakfast_page'>
       <div className='container_box'>
          <img src="https://wallpapercave.com/wp/wp2055348.jpg" alt="images" />
          <hr /><h2 className='font-monospace'>fried chicken</h2>
          <p className='font-monospace'>Price :- 120 ₹</p>
        </div>
        <div className='container_box'>
          <img src="https://i1.wp.com/news365.co.za/wp-content/uploads/2020/07/omelette-1.jpg?fit=1500%2C1125&ssl=1" alt="images" />
          <hr />
           <h2 className='font-monospace'>Omelet</h2>
          <p className='font-monospace'>Price :- 40 ₹</p>
        </div>
        </div>
        <center><button className='buy_btn' onClick={()=>{navigate("/dinner")}}>View All</button></center>
        <Bottom/>

    </>


  )
}

export default Home
