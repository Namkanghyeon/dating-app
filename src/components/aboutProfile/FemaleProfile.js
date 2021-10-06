import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc, collection, addDoc } from "@firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Congratulation from "components/Congratulation";

const FemaleProfile = ({
    userObj,
    profileObj,
    femaleProfileObj,
    matchMode,
}) => {
    console.log("at femaleProfile: ", profileObj.attachmentUrl);
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
        const newFemaleMatchedPartners = femaleProfileObj.matchedPartners;
        newFemaleMatchedPartners.push({ id: userObj.uid, ok: false });
        await updateDoc(doc(dbService, "profiles", femaleProfileObj.id), {
            matchedPartners: newFemaleMatchedPartners,
        });
        const newMaleMatchedPartners = profileObj.matchedPartners;
        newMaleMatchedPartners.push({ id: femaleProfileObj.id, ok: false });
        await updateDoc(doc(dbService, "profiles", userObj.uid), {
            matchedPartners: newMaleMatchedPartners,
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
        const yourPartners = femaleProfileObj.matchedPartners;
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
            <h3> Female's Profile </h3>
            <div>
                <h4>
                    {femaleProfileObj.name} / {femaleProfileObj.age} /{" "}
                    {femaleProfileObj.school}
                </h4>

                {detailMode ? (
                    <>
                        <h5>{femaleProfileObj.introduce}</h5>
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
                                            <Congratulation
                                                name={femaleProfileObj.name}
                                                kakaoTalkId={
                                                    femaleProfileObj.kakaoTalkId
                                                }
                                            />
                                        ) : (
                                            <h5>좋아요!</h5>
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

export default FemaleProfile;
