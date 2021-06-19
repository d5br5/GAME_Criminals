import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import GameBoard2 from "../components/GameBoard2";
import {getRandomNumbers} from "../components/Functions";

const Game2 = ({userObj, setUserObj}) =>{
  const numOfGames = 5;
  const numOfCriminals = 100;
  const problems = getRandomNumbers(numOfCriminals, numOfGames*2);
  const [criminals, setCriminals] = useState([]);
  const [init, setInit] = useState(false);

  useEffect(()=>{
    dbService
      .collection("criminals")
      .where("index", "in", problems)
      .onSnapshot((snapshot) => {
        const criminalsArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
        setCriminals(criminalsArray);
        setInit(true);
      });
  }, []);

  return (
    (init && criminals.length === numOfGames*2) && (
      <div className="gameBody">
        <GameBoard2 criminals={criminals} userObj={userObj} setUserObj={setUserObj}/>
      </div>
    )
  )
}

export default Game2;