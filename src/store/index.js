import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
// 내 reducer들
import profileReducer from "./profileReducer";
import currentPageReducer from "./currentPageReducer";

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["profileReducer", "currentPageReducer"],
};

const rootReducer = combineReducers({
    profileReducer,
    currentPageReducer,
});

// persist 사용하려면 export default rootReducer; 대신 persistReducer에 config 같이 넣어서 사용
export default persistReducer(persistConfig, rootReducer);
