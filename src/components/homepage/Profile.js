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
        if (myProfileObj.gender === "Male") {
            if (
                window.confirm(
                    "좋아요를 누르시겠어요? 서로의 사진이 공개되며, 되돌리기는 불가능합니다."
                )
            ) {
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
                setLike(true);
            }
        } else {
            if (
                window.confirm(
                    "좋아요를 누르시겠어요? 상대방도 수락 시 서로의 사진이 공개되며, 되돌리기는 불가능합니다."
                )
            ) {
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
                setLike(true);
            }
        }
    };

    const onOkClick = async () => {
        if (
            window.confirm(
                "좋아요를 누르시겠어요? 상대방도 수락 시 서로의 카카오톡 아이디가 공개되며, 되돌리기는 불가능합니다."
            )
        ) {
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
        }
    };

    const toggleDetailMode = () => {
        setDetailMode((prev) => !prev);
    };

    return (
        <div
            className={`${
                like ? `${ok && yourOk ? "loveBox" : "selectedBox"}` : "box"
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
                                    className="loveButton"
                                >
                                    <FontAwesomeIcon icon={faHeart} size="2x" />
                                </button>
                            ) : (
                                <>
                                    {yourOk ? (
                                        <>
                                            <h4>매칭 완료</h4>
                                            <h4 className="kakaoIdBox">
                                                <span
                                                    style={{ fontWeight: 800 }}
                                                >
                                                    {yourProfileObj.name}님의
                                                    카카오톡 ID
                                                </span>
                                                <br />
                                                {yourProfileObj.kakaoTalkId}
                                            </h4>
                                        </>
                                    ) : (
                                        <div>
                                            {yourProfileObj.name}님의 응답을
                                            <br />
                                            기다리는 중입니다.
                                        </div>
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
