import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Register from '../../pages/Register';
import Signin from '../../pages/Signin';
import Profile from '../../pages/Profile';
import HomePage from '../../pages/HomePage';

const Nav = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };
  return (
    <div>
      <nav style={navStyle}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/signin">Login!</Link>
        {/* <Link to="/profile">profile</Link> */}
      </nav>
      <Switch>
        <Route path="/register" render={(props) => <Register {...props} />} />
        <Route path="/signin" render={(props) => <Signin {...props} />} />
        <Route path="/profile" render={(props) => <Profile {...props} />} />
        {/* HomePage route/props/component, which displays posts components! */}
        <HomePage />
      </Switch>
    </div>
  );
};

export default Nav;
