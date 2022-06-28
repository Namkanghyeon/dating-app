import React, { useState } from 'react';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      createUserWithEmailAndPassword(authService, email, password)
        .then(() => {
          navigate('/create');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            alert('이미 사용 중인 이메일입니다.');
          } else if (error.code === 'auth/weak-password') {
            alert('비밀번호는 최소 여섯 자리여야 합니다.');
            setPassword('');
            setPasswordConfirm('');
          }
        });
    } else {
      alert('두 비밀번호가 일치하지 않습니다.');
      setPassword('');
      setPasswordConfirm('');
    }
  };

  return (
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
    </form>
  );
}
