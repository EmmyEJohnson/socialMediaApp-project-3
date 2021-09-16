// route through Nav component
import React from 'react';
import Logout from '../../components/Logout';
import Posts from '../../components/Posts';

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
