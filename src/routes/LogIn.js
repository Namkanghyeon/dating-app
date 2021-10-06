import { authService } from "fbase";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
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
        try {
            await signInWithEmailAndPassword(authService, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        return () => {
            setEmail("");
            setPassword("");
        };
    }, []);

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faBell}
                color={"#FF0000"}
                size="5x"
                style={{ marginBottom: 30 }}
            />
            <h2>Log In</h2>
            <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password"
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
                {error && <span className="authError">{error}</span>}
            </form>
            <form>
                <button>
                    <Link to="/signup">회원가입</Link>
                </button>
            </form>
        </div>
    );
};
export default LogIn;
