import React, { useState } from 'react';
import './style.css';
import * as UserService from '../../api/UserService';
import { setToken } from '../../utils/tokenservice';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    let newLoggedInUser = {
      email,
      password,
    };

    const res = await UserService.login(newLoggedInUser);

    if (res.data.data) {
      const token = res.data.data.token;
      console.log('FROM LOGIN FORM: ', token);
      alert('logged in');
      setToken(token);
      setEmail('');
      setPassword('');
      history.push('/profile');
    } else {
      alert('Server Error enter valid creds');
    }
  };

  return (
    <div>
      <h1 className="signIn-h1">Sign In to A Meme Filled World</h1>
      <div className="signIn-form">
        <h3 className="signIn-h3">Sign In Here</h3>
        <input
          className="signIn-email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          className="signIn-password"
          placeholder="Enter Password"
          placeholder="Password"
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
        />
        <button type="submit" className="signIn-button" onClick={handleSubmit}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signin;
