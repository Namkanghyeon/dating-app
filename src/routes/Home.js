import React from "react";
import FemaleHome from "components/homepage/FemaleHome";
import MaleHome from "components/homepage/MaleHome";

const Home = ({ userObj, profileObj }) => {
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
