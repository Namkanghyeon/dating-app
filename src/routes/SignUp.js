import React, { useState } from "react";
import { authService } from "fbase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import MakeProfile from "components/MakeProfile";

const SignUp = ({ refresh }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                        value={email}
                        onChange={onChange}
                        className="authInput"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        required
                        value={password}
                        onChange={onChange}
                        className="authInput"
                    />
                    <input
                        type="submit"
                        value={"회원가입"}
                        className="authInput authSubmit"
                    />
                    {error && <span className="authError">{error}</span>}
                </form>
            )}
            {isLoggedIn && (
                <MakeProfile userCred={userCred} refresh={refresh} />
            )}
        </>
    );
};

export default SignUp;
