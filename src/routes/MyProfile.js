import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import DeleteAccount from "components/myProfile/DeleteAccount";
import EditProfile from "components/myProfile/EditProfile";
// import EditPassword from "components/profile/EditPassword";
import { useSelector, shallowEqual } from "react-redux";

const MyProfile = ({ userObj }) => {
    const history = useHistory();
    // const [passwordMode, setPasswordMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        }),
        shallowEqual
    );

    const onDeleteClick = () => {
        console.log("delete account");
        setDeleteMode(true);
    };

    const onLogOutClick = () => {
        console.log("logout");
        authService.signOut();
        history.push("/");
    };

    // const onPasswordClick = () => {
    //     console.log("change password");
    //     setPasswordMode(true);
    // };

    return (
        <div>
            {/* {!deleteMode && !passwordMode && ( */}
            {!deleteMode && (
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
                        {/* <span className="profileButtonsChild">
                            <input
                                onClick={onPasswordClick}
                                value="비밀번호 변경"
                                className="profileButtonsChildChild"
                            />
                        </span> */}
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

export default MyProfile;
