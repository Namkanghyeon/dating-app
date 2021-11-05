// 액션 타입
const SET_PROFILE = "profileReducer/SET_PROFILE";
const CLEAR_PROFILE = "profileReducer/CLEAR_PROFILE";

// 액션 생성함수
export const redux_setProfile = (profileObj) => {
    return {
        type: SET_PROFILE,
        profileObj: profileObj,
    };
};

export const redux_clearProfile = () => {
    return {
        type: CLEAR_PROFILE,
    };
};

// 초기 상태
const initialState = {
    profileObj: {},
};

// 리듀서
export default function profileReducer(state = initialState, action) {
    console.log("State: ", state, " Action: ", action);
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profileObj: action.profileObj,
            };
        case CLEAR_PROFILE:
            return initialState;
        default:
            return state;
    }
}
