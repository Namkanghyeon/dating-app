import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { authService, dbService, storageService } from "fbase";
import {
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "@firebase/auth";
import { doc, deleteDoc } from "@firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";

const DeleteAccount = ({ userObj, profileObj }) => {
    const [reLogin, setReLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        return () => {
            setReLogin(false);
            setEmail("");
            setPassword("");
        };
    }, []);

    const onYesClick = () => setReLogin(true);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (event.target.value === "no") {
            history.push("/");
        } else {
            const user = authService.currentUser;
            const credential = EmailAuthProvider.credential(email, password);
            await reauthenticateWithCredential(user, credential)
                .then(async () => {
                    await deleteObject(
                        ref(storageService, profileObj.attachmentUrl)
                    );
                    await deleteDoc(doc(dbService, "profiles", userObj.uid));
                    await deleteUser(authService.currentUser);
                    history.push("/");
                })
                .catch(() => {
                    alert("로그인 정보가 바르지 않습니다.");
                    setEmail("");
                    setPassword("");
                });
        }
    };

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    return (
        <div>
            {reLogin ? (
                <div>
                    <h2 className="title">계정 정보 확인</h2>
                    <div className="authContainer">
                        <form onSubmit={onSubmit} className="container">
                            <input
                                name="email"
                                type="email"
                                maxLength="60"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={onChange}
                                className="authInput"
                            />
                            <input
                                name="password"
                                type="password"
                                maxLength="20"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={onChange}
                                className="authInput"
                            />
                            <input
                                type="submit"
                                value={"계정 삭제"}
                                className="authInput authSubmit"
                            />
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="title">회원 탈퇴</h2>
                    <div className="box">
                        <ul>계정을 삭제하시겠습니까?</ul>
                    </div>
                    <div className="deleteAccountButtons">
                        <button
                            value="yes"
                            onClick={onYesClick}
                            className="deleteAccountButton deleteYes"
                        >
                            네!
                        </button>
                        <button
                            value="no"
                            onClick={onSubmit}
                            className="deleteAccountButton"
                        >
                            안할래요!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccount;
