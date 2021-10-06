import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import ProfileForm from "components/ProfileForm";
import DeleteAccount from "./DeleteAccount";

const MyProfile = ({ userObj, profileObj }) => {
    const history = useHistory();
    const [deleteMode, setDeleteMode] = useState(false);

    const onDeleteClick = () => {
        setDeleteMode(true);
    };

    const onLogOutClick = () => {
        console.log("logout");
        authService.signOut();
        history.push("/");
    };

    return (
        <>
            {!deleteMode && (
                <div>
                    <ProfileForm userObj={userObj} profileObj={profileObj} />
                    <button onClick={onLogOutClick}> Log Out</button>
                    <button onClick={onDeleteClick}>회원 탈퇴</button>
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
