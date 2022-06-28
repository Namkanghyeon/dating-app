import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
// 내 리듀서들
import profileReducer from './profileReducer';

// Redux-persist: 리덕스에서 웹 스토리지에 접근할 수 있도록 해주는 라이브러리
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['profileReducer'], // 다른 리듀서 추가 시 whilelist에 추가
};

const rootReducer = combineReducers({
  profileReducer,
  // 다른 리듀서들 여기에 등록
});

// export default rootReducer;
// persist 사용하려면 대신 persistReducer에 config 같이 넣어서 사용
export default persistReducer(persistConfig, rootReducer);
