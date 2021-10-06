import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
    <nav>
        <ul
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
            <li>
                <Link
                    to="/"
                    style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faBell}
                        color={"#000000"}
                        size="2x"
                    />
                    <span style={{ marginTop: 10 }}>Home</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/matched"
                    style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faHeart}
                        color={"#000000"}
                        size="2x"
                    />
                    <span style={{ marginTop: 10 }}>Matched</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/myprofile"
                    style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faUser}
                        color={"#000000"}
                        size="2x"
                    />
                    <span style={{ marginTop: 10 }}>My profile</span>
                </Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;
