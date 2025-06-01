import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    firstName: 'Michel',
    lastName: 'Masiak',
    email: 'michal.masiak@anywhere.co',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="app-logo">
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
          <h1 className="form-title">Create new account<span className="accent-dot">.</span></h1>
          <p className="login-link">Already A Member? <a href="#login" className="login-button">Log In</a></p>
        </div>

        <form className="login-form">
          <div className="input-row">
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Password"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="change-method-btn">Change method</button>
            <button type="submit" className="create-account-btn">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;