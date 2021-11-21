import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            await signInWithEmailAndPassword(authService, email, password);
        } catch (error) {
            console.log(error.message);
            console.log(error);
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                alert("등록되지 않은 이메일입니다. 다시 한번 확인해 주세요.");
            } else if (
                error.message === "Firebase: Error (auth/wrong-password)."
            ) {
                alert("비밀번호가 틀립니다. 다시 한번 확인해 주세요.");
                setPassword("");
            } else {
                alert(
                    "짧은 시간 동안 너무 많은 로그인 시도가 발생했습니다. 잠시 후에 다시 시도해 주세요."
                );
                setEmail("");
                setPassword("");
            }
        }
    };

    useEffect(() => {
        return () => {
            setEmail("");
            setPassword("");
        };
    }, []);

    return (
        <div className="logInContainer">
            <span className="logInTitle">
                <FontAwesomeIcon
                    icon={faSeedling}
                    size="2x"
                    className="logInLogo"
                />
                <h2 className="logInServiceName">First Day</h2>
            </span>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    maxLength="60"
                    placeholder="이메일"
                    required
                    value={email}
                    onChange={onChange}
                    className="logInInput"
                />
                <input
                    name="password"
                    type="password"
                    maxLength="20"
                    placeholder="비밀번호"
                    required
                    value={password}
                    onChange={onChange}
                    className="logInInput"
                />
                <input
                    type="submit"
                    value={"로그인"}
                    className="logInInput logInButton"
                />
            </form>
            <form className="signUp">
                <button className="signUpButton">
                    <Link to="/signup">회원가입</Link>
                </button>
            </form>
        </div>
    );
};
export default LogIn;
