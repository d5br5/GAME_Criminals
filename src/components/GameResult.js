import {Link} from "react-router-dom";
import {useEffect} from 'react';
import {dbService} from "../fbase";

function updatePointByResult(result) {
  if (result < 0 || 10 < result) {
    return 0;
  } else if (result <= 2) {
    return -40;
  } else if (result <= 4) {
    return -20;
  } else if (result <= 6) {
    return 0;
  } else if (result <= 8) {
    return 20;
  } else {
    return 40;
  }
}

const GameResult = ({rightAnswer, userObj, setUserObj}) => {

  const updatedPoint = updatePointByResult(rightAnswer);
  const pastPoint = userObj.point - updatedPoint;

  useEffect(() => {
    const pointUpdated = parseInt(userObj.point) + parseInt(updatedPoint);

    async function updatePoint() {
      await dbService.doc(`users/${userObj.uid}`).update({
        point: pointUpdated
      }).then(() => {
        setUserObj({...userObj, point: pointUpdated});
      })
    }

    updatePoint();

  }, [])


  return <div className="body">
    <div className="gameResult">
      <h1>GAME RESULT</h1>
      <h2>점수 : {rightAnswer} / 10</h2>
      <h2>포인트 변화 : {pastPoint} ➞ {userObj.point}</h2>
      <h2>현재 레벨 : {userObj}</h2>

      <Link to="/">
        <button className="btnGoHome">GO HOME</button>
      </Link>
    </div>
  </div>
}

export default GameResult;