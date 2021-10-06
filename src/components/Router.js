import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Matched from "routes/Matched";
import MyProfile from "routes/MyProfile";
import LogIn from "routes/LogIn";
import SignUp from "routes/SignUp";

const AppRouter = ({ userObj, profileObj, refresh }) => {
    return (
        <>
            <Router>
                {userObj && profileObj && <Navigation />}
                <Switch>
                    <>
                        <div
                            style={{
                                maxWidth: 900,
                                width: "100%",
                                margin: "0 auto",
                                marginTop: 80,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Route exact path="/">
                                {userObj ? (
                                    <Home
                                        userObj={userObj}
                                        profileObj={profileObj}
                                    />
                                ) : (
                                    <LogIn />
                                )}
                            </Route>
                            <Route exact path="/matched">
                                <Matched
                                    userObj={userObj}
                                    profileObj={profileObj}
                                    refresh={refresh}
                                />
                            </Route>
                            <Route exact path="/myprofile">
                                <MyProfile
                                    userObj={userObj}
                                    profileObj={profileObj}
                                />
                            </Route>
                            <Route exact path="/signup">
                                <SignUp refresh={refresh} />
                            </Route>
                        </div>
                    </>
                </Switch>
            </Router>
        </>
    );
};

export default AppRouter;
