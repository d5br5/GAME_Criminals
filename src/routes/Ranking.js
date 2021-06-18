import {useState, useEffect} from "react";
import {dbService} from "../fbase";

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
    }, []
  )

  return (
    <>
      <h2>Ranking</h2>
      <div className="ranking_table">
        <div className="ranking_eachUser">
          <div className="ranking_userName">[User Nickname]</div>
          <div className="ranking_userPoint">[Point]</div>
          <div className="ranking_userLevel">[Level]</div>
        </div>
        {users.map((user, index) => (
          <div key={index} className="ranking_eachUser">
            <div className="ranking_userName">{user.nickname}</div>
            <div className="ranking_userPoint">{user.point}</div>
            <div className="ranking_userLevel">{user.level}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ranking;
