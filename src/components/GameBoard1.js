import { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";
import GameResult from "./GameResult";
import GameRules from "./GameRules";
import "../styles/GameBoard.css";
import "../styles/GameRules.css";

const kindOfCrimes = 31;

async function fetchImgs(criminals) {
  const imgUrls = await Promise.all([
    storageService
      .ref(`criminalsImg/${criminals[0].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[1].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[2].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[3].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[4].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[5].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[6].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[7].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[8].index}.jpg`)
      .getDownloadURL(),
    storageService
      .ref(`criminalsImg/${criminals[9].index}.jpg`)
      .getDownloadURL(),
  ]);

  const img = new Image();
  window.imageCache = [];
  window.imageCache[0] = img;
  img.src = await imgUrls[0];

  imgUrls.forEach((url, i) => {
    if (i !== 0) {
      const img = new Image();
      img.src = url;
    }
  });
  return imgUrls;
}

const GameBoard1 = ({ criminals, userObj, setUserObj }) => {
  const [stage, setStage] = useState(0);
  const [imgUrlArray, setImageUrlArray] = useState("");
  const [init, setInit] = useState(false);
  const [crimeList, setCrimeList] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [isRight, setIsRight] = useState(null);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [randNumForButton, setRandNumForButton] = useState(0);
  const [randNumForCrime, setRandNumForCrime] = useState(0);

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
    // eslint-disable-next-line
  }, []);

  const filteredCrimes = crimeList.filter(
    (element) => element !== criminals[stage].crime
  );

  useEffect(() => {
    setRandNumForButton(Math.ceil(Math.random() * 2) - 1);
    setRandNumForCrime(Math.ceil(Math.random() * (kindOfCrimes - 2)));
  }, [stage]);

  const randomMatchCrime = filteredCrimes[randNumForCrime];
  const crimeMatchList = [criminals[stage].crime, randomMatchCrime];

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
      setIsAnswering(true);
      if (e.target.innerText === criminals[stage].crime) {
        setRightAnswer((r) => r + 1);
        setIsRight(true);
      } else {
        setIsRight(false);
      }

      setTimeout(() => {
        setIsRight(null);
        setIsAnswering(false);
        if (stage < criminals.length - 1) {
          setStage((e) => e + 1);
        } else {
          setGameEnd(true);
        }
      }, 1000 * 1);
    }
  };

  return !gameStart ? (
    <div className="blackBox">
      <div className="gameStartContainer">
        <GameRules mode="1" />
        <button
          className="btnPlayGame"
          onClick={() => {
            setGameStart(true);
          }}
        >
          Game Start
        </button>
      </div>
    </div>
  ) : init ? (
    !gameEnd ? (
      <div className="gameBody">
        <div className="gameBoard">
          <div className="gameBoardContent">
            <div className="gameBoardContentHeader">
              <h1>{stage + 1} ROUND</h1>
              <h2>맞힌 개수 : {rightAnswer} /10 </h2>
            </div>
            <div
              className={`criminalInfo ${isRight === true ? "correct" : ""} ${
                isRight === false ? "not_correct" : ""
              }`}
            >
              <div
                className={`${isRight === true ? "correct" : ""} ${
                  isRight === false ? "not_correct" : ""
                }`}
              ></div>
              <div className="img-wrapper">
                <img
                  src={imgUrlArray[stage]}
                  alt=""
                  className={`${isAnswering === true ? "isAnswering" : ""}`}
                />
              </div>
              <h3>{currCriminal.name}</h3>
            </div>
            <div className="btn">
              <button className="btnLeft" onClick={answerCheck}>
                <i></i>
                <p>{buttonOne}</p>
              </button>
              <button className="btnRight" onClick={answerCheck}>
                <i></i>
                <p>{buttonTwo}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <GameResult
        rightAnswer={rightAnswer}
        userObj={userObj}
        setUserObj={setUserObj}
      />
    )
  ) : (
    <div>[Game Loading...]</div>
  );
};

export default GameBoard1;
