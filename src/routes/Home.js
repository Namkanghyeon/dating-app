import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import FemaleHome from 'components/homepage/FemaleHome';
import MaleHome from 'components/homepage/MaleHome';
import { useNavigate } from 'react-router-dom';

const Home = ({ userObj }) => {
  const navigate = useNavigate();

  const { profileObj } = useSelector(
    (state) => ({
      profileObj: state.profileReducer.profileObj,
    }),
    shallowEqual
  );

  if (!Object.keys(profileObj).length) {
    navigate('/create');
  }

  return (
    <div className="container">
      {profileObj ? (
        profileObj.gender === 'Female' ? (
          <FemaleHome userObj={userObj} profileObj={profileObj} />
        ) : (
          <MaleHome userObj={userObj} profileObj={profileObj} />
        )
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default Home;
