// Admin.js

import React, { useState } from 'react';
import Page1 from './Page1'; // Import the Page1 component
import './Admin.css';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="admin-login-container">
      {isLoggedIn ? (
        <div>
          
          <Page1 handleLogout={handleLogout} /> {/* Pass handleLogout function as prop */}
        </div>
      ) : (
        <div>
          <h2>Admin Login</h2>
          <form className="Admin-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username or Email:</label>
              <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
