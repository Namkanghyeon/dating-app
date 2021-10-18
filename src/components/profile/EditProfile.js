import React, { useEffect, useState, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 } from "uuid";
import { doc, updateDoc } from "@firebase/firestore";
import {
    ref,
    uploadString,
    getDownloadURL,
    deleteObject,
} from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

const EditProfile = ({ userObj, profileObj, reload }) => {
    const [name, setName] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [kakaoTalkId, setKakaoTalkId] = useState("");
    const [done, setDone] = useState(false);
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();

    useEffect(() => {
        if (profileObj) {
            setName(profileObj.name);
            setIntroduce(profileObj.introduce);
            setKakaoTalkId(profileObj.kakaoTalkId);
            setAttachment(profileObj.attachmentUrl);
        }
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        if (name === "") {
            alert("이름을 입력해주세요");
        } else if (introduce === "") {
            alert("자기소개를 입력해주세요");
        } else if (kakaoTalkId === "") {
            alert("카카오톡 아이디를 입력해주세요");
        } else {
            let attachmentUrl = profileObj.attachmentUrl;

            if (attachment !== attachmentUrl) {
                const oldAttachmentRef = ref(
                    storageService,
                    profileObj.attachmentUrl
                );
                await deleteObject(oldAttachmentRef);
                const newAttachmentRef = ref(
                    storageService,
                    `${userObj.uid}/${v4()}`
                );
                const response = await uploadString(
                    newAttachmentRef,
                    attachment,
                    "data_url"
                );
                attachmentUrl = await getDownloadURL(response.ref);
            }

            const newProfileObj = {
                name: name,
                introduce: introduce,
                kakaoTalkId: kakaoTalkId,
                attachmentUrl: attachmentUrl,
            };
            await updateDoc(
                doc(dbService, "profiles", userObj.uid),
                newProfileObj
            );
            setAttachment("");
            fileInput.current.value = "";
            reload();
            setDone(true);
        }
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

    const onPhotoChange = (event) => {
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

    return (
        <div>
            <h2 className="title">프로필 수정</h2>
            <form onSubmit={onSubmit} className="profileComponents">
                <div>
                    <h3 className="profileSubtitle">이름</h3>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="profileInput"
                    />
                </div>
                <div>
                    <h3 className="profileSubtitle">자기소개</h3>
                    <textarea
                        type="text"
                        name="introduce"
                        value={introduce}
                        onChange={onChange}
                        className="profileIntroduce profileInput"
                    />
                </div>
                <div>
                    <h3 className="profileSubtitle">카카오톡 아이디</h3>
                    <input
                        type="text"
                        name="kakaoTalkId"
                        value={kakaoTalkId}
                        onChange={onChange}
                        className="profileInput"
                    />
                </div>
                <div>
                    <h3 className="profileSubtitle">사진</h3>
                </div>
                <label htmlFor="attach-file" className="profileLabel">
                    <span>사진 변경</span>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </label>
                <input
                    accept="image/*"
                    onChange={onPhotoChange}
                    ref={fileInput}
                    id="attach-file"
                    type="file"
                    style={{
                        opacity: 0,
                    }}
                />
                {/* {attachment ? ( */}
                <div className="profileAttachment">
                    <img src={attachment} alt="" />
                </div>
                {/* // ) : (
                //     <div className="profileAttachment">
                //         <img src={profileObj.attachmentUrl} alt="" />
                //     </div>
                // )} */}
                <input type="submit" value="수정" className="profileButton" />
            </form>
            {done && <Redirect to="/" />}
        </div>
    );
};

export default EditProfile;
