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
            <h2>계정을 삭제하시겠습니까?</h2>
            <span>탈퇴 시 정보는 즉시 삭제되니 걱정하지 않으셔도 됩니다!</span>
            <div>
                <button value="yes" onClick={onClick}>
                    네
                </button>
                <button value="no" onClick={onClick}>
                    아니오
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;
