
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Type from './component/Types';
import Login from './component/Login';
import Signup from './component/Signup';
import Breakfast from './component/Breakfast';
import Lunch from './component/Lunch';
import Dinner from './component/Dinner';
import Logout from './component/Logout';
import Profile from './component/Profile';

function App() {
  return (
    <div>
      <Router>
<Navbar/>
    <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/types' element={<Type/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<Signup/>}></Route>
          <Route exact path='/breakfast' element={<Breakfast/>}></Route>
          <Route exact path='/lunch' element={<Lunch/>}></Route>
          <Route exact path='/dinner' element={<Dinner/>}></Route>
          <Route exact path='/logout' element={<Logout/>}></Route>
          <Route exact path='/profile' element={<Profile/>}></Route>
   </Routes>
   </Router>
    </div>
  );
}

export default App;
