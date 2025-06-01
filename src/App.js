import React from 'react';
import LoginForm from './Components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="login-container">
        <LoginForm />
        <div className="image-section">
          <div className="mountain-bg"></div>
          <div className="logo-overlay">
            <div className="logo-icon">W</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;