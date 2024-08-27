import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logind } from './redux/slice';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Breakfast from './component/Breakfast';
import Lunch from './component/Lunch';
import Dinner from './component/Dinner';
import Logout from './component/Logout';
import Profile from './component/Profile';
import Cart from './component/Cart';
import Error from './component/Error';

function App() {
  const dispatch = useDispatch();
  const login = useSelector((data) => data.cartData.login)
  const isLogin = async () => {
    try{
      const res = await fetch(`${process.env.REACT_APP_BACKEDN}/navbar`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Origin': [`${process.env.REACT_APP_BACKEDN}`],
          "Content-Type": "application/json"
        }
      })
      const data = await res.json();
      if (res.status === 401 || !data) {
        dispatch(Logind(false))
      }
      else {
        dispatch(Logind(true))
      }
    }
  catch(err){
    dispatch(Logind(false));
  }
}
    
  useEffect(() => {
    isLogin();
  }, [login]);


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          {/* <Route exact path='/types' element={<Type />}></Route> */}
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
          <Route exact path='/breakfast' element={<Breakfast />}></Route>
          <Route exact path='/lunch' element={<Lunch />}></Route>
          <Route exact path='/dinner' element={<Dinner />}></Route>
          <Route exact path='/logout' element={<Logout />}></Route>
          <Route exact path='/cart' element={<Cart />}> </Route>
          <Route exact path='/profile' element={<Profile />}></Route> 
          <Route exact path='*' element={<Error/>}></Route> 
        </Routes>
      </Router>
    </div>
  );
}
export default App;
