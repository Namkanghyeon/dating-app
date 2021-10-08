import React, { useState, useEffect } from "react";
import AppRouter from "components/public/Router";
import { authService, dbService } from "fbase";
import { setPersistence, browserSessionPersistence } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";

function App() {
    const [ready, setReady] = useState(false);
    const [userObj, setUserObj] = useState(null);
    const [profileObj, setProfileObj] = useState(null);

    const callProfile = async (user) => {
        const docRef = doc(dbService, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProfileObj(docSnap.data());
        }
    };

    useEffect(() => {
        setPersistence(authService, browserSessionPersistence);
        authService.onAuthStateChanged(async (user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                });
                callProfile(user);
            } else {
                setUserObj(null);
                setProfileObj(null);
            }
            setReady(true);
        });
    }, []);

    const reload = async () => {
        console.log("reloading...");
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
        });
        const docRef = doc(dbService, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setProfileObj(docSnap.data());
        }
    };

    return (
        <>
            {ready ? (
                <AppRouter
                    userObj={userObj}
                    profileObj={profileObj}
                    reload={reload}
                />
            ) : (
                "loading..."
            )}
        </>
    );
}

export default App;
