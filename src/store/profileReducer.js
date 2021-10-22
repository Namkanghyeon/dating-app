// 액션 타입
const SET_PROFILE = "myProfile/SET_PROFILE";

// 액션 생성함수
export const redux_setProfile = (profileObj) => {
    return {
        type: SET_PROFILE,
        profileObj: profileObj,
    };
};

// 초기 상태
const initialState = {
    profileObj: {},
};

// 리듀서
export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profileObj: action.profileObj,
            };
        default:
            return state;
    }
}
