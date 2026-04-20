// src/pages/HomePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { testimonialsData } from '../data/data';
import { Link } from 'react-router-dom';

function HomePage({ showToast }) {
  const navigate = useNavigate();
  const [counters, setCounters] = useState({ stays: 0, countries: 0, rating: 0 });

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
    const guestsInput = document.getElementById('guestsInput');
    const dest = destInput?.value || '';
    const guests = guestsInput?.value || '2';
    if (dest) {
      showToast(`🔍 Searching stays in ${dest} for ${guests} guests...`);
      navigate('/stays');
    } else {
      showToast('📍 Please enter a destination first');
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
           We help you feel<br /> at  <em>Home</em>
          </h1>
          <p className="hero-sub">Discover apartments, houses, and villas for short stays or long-term living.
    </p>

          //Search goes here 

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
          Scroll
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="editorial-section">
        <div className="editorial-grid">
          <div className="editorial-img-wrap fade-up">
           <img src="/photos/home.jpg" alt="Luxury Villa" className="editorial-img" />  

            <div className="editorial-img-overlay"></div>
                        <div className="editorial-img-tag">"A place that feels like it was made<br />just for you."</div>

          </div>
          <div className="editorial-content fade-up">
            <div className="section-eyebrow"> Mabit'i</div>
            <h2 className="section-title">More Than a Rental.<br />It's an <em>Experience</em>.</h2>
            <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)' }}>We handpick every property, verify every host, and ensure your stay exceeds every expectation.</p>
            <div className="editorial-features">
              <div className="editorial-feature">
                <div className="editorial-feature-icon">🛡️</div>
                <div className="editorial-feature-text"><h4>Protected Booking</h4><p>Every stay is covered by our $1M host guarantee and 24/7 concierge support.</p></div>
              </div>
              <div className="editorial-feature">
                <div className="editorial-feature-icon">✦</div>
                <div className="editorial-feature-text"><h4>Curated Properties Only</h4><p>We personally vet each listing. If it's here, it's genuinely extraordinary.</p></div>
              </div>
              <div className="editorial-feature">
                <div className="editorial-feature-icon">💬</div>
                <div className="editorial-feature-text"><h4>Authentic Community</h4><p>Real reviews from real guests. No paid placements, no fake stars.</p></div>
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
    </>
  );
}

export default HomePage;
