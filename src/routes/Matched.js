import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import {
    collection,
    onSnapshot,
    query,
    where,
    documentId,
} from "@firebase/firestore";
import { useSelector, shallowEqual } from "react-redux";
import Profile from "components/homepage/Profile";

const Matched = ({ userObj }) => {
    const [matches, setMatches] = useState([]);

    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        }),
        shallowEqual
    );

    useEffect(() => {
        if (profileObj.matchedPartners.length !== 0) {
            const myMatchedPartners = profileObj.matchedPartners;
            let myMatchedPartnersIds = [];
            for (let myMatchedPartner of myMatchedPartners) {
                myMatchedPartnersIds.push(myMatchedPartner.id);
            }

            if (myMatchedPartnersIds.length !== 0) {
                const q = query(
                    collection(dbService, "profiles"),
                    where(documentId(), "in", myMatchedPartnersIds)
                );
                onSnapshot(q, (snapshot) => {
                    const matchArray = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setMatches(matchArray);
                });
            }
        }
    }, []);

    return (
        <div className="container">
            {/* /<span className="title">매칭된 상대</span> */}
            {!matches && <span>아직 매칭된 상대가 없습니다.</span>}
            {matches.map((match) => (
                <Profile
                    key={match.id}
                    userObj={userObj}
                    myProfileObj={profileObj}
                    yourProfileObj={match}
                    matchMode={true}
                />
            ))}
        </div>
    );
};

export default Matched;
