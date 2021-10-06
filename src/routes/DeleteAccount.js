import React from "react";
import { useHistory } from "react-router";
import { authService, dbService } from "fbase";
import { deleteUser } from "@firebase/auth";
import { doc, deleteDoc } from "@firebase/firestore";

const DeleteAccount = () => {
    const history = useHistory();

    const onYesClick = async (event) => {
        event.preventDefault();
        await deleteDoc(
            doc(dbService, "profiles", authService.currentUser.uid)
        );
        await deleteUser(authService.currentUser);
        history.push("/");
    };

    const onNoClick = () => {
        history.push("/");
    };

    return (
        <>
            <div>
                <h2>계정을 삭제하시겠습니까?</h2>
                <button onClick={onYesClick}>네</button>
                <button onClick={onNoClick}>아니오</button>
            </div>
        </>
    );
};

export default DeleteAccount;
