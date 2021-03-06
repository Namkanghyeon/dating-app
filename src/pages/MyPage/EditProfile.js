import React, { useEffect, useState, useRef } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, updateDoc } from '@firebase/firestore';
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { redux_setProfile } from 'store/profileReducer';
import { nanoid } from 'nanoid';
import AuthTest from 'utils/authTest';

export default function EditProfile({ userObj, profileObj }) {
  AuthTest();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [kakaoTalkId, setKakaoTalkId] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef();

  useEffect(() => {
    if (profileObj) {
      setName(profileObj.name);
      setIntroduce(profileObj.introduce);
      setKakaoTalkId(profileObj.kakaoTalkId);
      setAttachment(profileObj.attachmentUrl);
    }
  }, [profileObj]);

  const dispatch = useDispatch();
  const redux_setProfileObj = (_profileObj) =>
    dispatch(redux_setProfile(_profileObj));

  const onSubmit = async (event) => {
    event.preventDefault();

    if (name === '') {
      alert('이름을 입력해주세요.');
    } else if (name.length < 2) {
      alert('2자 이상의 이름을 입력해주세요.');
    } else if (introduce === '') {
      alert('자기소개를 입력해주세요.');
    } else if (kakaoTalkId === '') {
      alert('카카오톡 아이디를 입력해주세요.');
    } else if (kakaoTalkId.length < 4) {
      alert('정확한 카카오톡 아이디를 입력해주세요.');
    } else if (window.confirm('프로필을 수정하시겠습니까?')) {
      let attachmentUrl = profileObj.attachmentUrl;

      if (attachment !== attachmentUrl) {
        const oldAttachmentRef = ref(storageService, profileObj.attachmentUrl);
        await deleteObject(oldAttachmentRef);
        const newAttachmentRef = ref(
          storageService,
          `${userObj.uid}/${nanoid()}`
        );
        const response = await uploadString(
          newAttachmentRef,
          attachment,
          'data_url'
        );
        attachmentUrl = await getDownloadURL(response.ref);
      }

      const newProfileObj = {
        name: name,
        introduce: introduce,
        kakaoTalkId: kakaoTalkId,
        attachmentUrl: attachmentUrl,
      };

      const newProfileObjForRedux = {
        ...profileObj,
        name: name,
        introduce: introduce,
        kakaoTalkId: kakaoTalkId,
        attachmentUrl: attachmentUrl,
      };

      redux_setProfileObj(newProfileObjForRedux);

      await updateDoc(doc(dbService, 'profiles', userObj.uid), newProfileObj);
      setAttachment('');
      fileInput.current.value = '';
      navigate('/home');
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'name') {
      setName(value);
    } else if (name === 'introduce') {
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
      <form onSubmit={onSubmit} className="profileComponents">
        <div>
          <h3 className="profileSubtitle">이름</h3>
          <input
            type="text"
            maxLength="20"
            name="name"
            //value={name}
            defaultValue={name}
            onChange={onChange}
            className="profileInput"
          />
        </div>
        <div>
          <h3 className="profileSubtitle">자기소개</h3>
          <div className="profileInputWithoutIndent">
            <textarea
              type="text"
              maxLength="400"
              name="introduce"
              //value={introduce}
              defaultValue={introduce}
              onChange={onChange}
              className="profileIntroduce "
            />
            <span className="profileIntroduceCount">
              {introduce.length}/400
            </span>
          </div>
        </div>
        <div>
          <h3 className="profileSubtitle">카카오톡 아이디</h3>
          <input
            type="text"
            minLength="4"
            maxLength="20"
            name="kakaoTalkId"
            //value={kakaoTalkId}
            defaultValue={kakaoTalkId}
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
        <div className="profileAttachment">
          <img src={attachment} alt="" />
        </div>
        <input type="submit" value="수정" className="profileButton" />
      </form>
    </div>
  );
}
