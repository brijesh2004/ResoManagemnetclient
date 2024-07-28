import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  // const [showBasic, setShowBasic] = useState(false);
  const [islogin, setIsLogin] = useState(false);
  const isLogin = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEDN}/navbar`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Origin': [`${process.env.REACT_APP_BACKEDN}`],
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    // console.log(data);
    if (res.status === 401 || !data) {
      setIsLogin(false);
      // console.log("false");
    }
    else {
      setIsLogin(true);
      // console.log("true");
    }
  }

  useEffect(() => {
    isLogin();
  }, []);
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
                <Link className="nav-link text-white fa-2x" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fa-2x" to="/types">Service</Link>
              </li>
              {
                !islogin && <div className='divpage'> <li className="nav-item">
                  <Link className="nav-link text-white fa-2x" to="/login">Login</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fa-2x" to="/signup">Signup</Link>
                  </li>

                </div>
              }
              <li className="nav-item dropdown bg-primary">
                <Link className="nav-link dropdown-toggle text-white fa-2x" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Items
                </Link>
                <ul className="dropdown-menu bg-primary bg-primary">
                  <li><Link className="dropdown-item text-white fw-semibold fa-2s" to="/breakfast">Breakfast</Link></li>
                  <li><Link className="dropdown-item text-white fw-semibold fa-2s" to="/lunch">Lunch</Link></li>
                  <li><Link className="dropdown-item text-white fw-semibold fa-2s" to="dinner">Dinner</Link></li>
                </ul>
              </li>

              {
                islogin &&
                <div className='divpage'>
                  <li className="nav-item">
                    <Link className="nav-link text-white fa-2x p-2" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fa-2x p-2" to="/logout" >Logout</Link>
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