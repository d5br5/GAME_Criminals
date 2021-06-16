import {useState, useEffect} from 'react';
import {dbService, storageService} from "../fbase";
import ShowProblem from "../components/ShowProblem";

const Game = () => {

    const numOfGames = 10;
    const numOfCriminals = 100;
    const problems = getRandomNumbers(numOfCriminals, numOfGames);
    const [criminals, setCriminals] = useState([]);
    const [init, setInit] = useState(false);

    useEffect(() => {
        dbService.collection("criminals")
            .where("index", "in", problems)
            .onSnapshot(snapshot => {
                const criminalsArray = snapshot.docs.map(
                    doc => ({...doc.data()})
                )
                setCriminals(criminalsArray);
                setInit(true);
            });
    }, []);

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

    return (init&&criminals.length===numOfGames) && <div>
        [ List of Criminals of This Game ]
        {
            criminals.map((criminal, index) =>
                <div key={index}>
                    {index + 1} -----
                    index : {criminal.index} /
                    name : {criminal.name} /
                    crime : {criminal.crime}
                </div>
            )
        }
        <ShowProblem criminals={criminals}/>

    </div>;
};

export default Game;