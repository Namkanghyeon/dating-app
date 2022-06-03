import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { redux_setCurrentPage } from 'store/currentPageReducer';

const MyPage = ({ userObj }) => {
  const navigate = useNavigate();
  // const [passwordMode, setPasswordMode] = useState(false);

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
    setCurrentPageStore(3);
  }, []);

  const onEditProfileClick = () => {
    navigate('/edit');
  };

  const onLogOutClick = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      authService.signOut();
      setCurrentPageStore(1);
      navigate('/');
    }
  };

  const onDeleteClick = () => {
    navigate('/delete');
  };

  return (
    <div className="container">
      <div className="myPageButtons">
        <button
          onClick={onEditProfileClick}
          value="프로필 수정"
          className="myPageButtonsChild"
        >
          프로필 수정
        </button>
        {/* <input
                    onClick={onPasswordClick}
                    value="비밀번호 변경"
                    className="myPageButtonsChild"
                /> */}
        <button
          onClick={onLogOutClick}
          value="로그아웃"
          className="myPageButtonsChild"
        >
          로그아웃
        </button>
        <button
          onClick={onDeleteClick}
          value="회원 탈퇴"
          className="myPageButtonsChild"
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
