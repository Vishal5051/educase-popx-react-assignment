import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// SVG Camera Icon component
const CameraIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ width: '13px', height: '13px', color: '#fff' }}
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

// SVG Back Arrow Icon component
const BackIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ width: '20px', height: '20px' }}
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing', 'login', 'signup', 'profile'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isAgency, setIsAgency] = useState(''); // 'yes' or 'no'

  // Logged In User State
  const [currentUser, setCurrentUser] = useState(null);
  
  // Custom Avatar
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150');
  const fileInputRef = useRef(null);

  // Check if a user is already logged in on mount
  useEffect(() => {
    const session = localStorage.getItem('popx_session');
    if (session) {
      const user = JSON.parse(session);
      setCurrentUser(user);
      setAvatar(user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150');
      setScreen('profile');
    }
  }, []);

  // Handle signup form submission
  const handleSignup = (e) => {
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
      avatar
    };

    // Save to users list in localStorage
    const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
    users.push(newUser);
    localStorage.setItem('popx_users', JSON.stringify(users));

    // Automatically log in the new user
    localStorage.setItem('popx_session', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setScreen('profile');
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Fallback/Default credentials for easier assessment review
    if (loginEmail === 'marry@gmail.com' && loginPassword === 'password123') {
      const defaultUser = {
        fullName: 'Marry Doe',
        email: 'marry@gmail.com',
        phone: '1234567890',
        company: 'Marry Designs',
        isAgency: 'yes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
      };
      localStorage.setItem('popx_session', JSON.stringify(defaultUser));
      setCurrentUser(defaultUser);
      setAvatar(defaultUser.avatar);
      setScreen('profile');
      return;
    }

    // Check localStorage users
    const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    );

    if (matchedUser) {
      localStorage.setItem('popx_session', JSON.stringify(matchedUser));
      setCurrentUser(matchedUser);
      setAvatar(matchedUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150');
      setScreen('profile');
    } else {
      setLoginError('Invalid email or password. Use marry@gmail.com / password123 to log in.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('popx_session');
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setFullName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setCompany('');
    setIsAgency('');
    setScreen('landing');
  };

  // Trigger avatar file upload
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        if (currentUser) {
          const updatedUser = { ...currentUser, avatar: reader.result };
          setCurrentUser(updatedUser);
          localStorage.setItem('popx_session', JSON.stringify(updatedUser));
          
          // Update in users database too
          const users = JSON.parse(localStorage.getItem('popx_users') || '[]');
          const updatedUsers = users.map(u => u.email === currentUser.email ? updatedUser : u);
          localStorage.setItem('popx_users', JSON.stringify(updatedUsers));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine if signup form is valid to enable/disable button
  const isSignupValid = fullName && phone && email && password && isAgency;

  return (
    <div className="app-shell">
      <div className="phone">
        
        {/* LANDING SCREEN */}
        {screen === 'landing' && (
          <div className="landing-content">
            <h1>Welcome to PopX</h1>
            <p>Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => setScreen('signup')}
            >
              Create Account
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setScreen('login')}
            >
              Already Registered? Login
            </button>
          </div>
        )}

        {/* LOGIN SCREEN */}
        {screen === 'login' && (
          <div className="form-screen">
            <button className="back-button" onClick={() => setScreen('landing')}>
              <BackIcon />
            </button>
            <h1 style={{ marginTop: '35px' }}>Signin to your account</h1>
            <p className="subtitle">Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.</p>
            
            <form className="form" onSubmit={handleLogin}>
              <label className="field">
                <span>Email Address<b>*</b></span>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required 
                />
              </label>

              <label className="field">
                <span>Password<b>*</b></span>
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                />
              </label>

              {loginError && (
                <div style={{ color: 'var(--danger)', fontSize: '13px', marginBottom: '15px' }}>
                  {loginError}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn ${loginEmail && loginPassword ? 'btn-primary' : 'btn-disabled'}`}
                disabled={!(loginEmail && loginPassword)}
                style={{ marginTop: '13px' }}
              >
                Login
              </button>
            </form>
          </div>
        )}

        {/* SIGNUP SCREEN */}
        {screen === 'signup' && (
          <div className="signup-screen">
            <button className="back-button" onClick={() => setScreen('landing')}>
              <BackIcon />
            </button>
            <h1 style={{ marginTop: '35px' }}>Create your<br />PopX account</h1>
            
            <form className="signup-form" onSubmit={handleSignup}>
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

              {/* Hidden file input for avatar upload */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />

              <button 
                type="submit" 
                className={`btn signup-btn ${isSignupValid ? 'btn-primary' : 'btn-disabled'}`}
                disabled={!isSignupValid}
              >
                Create Account
              </button>
            </form>
          </div>
        )}

        {/* PROFILE SCREEN */}
        {screen === 'profile' && (
          <div className="profile-screen">
            <div className="profile-header">
              <span>Account Settings</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
            
            <div className="profile-card">
              <div className="avatar-wrap">
                <img 
                  className="avatar" 
                  src={avatar} 
                  alt="Profile Avatar" 
                />
                <div 
                  className="camera" 
                  onClick={handleCameraClick}
                  style={{
                    background: 'var(--purple)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #fff'
                  }}
                  title="Upload profile photo"
                >
                  <CameraIcon />
                </div>
              </div>
              
              {/* Hidden file input for avatar upload */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />

              <div className="profile-info">
                <h2>{currentUser ? currentUser.fullName : 'Marry Doe'}</h2>
                <p>{currentUser ? currentUser.email : 'Marry@Gmail.Com'}</p>
              </div>
            </div>

            <div className="profile-text">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
