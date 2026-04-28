import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyById, fetchProperties } from '../services/propertiesApi';

// Modal for "Afficher toutes les photos"
function PhotoModal({ images, onClose, startIndex = 0 }) {
  const [current, setCurrent] = useState(startIndex);
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent(c => Math.min(c + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setCurrent(c => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, onClose]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>{current + 1} / {images.length}</span>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>
      <div style={{ position: 'relative', maxWidth: '900px', width: '90%' }}>
        <img
          src={images[current]}
          alt={`Photo ${current + 1}`}
          style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', display: 'block' }}
          onError={e => { e.target.src = 'https://picsum.photos/id/104/1200/700'; }}
        />
        {current > 0 && (
          <button onClick={() => setCurrent(c => c - 1)} style={{ position: 'absolute', left: '-56px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>‹</button>
        )}
        {current < images.length - 1 && (
          <button onClick={() => setCurrent(c => c + 1)} style={{ position: 'absolute', right: '-56px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>›</button>
        )}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', overflowX: 'auto', maxWidth: '90%', padding: '4px' }}>
        {images.map((img, i) => (
          <img
            key={i} src={img} alt={`Miniature ${i + 1}`} onClick={() => setCurrent(i)}
            style={{ width: '72px', height: '52px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: i === current ? '2px solid var(--gold, #C9A84C)' : '2px solid transparent', opacity: i === current ? 1 : 0.6, flexShrink: 0, transition: 'all 0.2s' }}
          />
        ))}
      </div>
    </div>
  );
}

// Airbnb-style gallery: 1 big + 4 small grid
function ImageGallery({ images, listingName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStart, setModalStart] = useState(0);

  const main = images[0] || 'https://picsum.photos/id/104/1200/700';
  const grid = [...images.slice(1, 5)];
  while (grid.length < 4) grid.push(null);

  const openModal = (index) => { setModalStart(index); setModalOpen(true); };

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 40px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--gold, #C9A84C)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--gold, #C9A84C)' }}></span>
            {listingName}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: 'var(--navy, #0B1426)', padding: '8px 12px', borderRadius: '8px', textDecoration: 'underline' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Partager
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: 'var(--navy, #0B1426)', padding: '8px 12px', borderRadius: '8px', textDecoration: 'underline' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            Enregistrer
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '260px 260px', gap: '8px', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ gridRow: '1 / 3', position: 'relative', cursor: 'pointer', overflow: 'hidden' }} onClick={() => openModal(0)}>
            <img src={main} alt={listingName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onError={e => { e.target.src = 'https://picsum.photos/id/104/1200/700'; }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '260px 260px', gap: '8px', gridRow: '1 / 3' }}>
            {grid.map((img, i) => (
              <div key={i}
                style={{ position: 'relative', overflow: 'hidden', cursor: img ? 'pointer' : 'default', background: 'var(--gray-1, #f5f5f5)' }}
                onClick={() => img && openModal(i + 1)}>
                {img ? (
                  <img src={img} alt={`Photo ${i + 2}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onError={e => { e.target.src = 'https://picsum.photos/id/104/600/400'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--gray-2, #e8e8e8)' }} />
                )}
                {i === 3 && images.length > 1 && (
                  <button
                    onClick={e => { e.stopPropagation(); openModal(0); }}
                    style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#fff', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    Afficher toutes les photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && <PhotoModal images={images.filter(Boolean)} onClose={() => setModalOpen(false)} startIndex={modalStart} />}
    </>
  );
}

function LocationMap({ location, listingName }) {
  if (!location) return null;

  const encoded = encodeURIComponent(location);
  const embedUrl = `https://www.google.com/maps?q=${encoded}&z=14&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encoded}`;

  return (
    <div style={{ marginBottom: '48px' }}>
      <div className="section-eyebrow" style={{ marginBottom: '8px', color: 'var(--gold)' }}>Où vous serez</div>
      <h3 style={{ fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: 'var(--navy)', margin: '0 0 4px' }}>
        {location}
      </h3>

      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--gray-2)', boxShadow: '0 4px 24px rgba(11,20,38,0.08)' }}>
        <iframe
          title={`Carte - ${listingName}`}
          src={embedUrl}
          width="100%"
          height="400"
          style={{ border: 'none', display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(11, 20, 38, 0.18)', backdropFilter: 'blur(4px)', border: '3px solid rgba(201, 168, 76, 0.6)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--gold, #C9A84C)', border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', pointerEvents: 'none', zIndex: 3 }} />
      </div>

      <a href={mapsLink} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '14px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)', textDecoration: 'underline', fontFamily: 'inherit', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--navy)'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Ouvrir dans Google Maps
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function PropertyDetailPage({ showToast, onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ All state declared at top level
  const [listing, setListing]   = useState(null);
  const [related, setRelated]   = useState([]);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading]   = useState(true);

  // ✅ Single useEffect — fetch property from DB
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setListing(null);
    setRelated([]);

    fetchPropertyById(id)
      .then(data => {
        console.log('listing data:', data);
        setListing(data);
        // fetch related after we know the category
        return fetchProperties().then(all =>
          setRelated(
            all
              .filter(l => l.id !== data.id && l.category === data.category)
              .slice(0, 3)
          )
        );
      })
      .catch(() => {
        showToast('❌ Propriété introuvable');
        setListing(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Early returns AFTER all hooks
  if (loading) return (
    <p style={{ textAlign: 'center', padding: 80, background: 'var(--cream)', minHeight: '100vh' }}>
      Chargement...
    </p>
  );

  if (!listing) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'var(--cream)' }}>
      <h2 style={{ color: 'var(--navy)' }}>Propriété introuvable</h2>
      <button className="btn-gold" onClick={() => navigate('/stays')}>Retour aux séjours</button>
    </div>
  );

  // ✅ Images come from DB field (falls back to single img)
 const images = listing.img?.length ? listing.img : [];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Back button */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '110px 40px 0' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.2)', color: 'var(--navy)', borderRadius: '50px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition)', marginBottom: '12px' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          ← Retour
        </button>
      </div>

      {/* Gallery — uses DB images */}
      <ImageGallery images={images} listingName={listing.name} />

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 40px 60px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div>
          {/* Title + badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h1 style={{ color: 'var(--navy)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
              {listing.title}
            </h1>
            {listing.badge && (
              <div style={{ background: listing.badge === 'New' ? 'var(--gold)' : 'var(--navy)', color: listing.badge === 'New' ? 'var(--navy)' : 'var(--gold)', padding: '8px 18px', borderRadius: '50px', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginLeft: '16px', marginTop: '4px' }}>
                {listing.badge}
              </div>
            )}
          </div>

          <div style={{ color: 'var(--gray-3)', fontSize: '15px', marginBottom: '6px' }}>📍 {listing.location}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px' }}>
            <span style={{ color: 'var(--gold)' }}>★</span>
            <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '15px' }}>{listing.reviews?.rating}</span>
          </div>

          {/* Stats row — ✅ all from listing (DB) */}
          <div style={{ display: 'flex', gap: '32px', padding: '24px 0', borderTop: '1px solid var(--gray-2)', borderBottom: '1px solid var(--gray-2)', marginBottom: '40px', flexWrap: 'wrap' }}>
              {[
                { label: 'Voyageurs',      value: listing.voyageurs     || '—' },
                { label: 'Chambres',       value: listing.chambres      || '—' },
                { label: 'Salles de bain', value: listing.salle_de_bain || '—' },
                { label: 'Superficie',     value: listing.surface       || '—' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', minWidth: '70px' }}>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                  <div style={{ fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
          </div>

          {/* Description — ✅ from listing */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ marginBottom: '12px', color: 'var(--gold)' }}>À propos de ce logement</div>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
              {listing.description || 'Une propriété exceptionnelle qui vous attend.'}
            </p>
          </div>

          {/* Tags */}
          {listing.tags?.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div className="section-eyebrow" style={{ marginBottom: '16px', color: 'var(--gold)' }}>Points forts</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {listing.tags.map(t => (
                  <span key={t} style={{ background: 'var(--navy)', color: 'var(--gold)', padding: '8px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Host — ✅ from listing */}
          {listing.host && (
            <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: '32px', display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '48px' }}>
              <img
                src={listing.host.users.img} alt={listing.host.name}
                style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)' }}
                onError={e => { e.target.src = 'https://randomuser.me/api/portraits/women/44.jpg'; }}
              />
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Votre hôte</div>
                <div style={{ color: '#fff', fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{listing.host.users.full_name}</div>
                <div style={{ color: 'var(--gold)', fontSize: '13px', marginTop: '4px' }}>Hôte depuis {listing.host.years_since_beginning} · {listing.host.reviews} avis</div>
              </div>
              <button
                style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)', borderRadius: '50px', padding: '10px 22px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, transition: 'var(--transition)' }}
                onClick={() => showToast && showToast('💬 Message envoyé à l\'hôte !')}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
              >
                Contacter l'hôte
              </button>
            </div>
          )}

          {/* Location Map — ✅ from listing */}
          <LocationMap
            location={listing.location}
            listingName={listing.name}
          />
        </div>

        {/* RIGHT COLUMN — Booking Card */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', border: '1px solid var(--gray-2)' }}>
            <div style={{ background: 'var(--navy)', padding: '28px 32px' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Tarif par nuit</div>
              <div style={{ color: '#fff', fontSize: '42px', fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.1, marginTop: '4px' }}>
                {listing.price.toLocaleString('fr-DZ')} DA
                <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--gold)' }}> / nuit</span>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--gold)' }}>★</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{listing.reviews.rating}</span>
              </div>
            </div>

            <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[['Arrivée', 'date'], ['Départ', 'date']].map(([label, type]) => (
                  <div key={label}>
                    <label style={{ fontSize: '11px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontWeight: 600 }}>{label}</label>
                    <input type={type} style={{ width: '100%', border: '1px solid var(--gray-2)', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--text-dark)', background: 'var(--cream)', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Voyageurs</label>
                <input type="number" min="1" max={listing.voyageurs || 10} defaultValue="2" 
                  style={{ width: '100%', border: '1px solid var(--gray-2)', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--text-dark)', background: 'var(--cream)', boxSizing: 'border-box' }} />
              </div>

              <button
                className="btn-gold"
                style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 700, borderRadius: '50px', marginTop: '4px', justifyContent: 'center' }}
                onClick={() => { if (onOpenBooking) onOpenBooking(listing.property_id); else showToast && showToast('🎉 Demande de réservation envoyée !'); }}
              >
                Réserver maintenant
              </button>

              <button
                style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 600, borderRadius: '50px', background: 'transparent', border: '1px solid var(--gray-2)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transition)' }}
                onClick={() => { setWishlist(w => !w); showToast && showToast(wishlist ? '💔 Retiré des favoris' : '❤️ Ajouté aux favoris'); }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-2)'}
              >
                {wishlist ? 'Sauvegardé' : 'Sauvegarder'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-3)', margin: 0 }}>
                Aucun paiement maintenant · Annulation gratuite sous 48h
              </p>
            </div>
          </div>

          {/* Price breakdown */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '24px', marginTop: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--gray-2)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 600, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Détail du prix (7 nuits)</div>
            {[
              [`${listing.price.toLocaleString('fr-DZ')} DA × 7 nuits`, `${(listing.price * 7).toLocaleString('fr-DZ')} DA`],
              ['Frais de ménage', '5 000 DA'],
              ['Frais de service', `${Math.round(listing.price * 0.14).toLocaleString('fr-DZ')} DA`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: 'var(--text-mid)' }}>
                <span>{label}</span><span>{val}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--gray-2)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', color: 'var(--navy)' }}>
              <span>Total</span>
              <span>{(listing.price * 7 + 5000 + Math.round(listing.price * 0.14)).toLocaleString('fr-DZ')} DA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties — ✅ from fetchProperties() */}
      {related.length > 0 && (
        <section style={{ background: 'var(--navy)', padding: '80px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)', marginBottom: '12px' }}>Propriétés similaires</div>
            <h2 className="section-title" style={{ color: '#fff', textAlign: 'center', marginBottom: '48px' }}>Vous pourriez aussi <em>aimer</em></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
              {related.map(l => (
                <div
                  key={l.id}
                  style={{ background: '#fff', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow)', transition: 'var(--transition)' }}
                  onClick={() => navigate(`/property/${l.property_id}`)}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <img src={l.img} alt={l.name} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} onError={e => { e.target.src = 'https://picsum.photos/id/104/600/450'; }} />
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ fontSize: '17px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: 'var(--navy)' }}>{l.name}</div>
                      <div style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '8px' }}>★ {l.reviews?.rating}</div>
                    </div>
                    <div style={{ color: 'var(--gray-3)', fontSize: '13px', marginBottom: '12px' }}>📍 {l.location}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '16px' }}>
                        {l.price.toLocaleString('fr-DZ')} DA
                        <span style={{ fontWeight: 400, color: 'var(--gray-3)', fontSize: '13px' }}> / nuit</span>
                      </div>
                      <button className="book-btn" onClick={e => { e.stopPropagation(); navigate(`/property/${l.property_id}`); }}>Voir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default PropertyDetailPage;