import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc, addDoc, collection } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Congratulation from "components/Congratulation";

const MaleProfile = ({ userObj, profileObj, maleProfileObj, matchMode }) => {
    const [detailMode, setDetailMode] = useState(false);
    const [like, setLike] = useState(false);
    const [ok, setOk] = useState(false);
    const [yourOk, setYourOk] = useState(false);

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
        const yourPartners = maleProfileObj.matchedPartners;
        yourPartners.map((yourPartner) => {
            if (yourPartner.id === userObj.uid) {
                if (yourPartner.ok) {
                    setYourOk(true);
                }
            }
        });
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
                                            <Congratulation
                                                name={maleProfileObj.name}
                                                kakaoTalkId={
                                                    maleProfileObj.kakaoTalkId
                                                }
                                            />
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
