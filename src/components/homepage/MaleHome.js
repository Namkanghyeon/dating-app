import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, where, onSnapshot, query } from "@firebase/firestore";
import Profile from "./Profile";

const MaleHome = ({ userObj, profileObj }) => {
    const [femaleProfileObjs, setFemaleProfileObjs] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "profiles"),
            where("gender", "==", "Female"),
            where("liking", "array-contains", userObj.uid)
        );
        onSnapshot(q, (snapshot) => {
            const femaleProfileArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFemaleProfileObjs(femaleProfileArray);
        });
    }, []);

    return (
        <div>
            {femaleProfileObjs.map((femaleProfileObj) => (
                <Profile
                    key={femaleProfileObj.id}
                    userObj={userObj}
                    myProfileObj={profileObj}
                    yourProfileObj={femaleProfileObj}
                    matchMode={false}
                />
            ))}
        </div>
    );
};

export default MaleHome;
