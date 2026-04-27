// src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsData } from '../data/data';

const extraDetails = {
  1: { description: 'Perchée au-dessus des eaux cristallines de la baie d\'Alger, Dar El Bahia est un chef-d\'œuvre de l\'artisanat algérien. Réveillez-vous au son des vagues, profitez d\'une piscine privée avec vue sur la mer et laissez notre chef préparer chaque soir une authentique cuisine algéroise. La villa peut accueillir jusqu\'à 10 hôtes dans cinq suites élégantes avec terrasses privées.', amenities: ['Vue mer', 'Terrasse privée', 'WiFi haut débit', 'Climatisation', 'Cuisine équipée', 'Parking', 'Sécurité 24h', 'Linge fourni'], host: { name: 'Nadia Bensalem', img: 'https://randomuser.me/api/portraits/women/44.jpg', joined: '2019', reviews: 134 }, guests: 10, bedrooms: 5, bathrooms: 5, size: '850 m²', coords: { lat: 36.7372, lng: 3.0864 }, neighborhood: 'Alger-Centre, Alger', locationNote: 'Situé en bord de mer, à 5 min de la Grande Poste d\'Alger et du front de mer de Bab El Oued.' },
  2: { description: 'Plongez dans l\'histoire vivante de la Casbah d\'Alger, classée au patrimoine mondial de l\'UNESCO. Ce riad du XIXe siècle a été méticuleusement restauré. Un patio central orné de zelliges et d\'une fontaine en marbre accueille les voyageurs en quête d\'authenticité. Les hôtes proposent chaque matin un petit-déjeuner traditionnel avec msemen et café.', amenities: ['Patio traditionnel', 'Fontaine intérieure', 'Petit-déjeuner inclus', 'Climatisation', 'WiFi', 'Terrasse sur les toits', 'Guide culturel', 'Linge fourni'], host: { name: 'Karim Hadj', img: 'https://randomuser.me/api/portraits/men/32.jpg', joined: '2017', reviews: 278 }, guests: 4, bedrooms: 2, bathrooms: 2, size: '180 m²', coords: { lat: 36.7842, lng: 3.0600 }, neighborhood: 'La Casbah, Alger', locationNote: 'Au cœur de la Casbah classée UNESCO, à 10 min à pied du port d\'Alger et du musée national du Bardo.' },
  3: { description: 'Avec la mer Méditerranée comme toile de fond, la Villa Atlas redéfinit le luxe oranais. Piscine privée, grand jardin arborisé et terrasse panoramique. Les intérieurs mêlent l\'architecture mauresque et le confort moderne. Service de conciergerie et transferts depuis l\'aéroport d\'Es-Sénia inclus.', amenities: ['Piscine privée', 'Grand jardin', 'Parking sécurisé', 'Barbecue', 'Conciergerie', 'Transfert aéroport', 'Plancher chauffant', 'WiFi', 'Climatisation'], host: { name: 'Fatima Zerrouki', img: 'https://randomuser.me/api/portraits/women/68.jpg', joined: '2016', reviews: 89 }, guests: 12, bedrooms: 6, bathrooms: 6, size: '1100 m²', coords: { lat: 35.6976, lng: -0.6337 }, neighborhood: 'Gambetta, Oran', locationNote: 'Quartier résidentiel calme d\'Oran, à 20 min de l\'aéroport d\'Es-Sénia et à 5 min de la plage de Mers El-Kébir.' },
  4: { description: 'Niché dans les contreforts verdoyants du Djurdjura, ce gîte est un sanctuaire de paix pour l\'âme. La vue sur les sommets enneigés est à couper le souffle. Randonnées guidées, cuisine kabyle authentique et nuits étoilées loin de la ville. Un retour à l\'essentiel dans un cadre naturel préservé.', amenities: ['Vue montagne', 'Randonnées guidées', 'Cuisine kabyle', 'Cheminée', 'Nature', 'Parking', 'WiFi', 'Linge fourni'], host: { name: 'Amar Idir', img: 'https://randomuser.me/api/portraits/men/46.jpg', joined: '2018', reviews: 356 }, guests: 6, bedrooms: 3, bathrooms: 3, size: '450 m²', coords: { lat: 36.7117, lng: 4.0492 }, neighborhood: 'Tizi Ouzou, Kabylie', locationNote: 'En bordure du Parc National du Djurdjura, à 1h30 d\'Alger. Accès aux pistes de ski de Tikjda en hiver.' },
  5: { description: 'Perdue dans les dunes de l\'Ahaggar, la Maison Sahara est une expérience hors du commun. Architecture traditionnelle touarègue, nuits sous un ciel étoilé incomparable et excursions en 4x4 au cœur du désert. Réveillez-vous au lever du soleil sur les ergs et découvrez les gravures rupestres millénaires.', amenities: ['Vue désert', 'Excursions 4x4', 'Nuits étoilées', 'Cuisine saharienne', 'Guide touareg', 'Climatisation', 'WiFi', 'Transfert'], host: { name: 'Moussa Ag', img: 'https://randomuser.me/api/portraits/men/52.jpg', joined: '2020', reviews: 112 }, guests: 4, bedrooms: 2, bathrooms: 2, size: '220 m²', coords: { lat: 22.7850, lng: 5.5228 }, neighborhood: 'Tamanrasset, Ahaggar', locationNote: 'À 15 min du centre de Tamanrasset, porte d\'entrée du massif du Hoggar et des gravures rupestres du Tassili.' },
  6: { description: 'Un appartement moderne au cœur de Constantine la Circulaire, avec une vue imprenable sur le célèbre Pont Sidi M\'Cid. Décoré avec goût, il offre tout le confort d\'un séjour en ville tout en étant à deux pas des monuments historiques et du marché central.', amenities: ['Vue pont', 'Central', 'Climatisation', 'WiFi', 'Cuisine équipée', 'Ascenseur', 'Sécurité', 'Linge fourni'], host: { name: 'Samira Bouchenak', img: 'https://randomuser.me/api/portraits/women/78.jpg', joined: '2021', reviews: 523 }, guests: 4, bedrooms: 2, bathrooms: 2, size: '130 m²', coords: { lat: 36.3650, lng: 6.6147 }, neighborhood: 'Sidi Mabrouk, Constantine', locationNote: 'Vue directe sur le Pont Sidi M\'Cid. À 5 min à pied du Palais du Bey et du marché central de Constantine.' },
  7: { description: 'Perché dans les forêts de cèdres des Aurès, ce chalet offre une escapade nature unique. Cheminée crépitante, air pur de montagne et sentiers de randonnée au départ de la porte. Idéal pour les amoureux de la nature souhaitant découvrir la beauté sauvage de l\'Algérie profonde.', amenities: ['Forêt de cèdres', 'Cheminée', 'Randonnée', 'Vue montagne', 'Calme absolu', 'BBQ', 'WiFi', 'Parking'], host: { name: 'Youcef Chaouia', img: 'https://randomuser.me/api/portraits/men/33.jpg', joined: '2019', reviews: 198 }, guests: 6, bedrooms: 3, bathrooms: 2, size: '200 m²', coords: { lat: 35.5554, lng: 6.1730 }, neighborhood: 'Arris, Batna', locationNote: 'Dans les Aurès, à 30 min des gorges de Tighanimine. Idéal pour explorer le Parc National de Belezma.' },
  8: { description: 'Cette villa de bord de mer à Annaba bénéficie d\'un accès direct à la plage de Chetaïbi. Piscine, barbecue et terrasse donnant sur la Méditerranée. À quelques minutes du parc national de l\'Edough et des ruines romaines d\'Hippone. Le cadre parfait pour des vacances familiales inoubliables.', amenities: ['Accès plage', 'Piscine', 'Barbecue', 'Terrasse mer', 'Parking', 'Climatisation', 'WiFi', 'Cuisine équipée'], host: { name: 'Leïla Mansouri', img: 'https://randomuser.me/api/portraits/women/91.jpg', joined: '2018', reviews: 307 }, guests: 8, bedrooms: 4, bathrooms: 3, size: '350 m²', coords: { lat: 36.9000, lng: 7.7667 }, neighborhood: 'El Bouni, Annaba', locationNote: 'À 5 min de la plage de la Caroube et 15 min des ruines romaines d\'Hippone. Proche du port d\'Annaba.' },
};

