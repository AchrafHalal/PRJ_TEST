import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const token = res.data.token;
      

      localStorage.setItem('token', token);
      localStorage.setItem('auth', 'true');
      if (rememberMe) {
        localStorage.setItem('user_email', email);
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="user-icon">
        <img
          src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
          alt="User Icon"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3178/3178165.png"
            alt="Email Icon"
          />
          <input 
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
            alt="Lock Icon"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="options">
          <label>
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            /> Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </button>

        <div className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
