import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
} from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();

    useEffect(() => {
        const q = query(
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
        // onSnapshot(
        //     collection(dbService, "tweets"),
        //     orderBy("createdAt", "desc"),
        //     (snapshot) => {
        //         const tweetArray = snapshot.docs.map((doc) => ({
        //             id: doc.id,
        //             ...doc.data(),
        //         }));
        //         setTweets(tweetArray);
        //     }
        // );
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(
                storageService,
                `${userObj.uid}/${uuidv4()}`
            );
            const response = await uploadString(
                attachmentRef,
                attachment /*string*/,
                "data_url"
            );
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        await addDoc(collection(dbService, "tweets"), tweetObj);
        setTweet("");
        setAttachment("");
        fileInput.current.value = "";
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setTweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const file = files[0];

        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };

        reader.readAsDataURL(file);
    };

    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = "";
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                />
                <input type="submit" value="Tweet" />
                {attachment && (
                    <div>
                        <img
                            src={attachment}
                            width="50px"
                            height="50px"
                            alt=""
                        />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;
