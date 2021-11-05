import { PURGE } from "redux-persist";
// 액션 타입
const SET_PROFILE = "profileReducer/SET_PROFILE";

// 액션 생성함수
export const redux_setProfile = (profileObj) => {
    return {
        type: SET_PROFILE,
        profileObj: profileObj,
    };
};

export const redux_purgeProfile = () => {
    return {
        type: PURGE,
        profileObj: {},
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
        case PURGE:
            return { profileObj: {} };
        default:
            return state;
    }
}
