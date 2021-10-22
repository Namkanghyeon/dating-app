import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import FemaleProfile from "components/homepage/FemaleProfile";
import MaleProfile from "components/homepage/MaleProfile";
import { useSelector, shallowEqual } from "react-redux";

const Matched = ({ userObj }) => {
    const [matches, setMatches] = useState([]);

    // redux store에서 profileObj 가져오기 - shallowEqual 다시 공부
    const { profileObj } = useSelector(
        (state) => ({
            profileObj: state.profileReducer.profileObj,
        })
        // shallowEqual
    );

    console.log("matched page profileObj: ", profileObj);

    useEffect(() => {
        if (profileObj.matchedPartners.length !== 0) {
            const myMatchedPartners = profileObj.matchedPartners;
            let myMatchedPartnersIds = [];
            for (let myMatchedPartner of myMatchedPartners) {
                myMatchedPartnersIds.push(myMatchedPartner.id);
            }
            // for문을 myMatchedPartnersIds에서 돌면서 doc(id) 찾기

            if (myMatchedPartnersIds.length !== 0) {
                const q = query(
                    collection(dbService, "profiles"),
                    where("uid", "in", myMatchedPartnersIds)
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
            <span className="title">매칭된 상대</span>
            {profileObj.gender === "Female"
                ? matches.map((match) => (
                      <MaleProfile
                          key={match.id}
                          userObj={userObj}
                          profileObj={profileObj}
                          maleProfileObj={match}
                          matchMode={true}
                      />
                  ))
                : matches.map((match) => (
                      <FemaleProfile
                          key={match.id}
                          userObj={userObj}
                          profileObj={profileObj}
                          femaleProfileObj={match}
                          matchMode={true}
                      />
                  ))}
        </div>
    );
};

export default Matched;
