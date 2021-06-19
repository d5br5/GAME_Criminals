import {useState, useEffect} from "react";
import {dbService, storageService} from "../fbase";
import GameResult from "./GameResult";
import GameRules from "./GameRules";
import "./GameBoard.css";
import "./GameRules.css";

const kindOfCrimes = 31;

async function fetchImgs(criminals) {
  const imgUrls = await Promise.all([
    storageService.ref(`criminalsImg/${criminals[0].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[1].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[2].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[3].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[4].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[5].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[6].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[7].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[8].index}.jpg`).getDownloadURL(),
    storageService.ref(`criminalsImg/${criminals[9].index}.jpg`).getDownloadURL(),
  ]);
  return imgUrls;
}

const GameBoard1 = ({criminals, userObj, setUserObj}) => {
  const [stage, setStage] = useState(0);
  const [imgUrlArray, setImageUrlArray] = useState("");
  const [init, setInit] = useState(false);
  const [crimeList, setCrimeList] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const currCriminal = criminals[stage];

  useEffect(() => {
    dbService
      .collection("crimes")
      .orderBy("crime")
      .get()
      .then((e) => {
        const tempCrimeList = e.docs.map((c) => {
          return c.data().crime;
        });
        setCrimeList(tempCrimeList);
      });

    fetchImgs(criminals).then((e) => {
      setImageUrlArray(e);
      setInit(true);
    });
  }, []);

  const filteredCrimes = crimeList.filter(
    (element) => element !== criminals[stage].crime
  );
  const randNumForCrime = Math.ceil(Math.random() * (kindOfCrimes - 2));
  const randomMatchCrime = filteredCrimes[randNumForCrime];
  const crimeMatchList = [criminals[stage].crime, randomMatchCrime];
  const randNumForButton = Math.ceil(Math.random() * 2) - 1;
  let buttonOne = "";
  let buttonTwo = "";

  if (randNumForButton === 0) {
    buttonOne = crimeMatchList.pop();
    buttonTwo = crimeMatchList[0];
  } else {
    buttonOne = crimeMatchList.shift();
    buttonTwo = crimeMatchList[0];
  }

  const answerCheck = async (e) => {
    e.preventDefault();
    if (stage <= 9) {
      if (e.target.innerText === criminals[stage].crime) {
        setRightAnswer(rightAnswer + 1);
      }

      if(stage<criminals.length-1){
        setStage(stage+1);
      }else if (stage ===criminals.length-1){
        setGameEnd(true);
      }
    }
  };

  return !gameStart ? (
    <div className="gameStartContainer">
      <GameRules mode="1"/>
      <button  className="btnPlayGame" onClick={() => {
        setGameStart(true)
      }}>Game Start!
      </button>
    </div>
  ) : (
    init ? (!gameEnd ? (
        <div className="gameBoard">
          <div className="gameBoardContent">
            <h1>{stage+1} ROUND</h1> 
            <h2>맞힌 개수 : {rightAnswer} / 10 </h2>
              <div className="img-wrapper">
                <img src={imgUrlArray[stage]} alt=""/>
              </div>
            <h3>{currCriminal.name}</h3>

            <div className="btn">
              <button className="btnLeft" onClick={answerCheck}>{buttonOne}</button>
              <button className="btnRight" onClick={answerCheck}>{buttonTwo}</button>
            </div>
          </div>
        </div>
      ) : (
        <GameResult rightAnswer={rightAnswer} userObj={userObj} setUserObj={setUserObj}/>
      )
    ) : (
      <div>[Game Loading...]</div>
    ))
};

export default GameBoard1;
