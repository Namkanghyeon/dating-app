import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    const [page, setPage] = useState(0);

    return (
        <nav className="container">
            <ul className="navigation-container">
                <li
                    className={page === 1 ? "selected-menu" : "navigation-menu"}
                >
                    <Link
                        to="/"
                        className="navigation-link"
                        onClick={() => setPage(1)}
                    >
                        <FontAwesomeIcon icon={faSeedling} size="3x" />
                        <span style={{ marginTop: 5 }}>Home</span>
                    </Link>
                </li>
                <li
                    className={page === 2 ? "selected-menu" : "navigation-menu"}
                >
                    <Link
                        to="/matched"
                        className="navigation-link"
                        onClick={() => setPage(2)}
                    >
                        <FontAwesomeIcon icon={faHeart} size="3x" />
                        <span style={{ marginTop: 5 }}>Matched</span>
                    </Link>
                </li>
                <li
                    className={page === 3 ? "selected-menu" : "navigation-menu"}
                >
                    <Link
                        to="/myprofile"
                        className="navigation-link"
                        onClick={() => setPage(3)}
                    >
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        <span style={{ marginTop: 5 }}>My profile</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
