import React, { useState } from 'react';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCred, setUserCred] = useState(null);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      try {
        await createUserWithEmailAndPassword(authService, email, password).then(
          (cred) => {
            setUserCred(cred);
            navigate('/create');
          }
        );
        setIsLoggedIn(true);
      } catch (e) {
        if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
          alert('이미 사용 중인 이메일입니다.');
        } else if (
          e.message ===
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          alert('비밀번호는 최소 여섯 자리여야 합니다.');
          setPassword('');
        }
        //setError(error.message);
      }
    } else {
      alert('두 비밀번호가 일치하지 않습니다.');
      setPassword('');
      setPasswordConfirm('');
    }
  };

  return (
    <>
      {!isLoggedIn && (
        <form onSubmit={onSubmit} className="logInContainer">
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
            placeholder="비밀번호 (6-20자)"
            required
            value={password}
            onChange={onChange}
            className="logInInput"
          />
          <input
            name="passwordConfirm"
            type="password"
            maxLength="20"
            placeholder="비밀번호 확인"
            required
            value={passwordConfirm}
            onChange={onChange}
            className="logInInput"
          />
          <input
            type="submit"
            value={'회원가입'}
            className="logInInput logInButton"
          />
          {error && <span className="authError">{error}</span>}
        </form>
      )}
    </>
  );
};

export default SignUp;
