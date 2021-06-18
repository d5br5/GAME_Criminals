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

  return (
    <>
      <h2>Ranking</h2>
      <div className="ranking_table">
        <div className="ranking_eachUser">
          <div className="ranking_userName">[User Nickname]</div>
          <div className="ranking_userPoint">[Point]</div>
        </div>
        {users.map((user, index) => (
          <div key={index} className="ranking_eachUser">
            <div className="ranking_userName">{user.nickname}</div>
            <div className="ranking_userPoint">{user.point}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ranking;
