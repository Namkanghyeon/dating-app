import React, { useState, useRef } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import {} from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import {
    ref,
    uploadString,
    getDownloadURL,
    deleteObject,
} from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTimes,
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

const MakeProfile = ({ userCred, refresh }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("20");
    const [height, setHeight] = useState("-150");
    const [school, setSchool] = useState("한양대");
    const [introduce, setIntroduce] = useState("");
    const [kakaoTalkId, setKakaoTalkId] = useState("");
    const [makeProfileComplete, setMakeProfileComplete] = useState(false);
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(
                storageService,
                `${userCred.user.uid}/${uuidv4()}`
            );
            const response = await uploadString(
                attachmentRef,
                attachment /*string*/,
                "data_url"
            );
            attachmentUrl = await getDownloadURL(response.ref);
        }

        const newProfileObj = {
            // 인적사항
            userId: userCred.user.uid,
            name: name,
            gender: gender,
            age: age,
            height: height,
            school: school,
            introduce: introduce,
            kakaoTalkId: kakaoTalkId,
            // 매칭 관련
            liking: [],
            liked: [],
            matchedPartners: [],
            attachmentUrl: attachmentUrl,
        };

        await setDoc(
            doc(dbService, "profiles", userCred.user.uid),
            newProfileObj
        );
        setAttachment("");
        fileInput.current.value = "";
        refresh();
        setMakeProfileComplete(true);
    };

    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const onGenderChange = (event) => {
        setGender(event.target.value);
    };
    const onAgeChange = (event) => {
        setAge(event.target.value);
    };
    const onHeightChange = (event) => {
        setHeight(event.target.value);
    };
    const onSchoolChange = (event) => {
        setSchool(event.target.value);
    };
    const onIntroduceChange = (event) => {
        setIntroduce(event.target.value);
    };
    const onKakaoTaleIdChange = (event) => {
        setKakaoTalkId(event.target.value);
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

    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = "";
    };

    return (
        <div>
            <h2>프로필 생성</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h3>이름</h3>
                    <input type="text" onChange={onNameChange} />
                </div>
                <div>
                    <h3>성별</h3>
                    <input
                        type="radio"
                        value="Male"
                        name="gender"
                        onChange={onGenderChange}
                    />{" "}
                    남자
                    <input
                        type="radio"
                        value="Female"
                        name="gender"
                        onChange={onGenderChange}
                    />{" "}
                    여자
                </div>
                <div>
                    <h3>나이</h3>
                    <select onChange={onAgeChange}>
                        <option value="20"> 20 </option>
                        <option value="21"> 21 </option>
                        <option value="22"> 22 </option>
                        <option value="23"> 23 </option>
                        <option value="24"> 24 </option>
                        <option value="25"> 25 </option>
                        <option value="26"> 26 </option>
                        <option value="27"> 27 </option>
                        <option value="28"> 28 </option>
                        <option value="29"> 29</option>
                    </select>
                </div>
                <div>
                    <h3>키</h3>
                    <select onChange={onHeightChange}>
                        <option value="-150"> 150 미만 </option>
                        <option value="150-155"> 150 이상 155 미만 </option>
                        <option value="155-160"> 155 이상 160 미만 </option>
                        <option value="160-165"> 160 이상 165 미만 </option>
                        <option value="165-170"> 165 이상 170 미만 </option>
                        <option value="170-175"> 170 이상 175 미만 </option>
                        <option value="175-180"> 175 이상 180 미만 </option>
                        <option value="180-185"> 180 이상 185 미만 </option>
                        <option value="185-190"> 185 이상 190 미만 </option>
                        <option value="190-"> 190 이상</option>
                    </select>
                </div>
                <div>
                    <h3>학교</h3>
                    <select onChange={onSchoolChange}>
                        <option value="한양대"> 한양대 </option>
                        <option value="한양여대"> 한양여대 </option>
                    </select>
                </div>
                <div>
                    <h3>자기소개</h3>
                    <input
                        type="text"
                        placeholder="관심사, 취미, 좋아하는 것, 연애 가치관 등을 적어주세요. 성의있게 작성할 수록 매칭 확률도 높아집니다."
                        onChange={onIntroduceChange}
                    />
                </div>
                <div>
                    <h3>카카오톡 아이디</h3>
                    <input
                        type="text"
                        placeholder="정확하게 입력하였는지 다시 한 번 확인해주세요"
                        onChange={onKakaoTaleIdChange}
                    />
                </div>
                <div>
                    <h3>사진</h3>
                </div>
                <label htmlFor="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
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
                {attachment && (
                    <div className="factoryForm__attachment">
                        <img
                            src={attachment}
                            style={{
                                backgroundImage: attachment,
                                maxWidth: "50px",
                                maxHeight: "50px",
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
                <input type="submit" value="생성" />
            </form>
            {makeProfileComplete && <Redirect to="/" />}
        </div>
    );
};

export default MakeProfile;
