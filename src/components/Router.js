import React from 'react';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Navigation from 'components/Navigation';
import Home from 'routes/Home';
import LogIn from 'routes/LogIn';
import Matched from 'routes/Matched';
import MyPage from 'routes/MyPage';
import SignUp from 'routes/SignUp';
import CreateProfile from './myProfile/CreateProfile';

const commonStyle = (props) => {
  return (
    <div className="outline" style={{ marginTop: '80px' }}>
      {props}
    </div>
  );
};

const AppRouter = ({ userObj }) => {
  const { profileObj } = useSelector(
    (state) => ({
      profileObj: state.profileReducer.profileObj,
    }),
    shallowEqual
  );

  return (
    <BrowserRouter>
      <Navigation />
      {/* {userObj && (
        <div>
          {Object.keys(profileObj).length ? (
            <Navigation />
          ) : (
            <div className="outline">
              <CreateProfile userObj={userObj} isNoProfileUser={true} />
            </div>
          )}
        </div>
      )}
      <Switch>
        <>
          <div className="outline forNavigation">
            <Route exact path="/">
              {userObj ? (
                <div>
                  {Object.keys(profileObj).length !== 0 && (
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
              {!userObj && <SignUp />}
            </Route>
          </div>
        </>
      </Switch> */}
      <Routes>
        <Route path="/" element={commonStyle(<LogIn />)} />
        <Route path="/home" element={commonStyle(<Home userObj={userObj} />)} />
        <Route
          path="/matched"
          element={commonStyle(<Matched userObj={userObj} />)}
        />
        <Route
          path="/mypage"
          element={commonStyle(<MyPage userObj={userObj} />)}
        />
        <Route path="/signup" element={commonStyle(<SignUp />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
