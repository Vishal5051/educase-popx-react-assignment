// ==================================== IMPORTS ==========================
import React, { useRef } from 'react';
import { CameraIcon } from './Icons';
// ============================================

// ==================================== PROFILE COMPONENT ==========================
export default function Profile({ user, onLogout, onUpdateUser }) {
  const fileInputRef = useRef(null);

  // Fallback default avatar and content if user info is empty
  const defaultAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150';
  const avatarUrl = user?.avatar || defaultAvatar;

  // Trigger file input click
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // Convert uploaded image to base64 data-URL and trigger update
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        onUpdateUser({ ...user, avatar: base64Data });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <span>Account Settings</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      
      <div className="profile-card">
        <div className="avatar-wrap">
          <img 
            className="avatar" 
            src={avatarUrl} 
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
        
        {/* Hidden input to upload avatar image file */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />

        <div className="profile-info">
          <h2>{user?.fullName || 'Marry Doe'}</h2>
          <p>{user?.email || 'Marry@Gmail.Com'}</p>
        </div>
      </div>

      <div className="profile-text">
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
      </div>
    </div>
  );
}
// ============================================
