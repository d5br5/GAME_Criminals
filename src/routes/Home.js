import React from "react";
import {Link} from "react-router-dom";
import "./Home.css"
import {Auth} from "./index";

const Home = ({isLoggedIn}) => {
  return (
    <div className="body">
      {
        isLoggedIn ? <><Link to='/game1'>
          <button className="btnPlayGame">GAME1</button>
        </Link><Link to='/game2'>
          <button className="btnPlayGame">GAME2</button>
        </Link></> : <Auth/>
      }
    </div>
  );
};

export default Home;
