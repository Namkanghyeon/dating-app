import React, { useState, useEffect } from 'react';
import AppRouter from 'Router'; // 내 router
import { authService, dbService } from 'fbase';
import { setPersistence, browserSessionPersistence } from '@firebase/auth';
import { doc, onSnapshot } from '@firebase/firestore';
import { useDispatch } from 'react-redux';
import { redux_setProfile } from 'store/profileReducer'; // 내 reducer의 action function

export default function App() {
  const [ready, setReady] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const dispatch = useDispatch();
  const redux_setProfileObj = (profileObj) =>
    dispatch(redux_setProfile(profileObj));

  const callProfile = (user) => {
    const docRef = doc(dbService, 'profiles', user.uid);
    onSnapshot(docRef, (snapshot) => {
      redux_setProfileObj(snapshot.data()); // 회원가입 후 프로필 생성 없으면 undefined가 저장됨
    });
  };

  useEffect(() => {
    setPersistence(authService, browserSessionPersistence); // 세션 종료 시 인증 해제 (로그 아웃)
    authService.onAuthStateChanged((user) => {
      //새로고침하면 다시 호출됨
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
        });
        callProfile(user);
      } else {
        setUserObj(null);
      }
      setReady(true);
    });
  }, []);

  return (
    <>
      {ready ? (
        <AppRouter userObj={userObj} />
      ) : (
        <div style={{ marginTop: 20 }}>loading...</div>
      )}
    </>
  );
}
