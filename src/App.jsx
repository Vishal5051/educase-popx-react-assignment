// ==================================== IMPORTS ==========================
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import './App.css';
// ============================================

// ==================================== MAIN APP COMPONENT ==========================
export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing', 'login', 'signup', 'profile'
  const [currentUser, setCurrentUser] = useState(null);

  // Check if a user session exists in localStorage on startup
  useEffect(() => {
    const session = localStorage.getItem('popx_session');
    if (session) {
      setCurrentUser(JSON.parse(session));
      setScreen('profile');
    }
  }, []);

  // Set navigation screen
  const navigateTo = (targetScreen) => {
    setScreen(targetScreen);
  };

  // Handle successful login
  const handleLoginSuccess = (user) => {
    localStorage.setItem('popx_session', JSON.stringify(user));
    setCurrentUser(user);
    setScreen('profile');
  };

  // Handle successful signup
  const handleSignupSuccess = (user) => {
    localStorage.setItem('popx_session', JSON.stringify(user));
    setCurrentUser(user);
    setScreen('profile');
  };

  // Handle user info/avatar update on Profile
  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('popx_session', JSON.stringify(updatedUser));
    
    // Update matching user in overall users database
    const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('popx_users', JSON.stringify(updatedUsers));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('popx_session');
    setCurrentUser(null);
    setScreen('landing');
  };

  return (
    <div className="app-shell">
      <div className="phone">
        
        {/* Render current screen dynamically */}
        {screen === 'landing' && (
          <Landing onNavigate={navigateTo} />
        )}

        {screen === 'login' && (
          <Login 
            onNavigate={navigateTo} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}

        {screen === 'signup' && (
          <Signup 
            onNavigate={navigateTo} 
            onSignupSuccess={handleSignupSuccess} 
          />
        )}

        {screen === 'profile' && (
          <Profile 
            user={currentUser} 
            onLogout={handleLogout} 
            onUpdateUser={handleUpdateUser} 
          />
        )}

      </div>
    </div>
  );
}
// ============================================
