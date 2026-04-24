// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import BookingPanel from './components/BookingPanel';
import ToastContainer from './components/ToastContainer';

import HomePage from './pages/HomePage';
import StaysPage from './pages/StaysPage';
import DestinationsPage from './pages/DestinationsPage';
import ExperiencesPage from './pages/ExperiencesPage';
import HostPage from './pages/HostPage';
import HostLoginPage from './pages/HostLoginPage';
import HostSetupPage from './pages/HostSetupPage'
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import AdminDashboard from './pages/AdminDashboard';


import { listingsData } from './data/data';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const animationRef = useRef(null);

  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const openBooking = (id) => {
    const listing = listingsData.find(l => l.id === id);
    if (listing) { setSelectedListing(listing); setBookingOpen(true); }
  };
  const closeBooking = () => { setBookingOpen(false); setSelectedListing(null); };
  const confirmBooking = () => {
    closeBooking();
    setTimeout(() => showToast("🎉 Booking request sent! You'll hear back within 24 hours."), 400);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleAuth = () => { closeModal(); setTimeout(() => showToast('✨ Welcome to NestAway!'), 300); };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const heroBg = document.querySelector('.hero-bg-img');
      if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    const animateRing = () => {
      setRingPos(prev => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.12,
        y: prev.y + (cursorPos.y - prev.y) * 0.12
      }));
      animationRef.current = requestAnimationFrame(animateRing);
    };
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animateRing);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [cursorPos]);

  // Cursor hover detection
  useEffect(() => {
    const handleOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' ||
        e.target.closest('button') || e.target.closest('a')) {
        setCursorHover(true);
      }
    };
    const handleOut = () => setCursorHover(false);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <div className="app">
      <div className={`cursor ${cursorHover ? 'hovering' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className={`cursor-ring ${cursorHover ? 'hovering' : ''}`} style={{ left: ringPos.x, top: ringPos.y }} />

      <ScrollToTop />
      <Navbar scrolled={scrolled || location.pathname !== '/'} onOpenModal={openModal} />

      <Routes>
        <Route path="/" element={<HomePage showToast={showToast} />} />
        <Route path="/stays" element={<StaysPage showToast={showToast} onOpenBooking={openBooking} />} />
        <Route path="/destinations" element={<DestinationsPage showToast={showToast} />} />
        <Route path="/experiences" element={<ExperiencesPage showToast={showToast} />} />
        <Route path="/host" element={<HostPage showToast={showToast} />} />
        <Route path="/host/login" element={<HostLoginPage showToast={showToast} />} />
        <Route path="/host/setup" element={<HostSetupPage showToast={showToast} />} />
        <Route path="/property/:id" element={<PropertyDetailPage showToast={showToast} onOpenBooking={openBooking} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard showToast={showToast} />} />

      </Routes>

      <Footer showToast={showToast} />

      <AuthModal open={modalOpen} onClose={closeModal} onAuth={handleAuth} />
      <BookingPanel open={bookingOpen} listing={selectedListing} onClose={closeBooking} onConfirm={confirmBooking} />
      <ToastContainer toasts={toasts} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

export default App;