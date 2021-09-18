import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/signin');
  };

  return (
    <div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
