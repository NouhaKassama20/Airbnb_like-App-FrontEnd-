// src/pages/HostDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HostDashboard({ showToast }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    location: '',
    price: '',
    img: '',
    tags: [],
    badge: '',
    category: '',
    description: '',
    video: '',
    status: 'pending'
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchProperties();
    fetchBookings();
  }, []);

  const fetchProperties = async () => {
  try {
    const host = JSON.parse(localStorage.getItem('host_user'));
    if (!host) return;
    const response = await fetch(`http://localhost:5000/api/host/properties?host_id=${host.host_id}`);
    const data = await response.json();
    if (response.ok) setProperties(data);
  } catch (err) {
    console.error('Error fetching properties:', err);
  } finally {
    setLoading(false);
  }
};

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/host/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setPropertyForm({
      title: '',
      location: '',
      price: '',
      img: '',
      tags: [],
      badge: '',
      category: '',
      description: '',
      video: '',
      status: 'pending'
    });
    setShowPropertyModal(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title,
      location: property.location,
      price: property.price,
      img: property.img || '',
      tags: property.tags || [],
      badge: property.badge || '',
      category: property.category || '',
      description: property.description || '',
      video: property.video || '',
      status: property.status
    });
    setShowPropertyModal(true);
  };

  const handleDeleteProperty = async (propertyId) => {
  if (!window.confirm('Are you sure you want to delete this property?')) return;
  try {
    const host = JSON.parse(localStorage.getItem('host_user'));
    const response = await fetch(
      `http://localhost:5000/api/host/properties/${propertyId}?host_id=${host.host_id}`,
      { method: 'DELETE' }
    );
    if (response.ok) {
      showToast('✅ Property deleted!');
      fetchProperties();
    }
  } catch (err) {
    showToast('❌ Error deleting property');
  }
};

  const handleSubmitProperty = async (e) => {
  e.preventDefault();

  if (!propertyForm.title || !propertyForm.location || !propertyForm.price) {
    showToast('⚠️ Please fill in all required fields.');
    return;
  }

  try {
    const host = JSON.parse(localStorage.getItem('host_user'));
    const url = editingProperty
      ? `http://localhost:5000/api/host/properties/${editingProperty.property_id}`
      : 'http://localhost:5000/api/host/properties';

    const method = editingProperty ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host_id: host.host_id,   // <-- this is the key part
        title: propertyForm.title,
        location: propertyForm.location,
        price: parseFloat(propertyForm.price),
        img: propertyForm.img || null,
        tags: propertyForm.tags,
        badge: propertyForm.badge || null,
        category: propertyForm.category || null,
        description: propertyForm.description || null,
        video: propertyForm.video || null,
        status: propertyForm.status
      })
    });

    if (response.ok) {
      showToast(editingProperty ? '✅ Property updated!' : '✅ Property added!');
      setShowPropertyModal(false);
      fetchProperties();
    } else {
      const data = await response.json();
      showToast(`❌ ${data.error}`);
    }
  } catch (err) {
    showToast('❌ Error saving property');
  }
};

  const handleBookingAction = async (bookingId, action) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/host/bookings/${bookingId}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        showToast(`✅ Booking ${action}d successfully!`);
        fetchBookings();
      } else {
        const data = await response.json();
        showToast(`❌ ${data.error}`);
      }
    } catch (err) {
      showToast('❌ Error processing booking');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !propertyForm.tags.includes(tagInput.trim())) {
      setPropertyForm({
        ...propertyForm,
        tags: [...propertyForm.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPropertyForm({
      ...propertyForm,
      tags: propertyForm.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/host');
    showToast('👋 Logged out successfully');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header -保持不变 */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: '20px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 90,
        zIndex: 100
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px',
            color: '#2c1810',
            margin: 0
          }}>
            Host Dashboard
          </h1>
          <p style={{ color: '#666', margin: '4px 0 0', fontSize: '14px' }}>
            Welcome back, {user?.full_name || 'Host'}!
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => setActiveTab('properties')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'properties' ? '#c9a84c' : 'transparent',
              color: activeTab === 'properties' ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            My Properties
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'bookings' ? '#c9a84c' : 'transparent',
              color: activeTab === 'bookings' ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Booking Requests
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '140px 48px' }}>
        
        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '8px' }}>My Properties</h2>
                <p style={{ color: '#666' }}>Manage your listings, add new spaces, or update existing ones.</p>
              </div>
              <button
                onClick={handleAddProperty}
                style={{
                  background: '#c9a84c',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                + Add New Property
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>
            ) : properties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px',
                background: 'white',
                borderRadius: '12px',
                color: '#999'
              }}>
                <p>No properties yet. Click "Add New Property" to get started!</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px'
              }}>
                {properties.map(property => (
                  <div key={property.property_id} style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    {property.img && (
                      <img 
                        src={property.img} 
                        alt={property.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <h3 style={{ fontSize: '18px', color: '#333', margin: 0 }}>{property.title}</h3>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          background: property.status === 'approved' ? '#e8f5e9' : '#fff3e0',
                          color: property.status === 'approved' ? '#2e7d32' : '#ed6c02'
                        }}>
                          {property.status || 'pending'}
                        </span>
                      </div>
                      
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
                        📍 {property.location}
                      </p>
                      
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#c9a84c', marginBottom: '12px' }}>
                        ${property.price} <span style={{ fontSize: '14px', color: '#999' }}>/night</span>
                      </p>
                      
                      {property.category && (
                        <p style={{ color: '#888', fontSize: '13px', marginBottom: '8px' }}>
                          Category: {property.category}
                        </p>
                      )}
                      
                      {property.badge && (
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: '#c9a84c20',
                          color: '#c9a84c',
                          borderRadius: '4px',
                          fontSize: '12px',
                          marginBottom: '12px'
                        }}>
                          {property.badge}
                        </span>
                      )}
                      
                      {property.tags && property.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {property.tags.map(tag => (
                            <span key={tag} style={{
                              padding: '4px 8px',
                              background: '#f0f0f0',
                              borderRadius: '4px',
                              fontSize: '12px',
                              color: '#666'
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #e0e0e0', paddingTop: '16px' }}>
                        <button
                          onClick={() => handleEditProperty(property)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: '#4c9aff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.property_id)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bookings Tab - Shows guests who want to rent */}
        {activeTab === 'bookings' && (
          <>
            <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '8px' }}>Guest Booking Requests</h2>
            <p style={{ color: '#666', marginBottom: '32px' }}>Guests who want to rent your properties.</p>

            {bookings.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px',
                background: 'white',
                borderRadius: '12px',
                color: '#999'
              }}>
                <p>No booking requests yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {bookings.map(booking => (
                  <div key={booking.booking_id} style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '4px' }}>
                          {booking.guest_name || 'Guest'}
                        </h3>
                        <p style={{ color: '#666', fontSize: '14px' }}>
                          📧 {booking.guest_email}
                        </p>
                        {booking.guest_phone && (
                          <p style={{ color: '#666', fontSize: '14px' }}>
                            📞 {booking.guest_phone}
                          </p>
                        )}
                      </div>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        background: booking.status === 'pending' ? '#fff3e0' : (booking.status === 'approved' ? '#e8f5e9' : '#ffebee'),
                        color: booking.status === 'pending' ? '#ed6c02' : (booking.status === 'approved' ? '#2e7d32' : '#d32f2f')
                      }}>
                        {booking.status || 'pending'}
                      </span>
                    </div>
                    
                    <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '16px', marginBottom: '16px' }}>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>🏠 Property:</strong> {booking.property_title}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>📅 Dates:</strong> {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>👥 Guests:</strong> {booking.guest_count} person{booking.guest_count !== 1 ? 's' : ''}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>📝 Message:</strong> {booking.message || 'No message provided'}
                      </p>
                      <p>
                        <strong>💰 Total Price:</strong> <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>${booking.total_price}</span>
                      </p>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={() => handleBookingAction(booking.booking_id, 'approve')}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          ✓ Approve Booking
                        </button>
                        <button
                          onClick={() => handleBookingAction(booking.booking_id, 'reject')}
                          style={{
                            flex: 1,
                            padding: '10px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          ✗ Reject Booking
                        </button>
                      </div>
                    )}
                    
                    {booking.status !== 'pending' && (
                      <div style={{
                        padding: '10px',
                        textAlign: 'center',
                        background: booking.status === 'approved' ? '#e8f5e9' : '#ffebee',
                        borderRadius: '6px',
                        color: booking.status === 'approved' ? '#2e7d32' : '#d32f2f'
                      }}>
                        This booking has been {booking.status}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Property Modal */}
      {showPropertyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflow: 'auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', color: '#333' }}>
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button
                onClick={() => setShowPropertyModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitProperty}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={propertyForm.title}
                  onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Location *
                </label>
                <input
                  type="text"
                  value={propertyForm.location}
                  onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                  placeholder="e.g., Downtown, City, Country"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Price per night ($) *
                </label>
                <input
                  type="number"
                  value={propertyForm.price}
                  onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                  placeholder="150"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Image URL
                </label>
                <input
                  type="text"
                  value={propertyForm.img}
                  onChange={(e) => setPropertyForm({...propertyForm, img: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Category
                </label>
                <select
                  value={propertyForm.category}
                  onChange={(e) => setPropertyForm({...propertyForm, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select category</option>
                  <option value="beachfront">Beachfront</option>
                  <option value="mountain">Mountain View</option>
                  <option value="city">City Center</option>
                  <option value="countryside">Countryside</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Badge
                </label>
                <input
                  type="text"
                  value={propertyForm.badge}
                  onChange={(e) => setPropertyForm({...propertyForm, badge: e.target.value})}
                  placeholder="e.g., Popular, New, Featured"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Tags
                </label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="e.g., WiFi, Pool, Parking"
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    style={{
                      padding: '12px 20px',
                      background: '#4c9aff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {propertyForm.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '4px 12px',
                      background: '#f0f0f0',
                      borderRadius: '20px',
                      fontSize: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#999',
                          fontSize: '14px'
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Description
                </label>
                <textarea
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})}
                  rows="4"
                  placeholder="Describe your property..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                  Video URL
                </label>
                <input
                  type="text"
                  value={propertyForm.video}
                  onChange={(e) => setPropertyForm({...propertyForm, video: e.target.value})}
                  placeholder="YouTube or Vimeo URL"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowPropertyModal(false)}
                  style={{
                    padding: '12px 24px',
                    background: '#f0f0f0',
                    color: '#666',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    background: '#c9a84c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  {editingProperty ? 'Update Property' : 'Add Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HostDashboard;