import React from "react";
import {Link} from "react-router-dom";
import "./Home.css"
import {Auth} from "./index";

const Home = ({isLoggedIn}) => {
  return (
    <div className="body">
      {
        isLoggedIn ? <div className='mainPage'>
          <Link to='/game1'>
            <div className="mainGameIntro">
              <h1>Game 1</h1>
              <h2> 범죄자 죄목 추측</h2>
              <p>2가지 선택지 중 실제 죄목은?</p>
              <p>10라운드로 구성</p>
            </div>
          </Link>
          <span style={{width:"100px"}}></span>
          <Link to='/game2'>
            <div className="mainGameIntro">
              <h1>Game 2</h1>
              <h2> 범죄자 형량 대결</h2>
              <p>두 사람 중 더 형량이 센 사람은?</p>
              <p>5라운드로 구성</p>
            </div>
          </Link>

        </div> : <Auth/>
      }
    </div>
  );
}
;

export default Home;
