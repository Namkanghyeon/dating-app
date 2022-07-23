import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { collection, where, onSnapshot, query } from '@firebase/firestore';
import Profile from 'components/Profile';

export default function FemaleHome({ userObj }) {
  const [maleProfileObjs, setMaleProfileObjs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'profiles'),
      where('gender', '==', 'Male')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const maleProfileArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMaleProfileObjs(maleProfileArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {maleProfileObjs.map((maleProfileObj) => (
        <Profile
          key={maleProfileObj.id}
          userObj={userObj}
          yourProfileObj={maleProfileObj}
          matchMode={false}
        />
      ))}
    </div>
  );
}
