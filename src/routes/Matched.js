import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import FemaleProfile from "components/homepage/FemaleProfile";
import MaleProfile from "components/homepage/MaleProfile";

const Matched = ({ userObj, profileObj, reload }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        reload();
        const myMatchedPartners = profileObj.matchedPartners;
        let myMatchedPartnersId = [];
        for (let myMatchedPartner of myMatchedPartners) {
            myMatchedPartnersId.push(myMatchedPartner.id);
        }
        if (myMatchedPartnersId.length !== 0) {
            const q = query(
                collection(dbService, "profiles"),
                where("uid", "in", myMatchedPartnersId)
            );
            onSnapshot(q, (snapshot) => {
                const matchArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMatches(matchArray);
            });
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
