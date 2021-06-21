import React, { useState, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { authService, dbService } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        let point = 100;
        let level = "";
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
          });
      } else {
        setUserObj(null);
      }
      setInit(true);
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
        <div className="loading"></div>
      )}
    </div>
  );
}

export default App;
