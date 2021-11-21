import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import DeleteAccount from "components/myProfile/DeleteAccount";
import EditProfile from "components/myProfile/EditProfile";
// import EditPassword from "components/profile/EditPassword";
import { useSelector, shallowEqual } from "react-redux";

const MyPage = ({ userObj }) => {
    const history = useHistory();
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    // const [passwordMode, setPasswordMode] = useState(false);

    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        }),
        shallowEqual
    );

    const onEditProfileClick = () => {
        console.log("edit profile");
        setEditMode(true);
    };

    const onLogOutClick = () => {
        console.log("logout");
        authService.signOut();
        history.push("/");
    };

    const onDeleteClick = () => {
        console.log("delete account");
        setDeleteMode(true);
    };

    // const onPasswordClick = () => {
    //     console.log("change password");
    //     setPasswordMode(true);
    // };

    return (
        <div>
            {!editMode && !deleteMode && (
                <div className="container">
                    <div className="myPageButtons">
                        <input
                            onClick={onEditProfileClick}
                            value="프로필 수정"
                            className="myPageButtonsChild"
                        />
                        {/* <input
                            onClick={onPasswordClick}
                            value="비밀번호 변경"
                            className="myPageButtonsChild"
                        /> */}
                        <input
                            onClick={onLogOutClick}
                            value="로그아웃"
                            className="myPageButtonsChild"
                        />
                        <input
                            onClick={onDeleteClick}
                            value="회원 탈퇴"
                            className="myPageButtonsChild"
                        />
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
            {deleteMode && (
                <div>
                    <DeleteAccount userObj={userObj} profileObj={profileObj} />
                </div>
            )}
        </div>
    );
};

export default MyPage;
