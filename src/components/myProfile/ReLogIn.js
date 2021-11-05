import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";

const ReLogIn = ({ setUserEmail, setUserPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        // try {
        setUserEmail(email);
        setUserPassword(password);
        // } catch (error) {
        //     setError(error.message);
        // }
    };

    useEffect(() => {
        return () => {
            setEmail("");
            setPassword("");
        };
    }, []);

    return (
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
                    value={"로그인"}
                    className="authInput authSubmit"
                />
            </form>
            {error && <span className="authError">{error}</span>}
        </div>
    );
};
//export default ReLogIn;
