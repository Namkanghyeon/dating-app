import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc, addDoc, collection } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const MaleProfile = ({ userObj, profileObj, maleProfileObj, matchMode }) => {
    const [detailMode, setDetailMode] = useState(false);
    const [like, setLike] = useState(false);
    const [ok, setOk] = useState(false);
    const [yourOk, setYourOk] = useState(false);

    useEffect(() => {
        const myPartners = profileObj.matchedPartners;
        myPartners.map((myPartner) => {
            if (myPartner.id === maleProfileObj.id) {
                if (myPartner.ok) {
                    setOk(true);
                }
            }
        });
        const yourPartners = maleProfileObj.matchedPartners;
        yourPartners.map((yourPartner) => {
            if (yourPartner.id === userObj.uid) {
                if (yourPartner.ok) {
                    setYourOk(true);
                }
            }
        });
    }, []);

    const toggleDetailMode = () => {
        setDetailMode((prev) => !prev);
    };

    const checkAlreadyLike = () => {}; //이미 좋아요 눌렀으면 하트 안뜨게

    const onLikeClick = async (event) => {
        event.preventDefault();
        const newLiked = maleProfileObj.liked;
        newLiked.push(userObj.uid);
        await updateDoc(doc(dbService, "profiles", maleProfileObj.id), {
            liked: newLiked,
        });
        const newLiking = profileObj.liking;
        newLiking.push(maleProfileObj.id);
        await updateDoc(doc(dbService, "profiles", userObj.uid), {
            liking: newLiking,
        });
        setLike(true);
    };

    const onOkClick = async () => {
        const newMatchedPartners = profileObj.matchedPartners;
        newMatchedPartners.map((newMatchedPartner) => {
            if (newMatchedPartner.id === maleProfileObj.id) {
                newMatchedPartner.ok = true;
            }
        });
        await updateDoc(doc(dbService, "profiles", userObj.uid), {
            matchedPartners: newMatchedPartners,
        });
        setOk(true);
    };

    return (
        <>
            <h3> Male's Profile </h3>
            <div>
                <h4>
                    {maleProfileObj.name} / {maleProfileObj.age} /{" "}
                    {maleProfileObj.school}
                </h4>

                {detailMode ? (
                    <>
                        <h5>{maleProfileObj.introduce}</h5>
                        {matchMode ? (
                            <>
                                <img
                                    src={maleProfileObj.attachmentUrl}
                                    style={{
                                        maxWidth: "50px",
                                        maxHeight: "50px",
                                    }}
                                    alt=""
                                />
                                {!ok ? (
                                    <span onClick={onOkClick}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </span>
                                ) : (
                                    <>
                                        {yourOk ? (
                                            <>
                                                <h3>
                                                    축하드립니다. 좋은 인연
                                                    되시기 바랍니다.
                                                </h3>
                                                <h4>
                                                    {maleProfileObj.name}님의
                                                    카카오톡 ID:{" "}
                                                    {maleProfileObj.kakaoTalkId}
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
                                {!like ? (
                                    <span onClick={onLikeClick}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </span>
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
                            />
                        </form>
                    </>
                ) : (
                    <form>
                        <input
                            type="submit"
                            value="자세히"
                            onClick={toggleDetailMode}
                        />
                    </form>
                )}
            </div>
        </>
    );
};

export default MaleProfile;
