import React from "react";
import {Link} from "react-router-dom";
import "./Home.css"
import {Auth} from "./index";

const Home = ({isLoggedIn}) => {
  return (
    <div className="body">
      <div className="gameRule">
        <h1>GAME RULE</h1>
          <p className="gameRuleMargin">① 1 게임은 10 라운드로 구성됩니다.</p>
          <p className="gameRuleMargin">② 각 라운드마다 범죄자의 사진과 이름을 확인할 수 있습니다.</p>
          <p className="gameRuleMargin">③ 해당 범죄자의 죄목을 예상하여 정답을 선택합니다.</p>
          <p className="gameRuleMargin">④ 10 라운드가 종료된 후, 최종 성적에 맞게 POINT를 획득합니다.</p>
          {
            isLoggedIn ? <Link to='/game'>
              <button className="btnPlayGame">PLAY GAME</button>
            </Link> : <Auth/>
          }
      </div>
    </div>
  );
};

export default Home;
