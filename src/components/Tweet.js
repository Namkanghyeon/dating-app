import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { ref, deleteObject } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Tweet = ({ tweetObj, isOwner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm(
            "Are you sure you want to delete this tweet?"
        );
        if (ok) {
            await deleteDoc(doc(dbService, `tweets/${tweetObj.id}`));
            await deleteObject(ref(storageService, tweetObj.attachmentUrl));
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
        <div className="tweet">
            {isEditing ? (
                <>
                    <form onSubmit={onSubmit} className="container tweetEdit">
                        <input
                            type="text"
                            placeholder="Edit your tweet"
                            value={newTweet}
                            required
                            onChange={onChange}
                            autoFocus
                            className="formInput"
                        />
                        <input
                            type="submit"
                            value="Update Tweet"
                            className="formBtn"
                        />
                    </form>
                    <span
                        onClick={toggleIsEditing}
                        className="formBtn cancelBtn"
                    >
                        Cancel
                    </span>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img src={tweetObj.attachmentUrl} alt="" />
                    )}
                    {isOwner && (
                        <div className="tweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleIsEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Tweet;
