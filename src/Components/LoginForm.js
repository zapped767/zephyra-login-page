import React, { useState } from 'react';
import { loginUser } from '../Services/api';
import { validateForm } from '../utils/validation';
import LoadingSpinner from './LoadingSpinner';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Use dummy credentials for API call as specified in requirements
      const response = await loginUser({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      });

      console.log('Login successful:', response);
      setLoginSuccess(true);
      
      // Reset form after successful login
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        });
        setLoginSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        general: 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changeMethod = () => {
    // Reset form when changing method
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    });
    setErrors({});
    setLoginSuccess(false);
  };

  if (loginSuccess) {
    return (
      <div className="form-section success-section">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Login Successful!</h2>
          <p>Welcome to Anywhere App</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-section">
      <div className="header">
        <div className="app-logo">
          <div className="logo-circle"></div>
          <span className="app-name">Anywhere app.</span>
        </div>
        <nav className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#join" className="nav-link">Join</a>
        </nav>
      </div>

      <div className="form-content">
        <div className="form-header">
          <p className="start-text">START FOR FREE</p>
          <h1 className="form-title">
            Create new account<span className="accent-dot">.</span>
          </h1>
          <p className="login-link">
            Already A Member? <button type="button" className="link-button">Log In</button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="name-row">
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                placeholder="Michal"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
              />
              <span className="flag-icon"></span>
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Masiak"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
              />
              <span className="flag-icon">🇵🇱</span>
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="michal.masiak@anywhere.co"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            <span className="email-icon">📧</span>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="change-method-btn"
              onClick={changeMethod}
            >
              Change method
            </button>
            <button
              type="submit"
              className="create-account-btn"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;