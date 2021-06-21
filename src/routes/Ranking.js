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

  const levelBox = ['LV.1', 'LV.2', 'LV.3', 'LV.4'];
  const giveLevelBox = [];
  const numOfUsers = users.length;

  for (let i = 1; i < numOfUsers + 1; i++) {
    if (i <= Math.floor(numOfUsers / 10)) {
      giveLevelBox.push(levelBox[3]);
    } else if (i <= Math.floor(numOfUsers / 10 * 3)) {
      giveLevelBox.push(levelBox[2]);
    } else if (i <= Math.floor(numOfUsers / 10 * 6)) {
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
          <table className="ranking_table">
            <thead>
            <tr>
              <th className="ranking_number">순위</th>
              <th className="ranking_userName">닉네임</th>
              <th className="ranking_userPoint">포인트</th>
              <th className="ranking_userLevel">레벨</th>
            </tr>
            </thead>
            <tbody>

            {users.map((user, index) => (
              <tr key={index} className="ranking_eachUser">
                <td className="ranking_number">{index + 1}</td>
                <td className="ranking_userName">{user.nickname}</td>
                <td className="ranking_userPoint">{user.point}</td>
                <td className="ranking_userLevel">{user.level}</td>
              </tr>
            ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
