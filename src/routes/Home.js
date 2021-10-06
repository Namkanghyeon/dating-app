import React, { useEffect } from "react";
import FemaleHome from "components/HomePages/FemaleHome";
import MaleHome from "components/HomePages/MaleHome";
const Home = ({ userObj, profileObj }) => {
    useEffect(() => {
        // const q = query(
        //     collection(dbService, "tweets"),
        //     orderBy("createdAt", "desc")
        // );
        // onSnapshot(q, (snapshot) => {
        //     const tweetArray = snapshot.docs.map((doc) => ({
        //         id: doc.id,
        //         ...doc.data(),
        //     }));
        //     setTweets(tweetArray);
        // });
    }, []);

    return (
        <>
            <div className="container">
                {/* <FemaleHome userObj={userObj} /> */}
                {profileObj ? (
                    profileObj.gender === "Female" ? (
                        <FemaleHome userObj={userObj} profileObj={profileObj} />
                    ) : (
                        <MaleHome userObj={userObj} profileObj={profileObj} />
                    )
                ) : (
                    "loading..."
                )}

                {/* <TweetFactory userObj={userObj} />
                <div style={{ marginTop: 30 }}>
                    {tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweetObj={tweet}
                            isOwner={tweet.creatorId === userObj.uid}
                        />
                    ))}
                </div> */}
            </div>
        </>
    );
};

export default Home;
