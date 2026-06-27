// ==================================== IMPORTS ==========================
import React, { useState } from 'react';
import { BackIcon } from './Icons';
// ============================================

// ==================================== LOGIN COMPONENT ==========================
export default function Login({ onNavigate, onLoginSuccess }) {
  // State variables for inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Default assessment login fallback
    if (email.toLowerCase() === 'marry@gmail.com' && password === 'password123') {
      const defaultUser = {
        fullName: 'Marry Doe',
        email: 'marry@gmail.com',
        phone: '1234567890',
        company: 'Marry Designs',
        isAgency: 'yes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      };
      onLoginSuccess(defaultUser);
      return;
    }

    // Check localStorage user database
    const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
    } else {
      setError('Invalid email or password. Use marry@gmail.com / password123 to log in.');
    }
  };

  return (
    <div className="form-screen">
      <button className="back-button" onClick={() => onNavigate('landing')}>
        <BackIcon />
      </button>
      
      <h1 style={{ marginTop: '35px' }}>Signin to your account</h1>
      <p className="subtitle">Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>
      
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email Address<b>*</b></span>
          <input 
            type="email" 
            placeholder="Enter email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </label>

        <label className="field">
          <span>Password<b>*</b></span>
          <input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </label>

        {error && (
          <div style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className={`btn ${email && password ? 'btn-primary' : 'btn-disabled'}`}
          disabled={!(email && password)}
          style={{ marginTop: '13px' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
// ============================================
