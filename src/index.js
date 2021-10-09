import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "css/style.css";
import "css/navigation.css";
import "css/profile.css";
import "css/login.css";
import "css/home.css";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
