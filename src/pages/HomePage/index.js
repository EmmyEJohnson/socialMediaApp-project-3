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
            console.log(res) // JARED: Not hitting an API route, gives NOT AN API ROUTE error
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
                {posts.map((posts) => {

                    return (
                        <Posts
                            caption={posts.caption}
                            id={posts._id}
                            getPostsAgain={() => fetchPosts()}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
