// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { testimonialsData } from '../data/data';
import { Link } from 'react-router-dom';

function HomePage({ showToast }) {
  const navigate = useNavigate();
  const [counters, setCounters] = useState({ stays: 0, countries: 0, rating: 0 });

  const [searchMode, setSearchMode] = useState('stays');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkinInput');
    const checkoutInput = document.getElementById('checkoutInput');
    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;
  }, []);

  useEffect(() => {
    const targets = { stays: 600, countries: 58, rating: 4.9 };
    const steps = { stays: targets.stays / 60, countries: targets.countries / 60, rating: targets.rating / 60 };
    let current = { stays: 0, countries: 0, rating: 0 };
    const interval = setInterval(() => {
      let allDone = true;
      for (let key of ['stays', 'countries', 'rating']) {
        if (current[key] < targets[key]) {
          allDone = false;
          current[key] = Math.min(current[key] + steps[key], targets[key]);
        }
      }
      setCounters({
        stays: current.stays.toFixed(1),
        countries: Math.floor(current.countries),
        rating: current.rating.toFixed(1)
      });
      if (allDone) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const left = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 15;
      const drift = (Math.random() - 0.5) * 200;
      p.style.cssText = `left:${left}%;bottom:-10px;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;--drift:${drift};`;
      container.appendChild(p);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  
  const handleSearch = () => {
  const destInput = document.getElementById('destInput');
  const dest = destInput?.value || '';

  if (searchMode === 'buy') {
    if (dest) {
      showToast(`🏠 Searching properties for sale in ${dest}...`);
      navigate('/stays');
    } else {
      showToast('📍 Please enter a wilaya or city first');
    }
  } else {
    const guestsInput = document.getElementById('guestsInput');
    const guests = guestsInput?.value || '2';
    if (dest) {
      showToast(`🔍 Searching stays in ${dest} for ${guests} guests...`);
      navigate('/stays');
    } else {
      showToast('📍 Please enter a wilaya or city first');
    }
  }
};

  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-bg-img"></div>
          <div className="hero-particles" id="particles"></div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">Rent or buy with ease.</div>
          <h1 className="hero-title">
            
            Find your home<br /> across <em>Algeria</em>
          </h1>
          <p className="hero-sub"> Apartments, houses and villas for short stays or long-term living — 
  pay easily in Algerian Dinar via Baridi Mob.
    </p>

         {/* SEARCH BAR */}
<div className="search-wrap">
  <div className="search-tabs">
    <button
      className={`search-tab ${searchMode === 'stays' ? 'active' : ''}`}
      onClick={() => setSearchMode('stays')}
    >Stays</button>
   
    <button
      className={`search-tab ${searchMode === 'buy' ? 'active' : ''}`}
      onClick={() => setSearchMode('buy')}
    >Buy</button>
  </div>

  <div className="search-bar">
    {/* FIELD 1 — always shown */}
    <div className="search-field search-field--wide">
      <label className="search-label">Where</label>
      <input
        id="destInput"
        className="search-input"
        placeholder="Search destinations"
      />
    </div>

    {searchMode === 'buy' ? (
      <>
        <div className="search-field">
          <label className="search-label">Rooms</label>
          <input
            className="search-input"
            type="number"
            min="1"
            max="20"
            placeholder="Min rooms"
          />
        </div>
        <div className="search-field search-field--narrow">
          <label className="search-label">Max Budget</label>
          <input
            className="search-input"
            type="number"
            min="0"
            placeholder="e.g. 12,000,000"
          />
        </div>
      </>
    ) : (
      <>
        <div className="search-field">
          <label className="search-label">Check in</label>
          <input
            id="checkinInput"
            className="search-input"
            type="date"
          />
        </div>
        <div className="search-field">
          <label className="search-label">Check out</label>
          <input
            id="checkoutInput"
            className="search-input"
            type="date"
          />
        </div>
        <div className="search-field search-field--narrow">
          <label className="search-label">Guests</label>
          <input
            id="guestsInput"
            className="search-input"
            type="number"
            min="1"
            max="20"
            placeholder="Add guests"
          />
        </div>
      </>
    )}

    <button className="search-btn" onClick={handleSearch}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
      {searchMode === 'buy' ? 'Find Property' : 'Search'}
    </button>
  </div>
</div>
          

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">{counters.stays}</div>
              <div className="hero-stat-label">Houses</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">{counters.countries}</div>
              <div className="hero-stat-label">Wilayas</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">{counters.rating}</div>
              <div className="hero-stat-label">Avg Rating</div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line"></div>
      
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="editorial-section">
        <div className="editorial-grid">
          <div className="editorial-img-wrap fade-up">
           <img src="/photos/homepage.jpg" alt="Luxury Villa" className="editorial-img" />  

            <div className="editorial-img-overlay"></div>
                        <div className="editorial-img-tag"> "A home away from home,<br />anywhere in Algeria."</div>

          </div>
          <div className="editorial-content fade-up">
            <div className="section-eyebrow"> Mabit'i</div>
            <h2 className="section-title">More Than a Rental.<br />It's an <em>Experience</em>.</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)' }}> We connect Algerian hosts and guests directly — verified listings, 
  local payment methods, and a community built on trust.</p>
            <div className="editorial-features">
  <div className="editorial-feature">
    <div className="editorial-feature-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    </div>
    <div className="editorial-feature-text">
      <h4>Verified Listings</h4>
      <p>Every host is verified via national ID. Browse with confidence, book without worry.</p>
    </div>
  </div>

  <div className="editorial-feature">
    <div className="editorial-feature-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/>
        <path d="M2 10h20"/>
        <path d="M6 15h4"/>
        <path d="M14 15h4"/>
      </svg>
    </div>
    <div className="editorial-feature-text">
      <h4>Pay in Algerian Dinar</h4>
      <p>Forget international cards. Pay easily via Baridi Mob or CCP postal transfer.</p>
    </div>
  </div>

  <div className="editorial-feature">
    <div className="editorial-feature-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h8"/>
        <path d="M8 14h5"/>
      </svg>
    </div>
    <div className="editorial-feature-text">
      <h4>Real Community Reviews</h4>
      <p>Honest ratings from real guests across Algeria. No paid placements, no fake stars.</p>
    </div>
  </div>
</div>
  <Link
  to="/about"
  style={{
    display: 'inline-block',
    padding: '12px 28px',
    background: 'var(--gold)',
    color: 'var(--navy)',
    borderRadius: '50px',
    fontWeight: 600,
    fontSize: '14px',
    textDecoration: 'none',
    fontFamily: 'inherit',
    letterSpacing: '0.02em',
    position: 'relative',
    boxShadow: '0 0 18px 4px rgba(201,168,76,0.35), 0 0 40px 8px rgba(201,168,76,0.15)',
  }}
>
  Learn More About Us
</Link>
          </div>
        </div>
      </section>



{/* FEATURED HOUSES */}
<section className="featured-section fade-up">
  <div className="section-header">
    <div className="section-eyebrow">Featured</div>
    <h2 className="section-title">Popular <em>Houses</em></h2>
    <p className="section-sub">Discover top-rated properties across Algeria</p>
  </div>

  <div className="listings-grid">
    <div className="listing-card">
      <div className="listing-img-wrap">
        <img src="/photos/house1.jpg" alt="Luxury Villa" className="listing-img" />
        <div className="listing-badge">Featured</div>
      </div>
      <div className="listing-info">
        <div className="listing-top">
          <h3 className="listing-name">Luxury Villa in Algiers</h3>
          <div className="listing-rating"><span className="star">★</span> 4.9</div>
        </div>
        <p className="listing-location">Algiers • 4 Bedrooms</p>
        <div className="listing-footer">
          <div className="listing-price">12,000,000 DZD </div>
          <button className="book-btn">View</button>
        </div>
      </div>
    </div>

    <div className="listing-card">
      <div className="listing-img-wrap">
        <img src="/photos/house2.jpg" alt="Cozy Apartment" className="listing-img" />
        <div className="listing-badge">Featured</div>
      </div>
      <div className="listing-info">
        <div className="listing-top">
          <h3 className="listing-name">Cozy Apartment in Oran</h3>
          <div className="listing-rating"><span className="star">★</span> 4.7</div>
        </div>
        <p className="listing-location">Oran • 2 Bedrooms</p>
        <div className="listing-footer">
          <div className="listing-price">6,500,000 DZD </div>
          <button className="book-btn">View</button>
        </div>
      </div>
    </div>

    <div className="listing-card">
      <div className="listing-img-wrap">
        <img src="/photos/house3.jpg" alt="Modern Loft" className="listing-img" />
        <div className="listing-badge">Featured</div>
      </div>
      <div className="listing-info">
        <div className="listing-top">
          <h3 className="listing-name">Modern Loft in Béjaïa</h3>
          <div className="listing-rating"><span className="star">★</span> 4.8</div>
        </div>
        <p className="listing-location">Béjaïa • 1 Bedroom</p>
        <div className="listing-footer">
          <div className="listing-price">4,200,000 DZD </div>
          <button className="book-btn">View</button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>Guest Stories</div>
          <h2 className="section-title" style={{ color: 'var(--white)', textAlign: 'center' }}>Voices of Our <em>Community</em></h2>
        </div>
        <div className="testimonials-track-wrap">
          <div className="testimonials-track">
            {[...testimonialsData, ...testimonialsData].map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <div className="testimonial-text">"{t.text}"</div>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar"
                    onError={(e) => { e.target.src = 'https://randomuser.me/api/portraits/women/44.jpg'; }} />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-loc">📍 {t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    {/* OUR MISSION SECTION */}
<section className="mission-section">
  <div className="section-header">
    <div className="section-eyebrow">Our Mission</div>
    <h2 className="section-title"><em>Mabiti'i</em> : A Platform Built for <em>Algerians</em></h2>
    <p className="section-sub">
      We believe finding housing for short stays, studies, or work in Algeria should be simple, safe, and centralized.
      Our mission is to connect families, students, and professionals with trusted local hosts — without the stress of
      Facebook groups or word-of-mouth.
    </p>
  </div>

  <div className="mission-grid">
    <div className="mission-card">
      <h3>👨‍👩‍👧‍👦 For Families</h3>
      <p>Plan vacations or visits to other wilayas with confidence, knowing you’ll find reliable homes quickly.</p>
    </div>
    <div className="mission-card">
      <h3>🎓 For Students</h3>
      <p>Secure short-term rentals during internships, exams, or residencies without wasting time or money.</p>
    </div>
    <div className="mission-card">
      <h3>💼 For Professionals</h3>
      <p>Book housing for seminars, medical visits, or temporary assignments with ease and transparency.</p>
    </div>
  </div>
</section>


    </>
  );
}

export default HomePage;
