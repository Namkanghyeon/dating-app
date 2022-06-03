import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import Navigation from 'components/Navigation';
import Home from 'routes/Home';
import LogIn from 'routes/LogIn';
import Matched from 'routes/Matched';
import MyPage from 'routes/MyPage';
import SignUp from 'routes/SignUp';
import CreateProfile from './myProfile/CreateProfile';
import EditProfile from './myProfile/EditProfile';
import DeleteAccount from './myProfile/DeleteAccount';

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
