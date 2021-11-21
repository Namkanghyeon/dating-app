import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, where, onSnapshot, query } from "@firebase/firestore";
import Profile from "./Profile";

const FemaleHome = ({ userObj, profileObj }) => {
    const [maleProfileObjs, setMaleProfileObjs] = useState([]);

    // const loadMales = (targetSchools) => {
    //     const q = query(
    //         collection(dbService, "profiles"),
    //         where("gender", "==", "Male"),
    //         where("school", "in", targetSchools)
    //     );
    //     onSnapshot(q, (snapshot) => {
    //         const maleProfileArray = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setMaleProfileObjs(maleProfileArray);
    //     });
    // };

    useEffect(() => {
        const q = query(
            collection(dbService, "profiles"),
            where("gender", "==", "Male")
            //orderby(좋아요 많이 받은 순)?
        );
        onSnapshot(q, (snapshot) => {
            const maleProfileArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMaleProfileObjs(maleProfileArray);
        });
    }, []);

    return (
        <div>
            {maleProfileObjs.map((maleProfileObj) => (
                <Profile
                    key={maleProfileObj.id}
                    userObj={userObj}
                    myProfileObj={profileObj}
                    yourProfileObj={maleProfileObj}
                    matchMode={false}
                />
            ))}
        </div>
    );
};

export default FemaleHome;
