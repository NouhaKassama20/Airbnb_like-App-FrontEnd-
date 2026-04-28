// src/pages/StaysPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProperties } from '../services/propertiesApi';

function StaysPage({ showToast, onOpenBooking }) {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // ✅ Hook 1
  useEffect(() => {
    fetchProperties()
      .then(data => {
        setListings(data);
        setAllListings(data);
      })
      .catch(() => showToast('❌ Failed to load properties'))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Hook 2
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

  const filterCategory = (category) => {
    setActiveCategory(category);
    const filtered = category === 'all'
      ? allListings
      : allListings.filter(l => l.category === category);
    setListings(filtered);
    showToast(`✦ Showing ${filtered.length} stays`);
  };

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const isLiked = btn.classList.toggle('liked');
    btn.textContent = isLiked ? '♥' : '♡';
    btn.style.color = isLiked ? '#e63946' : '';
    showToast(isLiked ? '❤️ Saved to wishlist' : '💔 Removed from wishlist');
  };

  // ✅ Early return AFTER all hooks
  if (loading) return <p style={{ textAlign: 'center', padding: 40 }}>Loading stays...</p>;

  return (
    <>
      {/* Page Hero */}
      <div style={{
        background: 'var(--navy)',
        paddingTop: '90px',
        paddingBottom: '60px',
        textAlign: 'center',
        color: 'var(--white)'
      }}>
        <div className="search-box">
          <div className="search-field-wrap">
            <label>Destination</label>
            <input type="text" placeholder="Search a destination" />
          </div>
          <div className="search-field-wrap">
            <label>Check In</label>
            <input type="text" placeholder="When?" />
          </div>
          <div className="search-field-wrap" style={{ borderRight: 'none', maxWidth: '100px' }}>
            <label>Guests</label>
            <input type="text" placeholder="You can add..." />
          </div>
          <button className="search-btn">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <section id="stays" style={{ background: 'var(--cream)', paddingTop: 40 }}>
        {Object.entries(
          listings.reduce((groups, l) => {
            const key = l.location;
            if (!groups[key]) groups[key] = [];
            groups[key].push(l);
            return groups;
          }, {})
        ).map(([groupName, items]) => (
          <div key={groupName} style={{ marginBottom: 25 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 12, paddingLeft: 4 }}>
              {groupName}
            </h2>
            <div style={{
              display: 'flex',
              gap: 13,
              overflowX: 'auto',
              paddingBottom: 8,
              scrollbarWidth: 'none',
            }}>
              {items.map(l => (
                <div
                  key={l.id}
                  style={{ minWidth: 220, width: 220, flexShrink: 0, cursor: 'pointer', background: 'transparent', fontFamily: 'inherit' }}
                  onClick={() => navigate(`/property/${l.property_id}`)}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 2', borderRadius: 12, overflow: 'hidden' }}>
                    <img
                      src={l.img}
                      alt={l.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.target.src = 'https://picsum.photos/id/104/600/450'; }}
                    />
                    {l.badge && (
                      <div style={{
                        position: 'absolute', top: 10, left: 10,
                        background: '#fff', color: '#222',
                        fontSize: 12, fontWeight: 500,
                        padding: '5px 10px', borderRadius: 20,
                        lineHeight: 1.3, maxWidth: 130,
                      }}>
                        {l.badge}
                      </div>
                    )}
                    <button
                      onClick={(e) => toggleWishlist(e, l.id)}
                      style={{
                        position: 'absolute', top: 8, right: 8,
                        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                        <path
                          d="M16 28C16 28 4 20 4 12C4 8.686 6.686 6 10 6C12.2 6 14.1 7.2 16 9.2C17.9 7.2 19.8 6 22 6C25.314 6 28 8.686 28 12C28 20 16 28 16 28Z"
                          stroke="white" strokeWidth="2.5" fill="rgba(0,0,0,0.25)"
                        />
                      </svg>
                    </button>
                  </div>

                   <div style={{ padding: '8px 2px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: '#222', lineHeight: 1.3 }}>{l.title}</div>
                          <div style={{ fontSize: 13, whiteSpace: 'nowrap' }}>★ {l.reviews?.rating}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: '#717171', marginTop: 2 }}>
                        <b style={{ color: '#222', fontWeight: 500 }}>{l.price}DA</b> par nuit
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default StaysPage;