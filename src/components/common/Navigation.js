import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSeedling, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    return (
        <nav className="container">
            <ul className="navigation-container">
                <li className="navigation-menu">
                    <Link to="/" className="navigation-link">
                        <FontAwesomeIcon icon={faSeedling} size="3x" />
                        <span style={{ marginTop: 5 }}>Home</span>
                    </Link>
                </li>
                <li className="navigation-menu">
                    <Link to="/matched" className="navigation-link">
                        <FontAwesomeIcon icon={faHeart} size="3x" />
                        <span style={{ marginTop: 5 }}>Matched</span>
                    </Link>
                </li>
                <li className="navigation-menu">
                    <Link to="/myprofile" className="navigation-link">
                        <FontAwesomeIcon icon={faUser} size="3x" />
                        <span style={{ marginTop: 5 }}>My profile</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
