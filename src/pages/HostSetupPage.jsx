// src/pages/HostSetupPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PROPERTY_TYPES = [
  { id: 'entire', icon: '🏠', label: 'Entire Home', desc: 'Guests have the whole place to themselves' },
  { id: 'private', icon: '🚪', label: 'Private Room', desc: 'Guests have their own room in a shared home' },
  { id: 'shared', icon: '🛋️', label: 'Shared Room', desc: 'Guests sleep in a shared space' },
  { id: 'villa', icon: '🏡', label: 'Villa', desc: 'Standalone luxury villa with full amenities' },
];

const AMENITIES = [
  { id: 'wifi', icon: '📶', label: 'WiFi' },
  { id: 'kitchen', icon: '🍳', label: 'Kitchen' },
  { id: 'ac', icon: '❄️', label: 'Air Conditioning' },
  { id: 'parking', icon: '🚗', label: 'Free Parking' },
  { id: 'pool', icon: '🏊', label: 'Pool' },
  { id: 'gym', icon: '💪', label: 'Gym' },
  { id: 'tv', icon: '📺', label: 'Smart TV' },
  { id: 'washer', icon: '🫧', label: 'Washer/Dryer' },
  { id: 'workspace', icon: '💼', label: 'Workspace' },
  { id: 'pets', icon: '🐾', label: 'Pets Allowed' },
  { id: 'bbq', icon: '🔥', label: 'BBQ Grill' },
  { id: 'garden', icon: '🌿', label: 'Garden/Patio' },
];

const STEPS = ['Property Type', 'Details', 'Amenities', 'Pricing', 'Review'];

