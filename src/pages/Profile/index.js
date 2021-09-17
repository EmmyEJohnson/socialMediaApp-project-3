import React from 'react';
import Logout from '../../components/Logout';
// import Posts from '../../components/Posts';
import PostsForm from '../../components/PostsForm';

const Profile = () => {
  return (
    <div>
      <PostsForm />
      <Logout />
    </div>
  );
};

export default Profile;
