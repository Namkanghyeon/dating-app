import React, { useState } from 'react';
import { authService } from 'fbase';
import { updatePassword } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';

//================================================================================
// 1. reauthenticate 넣기
// 2. 이메일 연동
// 3. 바꾸고 재로그인 요구 or 리다이렉트할 때 네비게이션 바 챙기기
//================================================================================

const EditPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (newPassword === newPasswordConfirm) {
      const user = authService.currentUser;
      updatePassword(user, newPassword);
      navigate('/home');
    } else {
      alert('비밀번호를 다시 한번 확인해주세요');
    }
  };

  const onNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const onNewPasswordChangeConfirm = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="container"
      style={{ marginTop: '20px' }}
    >
      <div>
        <input
          type="password"
          maxLength="20"
          placeholder="새로운 비밀번호"
          onChange={onNewPasswordChange}
          className="authInput"
        />
      </div>
      <div>
        <input
          type="password"
          maxLength="20"
          placeholder="비밀번호 확인"
          onChange={onNewPasswordChangeConfirm}
          className="authInput"
        />
      </div>
      <input
        type="submit"
        value="비밀번호 변경"
        className="authInput authSubmit"
      />
    </form>
  );
};

export default EditPassword;
