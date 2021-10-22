import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
//import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import profileReducer from "./profileReducer";

const persistConfig = {
    key: "root",
    storage: storageSession,
    whitelist: ["profileReducer"],
};

const rootReducer = combineReducers({
    profileReducer,
});

//export default rootReducer;
export default persistReducer(persistConfig, rootReducer);
