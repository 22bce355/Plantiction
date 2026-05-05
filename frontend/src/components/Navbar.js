import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo from '../Images/plantiction.png'
function Navbar() {
  const navigate = useNavigate(); 

  const token = localStorage.getItem("token");
    return (
      <div className="nav-bar">
        <div className="left-side">
          <div className="logo">
            <img 
              src={logo} 
              alt="AgZone-Logo" 
              title="AgZone"
            />
          </div>
        </div>
        <div className="right-side">
          <ul id="nav-links">
            <li><a href="/"><i className="fa fa-fw fa-home"></i>Home</a></li>
            <li><a href="/fertilizers"><i className="fa fa-leaf" aria-hidden="true"></i>Crops</a></li>
            <li><a href="/rent-machines"><i className="fa fa-bus" aria-hidden="true"></i>Rent machinery</a></li>
            <li><a href="/cultivation"><i className="fa fa-asl-interpreting"></i>Cultivation &amp; Protection</a></li>
            <li><a href="/contactus"><i className="fa fa-fw fa-envelope"></i>Contact Us</a></li>
          </ul>
        </div>
        {token ? (
          <li><Link to="/cart">🛒 </Link></li>
        ) : (
          <li onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "red" }}>
            Login to access Cart
          </li>
        )}
        {/* <Link to="/login"> */}
        <div onClick={() => navigate('/login')}><button id="login"  ><i className="fa fa-fw fa-user"></i>Login</button>
      {/* </Link>  */}</div>
         <button className="right-bar" type="button">
          <span className="bar"></span>
        </button>
      </div>
    );
  }

export default Navbar;
