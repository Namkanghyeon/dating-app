import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navigation from "components/common/Navigation";
import Home from "routes/Home";
import LogIn from "routes/LogIn";
import Matched from "routes/Matched";
import MyProfile from "routes/MyProfile";
import SignUp from "routes/SignUp";

import { useSelector, shallowEqual } from "react-redux";
import CreateProfile from "./myProfile/CreateProfile";

const AppRouter = ({ userObj }) => {
    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        }),
        shallowEqual
    );
    return (
        <HashRouter>
            {userObj && (
                <>
                    {Object.keys(profileObj).length ? (
                        <Navigation />
                    ) : (
                        <div className="outline">
                            <CreateProfile
                                userObj={userObj}
                                isNoProfileUser={true}
                            />
                        </div>
                    )}
                </>
            )}
            <Switch>
                <div className="outline">
                    <Route exact path="/">
                        {userObj ? (
                            <>
                                {Object.keys(profileObj).length && (
                                    <Home userObj={userObj} />
                                )}
                            </>
                        ) : (
                            <LogIn />
                        )}
                    </Route>
                    <Route exact path="/matched">
                        <Matched userObj={userObj} />
                    </Route>
                    <Route exact path="/myprofile">
                        <MyProfile userObj={userObj} />
                    </Route>
                    <Route exact path="/signup">
                        {!userObj ? <SignUp /> : <div> </div>}
                    </Route>
                </div>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;