function HostSetupPage({ showToast }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    propertyType: '',
    title: '',
    description: '',
    address: '',
    city: '',
    country: '',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: [],
    pricePerNight: '',
    cleaningFee: '',
    minNights: 1,
    photos: ''
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const toggleAmenity = (id) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }));
  };

  const canNext = () => {
    if (step === 0) return !!form.propertyType;
    if (step === 1) return form.title && form.address && form.city && form.country;
    if (step === 2) return form.amenities.length > 0;
    if (step === 3) return !!form.pricePerNight;
    return true;
  };

  const handleNext = () => {
    if (!canNext()) { showToast('⚠️ Please complete all required fields.'); return; }
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('🎉 Your listing has been submitted for review!');
      navigate('/host');
    }, 1600);
  };

  const CardBox = ({ children, style = {} }) => (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(201,168,76,0.15)',
      borderRadius: 'var(--radius)',
      padding: '32px',
      backdropFilter: 'blur(10px)',
      ...style
    }}>
      {children}
    </div>
  );

  const Label = ({ children, required }) => (
    <label style={{
      display: 'block',
      color: 'rgba(255,255,255,0.7)',
      fontSize: '13px',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      marginBottom: '8px',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {children}{required && <span style={{ color: 'var(--gold)', marginLeft: '4px' }}>*</span>}
    </label>
  );

  const Input = ({ type = 'text', placeholder, value, onChange, min, style = {} }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      min={min}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '10px',
        padding: '14px 16px',
        color: 'var(--white)',
        fontSize: '15px',
        fontFamily: "'DM Sans', sans-serif",
        outline: 'none',
        transition: 'border-color 0.3s',
        ...style
      }}
      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
      onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
    />
  );

  const Counter = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'var(--white)', cursor: 'pointer', fontSize: '18px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
          }}
        >−</button>
        <span style={{ color: 'var(--white)', fontWeight: 600, minWidth: '24px', textAlign: 'center', fontSize: '16px' }}>{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--gold)', cursor: 'pointer', fontSize: '18px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
          }}
        >+</button>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      padding: '120px 24px 80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* BG glows */}
      <div style={{ position: 'fixed', top: '-200px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-eyebrow" style={{ color: 'var(--gold)', marginBottom: '12px' }}>
            List Your Space
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '8px'
          }}>
            Create Your <em style={{ color: 'var(--gold-light)' }}>Listing</em>.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: "'DM Sans', sans-serif" }}>
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.08)', borderRadius: '100px', height: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${((step + 1) / STEPS.length) * 100}%`,
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            borderRadius: '100px',
            transition: 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }} />
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '12px',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              letterSpacing: '0.04em',
              background: i === step ? 'rgba(201,168,76,0.15)' : i < step ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.05)',
              color: i === step ? 'var(--gold)' : i < step ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.3)',
              border: i === step ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
              transition: 'all 0.3s'
            }}>
              {i < step ? '✓ ' : ''}{s}
            </div>
          ))}
        </div>

        {/* ── Step 0: Property Type ── */}
        {step === 0 && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px' }}>
              What type of space are you listing?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {PROPERTY_TYPES.map(pt => (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => update('propertyType', pt.id)}
                  style={{
                    background: form.propertyType === pt.id ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                    border: form.propertyType === pt.id ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius)',
                    padding: '24px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{pt.icon}</div>
                  <div style={{ color: 'var(--white)', fontWeight: 600, marginBottom: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '16px' }}>{pt.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{pt.desc}</div>
                  {form.propertyType === pt.id && (
                    <div style={{ marginTop: '12px', color: 'var(--gold)', fontSize: '13px', fontWeight: 600 }}>✓ Selected</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 1: Details ── */}
        {step === 1 && (
          <CardBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Label required>Listing Title</Label>
                <Input
                  placeholder="e.g. Cozy Beachfront Retreat with Ocean Views"
                  value={form.title}
                  onChange={v => update('title', v)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  placeholder="Describe your space, what makes it special, nearby attractions..."
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    color: 'var(--white)',
                    fontSize: '15px',
                    fontFamily: "'DM Sans', sans-serif",
                    outline: 'none',
                    resize: 'vertical',
                    lineHeight: 1.6
                  }}
                />
              </div>
              <div>
                <Label required>Street Address</Label>
                <Input
                  placeholder="123 Seaside Boulevard"
                  value={form.address}
                  onChange={v => update('address', v)}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <Label required>City</Label>
                  <Input placeholder="Santorini" value={form.city} onChange={v => update('city', v)} />
                </div>
                <div>
                  <Label required>Country</Label>
                  <Input placeholder="Greece" value={form.country} onChange={v => update('country', v)} />
                </div>
              </div>

              <div style={{ paddingTop: '8px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', marginBottom: '8px' }}>Capacity</p>
                <Counter label="Bedrooms" value={form.bedrooms} onChange={v => update('bedrooms', v)} />
                <Counter label="Bathrooms" value={form.bathrooms} onChange={v => update('bathrooms', v)} />
                <Counter label="Max Guests" value={form.maxGuests} onChange={v => update('maxGuests', v)} />
              </div>

              <div>
                <Label>Photo URL (optional)</Label>
                <Input
                  placeholder="https://yourphotos.com/cover.jpg"
                  value={form.photos}
                  onChange={v => update('photos', v)}
                />
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginTop: '6px', fontFamily: "'DM Sans', sans-serif" }}>
                  You can upload full photos after listing is created
                </p>
              </div>
            </div>
          </CardBox>
        )}

        {/* ── Step 2: Amenities ── */}
        {step === 2 && (
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px' }}>
              Select all amenities your space offers.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
              {AMENITIES.map(a => {
                const selected = form.amenities.includes(a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleAmenity(a.id)}
                    style={{
                      background: selected ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                      border: selected ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s'
                    }}
                  >
                    <span style={{ fontSize: '24px' }}>{a.icon}</span>
                    <span style={{ color: selected ? 'var(--gold)' : 'rgba(255,255,255,0.7)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", fontWeight: selected ? 600 : 400, transition: 'color 0.3s' }}>{a.label}</span>
                  </button>
                );
              })}
            </div>
            {form.amenities.length > 0 && (
              <p style={{ color: 'var(--gold)', fontSize: '13px', marginTop: '16px', fontFamily: "'DM Sans', sans-serif" }}>
                ✓ {form.amenities.length} amenit{form.amenities.length === 1 ? 'y' : 'ies'} selected
              </p>
            )}
          </div>
        )}

        {/* ── Step 3: Pricing ── */}
        {step === 3 && (
          <CardBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <Label required>Price per night (USD)</Label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', fontWeight: 700, fontSize: '18px', zIndex: 1, pointerEvents: 'none' }}>$</span>
                  <Input
                    type="number"
                    placeholder="150"
                    value={form.pricePerNight}
                    onChange={v => update('pricePerNight', v)}
                    min="1"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>
              </div>
              <div>
                <Label>Cleaning fee (USD)</Label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', fontWeight: 700, fontSize: '18px', zIndex: 1, pointerEvents: 'none' }}>$</span>
                  <Input
                    type="number"
                    placeholder="40"
                    value={form.cleaningFee}
                    onChange={v => update('cleaningFee', v)}
                    min="0"
                    style={{ paddingLeft: '36px' }}
                  />
                </div>
              </div>
              <div>
                <Label>Minimum nights</Label>
                <Counter label="Minimum stay" value={form.minNights} onChange={v => update('minNights', v)} />
              </div>

              {form.pricePerNight && (
                <div style={{
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <p style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated monthly earnings</p>
                  <p style={{ color: 'var(--white)', fontSize: '28px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                    ${(parseFloat(form.pricePerNight) * 22).toLocaleString()}
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', fontFamily: "'DM Sans', sans-serif" }}> /mo (at 73% occupancy)</span>
                  </p>
                </div>
              )}
            </div>
          </CardBox>
        )}

        {/* ── Step 4: Review ── */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <CardBox>
              <h3 style={{ color: 'var(--gold)', fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', marginBottom: '20px' }}>Listing Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Type', value: PROPERTY_TYPES.find(p => p.id === form.propertyType)?.label },
                  { label: 'Title', value: form.title || '—' },
                  { label: 'Location', value: form.city && form.country ? `${form.city}, ${form.country}` : '—' },
                  { label: 'Address', value: form.address || '—' },
                  { label: 'Bedrooms', value: form.bedrooms },
                  { label: 'Bathrooms', value: form.bathrooms },
                  { label: 'Max Guests', value: form.maxGuests },
                  { label: 'Price / night', value: form.pricePerNight ? `$${form.pricePerNight}` : '—' },
                  { label: 'Cleaning fee', value: form.cleaningFee ? `$${form.cleaningFee}` : 'None' },
                  { label: 'Min. nights', value: form.minNights },
                  { label: 'Amenities', value: form.amenities.length ? `${form.amenities.length} selected` : 'None' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row.label}</span>
                    <span style={{ color: 'var(--white)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </CardBox>

            <div style={{
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              gap: '12px'
            }}>
              <span style={{ fontSize: '20px' }}>🛡️</span>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                Our team will review your listing within 24–48 hours. You'll be covered by our <strong style={{ color: 'var(--gold)' }}>$1M Host Protection</strong> from day one.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', gap: '16px' }}>
          <button
            type="button"
            onClick={() => step === 0 ? navigate('/host/login') : setStep(s => s - 1)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              padding: '14px 28px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = 'var(--white)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              className="btn-gold"
              onClick={handleNext}
              style={{ padding: '14px 36px', fontSize: '14px' }}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              className="btn-gold"
              onClick={handleSubmit}
              disabled={submitting}
              style={{ padding: '14px 36px', fontSize: '14px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}
            >
              {submitting ? 'Submitting…' : '🚀 Submit Listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HostSetupPage;
