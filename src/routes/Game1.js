import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import GameBoard1 from "../components/GameBoard1";
import {getRandomNumbers} from "../components/Functions";

const Game1 = ({userObj, setUserObj}) => {
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
      <div className="body">
        {/* [ List of Criminals of This Game1 ] - 배포시 삭제
        {criminals.map((criminal, index) => (
          <div key={index}>
            {index + 1} ----- index : {criminal.index} / name : {criminal.name}{" "}
            / crime : {criminal.crime}
          </div>
        ))} */}
        <GameBoard1 criminals={criminals} userObj={userObj} setUserObj={setUserObj}/>
      </div>
    )
  );
};

export default Game1;
