import React, { useState, useEffect } from 'react';
import { authService } from 'fbase';
// import { useHistory, Redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import DeleteAccount from 'components/myProfile/DeleteAccount';
import EditProfile from 'components/myProfile/EditProfile';
// import EditPassword from "components/profile/EditPassword";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { redux_setCurrentPage } from 'store/currentPageReducer';

const MyPage = ({ userObj }) => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [logOutMode, setLogOutMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
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
    setEditMode(true);
  };

  const onLogOutClick = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      authService.signOut();
      setCurrentPageStore(1);
      setLogOutMode(true);
      navigate('/');
    }
  };

  const onDeleteClick = () => {
    setDeleteMode(true);
  };

  return (
    <div>
      {!editMode && !logOutMode && !deleteMode && (
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
      )}
      {editMode && (
        <div>
          <EditProfile userObj={userObj} profileObj={profileObj} />
        </div>
      )}
      {/* {passwordMode && (
                <div>
                    <EditPassword />
                </div>
            )} */}
      {/* {logOutMode && (
        <div>
          <Redirect to="/" />
        </div>
      )} */}
      {deleteMode && (
        <div>
          <DeleteAccount userObj={userObj} profileObj={profileObj} />
        </div>
      )}
    </div>
  );
};

export default MyPage;
