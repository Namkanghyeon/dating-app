import React from "react";
import { useHistory } from "react-router";
import { authService, dbService, storageService } from "fbase";
import {
    deleteUser,
    signInWithEmailAndPassword,
    reauthenticateWithCredential,
} from "@firebase/auth";
import { doc, deleteDoc } from "@firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";

const DeleteAccount = ({ userObj, profileObj }) => {
    const history = useHistory();

    const onClick = async (event) => {
        if (event.target.value === "yes") {
            await deleteObject(ref(storageService, profileObj.attachmentUrl));
            await deleteDoc(doc(dbService, "profiles", userObj.uid));
            await deleteUser(authService.currentUser);
        }
        history.push("/");
    };

    return (
        <div>
            <h2 className="title">회원 탈퇴</h2>
            <div className="messageBox">
                <ul>계정을 삭제하시겠습니까?</ul>
                <ul>
                    모든 회원 정보는 즉시 삭제되므로 걱정하지 않으셔도 됩니다!
                </ul>
                <ul>언제든 또 방문해주세요!</ul>
            </div>
            <div className="deleteAccountButtons">
                <button
                    value="yes"
                    onClick={onClick}
                    className="deleteAccountButton deleteYes"
                >
                    네~ 또 올게요!
                </button>
                <button
                    value="no"
                    onClick={onClick}
                    className="deleteAccountButton"
                >
                    안할래요!
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;
