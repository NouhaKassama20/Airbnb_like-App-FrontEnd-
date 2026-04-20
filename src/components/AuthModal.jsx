// src/components/AuthModal.jsx
import React, { useState } from 'react';

function AuthModal({ open, onClose, onAuth }) {
  const [authTab, setAuthTab] = useState('signin');

  const closeOnBg = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={closeOnBg}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Welcome to NestAway</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-tabs">
            <button className={`modal-tab ${authTab === 'signin' ? 'active' : ''}`} onClick={() => setAuthTab('signin')}>Sign In</button>
            <button className={`modal-tab ${authTab === 'signup' ? 'active' : ''}`} onClick={() => setAuthTab('signup')}>Create Account</button>
          </div>
          <div className="modal-form">
            <div className="form-field"><label>Email Address</label><input type="email" placeholder="your@email.com" /></div>
            <div className="form-field"><label>Password</label><input type="password" placeholder="••••••••" /></div>
            <button className="btn-primary" style={{ padding: '14px', borderRadius: '10px', fontSize: '15px' }} onClick={onAuth}>Continue</button>
            <div className="form-divider"><span>or continue with</span></div>
            <div className="social-login">
              <button className="social-login-btn" onClick={onAuth}>🌐 Google</button>
              <button className="social-login-btn" onClick={onAuth}>🍎 Apple</button>
              <button className="social-login-btn" onClick={onAuth}>📘 Facebook</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
