import React, {useState, useEffect} from "react";
import AppRouter from "./components/AppRouter";
import {authService, dbService} from "./fbase";
import logo from './assets/logo.gif';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        let point = 100;
        let level = "LV.2";
        dbService
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            point = doc?.data()?.point || point;
            level = doc?.data()?.level || level;
          })
          .then(() => {
            setUserObj({
              nickname: user.displayName,
              uid: user.uid,
              point,
              level,
            });
          }).then(()=>{
            setInit(true);
        })
      } else {
        setUserObj(null);
        setInit(true);
      }
    });
  }, []);

  return (
    <div className="App">
      {init ? (
        <AppRouter
          userObj={userObj}
          isLoggedIn={Boolean(userObj)}
          setUserObj={setUserObj}
        />
      ) : (
        <div className="loading">
          <img src={logo} alt=""  className="loadingLogo"/>
          Loading...
        </div>
      )}
    </div>
  );
}

export default App;
