import {useState, useEffect} from "react";
import {dbService} from "../fbase";
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
        const criminalsArray = snapshot.docs.map((doc) => ({...doc.data()}));
        setCriminals(criminalsArray);
        setInit(true);
      });
    // eslint-disable-next-line
  }, []);

  return (
    init &&
    criminals.length === numOfGames && (
      <div className="body">
        <GameBoard1 criminals={criminals} userObj={userObj} setUserObj={setUserObj}/>
      </div>
    )
  );
};

export default Game1;
