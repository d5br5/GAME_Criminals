import React from "react";
import {Link} from "react-router-dom";
import "../styles/Home.css"

const Home = ({isLoggedIn}) => {
  return (
    <div className="body">
      <div className="blackBox">
      {
        isLoggedIn && <div className='mainPage'>
          <Link to='/game1'>
            <div className="mainGameIntro">
              <h1>Game 1</h1>
              <h2> 범죄자 죄목 추측</h2>
              <p>이 범죄자의 실제 죄목은?</p>
              <p>[ 10 라운드 ]</p>
            </div>
          </Link>
          <span style={{width: "80px"}}></span>
          <Link to='/game2'>
            <div className="mainGameIntro">
              <h1>Game 2</h1>
              <h2> 범죄자 형량 대결</h2>
              <p>두 사람 중 형량이 더 센 사람은?</p>
              <p>[ 5 라운드 ]</p>
            </div>
          </Link>
        </div>
      }
      </div>
    </div>
  );
};

export default Home;
