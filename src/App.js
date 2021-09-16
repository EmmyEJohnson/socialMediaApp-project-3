// bring in React from React
import React from 'react';
import Dislikes from './components/Dislike';
import Likes from './components/Likes';
import Nav from './components/Nav';
import PostForm from './components/PostForm';

// define our Welcome functional component
function Welcome() {
  // what should the component return
  return (
    // Make sure to return some UI
    <div>
      <Nav />
      <h1>Welcome to Memeify!</h1>
      <Likes />
      <Dislikes /> 
    </div>
  );
}

export default Welcome;
// npm i react-router-dom bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator cors multer
