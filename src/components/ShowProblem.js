import {useState, useEffect} from 'react';
import {storageService} from "../fbase";


const ShowProblem = ({criminals}) => {

    const [stage, setStage] = useState(0);
    const [imgUrlArray, setImageUrlArray] = useState('');
    const [init, setInit] = useState(false);
    const currCriminal = criminals[stage];
    useEffect(() => {
        let imgUrls = [];
        async function fetchImgs() {
            imgUrls[0] = await storageService.ref(`criminalsImg/${criminals[0].index}.jpg`).getDownloadURL();
            imgUrls[1] = await storageService.ref(`criminalsImg/${criminals[1].index}.jpg`).getDownloadURL();
            imgUrls[2] = await storageService.ref(`criminalsImg/${criminals[2].index}.jpg`).getDownloadURL();
            imgUrls[3] = await storageService.ref(`criminalsImg/${criminals[3].index}.jpg`).getDownloadURL();
            imgUrls[4] = await storageService.ref(`criminalsImg/${criminals[4].index}.jpg`).getDownloadURL();
            imgUrls[5] = await storageService.ref(`criminalsImg/${criminals[5].index}.jpg`).getDownloadURL();
            imgUrls[6] = await storageService.ref(`criminalsImg/${criminals[6].index}.jpg`).getDownloadURL();
            imgUrls[7] = await storageService.ref(`criminalsImg/${criminals[7].index}.jpg`).getDownloadURL();
            imgUrls[8] = await storageService.ref(`criminalsImg/${criminals[8].index}.jpg`).getDownloadURL();
            imgUrls[9] = await storageService.ref(`criminalsImg/${criminals[9].index}.jpg`).getDownloadURL();
        }

        fetchImgs().then((res) => {
            setInit(true);
            setImageUrlArray(imgUrls);
        });
    }, []);

    const goPrevStage = () => {
        if (stage > 0) {
            setStage(stage - 1);
        }
    }

    const goNextStage = () => {
        if (stage < criminals.length - 1) {
            setStage(stage + 1);
        }
    }

    return init ? <div className="oneProblem">
        {currCriminal.index} / {currCriminal.name} / {currCriminal.crime}
        <img src={imgUrlArray[stage]} alt=""/>
        <div className="movingConsole">
            <button onClick={goPrevStage} disabled={stage === 0}>prev</button>
            <button onClick={goNextStage} disabled={stage === criminals.length - 1}>next</button>
        </div>
    </div> : <div>[Game Loading...]</div>

};

export default ShowProblem;