import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

function GuestPage() {
  const navigate = useNavigate()
  const guest    = JSON.parse(localStorage.getItem('guest'))

  if (!guest) { navigate('/'); return null }

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: '#f7f4ef' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48, padding: '32px', background: '#fff', borderRadius: 20, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#c9a84c', fontWeight: 700, flexShrink: 0 }}>
            {guest.full_name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ color: '#c9a84c', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Guest Account</div>
            <div style={{ color: '#1a1a2e', fontSize: 22, fontWeight: 700 }}>{guest.full_name}</div>
            <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 13, marginTop: 2 }}>{guest.email}</div>
          </div>
        </div>

        {/* Action Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          {[
            { icon: '🏠', label: 'Browse Stays',  sub: 'Find your next stay',   to: '/stays'    },
            { icon: '❤️', label: 'My Wishlist',    sub: 'Your saved properties', to: '/wishlist' },
            { icon: '📅', label: 'My Bookings',    sub: 'View booking history',  to: '/bookings' },
            { icon: '✏️', label: 'Edit Profile',   sub: 'Update your info',      to: '/profile'  },
          ].map(({ icon, label, sub, to }) => (
            <Link
              key={label}
              to={to}
              style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '28px 20px', textAlign: 'center', textDecoration: 'none', display: 'block', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', transition: 'border-color 0.2s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: 34, marginBottom: 12 }}>{icon}</div>
              <div style={{ color: '#1a1a2e', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{label}</div>
              <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: 12 }}>{sub}</div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default GuestPage