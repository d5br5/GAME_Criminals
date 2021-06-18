import React from "react";
import {Link} from "react-router-dom";
import "./Navigation.css"
import logo from "../assets/logo.gif";

const Navigation = ({userObj}) => {
    return (<nav className="navContainer">
        <div className="navLeftContainer">
            <ul>
            <Link className="navLink" to="/">
                홈
            </Link></ul>
            <ul><Link className="navLink" to='/profile'>
                프로필
            </Link></ul>
            <ul><Link className="navLink" to="/ranking">
                랭킹
            </Link></ul>
        </div>

        <div>
            <img className="logo" src={logo} />
        </div>
    </nav>);
};

export default Navigation;