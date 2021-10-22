import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService, dbService } from "fbase";
import { setPersistence, browserSessionPersistence } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { redux_setProfile } from "store/profileReducer";

function App() {
    const [ready, setReady] = useState(false);
    const [userObj, setUserObj] = useState(null);
    const [isProfileCreated, setIsProfileCreated] = useState(false);

    const dispatch = useDispatch();
    const redux_setProfileObj = (profileObj) =>
        dispatch(redux_setProfile(profileObj));

    const callProfile = async (user) => {
        const docRef = doc(dbService, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            redux_setProfileObj(docSnap.data());
            setIsProfileCreated(true);
        }
    };

    useEffect(() => {
        setPersistence(authService, browserSessionPersistence);
        authService.onAuthStateChanged(async (user) => {
            //새로고침하면 다시 호출됨
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                });
                callProfile(user);
            } else {
                setUserObj(null);
            }
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready ? (
                <AppRouter
                    userObj={userObj}
                    isProfileCreated={isProfileCreated}
                />
            ) : (
                <div style={{ marginTop: 20 }}>"loading..."</div>
            )}
        </>
    );
}

export default App;
