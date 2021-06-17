import { useState, useEffect } from "react";
import { dbService, storageService } from "../fbase";

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
  return imgUrls;
}

const ShowProblem = ({ criminals }) => {
  const [stage, setStage] = useState(0);
  const [imgUrlArray, setImageUrlArray] = useState("");
  const [init, setInit] = useState(false);
  const [crimeList, setCrimeList] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
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
      setInit(true);
      setImageUrlArray(e);
    });
  }, []);

  const goPrevStage = () => {
    if (stage > 0) {
      setStage((e) => e - 1);
    }
  };

  const goNextStage = () => {
    if (stage < criminals.length - 1) {
      setStage((e) => e + 1);
    }
  };

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

      if (stage < criminals.length - 1) {
        setStage(stage + 1);
      }
    }
  };

  return init ? (
    <div className="oneProblem">
      {currCriminal.index} / {currCriminal.name} / {currCriminal.crime}
      <img src={imgUrlArray[stage]} alt="" />
      <div className="movingConsole">
        <button onClick={goPrevStage} disabled={stage === 0}>
          prev
        </button>
        <button onClick={goNextStage} disabled={stage === criminals.length - 1}>
          next
        </button>
      </div>
      <div>
        <button onClick={answerCheck}>{buttonOne}</button>
        <button onClick={answerCheck}>{buttonTwo}</button>
      </div>
      <div>
        <h2>
          {stage + 1} Round: {rightAnswer} / 10
        </h2>
      </div>
    </div>
  ) : (
    <div>[Game Loading...]</div>
  );
};

export default ShowProblem;
