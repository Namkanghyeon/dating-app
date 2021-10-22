/* 액션 타입 */
// Ducks 패턴: 액션의 이름에 접두사를 넣기 => 다른 모듈과 액션 이름 중복 방지
const SET_PROFILE = "myProfile/SET_PROFILE";

/* 액션 생성함수 */
// 액션 생성함수를 만들고 export
export const redux_setProfile = (profileObj) => {
    return {
        type: SET_PROFILE,
        profileObj: profileObj,
    };
};

/* 초기 상태 */
const initialState = {
    profileObj: {},
};

/* 리듀서 */
// 리듀서는 export default
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
