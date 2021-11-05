import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { redux_setCurrentPage } from "store/currentPageReducer";

const Navigation = () => {
    const dispatch = useDispatch();
    const setCurrentPageStore = (currentPage) =>
        dispatch(redux_setCurrentPage(currentPage));

    const currentPage = useSelector(
        (state) => state.currentPageReducer.currentPage
    );

    return (
        <nav className="container">
            <ul className="navigation-container">
                <li
                    className={
                        currentPage === 1 ? "selected-menu" : "navigation-menu"
                    }
                >
                    <Link
                        to="/"
                        className="navigation-link"
                        onClick={() => setCurrentPageStore(1)}
                    >
                        <FontAwesomeIcon icon={faSeedling} size="3x" />
                        <span style={{ marginTop: 5 }}>Home</span>
                    </Link>
                </li>
                <li
                    className={
                        currentPage === 2 ? "selected-menu" : "navigation-menu"
                    }
                >
                    <Link
                        to="/matched"
                        className="navigation-link"
                        onClick={() => setCurrentPageStore(2)}
                    >
                        <FontAwesomeIcon icon={faHeart} size="3x" />
                        <span style={{ marginTop: 5 }}>Matched</span>
                    </Link>
                </li>
                <li
                    className={
                        currentPage === 3 ? "selected-menu" : "navigation-menu"
                    }
                >
                    <Link
                        to="/myprofile"
                        className="navigation-link"
                        onClick={() => setCurrentPageStore(3)}
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
