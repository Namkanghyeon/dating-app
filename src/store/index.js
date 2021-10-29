import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
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

//export default rootReducer;
export default persistReducer(persistConfig, rootReducer);
