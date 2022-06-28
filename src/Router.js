import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Navigation from 'components/Navigation';
import LogIn from 'pages/Login';
import Home from 'pages/Main';
import Matched from 'pages/Matched';
import MyPage from 'pages/MyPage';
import EditProfile from 'pages/MyPage/EditProfile';
import DeleteAccount from 'pages/MyPage/DeleteAccount';
import SignUp from 'pages/Signup';
import CreateProfile from 'pages/Signup/CreateProfile';

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
      <Routes>
        <Route path="/" element={commonStyle(<LogIn />)} />
        <Route path="/home" element={commonStyle(<Home userObj={userObj} />)} />
        <Route
          path="/matched"
          element={commonStyle(<Matched userObj={userObj} />)}
        />
        <Route path="/mypage" element={commonStyle(<MyPage />)} />
        <Route path="/signup" element={commonStyle(<SignUp />)} />
        <Route
          path="/create"
          element={commonStyle(
            <CreateProfile userObj={userObj} isNoProfileUser={true} />
          )}
        />
        <Route
          path="/edit"
          element={commonStyle(
            <EditProfile userObj={userObj} profileObj={profileObj} />
          )}
        />
        <Route
          path="/delete"
          element={commonStyle(
            <DeleteAccount userObj={userObj} profileObj={profileObj} />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
