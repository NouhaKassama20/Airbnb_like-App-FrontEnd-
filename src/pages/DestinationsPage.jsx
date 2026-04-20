// src/pages/DestinationsPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const destinationsData = [
  { name: 'Bali', country: 'Indonesia', stays: '1,240', img: 'https://picsum.photos/id/127/800/520', emoji: '🌴', size: 'large' },
  { name: 'Paris', country: 'France', stays: '870', img: 'https://picsum.photos/id/30/600/400', emoji: '🗼', size: 'small' },
  { name: 'Santorini', country: 'Greece', stays: '430', img: 'https://picsum.photos/id/20/600/400', emoji: '🏔️', size: 'small' },
  { name: 'Kyoto', country: 'Japan', stays: '650', img: 'https://picsum.photos/id/96/600/400', emoji: '🌸', size: 'small' },
  { name: 'New York', country: 'USA', stays: '2,100', img: 'https://picsum.photos/id/1/600/400', emoji: '🗽', size: 'small' },
  { name: 'Amalfi Coast', country: 'Italy', stays: '380', img: 'https://picsum.photos/id/104/600/400', emoji: '🍋', size: 'medium' },
  { name: 'Tokyo', country: 'Japan', stays: '1,560', img: 'https://picsum.photos/id/37/600/400', emoji: '🏙️', size: 'medium' },
  { name: 'Cape Town', country: 'South Africa', stays: '490', img: 'https://picsum.photos/id/29/600/400', emoji: '🌊', size: 'medium' },
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
          <div className="dest-card fade-up" onClick={() => { showToast('🌴 Exploring Bali...'); navigate('/stays'); }}>
            <div className="dest-img-wrap" style={{ height: '520px' }}>
              <img src="https://picsum.photos/id/127/800/520" alt="Bali" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Bali</div>
                <div className="dest-count">1,240 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🗼 Exploring Paris...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="https://picsum.photos/id/30/600/240" alt="Paris" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Paris</div>
                <div className="dest-count">870 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🏔️ Exploring Santorini...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="https://picsum.photos/id/20/600/240" alt="Santorini" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Santorini</div>
                <div className="dest-count">430 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🌸 Exploring Kyoto...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="https://picsum.photos/id/96/600/240" alt="Kyoto" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">Kyoto</div>
                <div className="dest-count">650 stays available</div>
              </div>
            </div>
          </div>
          <div className="dest-card fade-up" onClick={() => { showToast('🗽 Exploring New York...'); navigate('/stays'); }}>
            <div className="dest-img-wrap">
              <img src="https://picsum.photos/id/1/600/240" alt="New York" className="dest-img" />
              <div className="dest-overlay">
                <div className="dest-name">New York</div>
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
