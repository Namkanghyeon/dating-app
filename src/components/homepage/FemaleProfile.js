import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const FemaleProfile = ({
    userObj,
    profileObj,
    femaleProfileObj,
    matchMode,
}) => {
    const [detailMode, setDetailMode] = useState(false);
    const [like, setLike] = useState(false);
    const [ok, setOk] = useState(false);
    const [yourOk, setYourOk] = useState(false);

    useEffect(() => {
        if (profileObj.liking.includes(femaleProfileObj.id)) {
            setLike(true);
        }
        const myPartners = profileObj.matchedPartners;
        myPartners.map((myPartner) => {
            if (myPartner.id === femaleProfileObj.id) {
                if (myPartner.ok) {
                    setOk(true);
                }
            }
        });
        const yourPartners = femaleProfileObj.matchedPartners;
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
        const newFemaleMatchedPartners = femaleProfileObj.matchedPartners;
        newFemaleMatchedPartners.push({ id: userObj.uid, ok: false });
        await updateDoc(doc(dbService, "profiles", femaleProfileObj.id), {
            matchedPartners: newFemaleMatchedPartners,
        });
        const newLiking = profileObj.liking;
        newLiking.push(femaleProfileObj.id);
        const newMatchedPartners = profileObj.matchedPartners;
        newMatchedPartners.push({ id: femaleProfileObj.id, ok: false });
        await updateDoc(doc(dbService, "profiles", userObj.uid), {
            liking: newLiking,
            matchedPartners: newMatchedPartners,
        });
        setLike(true);
    };

    const onOkClick = async () => {
        const newMatchedPartners = profileObj.matchedPartners;
        newMatchedPartners.map((newMatchedPartner) => {
            if (newMatchedPartner.id === femaleProfileObj.id) {
                newMatchedPartner.ok = true;
            }
        });
        await updateDoc(doc(dbService, "profiles", userObj.uid), {
            matchedPartners: newMatchedPartners,
        });
        setOk(true);
    };

    return (
        <div className="messageBox">
            <h4>
                {femaleProfileObj.name} ({femaleProfileObj.age}) /{" "}
                {femaleProfileObj.school}
            </h4>

            {detailMode ? (
                <>
                    {matchMode ? (
                        <>
                            <img
                                src={femaleProfileObj.attachmentUrl}
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
                                                축하드려요!!. 좋은 인연 되시기
                                                바랄게요~
                                            </h3>
                                            <h4>
                                                {femaleProfileObj.name}님의
                                                카카오톡 ID:{" "}
                                                {femaleProfileObj.kakaoTalkId}
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
                            <h5>{femaleProfileObj.introduce}</h5>
                            {!like ? (
                                <span onClick={onLikeClick}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                            ) : (
                                <h5>좋아요!</h5>
                            )}
                        </>
                    )}
                    <form className="detailButton">
                        <input
                            type="submit"
                            value="간략히"
                            onClick={toggleDetailMode}
                        />
                    </form>
                </>
            ) : (
                <form className="detailButton">
                    <input
                        type="submit"
                        value="자세히"
                        onClick={toggleDetailMode}
                    />
                </form>
            )}
        </div>
    );
};

export default FemaleProfile;
