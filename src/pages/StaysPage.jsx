// src/pages/StaysPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listingsData } from '../data/data';

function StaysPage({ showToast, onOpenBooking }) {
  const navigate = useNavigate();
  const [listings, setListings] = useState(listingsData);
  const [activeCategory, setActiveCategory] = useState('all');

  const filterCategory = (category) => {
    setActiveCategory(category);
    const filtered = category === 'all' ? listingsData : listingsData.filter(l => l.category === category);
    setListings(filtered);
    showToast(`✦ Showing ${filtered.length || listingsData.length} stays`);
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const isLiked = btn.classList.toggle('liked');
    btn.textContent = isLiked ? '♥' : '♡';
    btn.style.color = isLiked ? '#e63946' : '';
    showToast(isLiked ? '❤️ Saved to wishlist' : '💔 Removed from wishlist');
  };

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
  }, [listings]);

  return (
    <>
      {/* Page Hero */}
      <div style={{
        background: 'var(--navy)',
        paddingTop: '140px',
        paddingBottom: '60px',
        textAlign: 'center',
        color: 'var(--white)'
      }}>
        <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>Curated Selection</div>
        <h1 className="section-title" style={{ color: 'var(--white)', textAlign: 'center' }}>
          Featured <em>Stays</em>
        </h1>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          Handpicked properties that redefine what it means to feel at home.
        </p>
      </div>

      {/* Categories */}
      <div className="categories" id="categories">
        <div className="categories-inner">
          {['all', 'villa', 'beach', 'mountain', 'city', 'cabin', 'treehouse', 'castle', 'boat', 'farm', 'luxury'].map(cat => (
            <button key={cat} className={`cat-pill ${activeCategory === cat ? 'active' : ''}`} onClick={() => filterCategory(cat)}>
              <span className="cat-icon">
                {cat === 'all' && '🏠'}{cat === 'villa' && '🏛️'}{cat === 'beach' && '🏖️'}{cat === 'mountain' && '⛰️'}
                {cat === 'city' && '🏙️'}{cat === 'cabin' && '🪵'}{cat === 'treehouse' && '🌲'}{cat === 'castle' && '🏰'}
                {cat === 'boat' && '⛵'}{cat === 'farm' && '🌾'}{cat === 'luxury' && '💎'}
              </span>
              <span className="cat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <section id="stays" style={{ background: 'var(--cream)' }}>
        <div className="listings-grid">
          {listings.map(l => (
            <div key={l.id} className="listing-card fade-up" style={{ cursor: 'pointer' }} onClick={() => navigate(`/property/${l.id}`)}>
              <div className="listing-img-wrap">
                <img src={l.img} alt={l.name} className="listing-img" loading="lazy"
                  onError={(e) => { e.target.src = 'https://picsum.photos/id/104/600/450'; }} />
                {l.badge && <div className={`listing-badge ${l.badge === 'New' ? 'new' : ''}`}>{l.badge}</div>}
                <button className="wishlist-btn" onClick={(e) => toggleWishlist(e, l.id)}>♡</button>
                <div className="listing-img-dots">
                  <div className="img-dot active"></div>
                  <div className="img-dot"></div>
                  <div className="img-dot"></div>
                </div>
              </div>
              <div className="listing-info">
                <div className="listing-top">
                  <div className="listing-name">{l.name}</div>
                  <div className="listing-rating"><span className="star">★</span>{l.rating}</div>
                </div>
                <div className="listing-location">📍 {l.location} · {l.reviews} reviews</div>
                <div className="listing-tags">{l.tags.map(t => <span key={t} className="listing-tag">{t}</span>)}</div>
                <div className="listing-footer">
                  <div className="listing-price">${l.price}<span> / night</span></div>
                  <button className="book-btn" onClick={(e) => { e.stopPropagation(); onOpenBooking(l.id); }}>Reserve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default StaysPage;
