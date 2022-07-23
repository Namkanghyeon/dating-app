import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import FemaleHome from 'pages/Main/FemaleHome';
import MaleHome from 'pages/Main/MaleHome';
import { useNavigate } from 'react-router-dom';
import AuthTest from 'utils/authTest';

export default function Home({ userObj }) {
  AuthTest();
  const navigate = useNavigate();

  const { profileObj } = useSelector(
    (state) => ({
      profileObj: state.profileReducer.profileObj,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (profileObj === undefined) {
      // 회원가입 후 프로필 생성 안하면 undefined로 설정됨
      navigate('/create');
    }
  }, [profileObj]);

  return (
    <div className="container">
      {profileObj && Object.keys(profileObj).length ? (
        <>
          {profileObj.gender === 'Female' ? (
            <FemaleHome userObj={userObj} />
          ) : (
            <MaleHome userObj={userObj} />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
