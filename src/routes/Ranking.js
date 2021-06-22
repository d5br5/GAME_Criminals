import {useState, useEffect} from "react";
import {dbService} from "../fbase";
import "../styles/Ranking.css";

const Ranking = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dbService
      .collection("users")
      .orderBy("point", "desc")
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
  }, []);

  const levelBox = ['까막눈', '일반인', '관상가', '초인'];
  const giveLevelBox = [];
  const numOfUsers = users.length;

  for (let i = 1; i < numOfUsers + 1; i++) {
    if (i <= Math.floor(numOfUsers / 100 * 8)) {
      giveLevelBox.push(levelBox[3]);
    } else if (i <= Math.floor(numOfUsers / 100 * 24)) {
      giveLevelBox.push(levelBox[2]);
    } else if (i <= Math.floor(numOfUsers / 100 * 60)) {
      giveLevelBox.push(levelBox[1]);
    } else {
      giveLevelBox.push(levelBox[0]);
    }
  }

  useEffect(() => {
      users.map((user) =>
        dbService.doc(`users/${user.id}`)
          .update({level: giveLevelBox.shift()})
      )
      // eslint-disable-next-line
    }, [dbService.collection("users")]
  )

  return (
    <div className="rankingBody">
      <div className="blackBox">
        <div className="rankingContent">
          <h1 className="rankingTitle">Ranking</h1>

          <div className="ranking_eachUser" style={{fontWeight:"bold", fontSize:"18px"}}>
            <div className="ranking_number">순위</div>
            <div className="ranking_userName">닉네임</div>
            <div className="ranking_userPoint">포인트</div>
            <div className="ranking_userLevel">레벨</div>
          </div>

          {users.map((user, index) => (
            <div key={index} className="ranking_eachUser">
              <div className="ranking_number">{index + 1}</div>
              <div className="ranking_userName">{user.nickname}</div>
              <div className="ranking_userPoint">{user.point}</div>
              <div className="ranking_userLevel">{user.level}</div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Ranking;
