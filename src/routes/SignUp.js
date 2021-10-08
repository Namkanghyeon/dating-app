import React, { useState } from "react";
import { authService } from "fbase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import CreateProfile from "components/profile/CreateProfile";

const SignUp = ({ reload }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userCred, setUserCred] = useState(null);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
        // else if (name === "passwordConfirm") {
        //     setPasswordConfirm(value);
        // }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(
                authService,
                email,
                password
            ).then((cred) => {
                setUserCred(cred);
            });
            setIsLoggedIn(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {!isLoggedIn && (
                <form onSubmit={onSubmit} className="container">
                    <input
                        name="email"
                        type="email"
                        placeholder="이메일"
                        required
                        //value={email}
                        onChange={onChange}
                        className="authInput"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        required
                        //value={password}
                        onChange={onChange}
                        className="authInput"
                    />
                    {/* <input
                        name="passwordConfirm"
                        type="password"
                        placeholder="비밀번호 확인"
                        required
                        //value={passwordConfirm}
                        onChange={onChange}
                        className="authInput"
                    /> */}
                    <input
                        type="submit"
                        value={"회원가입"}
                        className="authInput authSubmit"
                    />
                    {error && <span className="authError">{error}</span>}
                </form>
            )}
            {isLoggedIn && (
                <CreateProfile userCred={userCred} reload={reload} />
            )}
        </>
    );
};

export default SignUp;
