# [데이팅 앱](https://namkanghyeon.github.io/)
URL: https://namkanghyeon.github.io/

## 개요

- 창업 동아리에서 제작한 교내 데이팅 서비스입니다.
- 두 단계를 거쳐 매칭이 진행됩니다.
    - 1단계 매칭
    	상대방의 프로필(나이, 학교, 자기소개)을 읽고 마음에 드는 프로필에 호감 표시를 합니다. (여성 유저가 먼저 남성 유저에게 표시를 합니다.) 양쪽이 서로에게 호감 표시를 한 경우 1차 매칭이 되고 Matched 화면에서 서로의 사진을 볼 수 있습니다.
    - 2단계 매칭
    사진 확인 후 마음에 들면 2차 호감 표시를 할 수 있으며 양쪽 모두 호감 표현시 카카오톡 아이디가 공개되어 대화를 시작할 수 있습니다.

## 기능

#### 1. 로그인, 로그아웃
<img height="240" alt="login" src="https://user-images.githubusercontent.com/26588976/176120146-c71293f6-8d43-4e3d-a351-761471c92ed1.PNG">

- 아이디는 이메일 형식입니다.
- 로그인 시 아이디가 존재하지 않거나 비밀번호가 틀린 경우 메시지를 띄워줍니다.
- 로그인 완료 시 홈 화면을 보여줍니다.
#### 2. 회원가입, 회원탈퇴
<img height="240" alt="signup" src="https://user-images.githubusercontent.com/26588976/176120188-46662ba5-63c4-4f24-90be-754af3baaf3d.PNG">

- 이메일 주소와 비밀번호를 입력받습니다.
- 두 비밀번호가 다르거나, 이미 사용 중인 이메일 주소이거나, 비밀번호 형식이 잘못된 경우 메시지를 띄워줍니다.
- 이메일 주소와 비밀번호가 확인된 이후에는 프로필을 생성합니다.
<img height="720" alt="create_profile" src="https://user-images.githubusercontent.com/26588976/176120330-daa88079-4008-43db-824c-ffe32cd21607.PNG">

    - 이름, 나이, 학교, 자기소개, 사진, 카카오톡 아이디 등의 정보를 입력합니다.
- 회원 탈퇴 시에는 이메일과 비밀번호를 한 번 더 확인한 후 회원정보를 데이터베이스와 스토리지에서 모두 삭제합니다.
<img height="240" alt="delete_account" src="https://user-images.githubusercontent.com/26588976/176120464-305f38a5-f809-4f5f-9aa1-ea4a2d9d0312.PNG">

#### 3. 프로필 조회 / 수정
<img height="720" alt="edit_profile" src="https://user-images.githubusercontent.com/26588976/176120553-e41a6b6f-41fe-4d89-84bf-fbdf0d37f30d.PNG">

- 프로필 생성 시 입력했던 정보들을 조회하고 수정할 수 있습니다.
#### 4. 다른 유저 프로필 조회, 호감 표시
- Home 화면과 Matched 화면에서는 각각 매칭되지 않은 유저들과 매칭된 유저들의 프로필 정보를 카드 형식으로 조회할 수 있습니다.

## 화면

#### 1. Home
다른 유저들의 프로필들을 조회할 수 있습니다.

<img height="720" alt="man_home" src="https://user-images.githubusercontent.com/26588976/176120632-4de0cd53-fbb9-4992-9d03-093a016a36d6.PNG">
<img height="720" alt="woman_home" src="https://user-images.githubusercontent.com/26588976/176120638-da3e109d-df51-45f9-a876-ec7604d207f2.PNG">

#### 2. Matched
1단계 또는 2단계 매칭이 된 유저들의 프로필을 조회할 수 있습니다.

<img height="240" alt="no_matched" src="https://user-images.githubusercontent.com/26588976/176120771-252db915-1634-4ea2-af38-6f18d7ee36f5.PNG">
- 매칭 상대가 없을 때

<img height="720" alt="matched" src="https://user-images.githubusercontent.com/26588976/176120776-218d1174-f753-4408-b06f-38950dcd76a4.PNG">

#### 3. My Page
<img height="240" alt="mypage" src="https://user-images.githubusercontent.com/26588976/176120794-6f30e051-66ae-416d-92e0-b242ef1607fd.PNG">

- 프로필 조회 / 수정
- 로그아웃
- 회원 탈퇴

## 실행

1. node_modules를 설치해 줍니다.
```console
npm i
```
2. firebase를 사용하기 때문에 firebase API key가 필요합니다.
    - `.env` 파일을 생성하고 firebase에서 발급받은 정보를 넣어줍니다.
```
REACT_APP_API_KEY=...
REACT_APP_AUTH_DOMAIN=...
REACT_APP_PROJECT_ID=...
REACT_APP_STORAGE_BUCKET=...
REACT_APP_MESSAGIN_ID=...
REACT_APP_APP_ID=...
```
3. 로컬 서버를 켜줍니다.
```console
npm start
```
