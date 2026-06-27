// ==================================== IMPORT REACT ==========================
import React from 'react';
// ============================================

// ==================================== LANDING COMPONENT ==========================
export default function Landing({ onNavigate }) {
  return (
    <div className="landing-content">
      <h1>Welcome to PopX</h1>
      <p>Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>
      
      <button 
        className="btn btn-primary" 
        onClick={() => onNavigate('signup')}
      >
        Create Account
      </button>
      
      <button 
        className="btn btn-secondary" 
        onClick={() => onNavigate('login')}
      >
        Already Registered? Login
      </button>
    </div>
  );
}
// ============================================
