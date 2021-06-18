import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css"
import logo from "../assets/logo.gif";

const Navigation = ({userObj, isLoggedIn}) => {
  return (<nav className="naviContainer">
    {/* Left Side Nav */}
    {
      isLoggedIn && <div className="naviSideContainer">
        <Link className="navLink" to='/profile'>
          Profile
        </Link>
      </div>
    }
    {/* Center Logo */}
    <div>
      <Link className="navLink" to="/">
        <img className="logo" src={logo}/>
      </Link>
    </div>
    {
      isLoggedIn && <div className="naviSideContainer">
        <Link className="navLink" to="/ranking">
          Ranking
        </Link>
      </div>
    }
  </nav>);
};

export default Navigation;