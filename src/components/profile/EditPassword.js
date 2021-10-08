import React, { useState } from "react";
import { authService } from "fbase";
import { updatePassword } from "@firebase/auth";
import { Redirect } from "react-router";

const EditPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [differentPassword, setDifferentPassword] = useState(false);
    const [done, setDone] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        if (newPassword === newPasswordConfirm) {
            const user = authService.currentUser;
            updatePassword(user, newPassword);
            setDone(true);
        } else {
            setDifferentPassword(true);
        }
    };

    const onNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const onNewPasswordChangeConfirm = (event) => {
        setNewPasswordConfirm(event.target.value);
    };

    return (
        <>
            {done ? (
                <>
                    <div>비밀번호 변경이 완료되었습니다.</div>
                    <Redirect to="/" />
                </>
            ) : (
                <form onSubmit={onSubmit}>
                    <div>
                        새로운 비밀번호
                        <input type="password" onChange={onNewPasswordChange} />
                    </div>
                    <div>
                        새로운 비밀번호 확인
                        <input
                            type="password"
                            onChange={onNewPasswordChangeConfirm}
                        />
                    </div>
                    {differentPassword && (
                        <div>
                            두 비밀번호가 다릅니다. 다시 한 번 확인해주세요.
                        </div>
                    )}
                    <input type="submit" value="비밀번호 변경" />
                </form>
            )}
        </>
    );
};

export default EditPassword;
