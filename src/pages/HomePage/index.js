// route through Nav component
import React, { useState, useEffect } from 'react';
// import Logout from '../../components/Logout';
import Posts from '../../components/Posts';
import * as MemePostService from '../../api/MemePostService';

/*
const HomePage = () => {
  return (
    <div>
      <h1>This is where Posts will go!</h1>
      <Posts />
      <Logout />
    </div>
  );
};

export default HomePage;
*/


const HomePage = () => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        let res = await MemePostService.getAll();
        if (res.status === 200) {
            console.log(res.data)
//            setPosts(res.data.data.reverse());
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <div>

                <Posts getPostsAgain={() => fetchPosts()} />
                {posts.map((post) => {
                    // console.log("WHICH DATA AM I USING: ", post);
                    return (
                        <Posts
                            aucaptionthor={post.caption}
                            id={post._id}
                            getPostsAgain={() => fetchPosts()}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
