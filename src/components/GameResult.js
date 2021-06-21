import {Link} from "react-router-dom";
import {useEffect} from 'react';
import {dbService} from "../fbase";
import '../styles/GameResult.css'

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
// eslint-disable-next-line
  }, [])


  return <div className="blackBox">
    <div className="gameResult">
      <h1>GAME RESULT</h1>
      <table className="gameResultTable">
        <tr>
          <td>점수 :</td>
          <td className="gameResultData">{rightAnswer * 10}점</td>
        </tr>
        <tr>
          <td>포인트 변화 :</td>
          <td className="gameResultData">{pastPoint} ➞ {userObj.point}</td>
        </tr>
        <tr>
          <td>현재 레벨 :</td>
          <td className="gameResultData">{userObj.level}</td>
        </tr>
      </table>
      <Link to="/">
        <button className="btnGoHome">GO HOME</button>
      </Link>
    </div>
  </div>
}

export default GameResult;