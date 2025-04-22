import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    agreeTerms: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const { name, email, password, passwordConfirmation, agreeTerms } = formData;
  
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
  
    if (!agreeTerms) {
      setError('You must agree to the terms');
      return;
    }
  
    setLoading(true);
  
    try {
  
      // Register
      await axios.post(
        'http://localhost:8000/api/register',
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
        
      );
  
      // Login
      const loginRes = await axios.post(
        'http://localhost:8000/api/login',
        {
          email,
          password,
        },

        
      );
  
      const token = loginRes.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('auth', 'true');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
  
      navigate('/dashboard');
    } catch (err) {
      console.error('Full error:', err); 
      const errorMsg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(', ')
        : err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="user-icon">
        <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="User Icon" />
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          icon="https://cdn-icons-png.flaticon.com/512/3178/3178165.png"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          icon="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          icon="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />

        <div className="options">
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            I agree to the Terms
          </label>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'SIGNING UP...' : 'SIGN UP'}
        </button>

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

// Reusable Input component for cleaner code
const Input = ({ type, name, placeholder, icon, value, onChange }) => (
  <div className="input-group">
    <img src={icon} alt={`${name} icon`} />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Signup;