// Get all images for a listing by id
function getListingImages(id) {
  return listingsData.filter(l => l.id === id).map(l => l.img);
}

// Modal for "Afficher toutes les photos"
function PhotoModal({ images, onClose, startIndex = 0 }) {
  const [current, setCurrent] = useState(startIndex);
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setCurrent(c => Math.min(c + 1, images.length - 1)); if (e.key === 'ArrowLeft') setCurrent(c => Math.max(c - 1, 0)); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length, onClose]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>{current + 1} / {images.length}</span>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>
      {/* Main image */}
      <div style={{ position: 'relative', maxWidth: '900px', width: '90%' }}>
        <img src={images[current]} alt={`Photo ${current + 1}`} style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', display: 'block' }} onError={e => { e.target.src = 'https://picsum.photos/id/104/1200/700'; }} />
        {current > 0 && (
          <button onClick={() => setCurrent(c => c - 1)} style={{ position: 'absolute', left: '-56px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>‹</button>
        )}
        {current < images.length - 1 && (
          <button onClick={() => setCurrent(c => c + 1)} style={{ position: 'absolute', right: '-56px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>›</button>
        )}
      </div>
      {/* Thumbnails strip */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px', overflowX: 'auto', maxWidth: '90%', padding: '4px' }}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Miniature ${i + 1}`} onClick={() => setCurrent(i)}
            style={{ width: '72px', height: '52px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: i === current ? '2px solid var(--gold, #C9A84C)' : '2px solid transparent', opacity: i === current ? 1 : 0.6, flexShrink: 0, transition: 'all 0.2s' }} />
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
  const grid = images.slice(1, 5);
  // Fill with placeholders if less than 4
  while (grid.length < 4) grid.push(null);

  const openModal = (index) => { setModalStart(index); setModalOpen(true); };

  return (
    <>
      {/* Title bar with Share & Save */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 40px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '13px', color: 'var(--gold, #C9A84C)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--gold, #C9A84C)' }}></span>
            {listingName}
          </div>
        </div>
        {/* Share & Save buttons */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: 'var(--navy, #0B1426)', padding: '8px 12px', borderRadius: '8px', textDecoration: 'underline', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Partager
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, color: 'var(--navy, #0B1426)', padding: '8px 12px', borderRadius: '8px', textDecoration: 'underline', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            Enregistrer
          </button>
        </div>
      </div>

      {/* Gallery grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '260px 260px', gap: '8px', borderRadius: '16px', overflow: 'hidden' }}>

          {/* Big image - left, full height */}
          <div style={{ gridRow: '1 / 3', position: 'relative', cursor: 'pointer', overflow: 'hidden' }} onClick={() => openModal(0)}>
            <img src={main} alt={listingName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onError={e => { e.target.src = 'https://picsum.photos/id/104/1200/700'; }} />
          </div>

          {/* 4 small images - right 2x2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '260px 260px', gap: '8px', gridRow: '1 / 3' }}>
            {grid.map((img, i) => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden', cursor: img ? 'pointer' : 'default', background: 'var(--gray-1, #f5f5f5)' }}
                onClick={() => img && openModal(i + 1)}>
                {img ? (
                  <img src={img} alt={`Photo ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    onError={e => { e.target.src = 'https://picsum.photos/id/104/600/400'; }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--gray-2, #e8e8e8)' }} />
                )}
                {/* "Afficher toutes les photos" button on last cell */}
                {i === 3 && images.length > 1 && (
                  <button onClick={e => { e.stopPropagation(); openModal(0); }}
                    style={{ position: 'absolute', bottom: '16px', right: '16px', background: '#fff', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'box-shadow 0.2s' }}
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

// Airbnb-style location map section
function LocationMap({ coords, neighborhood, locationNote, listingName }) {
  if (!coords) return null;

  const { lat, lng } = coords;
  // Google Maps embed URL (no API key needed for basic embed)
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  // Google Maps link to open in new tab
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <div style={{ marginBottom: '48px' }}>
      {/* Section header */}
      <div className="section-eyebrow" style={{ marginBottom: '8px', color: 'var(--gold)' }}>Où vous serez</div>
      <h3 style={{ fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: 'var(--navy)', margin: '0 0 4px' }}>
        {neighborhood}
      </h3>
      {locationNote && (
        <p style={{ fontSize: '14px', color: 'var(--text-mid)', margin: '0 0 20px', lineHeight: '1.6' }}>
          {locationNote}
        </p>
      )}

      {/* Map container */}
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

        {/* Airbnb-style blurred circle overlay on the pin */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px', height: '120px',
          borderRadius: '50%',
          background: 'rgba(11, 20, 38, 0.18)',
          backdropFilter: 'blur(4px)',
          border: '3px solid rgba(201, 168, 76, 0.6)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '18px', height: '18px',
          borderRadius: '50%',
          background: 'var(--gold, #C9A84C)',
          border: '3px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          pointerEvents: 'none',
          zIndex: 3,
        }} />
      </div>

      {/* Open in Google Maps link */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          marginTop: '14px', fontSize: '14px', fontWeight: 600,
          color: 'var(--navy)', textDecoration: 'underline',
          fontFamily: 'inherit', cursor: 'pointer',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--navy)'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        Ouvrir dans Google Maps
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
    </div>
  );
}

function PropertyDetailPage({ showToast, onOpenBooking }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listingsData.find(l => l.id === parseInt(id));
  const details = extraDetails[parseInt(id)] || {};
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!listing) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'var(--cream)' }}>
        <h2 style={{ color: 'var(--navy)' }}>Propriété introuvable</h2>
        <button className="btn-gold" onClick={() => navigate('/stays')}>Retour aux séjours</button>
      </div>
    );
  }

  const images = getListingImages(listing.id);
  const related = listingsData.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 3);

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

      {/* Airbnb-style Gallery */}
      <ImageGallery images={images} listingName={listing.name} />

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 40px 60px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div>
          {/* Title + badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h1 style={{ color: 'var(--navy)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, lineHeight: 1.15 }}>
              {listing.name}
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
            <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '15px' }}>{listing.rating}</span>
            <span style={{ color: 'var(--gray-3)', fontSize: '14px' }}>· {listing.reviews} avis</span>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '32px', padding: '24px 0', borderTop: '1px solid var(--gray-2)', borderBottom: '1px solid var(--gray-2)', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[
              { label: 'Voyageurs', value: details.guests || '—' },
              { label: 'Chambres', value: details.bedrooms || '—' },
              { label: 'Salles de bain', value: details.bathrooms || '—' },
              { label: 'Superficie', value: details.size || '—' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', minWidth: '70px' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ marginBottom: '12px', color: 'var(--gold)' }}>À propos de ce logement</div>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
              {details.description || 'Une propriété exceptionnelle qui vous attend.'}
            </p>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ marginBottom: '16px', color: 'var(--gold)' }}>Points forts</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {listing.tags.map(t => (
                <span key={t} style={{ background: 'var(--navy)', color: 'var(--gold)', padding: '8px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          {details.amenities && (
            <div style={{ marginBottom: '48px' }}>
              <div className="section-eyebrow" style={{ marginBottom: '20px', color: 'var(--gold)' }}>Équipements</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                {details.amenities.map(a => (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(11,20,38,0.06)', fontSize: '14px', color: 'var(--text-mid)', fontWeight: 500 }}>
                    <span style={{ color: 'var(--gold)', fontSize: '16px' }}>✦</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host */}
          {details.host && (
            <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: '32px', display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '48px' }}>
              <img src={details.host.img} alt={details.host.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)' }} onError={e => { e.target.src = 'https://randomuser.me/api/portraits/women/44.jpg'; }} />
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Votre hôte</div>
                <div style={{ color: '#fff', fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{details.host.name}</div>
                <div style={{ color: 'var(--gold)', fontSize: '13px', marginTop: '4px' }}>Hôte depuis {details.host.joined} · {details.host.reviews} avis</div>
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

          {/* Location Map */}
          <LocationMap
            coords={details.coords}
            neighborhood={details.neighborhood}
            locationNote={details.locationNote}
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
                <span style={{ color: '#fff', fontWeight: 600 }}>{listing.rating}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>· {listing.reviews} avis</span>
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
                <input type="number" min="1" max={details.guests || 10} defaultValue="2" style={{ width: '100%', border: '1px solid var(--gray-2)', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--text-dark)', background: 'var(--cream)', boxSizing: 'border-box' }} />
              </div>

              <button
                className="btn-gold"
                style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 700, borderRadius: '50px', marginTop: '4px' }}
                onClick={() => { if (onOpenBooking) onOpenBooking(listing.id); else showToast && showToast('🎉 Demande de réservation envoyée !'); }}
              >
                Réserver maintenant
              </button>

              <button
                style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 600, borderRadius: '50px', background: 'transparent', border: '1px solid var(--gray-2)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transition)' }}
                onClick={() => { setWishlist(w => !w); showToast && showToast(wishlist ? '💔 Retiré des favoris' : '❤️ Ajouté aux favoris'); }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-2)'}
              >
                {wishlist ? '♥' : '♡'} {wishlist ? 'Sauvegardé' : 'Sauvegarder'}
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

      {/* Related Properties */}
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
                  onClick={() => navigate(`/property/${l.id}`)}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <img src={l.img} alt={l.name} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} onError={e => { e.target.src = 'https://picsum.photos/id/104/600/450'; }} />
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ fontSize: '17px', fontFamily: "'Playfair Display', serif", fontWeight: 600, color: 'var(--navy)' }}>{l.name}</div>
                      <div style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '8px' }}>★ {l.rating}</div>
                    </div>
                    <div style={{ color: 'var(--gray-3)', fontSize: '13px', marginBottom: '12px' }}>📍 {l.location}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '16px' }}>{l.price.toLocaleString('fr-DZ')} DA<span style={{ fontWeight: 400, color: 'var(--gray-3)', fontSize: '13px' }}> / nuit</span></div>
                      <button className="book-btn" onClick={e => { e.stopPropagation(); navigate(`/property/${l.id}`); }}>Voir</button>
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


