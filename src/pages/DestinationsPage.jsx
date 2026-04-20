// src/pages/DestinationsPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const destinationsData = [
  { name: 'Algiers', country: 'Algeria', stays: '1,240', img: '/photos/w1.jpg', emoji: '🌴', size: 'large' },
  { name: 'Oran', country: 'Algeria', stays: '870', img: '/photos/w2.jpg', emoji: '🗼', size: 'small' },
  { name: 'Jijel', country: 'Algeria', stays: '430', img: '/photos/w3.jpg', emoji: '🏔️', size: 'small' },
  { name: 'Constantine', country: 'Algeria', stays: '650', img: '/photos/w4.jpg', emoji: '🌸', size: 'small' },
  { name: 'Bijaia', country: 'Algeria', stays: '2,100', img: '/photos/w5.jpg', emoji: '🗽', size: 'small' },
  { name: 'Annaba', country: 'Algeria', stays: '380', img: '/photos/w6.jpg', emoji: '🍋', size: 'medium' },
  { name: 'Gerdaya', country: 'Algeria', stays: '1,560', img: '/photos/w7.jpg', emoji: '🏙️', size: 'medium' },
  { name: 'Tipaza', country: 'Algeria', stays: '490', img: '/photos/w8.jpg', emoji: '🌊', size: 'medium' },
];

function DestinationsPage({ showToast }) {
  const navigate = useNavigate();

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
        <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>Explore the World</div>
        <h1 className="section-title" style={{ color: 'var(--white)', textAlign: 'center' }}>
          Top <em>Destinations</em>
        </h1>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          From sun-drenched coastlines to storied city streets — every corner of the world awaits.
        </p>
      </div>

      {/* Main featured grid */}
      <section id="destinations" style={{ background: 'var(--cream)' }}>
        <div className="destinations-grid">
          <div className="dest-card fade-up" onClick={() => { showToast('🌴 Exploring Oran...'); navigate('/stays'); }}>
            <div className="dest-img-wrap" style={{ height: '520px' }}>
              <img src="/photos/w1.jpg" alt="Algiers" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Algiers</div>
                <div className="dest-count">1,240 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🗼 Exploring Oran...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="/photos/w2.jpg" alt="Oran" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Oran</div>
                <div className="dest-count">870 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🏔️ Exploring Jijel...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="/photos/w3.jpg" alt="Santorini" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Jijel</div>
                <div className="dest-count">430 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🌸 Exploring Constantine...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="/photos/w4.jpg" alt="Constanitne" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Constantine</div>
                <div className="dest-count">650 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🗽 Exploring Bijaia...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="/photos/w5.jpg" alt="Bijaia" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Bijaia</div>
                <div className="dest-count">2,100 stays available</div>
              </div>
            </div>
          </div>
        </div>

        {/* More destinations */}
        <div style={{ padding: '0 48px 80px', maxWidth: '1400px', margin: '0 auto' }}>
          <div className="section-header-row section-header" style={{ marginBottom: '40px' }}>
            <div>
              <div className="section-eyebrow">More to Explore</div>
              <h2 className="section-title">Hidden <em>Gems</em></h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {destinationsData.slice(5).map((dest) => (
              <div
                key={dest.name}
                className="dest-card fade-up"
                onClick={() => { showToast(`${dest.emoji} Exploring ${dest.name}...`); navigate('/stays'); }}
              >
                <div className="dest-img-wrap" style={{ height: '220px' }}>
                  <img src={dest.img} alt={dest.name} className="dest-img" />
                  <div className="dest-overlay">
                    <div className="dest-name">{dest.name}</div>
                    <div className="dest-count">{dest.stays} stays available</div>
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

export default DestinationsPage;
