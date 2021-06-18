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
        dbService
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            console.log(doc.data());
            point = doc.data().point;
          }).then(()=>{
          setUserObj({
            nickname: user.displayName,
            uid: user.uid,
            point,
          });
        })
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="App">
      {init ? (
        <AppRouter userObj={userObj} isLoggedIn={Boolean(userObj)} setUserObj={setUserObj} />
      ) : (
        "initializiing"
      )}
    </div>
  );
}

export default App;
