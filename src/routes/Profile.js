import React, { useState, useEffect } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    useEffect(() => {
        getMyTweets();
    }, []);

    const getMyTweets = async () => {
        const q = query(
            collection(dbService, "tweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );
        const tweets = await getDocs(q);
        console.log(tweets.docs.map((doc) => doc.data()));
    };

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
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
