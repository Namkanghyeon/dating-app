// 액션 타입들
const SET_PAGE = "currentPageReducer/SET_PAGE";

// 액션 생성함수들
export const redux_setCurrentPage = (currentPage) => {
    return {
        type: SET_PAGE,
        currentPage: currentPage,
    };
};

// 초기 상태
const initialState = {
    currentPage: 1,
};

// 리듀서
export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            };
        default:
            return state;
    }
}
