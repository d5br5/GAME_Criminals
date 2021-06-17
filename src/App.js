import React, { useState, useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { authService, dbService } from "./fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        let point = "60";
        dbService
          .collection("users")
          .doc(user.uid)
          .get()
          .then((e) => {
            point = e.data().point;
          });
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          point,
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
        <AppRouter userObj={userObj} isLoggedIn={Boolean(userObj)} />
      ) : (
        "initializiing"
      )}
    </div>
  );
}

export default App;
