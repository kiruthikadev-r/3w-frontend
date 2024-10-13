import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './index.css';

const Login = ({ setAuth }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://threew-backend-iuep.onrender.com/api/admin/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/admin'); 
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Admin Login</h2>
      {error && <p className="login-error" style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-field">
          <label className="login-label">Email:</label>
          <input
            type="text"
            className="login-input-username"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-field">
          <label className="login-label">Password:</label>
          <input
            type="password"
            className="login-input-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
