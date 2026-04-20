// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ scrolled, onOpenModal }) {
  const location = useLocation();

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo">
        <span className="logo-icon">        <img src="/photos/logo2.png"  alt="MyHomeCity Logo" className="logo-img"  />
</span>
        Mabiti'<span>i</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/stays" className={location.pathname === '/stays' ? 'active-link' : ''}>Stays</Link></li>
        <li><Link to="/destinations" className={location.pathname === '/destinations' ? 'active-link' : ''}>Destinations</Link></li>
        <li><Link to="/experiences" className={location.pathname === '/experiences' ? 'active-link' : ''}>Experiences</Link></li>
        <li><Link to="/host" className={location.pathname === '/host' ? 'active-link' : ''}>Host</Link></li>
      </ul>
      <div className="nav-actions">
        <button className="btn-ghost" onClick={onOpenModal}>Sign In</button>
        <button className="btn-primary" onClick={onOpenModal}>Join Free</button>
      </div>
    </nav>
  );
}

export default Navbar;
