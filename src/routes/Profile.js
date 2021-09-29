import React, { useState, useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import Tweet from "components/Tweet";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [myTweets, setMyTweets] = useState([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMyTweets(tweetArray);
        });
    }, []);

    const onLogOutClick = () => {
        console.log("logout");
        authService.signOut();
        history.push("/");
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(await authService.currentUser, {
                displayName: newDisplayName,
            });
            console.log(userObj.displayName);
            refreshUser();
        }
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    className="formInput"
                    onChange={onChange}
                    placeholder="Display name"
                    value={newDisplayName}
                    autoFocus
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
            <h2>My Tweets</h2>
            {myTweets.map((tweet) => (
                <Tweet
                    key={tweet.id}
                    tweetObj={tweet}
                    isOwner={tweet.creatorId === userObj.uid}
                />
            ))}
        </div>
    );
};

export default Profile;
