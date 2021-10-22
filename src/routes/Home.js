import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import FemaleHome from "components/homepage/FemaleHome";
import MaleHome from "components/homepage/MaleHome";

const Home = ({ userObj }) => {
    const { profileObj } = useSelector((state) => ({
        profileObj: state.profileReducer.profileObj,
    }));
    return (
        <>
            <div className="container">
                {profileObj ? (
                    profileObj.gender === "Female" ? (
                        <FemaleHome userObj={userObj} profileObj={profileObj} />
                    ) : (
                        <MaleHome userObj={userObj} profileObj={profileObj} />
                    )
                ) : (
                    "loading..."
                )}
            </div>
        </>
    );
};

export default Home;
