import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navigation from "./Navigation";
import {Auth, Home, Profile, Game, Ranking} from "../routes";

function AppRouter({isLoggedIn, userObj, setUserObj}) {
  if (!isLoggedIn) {
    return (
      <div>
        <Router>
          <Navigation userObj={userObj} isLoggedIn={isLoggedIn}/>
          <Switch>
            <Route exact path="/">
              <Home isLoggedIn={isLoggedIn}/>
            </Route>
            <Redirect from="*" to="/"/>
          </Switch>
        </Router>
      </div>
    );
  }
  return (
    <div>
      <Router>
        <Navigation userObj={userObj} isLoggedIn={isLoggedIn}/>
        <Switch>
          <Route exact path="/" replace>
            <Home isLoggedIn={isLoggedIn}/>
          </Route>
          <Route exact path="/profile" replace>
            <Profile userObj={userObj}/>
          </Route>
          <Route exact path="/game" replace>
            <Game useObj={userObj} setUserObj={setUserObj}/>
          </Route>
          <Route exact path="/ranking" replace>
            <Ranking/>
          </Route>
          <Redirect from="*" to="/"/>
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;
