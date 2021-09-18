// bring in React from React
import React from 'react';
// import Dislikes from './components/Dislike';
// import Likes from './components/Likes';
import Nav from './components/Nav';
import './App.css';

// define our Welcome functional component
function Welcome() {
  // what should the component return
  return (
    // Make sure to return some UI
      <div>
        {/* <div class="background-container">
<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt=""/>
<div class="stars"></div>
<div class="twinkling"></div>
<div class="clouds"></div>
</div> */}
    <div>
      <Nav />
      <br></br>
      <br></br>
      <h1 id="welcome">Welcome to Memeify!</h1>
      <br></br>
      <h2 className="sub-title" id="h2-1">Post A Photo</h2><br></br>
      <h2 className="sub-title" id="h2-2">Let The Community Jokes Become Your Caption</h2>
      {/* <Likes />
      <Dislikes />  */}
    </div>
    <div class="background-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    </div>
  );
}

export default Welcome;
// npm i react-router-dom bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator cors multer
