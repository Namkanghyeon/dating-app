import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "@firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();

    const onSubmit = async (event) => {
        if (tweet === "") {
            return;
        }
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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={tweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input
                    type="submit"
                    value="&rarr;"
                    className="factoryInput__arrow"
                />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                accept="image/*"
                onChange={onFileChange}
                ref={fileInput}
                id="attach-file"
                type="file"
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                        alt=""
                    />
                    <div
                        className="factoryForm__clear"
                        onClick={onClearAttachment}
                    >
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
};

export default TweetFactory;
