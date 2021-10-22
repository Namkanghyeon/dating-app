import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import DeleteAccount from "components/profile/DeleteAccount";
import EditProfile from "components/profile/EditProfile";
import EditPassword from "components/profile/EditPassword";
import { useSelector, shallowEqual } from "react-redux";

const MyProfile = ({ userObj }) => {
    const history = useHistory();
    const [passwordMode, setPasswordMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    // redux store에서 profileObj 가져오기 - shallowEqual 다시 공부
    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        })
        // shallowEqual
    );

    console.log("myprofile123: ", profileObj);

    const onDeleteClick = () => {
        console.log("delete account");
        setDeleteMode(true);
    };

    const onLogOutClick = () => {
        console.log("logout");
        authService.signOut();
        history.push("/");
    };

    const onPasswordClick = () => {
        console.log("change password");
        setPasswordMode(true);
    };

    return (
        <div>
            {!deleteMode && !passwordMode && (
                <div className="container">
                    <EditProfile userObj={userObj} profileObj={profileObj} />
                    <div className="profileButtons">
                        <span className="profileButtonsChild">
                            <input
                                onClick={onLogOutClick}
                                value="로그아웃"
                                className="profileButtonsChildChild"
                            />
                        </span>
                        <span className="profileButtonsChild">
                            <input
                                onClick={onPasswordClick}
                                value="비밀번호 변경"
                                className="profileButtonsChildChild"
                            />
                        </span>
                        <span className="profileButtonsChild">
                            <input
                                onClick={onDeleteClick}
                                value="회원 탈퇴"
                                className="profileButtonsChildChild"
                            />
                        </span>
                    </div>
                </div>
            )}
            {passwordMode && (
                <div>
                    <EditPassword />
                </div>
            )}
            {deleteMode && (
                <div>
                    <DeleteAccount userObj={userObj} profileObj={profileObj} />
                </div>
            )}
        </div>
    );
};

export default MyProfile;
