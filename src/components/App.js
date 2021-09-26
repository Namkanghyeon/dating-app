import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
    const [isIniting, setIsIniting] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            } else {
                setUserObj(null);
            }
            setIsIniting(true);
        });
    }, []);
    return (
        <>
            {isIniting ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Initializing..."
            )}
        </>
    );
}

export default App;
