import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc } from "@firebase/firestore";

const ProfileForm = ({ userObj, profileObj }) => {
    const [name, setName] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [kakaoTalkId, setKakaoTalkId] = useState("");

    useEffect(() => {
        setName(profileObj.name);
        setIntroduce(profileObj.introduce);
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const newProfileObj = {
            name: name,
            introduce: introduce,
            kakaoTalkId: kakaoTalkId,
        };
        const targetDoc = doc(dbService, "profiles", userObj.uid);
        await updateDoc(targetDoc, newProfileObj);
    };

    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const onIntroduceChange = (event) => {
        setIntroduce(event.target.value);
    };
    const onKakaoTaleIdChange = (event) => {
        setKakaoTalkId(event.target.value);
    };

    return (
        <div>
            <h2>프로필 수정</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h3>이름</h3>
                    <input
                        type="text"
                        value={profileObj.name}
                        onChange={onNameChange}
                    />
                </div>
                <div>
                    <h3>자기소개</h3>
                    <input
                        type="text"
                        value={profileObj.introduce}
                        onChange={onIntroduceChange}
                    />
                </div>
                <div>
                    <h3>카카오톡 아이디</h3>
                    <input
                        type="text"
                        value={profileObj.kakaoTalkId}
                        onChange={onKakaoTaleIdChange}
                    />
                </div>
                <input type="submit" value="수정" />
            </form>
        </div>
    );
};

export default ProfileForm;
