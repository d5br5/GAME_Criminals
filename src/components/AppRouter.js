import React from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Navigation from "./Navigation";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Game from "../routes/Game";
import Ranking from "../routes/Ranking";

function AppRouter({isLoggedIn, userObj}) {

    return (
        <div>
            <Router>
                {isLoggedIn && <Navigation userObj={userObj}/>}
                <Switch>
                    {isLoggedIn ? (
                        <>
                            <Route exact={true} path="/" replace>
                                <Home userObj={userObj}/>
                            </Route>
                            <Route exact={true} path="/profile" replace>
                                <Profile userObj={userObj}/>
                            </Route>
                            <Route exact={true} path="/game" replace>
                                <Game useObj={userObj}/>
                            </Route>
                            <Route exact={true} path="/ranking" replace>
                                <Ranking/>
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