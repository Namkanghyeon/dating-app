import React from 'react';
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import AuthTest from 'utils/authTest';

export default function MyPage() {
  AuthTest();
  const navigate = useNavigate();

  const onClick = (e) => {
    switch (e.target.value) {
      case 'edit':
        navigate('/edit');
        break;
      case 'logout':
        if (window.confirm('로그아웃하시겠습니까?')) {
          authService.signOut();
          window.sessionStorage.clear();
          navigate('/');
        }
        break;
      case 'delete':
        navigate('/delete');
        break;
      default:
    }
  };

  return (
    <div className="container">
      <div className="myPageButtons">
        <button onClick={onClick} value="edit" className="myPageButtonsChild">
          내 프로필 조회 / 수정
        </button>
        <button onClick={onClick} value="logout" className="myPageButtonsChild">
          로그아웃
        </button>
        <button onClick={onClick} value="delete" className="myPageButtonsChild">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
