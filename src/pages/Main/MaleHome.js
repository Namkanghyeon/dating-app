import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import Profile from 'components/Profile';

export default function MaleHome({ userObj }) {
  const [femaleProfileObjs, setFemaleProfileObjs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'profiles'),
      where('gender', '==', 'Female'),
      where('liking', 'array-contains', userObj.uid)
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
      {femaleProfileObjs.length === 0 && (
        <h2 className="noMatchMessage">
          * 아직 받은 1차 매칭신청이 없습니다 *
        </h2>
      )}
      {femaleProfileObjs.map((femaleProfileObj) => (
        <Profile
          key={femaleProfileObj.id}
          userObj={userObj}
          yourProfileObj={femaleProfileObj}
          matchMode={false}
        />
      ))}
    </div>
  );
}
