import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, where, onSnapshot, query } from "@firebase/firestore";
import FemaleProfile from "components/homepage/FemaleProfile";

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
            <span className="title">
                {profileObj.name}님의 프로필을 좋아하는 여성들
            </span>
            {femaleProfileObjs.map((femaleProfileObj) => (
                <FemaleProfile
                    key={femaleProfileObj.id}
                    userObj={userObj}
                    profileObj={profileObj}
                    femaleProfileObj={femaleProfileObj}
                />
            ))}
        </div>
    );
};

export default MaleHome;
