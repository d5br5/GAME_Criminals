import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navigation from "./Navigation";

import { Home, Profile, Game1, Game2, Ranking, Welcome } from "../routes";

function AppRouter({ isLoggedIn, userObj, setUserObj }) {
  if (!isLoggedIn) {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <Router>
        <Navigation userObj={userObj} isLoggedIn={isLoggedIn} />
        <Switch>
          <Route exact path="/" replace>
            <Home isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/profile" replace>
            <Profile userObj={userObj} />
          </Route>
          <Route exact path="/game1" replace>
            <Game1 userObj={userObj} setUserObj={setUserObj} />
          </Route>
          <Route exact path="/game2" replace>
            <Game2 userObj={userObj} setUserObj={setUserObj} />
          </Route>
          <Route exact path="/ranking" replace>
            <Ranking />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
