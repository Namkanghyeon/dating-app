import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import LogIn from "routes/LogIn";
import Matched from "routes/Matched";
import MyPage from "routes/MyPage";
import SignUp from "routes/SignUp";
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
                <div>
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
                </div>
            )}
            <Switch>
                <div className="outline forNavigation">
                    <Route exact path="/">
                        {userObj ? (
                            <div>
                                {Object.keys(profileObj).length && (
                                    <Home userObj={userObj} />
                                )}
                            </div>
                        ) : (
                            <LogIn />
                        )}
                    </Route>
                    <Route exact path="/matched">
                        <Matched userObj={userObj} />
                    </Route>
                    <Route exact path="/myprofile">
                        <MyPage userObj={userObj} />
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
