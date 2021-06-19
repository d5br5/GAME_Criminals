import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import GameBoard1 from "../components/GameBoard1";

function getRandomNumbers(total, size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    let randNum = Math.ceil(Math.random() * total);
    if (result.includes(randNum)) {
      i--;
    } else {
      result.push(randNum);
    }
  }
  for (let i = 0; i < size; i++) {
    result[i] = result[i].toString();
  }
  return result;
}

const Game1 = ({useObj, setUserObj}) => {
  const numOfGames = 10;
  const numOfCriminals = 100;
  const problems = getRandomNumbers(numOfCriminals, numOfGames);
  const [criminals, setCriminals] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    dbService
      .collection("criminals")
      .where("index", "in", problems)
      .onSnapshot((snapshot) => {
        const criminalsArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setCriminals(criminalsArray);
        setInit(true);
      });
  },[]);

  return (
    init &&
    criminals.length === numOfGames && (
      <div className="gameBody">
        {/* [ List of Criminals of This Game1 ] - 배포시 삭제
        {criminals.map((criminal, index) => (
          <div key={index}>
            {index + 1} ----- index : {criminal.index} / name : {criminal.name}{" "}
            / crime : {criminal.crime}
          </div>
        ))} */}
        <GameBoard1 criminals={criminals} userObj={useObj} setUserObj={setUserObj}/>
      </div>
    )
  );
};

export default Game1;
