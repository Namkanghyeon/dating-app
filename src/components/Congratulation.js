import React from "react";

const Congratulation = ({ name, kakaoTalkId }) => {
    return (
        <>
            <h2>축하드립니다. 좋은 인연 되시기 바랍니다.</h2>
            <h3>
                {name}님의 카카오톡 ID: {kakaoTalkId}
            </h3>
        </>
    );
};

export default Congratulation;
