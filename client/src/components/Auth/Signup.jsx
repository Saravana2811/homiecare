import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, location } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!location) newErrors.location = 'Location is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, location })
      });
      
      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server is not responding properly. Please check if backend is running.');
      }
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.errors?.[0]?.msg || data.message || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      
      // Show email status
      if (data.emailSent) {
        alert('Registration successful! Welcome email has been sent to your inbox.');
      } else {
        alert('Registration successful! However, there was an issue sending the welcome email.');
      }
      
      navigate('/after');
    } catch (err) {
      console.error('Signup error:', err);
      if (err.message.includes('Failed to fetch')) {
        setErrors({ server: 'Cannot connect to server. Please check if backend is running on port 5000.' });
      } else {
        setErrors({ server: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-header">
          <h2>Create Account</h2>
        </div>
        
        {errors.server && <div className="auth-error">{errors.server}</div>}
        
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={onChange}
              className={errors.location ? 'error' : ''}
              placeholder="Enter your city/location"
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className={errors.password ? 'error' : ''}
              placeholder="Create a password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p style={{color: 'white'}}>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
      
      <div className="auth-animation-container">
        <div className="auth-placeholder">
        </div>
      </div>
    </div>
  );
};

export default Signup;