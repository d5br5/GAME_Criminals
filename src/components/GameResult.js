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
    console.log(pointUpdated);
    console.log(userObj.uid);

    async function updatePoint() {
      await dbService.doc(`users/${userObj.uid}`).update({
        point: pointUpdated
      }).then(() => {
        setUserObj({...userObj, point: pointUpdated});
      })
    }
    updatePoint();

  }, [])


  return <div>
    <h2>Your Score : {rightAnswer} / 10</h2>
    <h3>point Changed!</h3>
    <p> {pastPoint} -> {userObj.point}</p>

    <Link to="/">
      <button>Go Home</button>
    </Link>
  </div>
}

export default GameResult;