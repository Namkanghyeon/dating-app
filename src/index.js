import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import rootReducer from "store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "App";
import "styles/public.css";
import "styles/style.css";
import "styles/navigation.css";
import "styles/profile.css";
import "styles/login.css";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // redux dev tool용
);

const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
