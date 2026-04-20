// src/pages/ExperiencesPage.jsx
import React, { useEffect } from 'react';
import { experiencesData } from '../data/data';

const allExperiences = [
  ...experiencesData,
  { title: 'Alpine Ski & Fondue', host: 'Hosted by Klaus', price: 140, rating: 4.96, reviews: 112, duration: '6 hours', img: 'https://picsum.photos/id/15/400/400' },
  { title: 'Coastal Photography Walk', host: 'Hosted by Léa', price: 75, rating: 4.93, reviews: 228, duration: '3 hours', img: 'https://picsum.photos/id/29/400/400' },
  { title: 'Parisian Cooking Class', host: 'Hosted by Camille', price: 110, rating: 4.97, reviews: 305, duration: '4 hours', img: 'https://picsum.photos/id/30/400/400' },
  { title: 'Bali Sunrise Yoga', host: 'Hosted by Wayan', price: 35, rating: 4.99, reviews: 641, duration: '2 hours', img: 'https://picsum.photos/id/127/400/400' },
];

const categories = ['All', 'Food & Drink', 'Outdoor', 'Art & Culture', 'Wellness', 'Adventure'];

function ExperiencesPage({ showToast }) {
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
        <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>Beyond the Stay</div>
        <h1 className="section-title" style={{ color: 'var(--white)', textAlign: 'center' }}>
          Local <em>Experiences</em>
        </h1>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
          Unforgettable activities led by locals who know their corners of the world best.
        </p>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => showToast(`✦ Filtering: ${cat}`)}
              style={{
                padding: '10px 22px',
                borderRadius: '100px',
                border: '1px solid rgba(201,168,76,0.4)',
                background: cat === 'All' ? 'var(--gold)' : 'transparent',
                color: cat === 'All' ? 'var(--navy)' : 'var(--white)',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Experiences Grid */}
      <section className="experiences-section" id="experiences" style={{ background: 'var(--cream)' }}>
        <div className="exp-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {allExperiences.map((e, idx) => (
            <div key={idx} className="exp-card fade-up">
              <div className="exp-img-wrap">
                <img src={e.img} alt={e.title} className="exp-img" loading="lazy"
                  onError={(ev) => { ev.target.src = 'https://picsum.photos/id/124/400/400'; }} />
                <div className="exp-duration">⏱ {e.duration}</div>
              </div>
              <div className="exp-info">
                <div className="exp-host">{e.host}</div>
                <div className="exp-title">{e.title}</div>
                <div className="exp-footer">
                  <div className="exp-rating">★ {e.rating} <span style={{ color: 'var(--gray-3)' }}>({e.reviews})</span></div>
                  <div className="exp-price">${e.price} <small>/ person</small></div>
                </div>
                <button
                  className="book-btn"
                  style={{ width: '100%', marginTop: '12px' }}
                  onClick={() => showToast(`🎉 Booking: ${e.title}`)}
                >
                  Book Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ExperiencesPage;
