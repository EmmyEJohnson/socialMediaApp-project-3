// bring in React from React
import React from 'react';

//Real-time chat 
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css'

// import Dislikes from './components/Dislike';
// import Likes from './components/Likes';

// define our Welcome functional component
// function Welcome() {
  // what should the component return
  // return (
    // Make sure to return some UI
//     <div>
//       <h1>Welcome to Memeify!</h1>
//       <Likes />
//       <Dislikes />
//     </div>
    
//   );
// }

// export default Welcome;
// npm i react-router-dom bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator cors

const projectID = '1b7801d6-8a66-4be4-a442-89219d833dfc';

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};


export default App;
