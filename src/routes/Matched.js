import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
    doc,
    updateDoc,
} from "@firebase/firestore";
import FemaleProfile from "components/aboutProfile/FemaleProfile";
import MaleProfile from "components/aboutProfile/MaleProfile";

const Matched = ({ userObj, profileObj, refresh }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        refresh();
        const myMatchedPartners = profileObj.matchedPartners;
        console.log("my match", myMatchedPartners);
        let myMatchedPartnersId = [];
        for (let myMatchedPartner of myMatchedPartners) {
            myMatchedPartnersId.push(myMatchedPartner.id);
        }
        if (myMatchedPartnersId.length !== 0) {
            const q = query(
                collection(dbService, "profiles"),
                where("userId", "in", myMatchedPartnersId)
            );
            onSnapshot(q, (snapshot) => {
                const matchArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMatches(matchArray);
            });
        }
        console.log("at matched.js: ", matches);
    }, []);

    return (
        <div className="container">
            <h2
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                매칭된 상대
            </h2>
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
