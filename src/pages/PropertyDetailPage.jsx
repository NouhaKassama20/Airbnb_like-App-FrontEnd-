// src/pages/PropertyDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsData } from '../data/data';

const extraDetails = {
  1: { description: 'Perched above the crystalline waters of the Amalfi Coast, Villa Serenita is a masterpiece of Italian craftsmanship. Wake to the sound of waves, enjoy a private infinity pool overlooking the sea, and let our in-house chef prepare authentic Campanian cuisine each evening. The villa sleeps up to 10 guests across five elegantly appointed suites, each with hand-painted ceilings and private terraces.', amenities: ['Infinity Pool', 'Private Chef', 'Sea View Terraces', 'Wine Cellar', 'Concierge Service', 'Air Conditioning', 'Spa & Hammam', 'Boat Access', 'WiFi', 'Parking'], host: { name: 'Giulia Rossi', img: 'https://randomuser.me/api/portraits/women/44.jpg', joined: '2019', reviews: 218 }, guests: 10, bedrooms: 5, bathrooms: 5, size: '850 m²' },
  2: { description: 'Step into a living work of art. This meticulously restored 19th-century machiya townhouse sits in the heart of Kyoto\'s most serene neighbourhood. A zen garden of raked gravel and moss frames the interior courtyards. In the evening, paper lanterns illuminate the engawa walkway. A private tea room invites quiet contemplation, and the hosts offer optional guided ceremonies each morning.', amenities: ['Zen Garden', 'Tea Room', 'Traditional Engawa', 'Futon Bedding', 'Tatami Floors', 'Yukata Robes', 'Bike Rental', 'WiFi', 'Breakfast Included'], host: { name: 'Yuki Nakamura', img: 'https://randomuser.me/api/portraits/women/68.jpg', joined: '2017', reviews: 341 }, guests: 4, bedrooms: 2, bathrooms: 2, size: '180 m²' },
  3: { description: 'With the Matterhorn as your permanent backdrop, Alpine Dream Chalet redefines mountain luxury. Ski-in/ski-out access via a private slope, a cedar hot tub under a canopy of stars, and a wood-burning fireplace that warms every corner. Local pine and stone define the interiors — a space that feels carved from the mountain itself. Butler service and airport transfers included.', amenities: ['Ski-in/Ski-out', 'Cedar Hot Tub', 'Fireplace', 'Butler Service', 'Steam Room', 'Games Room', 'Heated Floors', 'Airport Transfer', 'WiFi', 'Parking'], host: { name: 'Hans Zimmermann', img: 'https://randomuser.me/api/portraits/men/32.jpg', joined: '2016', reviews: 127 }, guests: 12, bedrooms: 6, bathrooms: 6, size: '1100 m²' },
  4: { description: 'Hidden within Ubud\'s lush jungle canopy, this retreat is an open-air sanctuary for the soul. The architectural vision blurs boundaries — the infinity pool seems to merge with the rice terraces below, while the yoga shala opens entirely to the forest. Wake to birdsong, practice sunrise yoga, and cool off beneath a natural waterfall. Fully staffed with a private butler, chef, and wellness guide.', amenities: ['Jungle Pool', 'Yoga Shala', 'Waterfall', 'Private Chef', 'Wellness Guide', 'Outdoor Shower', 'Rice Terrace View', 'Bicycle', 'WiFi', 'Daily Cleaning'], host: { name: 'Made Sari', img: 'https://randomuser.me/api/portraits/women/52.jpg', joined: '2018', reviews: 489 }, guests: 6, bedrooms: 3, bathrooms: 3, size: '450 m²' },
  5: { description: 'Carved into the caldera cliffs of Oia, Santorini Cliffside is the ultimate expression of Cycladic luxury. The cave suite architecture — white-washed domes, arched windows, deep blue accents — is punctuated by an impossible infinity pool that seems to pour into the Aegean. Watch the world-famous Santorini sunset from your private terrace with a glass of Assyrtiko wine in hand.', amenities: ['Infinity Pool', 'Cave Suite', 'Caldera View', 'Private Terrace', 'Jacuzzi', 'Daily Housekeeping', 'Concierge', 'Breakfast Basket', 'WiFi', 'Airport Transfer'], host: { name: 'Elena Papadaki', img: 'https://randomuser.me/api/portraits/women/78.jpg', joined: '2020', reviews: 163 }, guests: 4, bedrooms: 2, bathrooms: 2, size: '220 m²' },
  6: { description: 'An entire floor of a converted 1920s factory in DUMBO, Brooklyn — raw but refined. Original exposed brick meets bespoke furniture by local artisans, and a wraparound terrace offers unobstructed views of the Manhattan Bridge. Walking distance to the best coffee, galleries, and restaurants in New York. A creative space for those who want the city at their feet and art on every wall.', amenities: ['Terrace', 'Manhattan Bridge View', 'Full Kitchen', 'Home Studio', 'Art Collection', 'Record Player', 'Smart TV', 'Doorman', 'Elevator', 'WiFi'], host: { name: 'Marcus Webb', img: 'https://randomuser.me/api/portraits/men/46.jpg', joined: '2015', reviews: 702 }, guests: 6, bedrooms: 3, bathrooms: 2, size: '320 m²' },
  7: { description: 'Where the Oregon coast meets old-growth forest. This custom-built cabin sits on a secluded bluff 30 metres above a private beach, accessible only via a cedar staircase carved through the pines. A wood-burning stove, copper soaking tub, and hand-stitched quilts create a cocoon of warmth against the Pacific winds. Perfect for stargazing, beach-combing, and absolute quiet.', amenities: ['Private Beach', 'Fireplace', 'Copper Soaking Tub', 'Deck', 'Kayaks', 'Fishing Gear', 'Board Games', 'Outdoor BBQ', 'WiFi', 'Pet Friendly'], host: { name: 'Rachel Storms', img: 'https://randomuser.me/api/portraits/women/33.jpg', joined: '2021', reviews: 287 }, guests: 4, bedrooms: 2, bathrooms: 1, size: '95 m²' },
  8: { description: 'A Haussmann-era apartment on one of Le Marais\' most coveted streets, lovingly restored to its Second Empire grandeur. Original chevron parquet floors, gilded cornices, and floor-to-ceiling French doors opening onto a private Juliet balcony. Moments from the Place des Vosges, the Picasso Museum, and Paris\' finest patisseries. This is Paris at its most romantic.', amenities: ['Juliet Balcony', 'Parquet Floors', 'Historic Details', 'Central Location', 'Fully Equipped Kitchen', 'Nespresso Machine', 'Smart TV', 'A/C', 'WiFi', 'Concierge'], host: { name: 'Isabelle Moreau', img: 'https://randomuser.me/api/portraits/women/91.jpg', joined: '2018', reviews: 412 }, guests: 4, bedrooms: 2, bathrooms: 2, size: '130 m²' },
};

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
        <h2 style={{ color: 'var(--navy)' }}>Property not found</h2>
        <button className="btn-gold" onClick={() => navigate('/stays')}>Back to Stays</button>
      </div>
    );
  }

  const related = listingsData.filter(l => l.id !== listing.id && l.category === listing.category).slice(0, 3);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* Hero Image */}
      <div style={{ position: 'relative', width: '100%', height: '65vh', overflow: 'hidden' }}>
        <img
          src={listing.img}
          alt={listing.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.src = 'https://picsum.photos/id/104/1200/700'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,20,38,0.3) 0%, transparent 40%, rgba(11,20,38,0.5) 100%)' }} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '110px', left: '40px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: '50px', padding: '10px 20px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          ← Back
        </button>

        {/* Badge */}
        {listing.badge && (
          <div style={{ position: 'absolute', top: '110px', right: '40px', background: listing.badge === 'New' ? 'var(--gold)' : 'var(--navy)', color: listing.badge === 'New' ? 'var(--navy)' : 'var(--gold)', padding: '8px 18px', borderRadius: '50px', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {listing.badge}
          </div>
        )}

        {/* Title overlay */}
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
          <div style={{ color: 'var(--gold)', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'block', width: '30px', height: '1px', background: 'var(--gold)' }}></span>
            {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 4rem)', fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, lineHeight: 1.1, textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            {listing.name}
          </h1>
          <div style={{ color: 'rgba(255,255,255,0.85)', marginTop: '10px', fontSize: '16px' }}>
            📍 {listing.location}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: '40px', padding: '28px 0', borderBottom: '1px solid var(--gray-2)', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[
              { label: 'Guests', value: details.guests || '—' },
              { label: 'Bedrooms', value: details.bedrooms || '—' },
              { label: 'Bathrooms', value: details.bathrooms || '—' },
              { label: 'Size', value: details.size || '—' },
              { label: 'Rating', value: `★ ${listing.rating}` },
              { label: 'Reviews', value: listing.reviews },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', minWidth: '70px' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--navy)', fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ marginBottom: '12px', color: 'var(--gold)' }}>About This Property</div>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
              {details.description || 'A truly exceptional property awaiting your arrival.'}
            </p>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ marginBottom: '16px', color: 'var(--gold)' }}>Highlights</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {listing.tags.map(t => (
                <span key={t} style={{ background: 'var(--navy)', color: 'var(--gold)', padding: '8px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Amenities */}
          {details.amenities && (
            <div style={{ marginBottom: '48px' }}>
              <div className="section-eyebrow" style={{ marginBottom: '20px', color: 'var(--gold)' }}>Amenities</div>
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
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>Your Host</div>
                <div style={{ color: '#fff', fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>{details.host.name}</div>
                <div style={{ color: 'var(--gold)', fontSize: '13px', marginTop: '4px' }}>Hosting since {details.host.joined} · {details.host.reviews} reviews</div>
              </div>
              <button
                style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)', borderRadius: '50px', padding: '10px 22px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, transition: 'var(--transition)' }}
                onClick={() => showToast('💬 Message sent to host!')}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
              >
                Message Host
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — Booking Card */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', border: '1px solid var(--gray-2)' }}>
            <div style={{ background: 'var(--navy)', padding: '28px 32px' }}>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Nightly Rate</div>
              <div style={{ color: '#fff', fontSize: '42px', fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.1, marginTop: '4px' }}>
                ${listing.price}
                <span style={{ fontSize: '18px', fontWeight: 400, color: 'var(--gold)' }}> / night</span>
              </div>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--gold)' }}>★</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{listing.rating}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>· {listing.reviews} reviews</span>
              </div>
            </div>

            <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[['Check In', 'date'], ['Check Out', 'date']].map(([label, type]) => (
                  <div key={label}>
                    <label style={{ fontSize: '11px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontWeight: 600 }}>{label}</label>
                    <input type={type} style={{ width: '100%', border: '1px solid var(--gray-2)', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--text-dark)', background: 'var(--cream)', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: '11px', color: 'var(--gray-3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Guests</label>
                <input type="number" min="1" max={details.guests || 10} defaultValue="2" style={{ width: '100%', border: '1px solid var(--gray-2)', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontFamily: 'inherit', color: 'var(--text-dark)', background: 'var(--cream)', boxSizing: 'border-box' }} />
              </div>

              <button
                className="btn-gold"
                style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 700, borderRadius: '50px', marginTop: '4px' }}
                onClick={() => { if (onOpenBooking) onOpenBooking(listing.id); else showToast('🎉 Booking request sent!'); }}
              >
                Reserve Now
              </button>

              <button
                style={{ width: '100%', padding: '14px', fontSize: '14px', fontWeight: 600, borderRadius: '50px', background: 'transparent', border: '1px solid var(--gray-2)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transition)' }}
                onClick={() => { setWishlist(w => !w); showToast(wishlist ? '💔 Removed from wishlist' : '❤️ Saved to wishlist'); }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-2)'}
              >
                {wishlist ? '♥' : '♡'} {wishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-3)', margin: 0 }}>
                You won't be charged yet · Free cancellation within 48h
              </p>
            </div>
          </div>

          {/* Price breakdown */}
          <div style={{ background: '#fff', borderRadius: 'var(--radius)', padding: '24px', marginTop: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--gray-2)' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-mid)', fontWeight: 600, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Price Details (7 nights)</div>
            {[
              [`$${listing.price} × 7 nights`, `$${listing.price * 7}`],
              ['Cleaning fee', '$85'],
              ['Service fee', `$${Math.round(listing.price * 0.14)}`],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: 'var(--text-mid)' }}>
                <span>{label}</span><span>{val}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--gray-2)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', color: 'var(--navy)' }}>
              <span>Total</span>
              <span>${listing.price * 7 + 85 + Math.round(listing.price * 0.14)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {related.length > 0 && (
        <section style={{ background: 'var(--navy)', padding: '80px 40px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)', marginBottom: '12px' }}>Similar Properties</div>
            <h2 className="section-title" style={{ color: '#fff', textAlign: 'center', marginBottom: '48px' }}>You Might Also <em>Love</em></h2>
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
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '16px' }}>${l.price}<span style={{ fontWeight: 400, color: 'var(--gray-3)', fontSize: '13px' }}> / night</span></div>
                      <button className="book-btn" onClick={e => { e.stopPropagation(); navigate(`/property/${l.id}`); }}>View</button>
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
