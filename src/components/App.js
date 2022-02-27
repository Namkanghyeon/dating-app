import React, { useState, useEffect } from "react";
import AppRouter from "components/Router"; // 내 router
import { authService, dbService } from "fbase";
import { setPersistence, browserSessionPersistence } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { redux_setProfile } from "store/profileReducer"; // 내 reducer의 action function

function App() {
    const [ready, setReady] = useState(false);
    const [userObj, setUserObj] = useState(null);

    const dispatch = useDispatch();
    const redux_setProfileObj = (profileObj) =>
        dispatch(redux_setProfile(profileObj));

    const callProfile = async (user) => {
        const docRef = doc(dbService, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            redux_setProfileObj(docSnap.data());
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
                <AppRouter userObj={userObj} />
            ) : (
                <div style={{ marginTop: 20 }}>loading...</div>
            )}
        </>
    );
}

export default App;
