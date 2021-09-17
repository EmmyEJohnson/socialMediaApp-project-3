import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts";
import PostsForm from "../../components/PostsForm";
import Welcome from "../../components/Welcome";
import * as MemePostService from "../../api/MemePostService";
import { getUser } from "../../api/UserService";

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
      console.log("USER: ", user);
      fetchPosts();
  }, []); //eslint-disable-line

  return (
      <div>
          <div>
              <Welcome />
              <PostsForm user={user} getPostsAgain={() => fetchPosts()} />
              {posts.map((post) => {
                  // console.log("WHICH DATA AM I USING: ", post);
                  return (
                      <Posts
                          author={post.author}
                          body={post.body}
                          title={post.title}
                          postComments={post.comments}
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