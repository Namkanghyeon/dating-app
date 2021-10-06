import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, where, onSnapshot, query } from "@firebase/firestore";
import MaleProfile from "components/aboutProfile/MaleProfile";

const FemaleHome = ({ userObj, profileObj }) => {
    const [maleProfileObjs, setMaleProfileObjs] = useState([]);

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
        <>
            <div>
                Here is FemaleHome
                {maleProfileObjs.map((maleProfileObj) => (
                    <MaleProfile
                        key={maleProfileObj.id}
                        userObj={userObj}
                        profileObj={profileObj}
                        maleProfileObj={maleProfileObj}
                        matchMode={false}
                    />
                ))}
            </div>
        </>
    );
};

export default FemaleHome;
