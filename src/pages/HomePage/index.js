import React, { useEffect, useState } from 'react';
import Posts from '../../components/Posts';
import PostsForm from '../../components/PostsForm';
import * as MemePostService from '../../api/MemePostService';
import { getUser } from '../../api/UserService';
import Logout from '../../components/Logout';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [user] = useState(getUser);

  async function fetchPosts() {
    let res = await MemePostService.getAll();
    if (res.status === 200) {
      setPosts(res.data.data.reverse());
    }
  }

  useEffect(() => {
    console.log('USER: ', user);
    fetchPosts();
  }, []); //eslint-disable-line

  return (
    <div>
      <div>
        <PostsForm getPostsAgain={() => fetchPosts()} />
        {posts.map((post) => {
          return (
            <Posts
              user={user}
              author={post.author}
              caption={post.caption}
              content={post.content}
              image={post.image}
              postComments={post.comments}
              key={post._id}
              id={post._id}
              getPostsAgain={() => fetchPosts()}
            />
          );
        })}
        <Logout />
      </div>
    </div>
  );
};

export default HomePage;
