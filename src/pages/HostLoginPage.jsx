// src/pages/HostLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HostLoginPage({ showToast }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('⚠️ Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('✨ Welcome! Let\'s set up your listing.');
      navigate('/host/setup');
    }, 1200);
  };

  const handleSocial = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`✨ Signed in with ${provider}! Let's set up your listing.`);
      navigate('/host/setup');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 24px 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '460px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)', marginBottom: '16px' }}>
            Host Portal
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 44px)',
            fontWeight: 600,
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '12px'
          }}>
            {tab === 'signin' ? 'Welcome Back,' : 'Join as a'}<br />
            <em style={{ color: 'var(--gold-light)' }}>Host.</em>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            lineHeight: 1.6,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {tab === 'signin'
              ? 'Sign in to access your host dashboard and listing tools.'
              : 'Create your account and start earning from your space.'
            }
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.4)'
        }}>
          {/* Tabs */}
          <div className="modal-tabs" style={{ marginBottom: '32px' }}>
            <button
              className={`modal-tab ${tab === 'signin' ? 'active' : ''}`}
              onClick={() => setTab('signin')}
            >
              Sign In
            </button>
            <button
              className={`modal-tab ${tab === 'signup' ? 'active' : ''}`}
              onClick={() => setTab('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {tab === 'signup' && (
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--white)', borderColor: 'rgba(201,168,76,0.2)' }}
                />
              </div>
            )}
            <div className="form-field">
              <label style={{ color: 'rgba(255,255,255,0.7)' }}>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--white)', borderColor: 'rgba(201,168,76,0.2)' }}
              />
            </div>
            <div className="form-field">
              <label style={{ color: 'rgba(255,255,255,0.7)' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ background: 'rgba(255,255,255,0.07)', color: 'var(--white)', borderColor: 'rgba(201,168,76,0.2)' }}
              />
            </div>

            {tab === 'signin' && (
              <div style={{ textAlign: 'right', marginTop: '-8px' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gold)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    padding: 0
                  }}
                  onClick={() => showToast('📧 Password reset email sent!')}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="btn-gold"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '15px',
                borderRadius: '12px',
                marginTop: '4px',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'wait' : 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'Signing in…' : tab === 'signin' ? 'Sign In & Continue' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="form-divider" style={{ margin: '28px 0' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>or continue with</span></div>

          {/* Social */}
          <div className="social-login">
            {['🌐 Google', '🍎 Apple', '📘 Facebook'].map(p => (
              <button
                key={p}
                className="social-login-btn"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--white)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  flex: 1
                }}
                onClick={() => handleSocial(p.split(' ')[1])}
                disabled={loading}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.3s'
            }}
            onClick={() => navigate('/host')}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            ← Back to Host page
          </button>
        </div>
      </div>
    </div>
  );
}

export default HostLoginPage;
