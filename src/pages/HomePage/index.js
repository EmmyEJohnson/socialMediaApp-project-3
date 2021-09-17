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
            setPosts(res.data.data);
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

                    return (
                        <Posts
                            name={post.name}
                            caption={post.caption}
                            key={post._id}
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
