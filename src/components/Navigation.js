import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css"
import logo from "../assets/logo.gif";

const Navigation = ({userObj}) => {
    return (<nav className="naviContainer">
        {/* Lest Side Nav */}
        <div className="naviLeftContainer">
            <Link className="navLink" to="/">
                Home
            </Link>
            <Link className="navLink" to='/profile'>
                Profile
            </Link>
            <Link className="navLink" to="/ranking">
                Ranking
            </Link>
        </div>

        {/* Center Logo */}
        <div>
            <img className="logo" src={logo} />
        </div>
    </nav>);
};

export default Navigation;