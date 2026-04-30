// src/pages/HostDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
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
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  
  // Profile states
  const [hostProfile, setHostProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    age: '',
    num_tele: '',
    email: '',
    emploi: '',
    wilaya: '',
    username: '',
    profile_image: ''
  });
  const profileImageInputRef = useRef(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  
  // Image upload states
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  
  // Video upload states
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoFileName, setVideoFileName] = useState('');
  const videoInputRef = useRef(null);
  
  const [tagInput, setTagInput] = useState('');
  
  // Algerian Wilayas list
  // Algerian Wilayas list - Updated
const algerianWilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'M’Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
  'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
  'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane'
];

  // Extended property form with all fields
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    location: '',
    google_maps_url: '',
    price: '',
    rental_type: 'day',
    tags: [],
    badge: '',
    category: '',
    description: '',
    video: '',
    status: 'pending',
    voyageurs: '',
    chambres: '',
    salle_de_bain: '',
    surface: '',
    wilaya: ''
  });

  useEffect(() => {
    fetchProperties();
    fetchBookings();
    fetchHostProfile();
  }, []);

  // Fetch host profile
  const fetchHostProfile = async () => {
    try {
      const host = JSON.parse(localStorage.getItem('host_user'));
      if (!host) return;
      
      const response = await fetch(`http://localhost:5000/api/hosts/${host.host_id}/profile`);
      if (response.ok) {
        const data = await response.json();
        setHostProfile(data);
        setProfileForm({
          full_name: data.full_name || '',
          age: data.age || '',
          num_tele: data.num_tele || '',
          email: data.email || '',
          emploi: data.emploi || '',
          wilaya: data.wilaya || '',
          username: data.username || '',
          profile_image: data.profile_image || ''
        });
        if (data.profile_image) {
          setProfileImagePreview(data.profile_image);
        }
      }
    } catch (err) {
      console.error('Error fetching host profile:', err);
    }
  };

  // Handle profile image selection
  const handleProfileImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ Please select a valid image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠️ Image size should be less than 5MB');
      return;
    }
    
    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Upload profile image
  const uploadProfileImage = async () => {
    if (!profileImageFile) return null;
    
    const formData = new FormData();
    formData.append('image', profileImageFile);
    
    try {
      const response = await fetch('http://localhost:5000/api/upload/profile-image', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      }
      return null;
    } catch (err) {
      console.error('Error uploading profile image:', err);
      return null;
    }
  };

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      setUploadingProfileImage(true);
      const host = JSON.parse(localStorage.getItem('host_user'));
      if (!host) return;
      
      let profileImageUrl = profileForm.profile_image;
      
      if (profileImageFile) {
        const uploadedUrl = await uploadProfileImage();
        if (uploadedUrl) {
          profileImageUrl = uploadedUrl;
        }
      }
      
      const response = await fetch(`http://localhost:5000/api/hosts/${host.host_id}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: profileForm.full_name,
          age: profileForm.age ? parseInt(profileForm.age) : null,
          num_tele: profileForm.num_tele,
          email: profileForm.email,
          emploi: profileForm.emploi,
          wilaya: profileForm.wilaya,
          username: profileForm.username,
          profile_image: profileImageUrl
        })
      });
      
      if (response.ok) {
        showToast('✅ Profile updated successfully!');
        setEditingProfile(false);
        fetchHostProfile();
      } else {
        const data = await response.json();
        showToast(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      showToast('❌ Error updating profile');
    } finally {
      setUploadingProfileImage(false);
    }
  };

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

  // Image upload handling
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
      showToast('⚠️ Please select valid image files');
      return;
    }
    
    setImageFiles(prev => [...prev, ...validFiles]);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (indexToRemove) => {
    setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  // Video upload handling
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
      showToast('⚠️ Please select a valid video file');
      return;
    }
    
    if (file.size > 100 * 1024 * 1024) {
      showToast('⚠️ Video file size should be less than 100MB');
      return;
    }
    
    setVideoFile(file);
    setVideoFileName(file.name);
    const videoUrl = URL.createObjectURL(file);
    setVideoPreview(videoUrl);
  };
  
  const removeVideo = () => {
    if (videoPreview && videoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
    setVideoFileName('');
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };
  
  const uploadImagesToServer = async () => {
    if (imageFiles.length === 0) return [];
    
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('images', file);
    });
    
    try {
      const response = await fetch('http://localhost:5000/api/upload/property-images', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.imageUrls;
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error('Error uploading images:', err);
      showToast('❌ Failed to upload images');
      return [];
    }
  };
  
  const uploadVideoToServer = async () => {
    if (!videoFile) return null;
    
    const formData = new FormData();
    formData.append('video', videoFile);
    
    try {
      const response = await fetch('http://localhost:5000/api/upload/property-video', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.videoUrl;
      } else {
        throw new Error('Video upload failed');
      }
    } catch (err) {
      console.error('Error uploading video:', err);
      showToast('❌ Failed to upload video');
      return null;
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setPropertyForm({
      title: '',
      location: '',
      google_maps_url: '',
      price: '',
      rental_type: 'day',
      tags: [],
      badge: '',
      category: '',
      description: '',
      video: '',
      status: 'pending',
      voyageurs: '',
      chambres: '',
      salle_de_bain: '',
      surface: '',
      wilaya: ''
    });
    setImageFiles([]);
    setImagePreviews([]);
    setVideoFile(null);
    setVideoPreview(null);
    setVideoFileName('');
    setShowPropertyModal(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title || '',
      location: property.location || '',
      google_maps_url: property.google_maps_url || '',
      price: property.price || '',
      rental_type: property.rental_type || 'day',
      tags: property.tags || [],
      badge: property.badge || '',
      category: property.category || '',
      description: property.description || '',
      video: property.video || '',
      status: property.status || 'pending',
      voyageurs: property.voyageurs || '',
      chambres: property.chambres || '',
      salle_de_bain: property.salle_de_bain || '',
      surface: property.surface || '',
      wilaya: property.wilaya || ''
    });
    if (property.img && Array.isArray(property.img)) {
      setImagePreviews(property.img);
    } else if (property.img) {
      setImagePreviews([property.img]);
    }
    if (property.video) {
      setVideoPreview(property.video);
      setVideoFileName('Existing video');
    }
    setImageFiles([]);
    setVideoFile(null);
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
    
    if (imageFiles.length === 0 && imagePreviews.length === 0 && !editingProperty) {
      showToast('⚠️ Please upload at least one image.');
      return;
    }
    
    setUploadingImages(true);
    setUploadingVideo(true);
    
    try {
      let imageUrls = imagePreviews;
      let videoUrl = propertyForm.video;
      
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImagesToServer();
        if (uploadedUrls.length > 0) {
          const existingUrls = imagePreviews.filter(url => url.startsWith('http'));
          imageUrls = [...existingUrls, ...uploadedUrls];
        }
      }
      
      if (videoFile) {
        const uploadedVideoUrl = await uploadVideoToServer();
        if (uploadedVideoUrl) {
          videoUrl = uploadedVideoUrl;
        }
      }
      
      const host = JSON.parse(localStorage.getItem('host_user'));
      const url = editingProperty
        ? `http://localhost:5000/api/host/properties/${editingProperty.property_id}`
        : 'http://localhost:5000/api/host/properties';
      
      const method = editingProperty ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host_id: host.host_id,
          title: propertyForm.title,
          location: propertyForm.location,
          google_maps_url: propertyForm.google_maps_url,
          price: parseFloat(propertyForm.price),
          rental_type: propertyForm.rental_type,
          img: imageUrls,
          tags: propertyForm.tags,
          badge: propertyForm.badge || null,
          category: propertyForm.category || null,
          description: propertyForm.description || null,
          video: videoUrl,
          status: propertyForm.status,
          voyageurs: propertyForm.voyageurs ? parseInt(propertyForm.voyageurs) : null,
          chambres: propertyForm.chambres ? parseInt(propertyForm.chambres) : null,
          salle_de_bain: propertyForm.salle_de_bain ? parseInt(propertyForm.salle_de_bain) : null,
          surface: propertyForm.surface || null,
          wilaya: propertyForm.wilaya || null
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
      console.error('Error saving property:', err);
      showToast('❌ Error saving property');
    } finally {
      setUploadingImages(false);
      setUploadingVideo(false);
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
          {/* My Profile Button - ADDED */}
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '10px 20px',
              background: activeTab === 'profile' ? '#c9a84c' : 'transparent',
              color: activeTab === 'profile' ? 'white' : '#333',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            My Profile
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
                  <div key={property.property_id} 
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    {property.img && property.img.length > 0 && (
                      <img 
                        src={property.img[0]}
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
                      
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                        📍 {property.location}
                      </p>
                      
                      {property.wilaya && (
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                          🏙️ Wilaya: {property.wilaya}
                        </p>
                      )}
                      
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#c9a84c', marginBottom: '12px' }}>
                        {property.price} DA
                        <span style={{ fontSize: '14px', color: '#999' }}>
                          /{property.rental_type === 'day' ? 'night' : property.rental_type === 'month' ? 'month' : 'year'}
                        </span>
                      </p>
                      
                      {(property.chambres || property.voyageurs || property.salle_de_bain) && (
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '13px', color: '#666' }}>
                          {property.voyageurs && <span>👥 {property.voyageurs} guests</span>}
                          {property.chambres && <span>🛏️ {property.chambres} beds</span>}
                          {property.salle_de_bain && <span>🚿 {property.salle_de_bain} baths</span>}
                        </div>
                      )}
                      
                      {property.tags && property.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {property.tags.slice(0, 3).map(tag => (
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
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          ✏️ Edit
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
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          🗑️ Delete
                        </button>
                        <button
                          onClick={() => navigate(`/host/property/${property.property_id}`)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: '#c9a84c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bookings Tab */}
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
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Profile Tab - ADDED */}
        {activeTab === 'profile' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '8px' }}>My Profile</h2>
                <p style={{ color: '#666' }}>View and manage your personal information</p>
              </div>
              {!editingProfile ? (
                <button
                  onClick={() => setEditingProfile(true)}
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
                  ✏️ Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setEditingProfile(false);
                      fetchHostProfile();
                    }}
                    style={{
                      padding: '12px 24px',
                      background: '#f0f0f0',
                      color: '#666',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    disabled={uploadingProfileImage}
                    style={{
                      padding: '12px 24px',
                      background: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: uploadingProfileImage ? 'not-allowed' : 'pointer',
                      fontWeight: 500,
                      opacity: uploadingProfileImage ? 0.6 : 1
                    }}
                  >
                    {uploadingProfileImage ? 'Uploading...' : '💾 Save Changes'}
                  </button>
                </div>
              )}
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {/* Profile Image */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div 
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '60px',
                      background: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      cursor: editingProfile ? 'pointer' : 'default'
                    }}
                    onClick={() => editingProfile && profileImageInputRef.current?.click()}
                  >
                    {profileImagePreview ? (
                      <img 
                        src={profileImagePreview} 
                        alt="Profile" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '48px' }}>👤</span>
                    )}
                    {editingProfile && (
                      <input
                        ref={profileImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageSelect}
                        style={{ display: 'none' }}
                      />
                    )}
                  </div>
                  {editingProfile && (
                    <p style={{ fontSize: '12px', color: '#999' }}>Click to change profile picture</p>
                  )}
                </div>
              </div>

              {/* Profile Information */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Full Name</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileForm.full_name}
                      onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.full_name || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Username</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.username || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Email</label>
                  {editingProfile ? (
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.email || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Phone Number</label>
                  {editingProfile ? (
                    <input
                      type="tel"
                      value={profileForm.num_tele}
                      onChange={(e) => setProfileForm({...profileForm, num_tele: e.target.value})}
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.num_tele || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Age</label>
                  {editingProfile ? (
                    <input
                      type="number"
                      value={profileForm.age}
                      onChange={(e) => setProfileForm({...profileForm, age: e.target.value})}
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.age || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Employment / Job</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileForm.emploi}
                      onChange={(e) => setProfileForm({...profileForm, emploi: e.target.value})}
                      placeholder="e.g., Engineer, Teacher, Student, etc."
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.emploi || 'Not specified'}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>Wilaya</label>
                  {editingProfile ? (
                    <select
                      value={profileForm.wilaya}
                      onChange={(e) => setProfileForm({...profileForm, wilaya: e.target.value})}
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                    >
                      <option value="">Select Wilaya</option>
                      {algerianWilayas.map(wilaya => (
                        <option key={wilaya} value={wilaya}>{wilaya}</option>
                      ))}
                    </select>
                  ) : (
                    <p style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
                      {hostProfile?.wilaya || 'Not specified'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
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
            maxWidth: '800px',
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
              {/* Basic Information */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#c9a84c' }}>Basic Information</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                    placeholder="e.g., Beautiful Beachfront Villa"
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
                    Wilaya (Algerian Province) *
                  </label>
                  <select
                    value={propertyForm.wilaya}
                    onChange={(e) => setPropertyForm({...propertyForm, wilaya: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  >
                    <option value="">Select Wilaya</option>
                    {algerianWilayas.map(wilaya => (
                      <option key={wilaya} value={wilaya}>{wilaya}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                    Address / Location
                  </label>
                  <input
                    type="text"
                    value={propertyForm.location}
                    onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                    placeholder="Full address of the property"
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
                    Google Maps URL *
                  </label>
                  <input
                    type="url"
                    value={propertyForm.google_maps_url}
                    onChange={(e) => setPropertyForm({...propertyForm, google_maps_url: e.target.value})}
                    placeholder="https://maps.google.com/..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                    Paste the Google Maps share link for your property location
                  </p>
                </div>
              </div>

              {/* Property Details */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#c9a84c' }}>Property Details</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                      Max Guests (voyageurs)
                    </label>
                    <input
                      type="number"
                      value={propertyForm.voyageurs}
                      onChange={(e) => setPropertyForm({...propertyForm, voyageurs: e.target.value})}
                      placeholder="Number of guests"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                      Bedrooms (chambres)
                    </label>
                    <input
                      type="number"
                      value={propertyForm.chambres}
                      onChange={(e) => setPropertyForm({...propertyForm, chambres: e.target.value})}
                      placeholder="Number of bedrooms"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                      Bathrooms (salle de bain)
                    </label>
                    <input
                      type="number"
                      value={propertyForm.salle_de_bain}
                      onChange={(e) => setPropertyForm({...propertyForm, salle_de_bain: e.target.value})}
                      placeholder="Number of bathrooms"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                      Surface Area (m²)
                    </label>
                    <input
                      type="text"
                      value={propertyForm.surface}
                      onChange={(e) => setPropertyForm({...propertyForm, surface: e.target.value})}
                      placeholder="e.g., 120 m²"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Information with Rental Type */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#c9a84c' }}>Pricing Information</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                    Rental Type *
                  </label>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      cursor: 'pointer',
                      padding: '10px 20px',
                      border: propertyForm.rental_type === 'day' ? '2px solid #c9a84c' : '1px solid #ddd',
                      borderRadius: '8px',
                      background: propertyForm.rental_type === 'day' ? '#c9a84c10' : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="rental_type"
                        value="day"
                        checked={propertyForm.rental_type === 'day'}
                        onChange={(e) => setPropertyForm({...propertyForm, rental_type: e.target.value})}
                        style={{ margin: 0 }}
                      />
                      <span style={{ fontSize: '14px' }}>📅 Per Day</span>
                    </label>
                    
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      cursor: 'pointer',
                      padding: '10px 20px',
                      border: propertyForm.rental_type === 'month' ? '2px solid #c9a84c' : '1px solid #ddd',
                      borderRadius: '8px',
                      background: propertyForm.rental_type === 'month' ? '#c9a84c10' : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="rental_type"
                        value="month"
                        checked={propertyForm.rental_type === 'month'}
                        onChange={(e) => setPropertyForm({...propertyForm, rental_type: e.target.value})}
                        style={{ margin: 0 }}
                      />
                      <span style={{ fontSize: '14px' }}>📆 Per Month</span>
                    </label>
                    
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      cursor: 'pointer',
                      padding: '10px 20px',
                      border: propertyForm.rental_type === 'year' ? '2px solid #c9a84c' : '1px solid #ddd',
                      borderRadius: '8px',
                      background: propertyForm.rental_type === 'year' ? '#c9a84c10' : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="rental_type"
                        value="year"
                        checked={propertyForm.rental_type === 'year'}
                        onChange={(e) => setPropertyForm({...propertyForm, rental_type: e.target.value})}
                        style={{ margin: 0 }}
                      />
                      <span style={{ fontSize: '14px' }}>🗓️ Per Year</span>
                    </label>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                    Price (DA) *
                  </label>
                  <input
                    type="number"
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                    placeholder={`Enter price ${
                      propertyForm.rental_type === 'day' ? 'per night' : 
                      propertyForm.rental_type === 'month' ? 'per month' : 
                      'per year'
                    }`}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                    {propertyForm.rental_type === 'day' && 'Example: $150 per night'}
                    {propertyForm.rental_type === 'month' && 'Example: $3,500 per month (usually 20-30% discount from daily rate)'}
                    {propertyForm.rental_type === 'year' && 'Example: $35,000 per year (usually 40-50% discount from daily rate)'}
                  </p>
                </div>
              </div>

              {/* Images Upload */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#c9a84c' }}>Property Images</h3>
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #ddd',
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    marginBottom: '16px'
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}>📸</div>
                  <p style={{ color: '#666' }}>Click to upload images from your device</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>You can select multiple images (JPG, PNG, GIF)</p>
                </div>
                
                {imagePreviews.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={{ position: 'relative' }}>
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`}
                          style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#c9a84c' }}>Video Tour</h3>
                
                <div
                  onClick={() => videoInputRef.current?.click()}
                  style={{
                    border: '2px dashed #ddd',
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#c9a84c'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
                >
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoSelect}
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎥</div>
                  <p style={{ color: '#666' }}>Click to upload a video tour from your device</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>Supports MP4, WebM, MOV (Max 100MB)</p>
                </div>
                
                {videoPreview && (
                  <div style={{ marginTop: '16px' }}>
                    {videoPreview.startsWith('http') && !videoPreview.startsWith('blob:') ? (
                      <div style={{ 
                        background: '#f0f0f0', 
                        borderRadius: '8px', 
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ fontSize: '32px' }}>🎬</div>
                          <div>
                            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Current Video</div>
                            <a href={videoPreview} target="_blank" rel="noopener noreferrer" style={{ color: '#4c9aff', fontSize: '12px', wordBreak: 'break-all' }}>
                              {videoPreview.substring(0, 50)}...
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0'
                      }}>
                        <video 
                          src={videoPreview} 
                          controls 
                          style={{ width: '100%', maxHeight: '300px' }}
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div style={{ 
                          padding: '12px', 
                          background: '#f9f9f9',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ fontSize: '13px', color: '#666' }}>
                            📹 {videoFileName}
                          </div>
                          <button
                            type="button"
                            onClick={removeVideo}
                            style={{
                              background: '#dc2626',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 12px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Remove Video
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description & Amenities */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#c9a84c' }}>Description & Amenities</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 500 }}>
                    Description
                  </label>
                  <textarea
                    value={propertyForm.description}
                    onChange={(e) => setPropertyForm({...propertyForm, description: e.target.value})}
                    rows="4"
                    placeholder="Describe your property, its unique features, nearby attractions, etc."
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
                    Tags (Amenities)
                  </label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="e.g., WiFi, Pool, Parking, Air Conditioning"
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
                    Badge (Optional)
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
                  disabled={uploadingImages || uploadingVideo}
                  style={{
                    padding: '12px 24px',
                    background: '#c9a84c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: (uploadingImages || uploadingVideo) ? 'not-allowed' : 'pointer',
                    fontWeight: 500,
                    opacity: (uploadingImages || uploadingVideo) ? 0.6 : 1
                  }}
                >
                  {(uploadingImages || uploadingVideo) ? 'Uploading...' : (editingProperty ? 'Update Property' : 'Add Property')}
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