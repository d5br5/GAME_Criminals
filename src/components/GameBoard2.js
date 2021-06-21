import {useState, useEffect} from "react";
import {storageService} from "../fbase";
import GameResult from "./GameResult";
import GameRules from "./GameRules";
import "../styles/GameBoard.css";
import "../styles/GameRules.css";

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


const GameBoard2 = ({criminals, userObj, setUserObj}) => {

  const WhoIsWorse = (criminal1, criminal2) => {
    const INF = '종신형';
    const ZERO = '벌금형';
    const sin1 = criminal1.sentence;
    const sin2 = criminal2.sentence;
    if (sin1 === sin2) {
      return [true, true];
    } else if (sin1 === INF) {
      return [true, false];
    } else if (sin2 === INF) {
      return [false, true];
    } else if (sin1 === ZERO) {
      return [false, true];
    } else if (sin2 === ZERO) {
      return [true, false];
    }

    let sin1year = 0;
    let sin1month = 0;
    let sin2year = 0;
    let sin2month = 0;
    if (sin1.slice(-1) === '년') {
      sin1year = parseInt(sin1.split('년')[0]);
    } else if (sin1.slice(-1) === '월') {
      sin1month = parseInt(sin1.split('개월')[0]);
    }

    if (sin2.slice(-1) === '년') {
      sin2year = parseInt(sin2.split('년')[0]);
    } else if (sin2.slice(-1) === '월') {
      sin2month = parseInt(sin2.split('개월')[0]);
    }

    const sin1total = sin1year * 12 + sin1month;
    const sin2total = sin2year * 12 + sin2month;

    if (sin1total < sin2total) {
      return [false, true];
    } else if (sin1total > sin2total) {
      return [true, false];
    } else {
      return [true, true];
    }

  }

  const [stage, setStage] = useState(0);
  const [imgUrlArray, setImageUrlArray] = useState("");
  const [init, setInit] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const solution = [
    WhoIsWorse(criminals[0], criminals[1]),
    WhoIsWorse(criminals[2], criminals[3]),
    WhoIsWorse(criminals[4], criminals[5]),
    WhoIsWorse(criminals[6], criminals[7]),
    WhoIsWorse(criminals[8], criminals[9])
  ]

  const currCriminals = [criminals[stage * 2], criminals[stage * 2 + 1]];

  useEffect(() => {
    fetchImgs(criminals).then((e) => {
      setImageUrlArray(e);
      setInit(true);
    });
    // console.log(solution);
    // eslint-disable-next-line
  }, []);

  const answerCheck1 = async (e) => {
    e.preventDefault();
    if (stage < criminals.length / 2) {
      if (solution[stage][0]) setRightAnswer(rightAnswer + 1);
      if (stage < criminals.length / 2 - 1) {
        setStage(stage + 1);
      } else if (stage === criminals.length / 2 - 1) {
        setGameEnd(true);
      }
    }
  }

  const answerCheck2 = async (e) => {
    e.preventDefault();
    if (stage < criminals.length / 2) {
      if (solution[stage][1]) setRightAnswer(rightAnswer + 1);
      if (stage < criminals.length / 2 - 1) {
        setStage(stage + 1);
      } else if (stage === criminals.length / 2 - 1) {
        setGameEnd(true);
      }
    }
  }

  return !gameStart ? (
    <div className="blackBox">
      <div className="gameStartContainer">
        <GameRules mode="2"/>
        <button className="btnPlayGame" onClick={() => {
          setGameStart(true)
        }}>Game Start!
        </button>
      </div>
    </div>
  ) : (
    init ? (
      !gameEnd ? (
        <div className="gameBody">
          <div className="gameBoard">
            <div className="gameBoardContent">
              <div className="gameBoardContentHeader">
                <h1>{stage + 1} ROUND</h1>
                <h2>맞힌 개수 : {rightAnswer} / 5</h2>
                <div className="twoCriminalsWrapper">
                  <div className="criminalWrapper">
                    <img src={imgUrlArray[stage * 2]} alt=""/>
                    <button className="btnCriminals" onClick={answerCheck1}>{currCriminals[0].name}</button>
                  </div>
                  <span style={{width: "60px"}}></span>
                  <div className="criminalWrapper">
                    <img src={imgUrlArray[stage * 2 + 1]} alt=""/>
                    <button className="btnCriminals" onClick={answerCheck2}>{currCriminals[1].name}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <GameResult rightAnswer={rightAnswer * 2} userObj={userObj} setUserObj={setUserObj}/>
      )
    ) : (
      <div>[Game Loading...]</div>
    )
  )

}

export default GameBoard2;