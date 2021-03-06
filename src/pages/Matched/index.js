import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import {
  collection,
  onSnapshot,
  query,
  where,
  documentId,
} from '@firebase/firestore';
import { useSelector, shallowEqual } from 'react-redux';
import Profile from 'components/Profile';
import AuthTest from 'utils/authTest';

export default function Matched({ userObj }) {
  AuthTest();
  const [matches, setMatches] = useState([]);

  const { profileObj } = useSelector(
    (state) => ({
      profileObj: state.profileReducer.profileObj,
    }),
    shallowEqual
  );

  useEffect(() => {
    let unsubscribe = null;
    if (
      profileObj &&
      Object.keys(profileObj).length &&
      profileObj.matchedPartners.length !== 0
    ) {
      const myMatchedPartners = profileObj.matchedPartners;
      let myMatchedPartnersIds = [];
      for (let myMatchedPartner of myMatchedPartners) {
        myMatchedPartnersIds.push(myMatchedPartner.id);
      }
      if (myMatchedPartnersIds.length !== 0) {
        const q = query(
          collection(dbService, 'profiles'),
          where(documentId(), 'in', myMatchedPartnersIds)
        );
        unsubscribe = onSnapshot(q, (snapshot) => {
          const matchArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matchArray);
        });
      }
    }
    if (unsubscribe) {
      return () => {
        unsubscribe();
      };
    }
  }, [profileObj]);

  return (
    <div className="container">
      {matches.length === 0 && (
        <h2 className="noMatchMessage">* 아직 매칭된 상대가 없습니다 *</h2>
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
}
