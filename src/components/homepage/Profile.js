import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ userObj, myProfileObj, yourProfileObj, matchMode }) => {
    const [detailMode, setDetailMode] = useState(false);
    const [like, setLike] = useState(false);
    const [ok, setOk] = useState(false);
    const [yourOk, setYourOk] = useState(false);

    useEffect(() => {
        if (myProfileObj.liking.includes(yourProfileObj.id)) {
            setLike(true);
        }
        const myPartners = myProfileObj.matchedPartners;
        myPartners.map((myPartner) => {
            if (myPartner.id === yourProfileObj.id) {
                if (myPartner.ok) {
                    setOk(true);
                }
            }
        });
        const yourPartners = yourProfileObj.matchedPartners;
        yourPartners.map((yourPartner) => {
            if (yourPartner.id === userObj.uid) {
                if (yourPartner.ok) {
                    setYourOk(true);
                }
            }
        });
    }, []);

    const onLikeClick = async (event) => {
        event.preventDefault();
        if (yourProfileObj.gender === "Female") {
            const newFemaleMatchedPartners = yourProfileObj.matchedPartners;
            newFemaleMatchedPartners.push({ id: userObj.uid, ok: false });
            await updateDoc(doc(dbService, "profiles", yourProfileObj.id), {
                matchedPartners: newFemaleMatchedPartners,
            });
            const newLiking = myProfileObj.liking;
            newLiking.push(yourProfileObj.id);
            const newMatchedPartners = myProfileObj.matchedPartners;
            newMatchedPartners.push({ id: yourProfileObj.id, ok: false });
            await updateDoc(doc(dbService, "profiles", userObj.uid), {
                liking: newLiking,
                matchedPartners: newMatchedPartners,
            });
        } else {
            const newLiked = yourProfileObj.liked;
            newLiked.push(userObj.uid);
            await updateDoc(doc(dbService, "profiles", yourProfileObj.id), {
                liked: newLiked,
            });
            const newLiking = myProfileObj.liking;
            newLiking.push(yourProfileObj.id);
            await updateDoc(doc(dbService, "profiles", userObj.uid), {
                liking: newLiking,
            });
        }

        setLike(true);
    };

    const onOkClick = async () => {
        const newMatchedPartners = myProfileObj.matchedPartners;
        newMatchedPartners.map((newMatchedPartner) => {
            if (newMatchedPartner.id === yourProfileObj.id) {
                newMatchedPartner.ok = true;
            }
        });
        await updateDoc(doc(dbService, "profiles", userObj.uid), {
            matchedPartners: newMatchedPartners,
        });
        setOk(true);
    };

    const toggleDetailMode = () => {
        setDetailMode((prev) => !prev);
    };

    return (
        <div
            className={`${
                like
                    ? `${ok && yourOk ? "loveBox" : "selectedBox"}`
                    : "messageBox"
            }`}
        >
            <h4>
                {yourProfileObj.name}({yourProfileObj.age}) /{" "}
                {yourProfileObj.school}
            </h4>
            {detailMode ? (
                <>
                    {matchMode ? (
                        <>
                            <img
                                src={yourProfileObj.attachmentUrl}
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "200px",
                                }}
                                alt=""
                                className="profilePicture"
                            />
                            {!ok ? (
                                <button
                                    onClick={onOkClick}
                                    className="likeButton"
                                >
                                    <FontAwesomeIcon icon={faHeart} size="2x" />
                                </button>
                            ) : (
                                <>
                                    {yourOk ? (
                                        <>
                                            <h3>
                                                {yourProfileObj.name}님도{" "}
                                                {myProfileObj.name}님이 마음에
                                                드셨나봐요. 축하드려요!! 좋은
                                                인연 되시길 바랄게요~
                                            </h3>
                                            <h4>
                                                {yourProfileObj.name}님의
                                                카카오톡 ID:{" "}
                                                {yourProfileObj.kakaoTalkId}
                                            </h4>
                                        </>
                                    ) : (
                                        <h5>
                                            상대방도 수락 시 서로의 카카오톡
                                            아이디가 공개됩니다.
                                        </h5>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <h5 className="introduceBox">
                                {yourProfileObj.introduce}
                            </h5>
                            {!like ? (
                                <button
                                    onClick={onLikeClick}
                                    className="likeButton"
                                >
                                    <FontAwesomeIcon icon={faHeart} size="2x" />
                                </button>
                            ) : (
                                <h5>좋아요!</h5>
                            )}
                        </>
                    )}
                    <form>
                        <input
                            type="submit"
                            value="간략히"
                            onClick={toggleDetailMode}
                            className="detailButton"
                        />
                    </form>
                </>
            ) : (
                <form>
                    <input
                        type="submit"
                        value="자세히"
                        onClick={toggleDetailMode}
                        className="detailButton"
                    />
                </form>
            )}
        </div>
    );
};

export default Profile;
