import React, { useState, useRef, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import { doc, setDoc } from '@firebase/firestore';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { redux_setProfile } from 'store/profileReducer';
import { nanoid } from 'nanoid';
import AuthTest from 'utils/authTest';

export default function CreateProfile({ userObj }) {
  AuthTest();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('20');
  const [school, setSchool] = useState('한양대');
  const [introduce, setIntroduce] = useState('');
  const [kakaoTalkId, setKakaoTalkId] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInput = useRef();

  const dispatch = useDispatch();
  const redux_setProfileObj = (profileObj) =>
    dispatch(redux_setProfile(profileObj));

  const onSubmit = async (event) => {
    event.preventDefault();

    if (name === '') {
      alert('이름을 입력해주세요.');
    } else if (name.length < 2) {
      alert('2자 이상의 이름을 입력해주세요.');
    } else if (gender === '') {
      alert('성별을 선택해주세요.');
    } else if (introduce === '') {
      alert('자기소개를 입력해주세요.');
    } else if (kakaoTalkId === '') {
      alert('카카오톡 아이디를 입력해주세요.');
    } else if (kakaoTalkId.length < 4) {
      alert('정확한 카카오톡 아이디를 입력해주세요.');
    } else if (attachment === '') {
      alert('사진을 등록해주세요.');
    } else {
      let attachmentUrl = '';
      if (attachment !== '') {
        const attachmentRef = ref(storageService, `${userObj.uid}/${nanoid()}`);
        const response = await uploadString(
          attachmentRef,
          attachment,
          'data_url'
        );
        attachmentUrl = await getDownloadURL(response.ref);
      }

      const newProfileObj = {
        name: name,
        gender: gender,
        age: age,
        school: school,
        introduce: introduce,
        kakaoTalkId: kakaoTalkId,
        attachmentUrl: attachmentUrl,
        // 매칭 관련
        liking: [], // 여성 유저용
        liked: [], // 남성 유저용
        matchedPartners: [],
      };
      redux_setProfileObj(newProfileObj);
      await setDoc(doc(dbService, 'profiles', userObj.uid), newProfileObj);
      setAttachment('');
      navigate('/home');
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'school':
        setSchool(value);
        break;
      case 'introduce':
        setIntroduce(value);
        break;
      case 'kakaoTalkId':
        setKakaoTalkId(value);
        break;
      default:
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

  const onClearAttachment = () => {
    setAttachment('');
    fileInput.current.value = '';
  };

  return (
    <div className="container create-profile">
      <h2 className="profileTitle">프로필 생성</h2>
      <form onSubmit={onSubmit} className="profileComponents">
        <div>
          <h3 className="profileSubtitle">이름</h3>
          <input
            type="text"
            maxLength="20"
            name="name"
            onChange={onChange}
            className="profileInput"
          />
        </div>
        <div>
          <h3 className="profileSubtitle">성별</h3>
          <div className="profileGender">
            <input
              type="radio"
              value="Male"
              name="gender"
              onChange={onChange}
            />{' '}
            <span style={{ marginRight: '10px' }}>남자</span>
            <input
              type="radio"
              value="Female"
              name="gender"
              onChange={onChange}
            />{' '}
            <span>여자</span>
          </div>
        </div>
        <div>
          <h3 className="profileSubtitle">나이</h3>
          <select name="age" onChange={onChange} className="profileInput">
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
          <h3 className="profileSubtitle">학교</h3>
          <select name="school" onChange={onChange} className="profileInput">
            <option value="한양대"> 한양대 </option>
            <option value="한양여대"> 한양여대 </option>
          </select>
        </div>
        <div>
          <h3 className="profileSubtitle">자기소개</h3>
          <div className="profileInputWithoutIndent">
            <textarea
              type="text"
              maxLength="400"
              name="introduce"
              placeholder="관심사, 취미, 좋아하는 것, 연애 가치관 등을 적어주세요! (최대 400자)&#13;&#10;성의있게 작성할 수록 매칭 확률도 높아지겠죠?"
              onChange={onChange}
              className="profileIntroduce"
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
            maxLength="20"
            name="kakaoTalkId"
            onChange={onChange}
            className="profileInput"
          />
        </div>
        <div>
          <h3 className="profileSubtitle">사진</h3>
        </div>
        <label htmlFor="attach-file" className="profileLabel">
          {!attachment ? (
            <div>
              <span>사진 추가</span>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          ) : (
            <div>
              <span>사진 변경</span>
              <FontAwesomeIcon icon={faSyncAlt} />
            </div>
          )}
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
          <div className="profileAttachment">
            <img src={attachment} alt="" />
            <div className="profileLabel" onClick={onClearAttachment}>
              <span style={{ marginTop: 5 }}>사진 제거</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
        <input type="submit" value="생성" className="profileButton" />
      </form>
    </div>
  );
}
