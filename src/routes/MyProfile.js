import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import EditProfile from "components/profile/EditProfile";
import DeleteAccount from "../components/profile/DeleteAccount";
import EditPassword from "components/profile/EditPassword";

const MyProfile = ({ userObj, profileObj, reload }) => {
    const history = useHistory();
    const [passwordMode, setPasswordMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

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
        <>
            {!deleteMode && !passwordMode && (
                <div>
                    <EditProfile
                        userObj={userObj}
                        profileObj={profileObj}
                        reload={reload}
                    />
                    <button onClick={onLogOutClick}>로그아웃</button>
                    <button onClick={onPasswordClick}>비밀번호 변경</button>
                    <button onClick={onDeleteClick}>회원 탈퇴</button>
                </div>
            )}
            {passwordMode && (
                <div>
                    <EditPassword />
                </div>
            )}
            {deleteMode && (
                <div>
                    <DeleteAccount />
                </div>
            )}
        </>
    );
};

export default MyProfile;
