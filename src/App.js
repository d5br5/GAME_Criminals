import React, {useState, useEffect} from "react";
import AppRouter from "./components/AppRouter";
import {authService} from "./fbase";

//test

//app test

function App() {

    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(()=>{
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName : user.displayName,
                    uid:user.uid,
                });
            }else{
                setUserObj(null);
            }
            setInit(true);
        });
    },[]);


    return (
        <div className="App">
            {init? <AppRouter  userObj={userObj} isLoggedIn={Boolean(userObj)}/> : "initializiing"}
        </div>
    );
}

export default App;
