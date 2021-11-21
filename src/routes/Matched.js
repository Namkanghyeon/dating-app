import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { dbService } from "fbase";
import {
    collection,
    onSnapshot,
    query,
    where,
    documentId,
} from "@firebase/firestore";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Profile from "components/homepage/Profile";
import { redux_setCurrentPage } from "store/currentPageReducer";

const Matched = ({ userObj }) => {
    const [matches, setMatches] = useState([]);
    const history = useHistory();

    const dispatch = useDispatch();
    const setCurrentPageStore = (currentPage) =>
        dispatch(redux_setCurrentPage(currentPage));

    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        }),
        shallowEqual
    );

    useEffect(() => {
        setCurrentPageStore(2);
    }, []);

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
            {matches.length === 0 && (
                <h2 className="noMatchMessage">
                    * 아직 매칭된 상대가 없습니다 *
                </h2>
            )}
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
