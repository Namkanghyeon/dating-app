import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc } from "@firebase/firestore";
import { Redirect } from "react-router";

const EditProfile = ({ userObj, profileObj, reload }) => {
    const [name, setName] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [kakaoTalkId, setKakaoTalkId] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        setName(profileObj.name);
        setIntroduce(profileObj.introduce);
        setKakaoTalkId(profileObj.kakaoTalkId);
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
        reload();
        setDone(true);
    };

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "name") {
            setName(value);
        } else if (name === "introduce") {
            setIntroduce(value);
        } else {
            setKakaoTalkId(value);
        }
    };

    return (
        <div>
            <h2>프로필 수정</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h3>이름</h3>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <h3>자기소개</h3>
                    <input
                        type="text"
                        name="introduce"
                        value={introduce}
                        onChange={onChange}
                        //style={{ height: "300px" }}
                    />
                </div>
                <div>
                    <h3>카카오톡 아이디</h3>
                    <input
                        type="text"
                        name="kakaoTalkId"
                        value={kakaoTalkId}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" value="수정" />
            </form>
            {done && <Redirect to="/" />}
        </div>
    );
};

export default EditProfile;
