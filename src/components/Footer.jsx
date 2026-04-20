// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ showToast }) {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="nav-logo">⌂ Nest<span>Away</span></Link>
          <p>Connecting travelers with extraordinary places and hosts with purpose. Every stay is a new chapter.</p>
          <div className="footer-socials">
            {['𝕏', '📷', 'in', '▶'].map(icon => (
              <button key={icon} className="social-btn" onClick={() => showToast(`Opening ${icon}...`)}>{icon}</button>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h5>Explore</h5>
          <ul>
            <li><Link to="/stays">Featured Stays</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/experiences">Experiences</Link></li>
            <li><a href="#">Long-term Stays</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Hosting</h5>
          <ul>
            <li><Link to="/host">List Your Home</Link></li>
            <li><a href="#">Host Resources</a></li>
            <li><a href="#">Community Forum</a></li>
            <li><a href="#">Host Insurance</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Room</a></li>
            <li><a href="#">Trust & Safety</a></li>
            <li><a href="#">Investors</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 NestAway Inc. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
