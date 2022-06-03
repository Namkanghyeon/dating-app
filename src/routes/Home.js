import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { redux_setCurrentPage } from 'store/currentPageReducer';
import FemaleHome from 'components/homepage/FemaleHome';
import MaleHome from 'components/homepage/MaleHome';
import { useNavigate } from 'react-router-dom';

const Home = ({ userObj }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const setCurrentPageStore = (currentPage) =>
    dispatch(redux_setCurrentPage(currentPage));

  const { profileObj } = useSelector(
    (state) => ({
      profileObj: state.profileReducer.profileObj,
    }),
    shallowEqual
  );

  useEffect(() => {
    setCurrentPageStore(1);
  });

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
