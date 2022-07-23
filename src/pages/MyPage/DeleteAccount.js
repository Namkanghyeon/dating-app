import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService, storageService } from 'fbase';
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from '@firebase/auth';
import { doc, deleteDoc } from '@firebase/firestore';
import { ref, deleteObject } from '@firebase/storage';
import AuthTest from 'utils/authTest';

export default function DeleteAccount({ userObj, profileObj }) {
  AuthTest();
  const navigate = useNavigate();

  const [reLogin, setReLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      setReLogin(false);
      setEmail('');
      setPassword('');
    };
  }, []);

  const onYesClick = () => setReLogin(true);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (event.target.value === 'no') {
      navigate('/home');
    } else {
      const user = authService.currentUser;
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(user, credential)
        .then(async () => {
          try {
            await deleteObject(ref(storageService, profileObj.attachmentUrl));
          } catch (e) {}
          await deleteDoc(doc(dbService, 'profiles', userObj.uid));
          await deleteUser(authService.currentUser);
          window.sessionStorage.clear();
          navigate('/');
        })
        .catch((e) => {
          console.log(e.code);
          if (
            e.code === 'auth/user-mismatch' ||
            e.code === 'auth/wrong-password'
          ) {
            alert('로그인 정보가 바르지 않습니다.');
            setEmail('');
            setPassword('');
          }
        });
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div>
      {reLogin ? (
        <div>
          <h2 className="title">계정 정보 확인</h2>
          <div className="logInContainer">
            <form onSubmit={onSubmit} className="container">
              <input
                name="email"
                type="email"
                maxLength="60"
                placeholder="이메일"
                required
                value={email}
                onChange={onChange}
                className="logInInput"
              />
              <input
                name="password"
                type="password"
                maxLength="20"
                placeholder="비밀번호"
                required
                value={password}
                onChange={onChange}
                className="logInInput"
              />
              <input
                type="submit"
                value={'계정 삭제'}
                className="logInInput logInButton"
              />
            </form>
          </div>
        </div>
      ) : (
        <div>
          <div className="deleteConfirmBox">
            <ul>계정을 삭제하시겠습니까?</ul>
          </div>
          <div className="deleteAccountButtons">
            <button
              value="yes"
              onClick={onYesClick}
              className="deleteYesButton"
            >
              네
            </button>
            <button value="no" onClick={onSubmit} className="deleteNoButton">
              다시 생각해볼게요
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
