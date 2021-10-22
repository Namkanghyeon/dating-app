import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigation from "components/common/Navigation";
import Home from "routes/Home";
import LogIn from "routes/LogIn";
import Matched from "routes/Matched";
import MyProfile from "routes/MyProfile";
import SignUp from "routes/SignUp";

const AppRouter = ({ userObj, isProfileCreated }) => {
    return (
        <HashRouter>
            {userObj && isProfileCreated && <Navigation />}
            <Switch>
                <div
                    style={{
                        maxWidth: 300,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Route exact path="/">
                        {userObj ? <Home userObj={userObj} /> : <LogIn />}
                    </Route>
                    <Route exact path="/matched">
                        <Matched userObj={userObj} />
                    </Route>
                    <Route exact path="/myprofile">
                        <MyProfile userObj={userObj} />
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                </div>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;
