import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";

const Tweet = ({ tweetObj, isOwner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm(
            "Are you sure you want to delete this tweet?"
        );
        if (ok) {
            await deleteDoc(doc(dbService, `tweets/${tweetObj.id}`));
        }
    };

    const toggleIsEditing = () => setIsEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `tweets/${tweetObj.id}`), {
            text: newTweet,
        });
        toggleIsEditing();
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewTweet(value);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your tweet"
                            value={newTweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Tweet" />
                    </form>
                    <button onClick={toggleIsEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Tweet
                            </button>
                            <button onClick={toggleIsEditing}>
                                Edit Tweet
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Tweet;
