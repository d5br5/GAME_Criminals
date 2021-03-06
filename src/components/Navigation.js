import React from "react";
import {Link} from "react-router-dom";
import "../styles/Navigation.css"
import logo from "../assets/logo.gif";

const Navigation = ({isLoggedIn}) => {
  return (<nav className="naviContainer">
    <div className="naviLeftContainer">
        {
          isLoggedIn && 
            <Link className="navLink1" to='/profile'>
              Profile
            </Link>
        }
        {
          isLoggedIn && 
            <Link className="navLink2" to="/ranking">
              Ranking
            </Link>
        }
    </div>
    <div>
      <Link className="navLink" to="/">
        <img className="logo" src={logo} alt='/'/>
      </Link>
    </div>
  </nav>);
};

export default Navigation;