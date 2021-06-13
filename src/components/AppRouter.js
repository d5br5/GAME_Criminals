import React from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Navigation from "./Navigation";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Game from "../routes/Game";

function AppRouter({isLoggedIn, userObj}) {

    return (
        <div>
            <Router>
                {isLoggedIn && <Navigation userObj={userObj}/>}
                <Switch>
                    {isLoggedIn ? (
                        <>
                            <Route exact={true} path="/">
                                <Home userObj={userObj}/>
                            </Route>
                            <Route exact={true} path="/profile">
                                <Profile userObj={userObj}/>
                            </Route>
                            <Route exact={true} path="/game">
                                <Game useObj={userObj}></Game>
                            </Route>
                            <Redirect from="*" to="/"/>
                        </>
                    ) : (
                        <>
                            <Route exact={true} path="/">
                                <Auth/>
                            </Route>
                            <Redirect from="*" to="/"/>
                        </>
                    )}
                </Switch>
            </Router>
        </div>
    );
}

export default AppRouter;