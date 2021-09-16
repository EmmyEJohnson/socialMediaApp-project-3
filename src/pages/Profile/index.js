import React from 'react';
import Logout from '../../components/Logout';
import Posts from '../../components/Posts';

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Posts />
      <Logout />
    </div>
  );
};

export default Profile;
