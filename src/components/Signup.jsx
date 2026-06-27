// ==================================== IMPORTS ==========================
import React, { useState } from 'react';
import { BackIcon } from './Icons';
// ============================================

// ==================================== SIGNUP COMPONENT ==========================
export default function Signup({ onNavigate, onSignupSuccess }) {
  // Input fields state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isAgency, setIsAgency] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !password || !isAgency) {
      return;
    }

    const newUser = {
      fullName,
      phone,
      email,
      password,
      company,
      isAgency,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    };

    // Save to users database in localStorage
    const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
    users.push(newUser);
    localStorage.setItem('popx_users', JSON.stringify(users));

    // Notify parent of successful signup
    onSignupSuccess(newUser);
  };

  // Determine if signup form is valid to enable/disable button
  const isFormValid = fullName && phone && email && password && isAgency;

  return (
    <div className="signup-screen">
      <button className="back-button" onClick={() => onNavigate('landing')}>
        <BackIcon />
      </button>
      
      <h1 style={{ marginTop: '35px' }}>Create your<br />PopX account</h1>
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Full Name<b>*</b></span>
          <input 
            type="text" 
            placeholder="Enter your full name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </label>

        <label className="field">
          <span>Phone number<b>*</b></span>
          <input 
            type="tel" 
            placeholder="Enter phone number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
          />
        </label>

        <label className="field">
          <span>Email address<b>*</b></span>
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

        <label className="field">
          <span>Company name</span>
          <input 
            type="text" 
            placeholder="Enter company name" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>

        <div className="radio-block">
          <p>Are you an Agency?<b>*</b></p>
          <label>
            <input 
              type="radio" 
              name="isAgency" 
              value="yes" 
              checked={isAgency === 'yes'}
              onChange={() => setIsAgency('yes')}
              required
            />
            Yes
          </label>
          <label>
            <input 
              type="radio" 
              name="isAgency" 
              value="no" 
              checked={isAgency === 'no'}
              onChange={() => setIsAgency('no')}
              required
            />
            No
          </label>
        </div>

        <button 
          type="submit" 
          className={`btn signup-btn ${isFormValid ? 'btn-primary' : 'btn-disabled'}`}
          disabled={!isFormValid}
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
// ============================================
