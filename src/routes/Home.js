import React from "react";
import {Link} from "react-router-dom";

const Home = ({ userObj }) => {
  return (
    <div>
      <h1>범죄자 죄목 맞추기</h1>
      <h2>[Game Rule]</h2>
      <p>1. 1 게임은 10 라운드로 구성됩니다.</p>
      <p>2. 각 라운드마다 범죄자의 사진과 이름을 확인할 수 있습니다.</p>
      <p>3. 해당 범죄자의 죄목을 예상하여 정답을 선택합니다.</p>
      <p>4. 10 라운드가 종료된 후, 최종 성적에 맞게 POINT를 획득합니다.</p>
      <Link to='/game'>
        <button>play game</button>
      </Link>
    </div>
  );
};

export default Home;
