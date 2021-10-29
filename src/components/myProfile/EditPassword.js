import React, { useState } from "react";
import { authService } from "fbase";
import { updatePassword } from "@firebase/auth";
import { Redirect } from "react-router";

//================================================================================
// 1. reauthenticate 넣기
// 2. 이메일 연동
// 3. 바꾸고 재로그인 요구 or 리다이렉트할 때 네비게이션 바 챙기기
//================================================================================

const EditPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [done, setDone] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        if (newPassword === newPasswordConfirm) {
            const user = authService.currentUser;
            updatePassword(user, newPassword);
            setDone(true);
        } else {
            alert("비밀번호를 다시 한번 확인해주세요");
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
                    <div style={{ marginTop: 20 }}>
                        비밀번호 변경이 완료되었습니다.
                    </div>
                    <Redirect to="/myprofile" />
                </>
            ) : (
                <form
                    onSubmit={onSubmit}
                    className="container"
                    style={{ marginTop: "20px" }}
                >
                    <div>
                        <input
                            type="password"
                            maxLength="20"
                            placeholder="새로운 비밀번호"
                            onChange={onNewPasswordChange}
                            className="authInput"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            maxLength="20"
                            placeholder="비밀번호 확인"
                            onChange={onNewPasswordChangeConfirm}
                            className="authInput"
                        />
                    </div>
                    <input
                        type="submit"
                        value="비밀번호 변경"
                        className="authInput authSubmit"
                    />
                </form>
            )}
        </>
    );
};

export default EditPassword;
