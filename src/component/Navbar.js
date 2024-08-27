import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
export default function Navbar() {
 
  const login = useSelector((data)=>data.cartData.login);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand font-monospace fw-bolder fst-italic fa-2xl text-danger" to="/">Foodify</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white " aria-current="page" to="/cart">Cart</Link>
              </li>
              
              <li className="nav-item dropdown bg-primary">
                <Link className="nav-link dropdown-toggle text-white" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Items
                </Link>
                <ul className="dropdown-menu bg-primary bg-primary">
                  <li><Link className="dropdown-item text-white fw-semibold" to="/breakfast">Breakfast</Link></li>
                  <li><Link className="dropdown-item text-white fw-semibold" to="/lunch">Lunch</Link></li>
                  <li><Link className="dropdown-item text-white fw-semibold" to="dinner">Dinner</Link></li>
                </ul>
              </li>
              {
                !login && <div className='divpage'> <li className="nav-item">
                  <Link className="nav-link text-white " to="/login">Login</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/signup">Signup</Link>
                  </li>
                </div>
              }

              {
                login &&
                <div className='divpage'>
                  <li className="nav-item">
                    <Link className="nav-link text-white p-2" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white p-2" to="/logout" >Logout</Link>
                  </li>
                </div>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}