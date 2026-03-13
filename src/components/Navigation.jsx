import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogIn, LogOut, Shield, Moon, Sun, Phone, Truck } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';
import Toast from './Toast';
import logo from '../assets/brand/logo.png';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResidentMenuOpen, setIsResidentMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize as false, will be set by useEffect
  const [userRole, setUserRole] = useState('student'); // Initialize with a default, will be set by useEffect
  const [showToast, setShowToast] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [ctaText, setCtaText] = useState('BOOK A VIEWING'); // (002) Context-Aware CTA
  const [scrollProgress, setScrollProgress] = useState(0); // (102) Liquid Gold Progress
  const [settings, setSettings] = useState(null);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);

  // Consolidated Theme & Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
      
      if (scrollY < 600) setCtaText('BOOK A VIEWING');
      else if (scrollY < 1800) setCtaText('EXPLORE THE BUILDING');
      else setCtaText('RESERVE NOW');
    };

    const applyTheme = () => {
      const currentTheme = localStorage.getItem('theme') || 'system';
      const isDark = currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.body.classList.toggle('light-mode', !isDark);
      setTheme(currentTheme);
    };

    const handleOpenTransport = () => setIsTransportModalOpen(true);

    // Initial calls
    handleScroll();
    applyTheme();

    // Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('themeChanged', applyTheme);
    window.addEventListener('openTransportSchedule', handleOpenTransport);

    // Login check
    if (localStorage.getItem('justLoggedIn')) {
      setTimeout(() => setShowToast(true), 0);
      localStorage.removeItem('justLoggedIn');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('themeChanged', applyTheme);
      window.removeEventListener('openTransportSchedule', handleOpenTransport);
    };
  }, []);

  // Fetch settings for emergency contacts and transport schedule
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/settings`);
        setSettings(res.data);
      } catch (err) {
        console.error('Error fetching nav settings:', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const studentToken = localStorage.getItem('studentToken');
    const role = localStorage.getItem('userRole');
    if (adminToken || studentToken) {
      setIsLoggedIn(true);
      setUserRole(role || (studentToken ? 'student' : 'staff'));
    }
  }, [setIsLoggedIn, setUserRole]);


  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll Lock for Burger Menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new Event('themeChanged'));
  };

  const mainLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Rooms', href: '/#rooms' },
    { name: 'Cafeteria', href: '/cafeteria' },
    { name: 'Safety', href: '/safety' },
  ];

  const residentLinks = [
    { name: 'Group Chat', href: '/forum' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Events', href: '/events' },
    { name: 'Maintenance Ticket', href: '/maintenance' },
  ];

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <nav className="nav-cluster">
        {showToast && <Toast message={`Welcome back, ${userRole}!`} type="info" onClose={() => setShowToast(false)} />}

      <div className="nav-container-desktop">
        <div className="nav-side-left">
          <div className="nav-logo" onClick={() => window.location.href = '/'}>
            <img src={logo} alt="Five Eight 9" className="logo-img" />
            <span className="logo-text">
              Five Eight<span style={{ color: 'var(--gold)' }}>9</span>
            </span>
          </div>
        </div>

        {/* Desktop Main Links - Centered */}
        <div className="nav-links desktop-only">
          {mainLinks.filter(link => !['Home', 'Rooms'].includes(link.name)).map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}

          <div className="resident-dropdown-trigger"
            onMouseEnter={() => setIsResidentMenuOpen(true)}
            onMouseLeave={() => setIsResidentMenuOpen(false)}>
            <button className="nav-link nav-dropdown-btn">
              Residents <ChevronDown size={14} />
            </button>

            {isResidentMenuOpen && (
              <div className="dropdown-menu">
                {residentLinks.map(link => (
                  <a key={link.name} href={link.href} className="dropdown-item">{link.name}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="nav-side-right desktop-only">
          <div className="nav-actions">
            {!isLoggedIn ? (
              <button className="cta-button" onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}>
                {ctaText}
              </button>
            ) : (
              <>
                <a href="/admin" className="icon-btn" title="Admin Dashboard">
                  <Shield size={18} />
                </a>
                <div className="user-badge">
                  <User size={14} /> {userRole.toUpperCase()}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isTransportModalOpen && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="modal-overlay"
        >
          <div onClick={() => setIsTransportModalOpen(false)} className="modal-backdrop"></div>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="modal-content"
          >
            <button onClick={() => setIsTransportModalOpen(false)} className="modal-close">
              <X size={24} />
            </button>
            <div className="modal-icon-wrapper">
              <Truck size={30} />
            </div>
            <h2 className="modal-title">Transport <span className="gold-text">Schedule</span></h2>
            <div className="modal-info-box">
              {settings?.transportSchedule || 'Schedule currently being updated. Please check back soon!'}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Unified Burger Toggle */}
      <button className="burger-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        <div className={`burger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Premium Full-screen Overlay Menu */}
      <div className={`overlay-menu ${isOpen ? 'active' : ''}`}>
        <div className="overlay-content">
          <div className="overlay-header">
            <span className="overlay-label">Explore Five Eight 9</span>
            <button onClick={toggleTheme} className="theme-toggle-mini">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          <div className="overlay-grid">
            <div className="overlay-section">
              <h3>Explore</h3>
              {mainLinks.filter(l => l.name !== 'Rooms').map(link => (
                <a key={link.name} href={link.href} onClick={toggleMenu}>{link.name}</a>
              ))}
            </div>

            <div className="overlay-section">
              <h3>Resident Services</h3>
              {residentLinks.map(link => (
                <a key={link.name} href={link.href} onClick={toggleMenu}>{link.name}</a>
              ))}
              <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openTransportSchedule')); toggleMenu(); }}>Transport Schedule</a>
            </div>

            <div className="overlay-section">
              <h3>Portals & Alerts</h3>
              <a href="/login-student" onClick={toggleMenu}>Student Portal</a>
              <a href="/admin" onClick={toggleMenu}>Staff Portal</a>
              <div className="overlay-cta-wrapper">
                <button className="cta-button full-width" onClick={() => { toggleMenu(); window.dispatchEvent(new CustomEvent('openBooking')); }}>
                  {ctaText}
                </button>
              </div>
            </div>

            {isLoggedIn && (
              <div className="overlay-section" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                <button 
                  onClick={() => {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('studentToken');
                    localStorage.removeItem('userRole');
                    window.location.href = '/';
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff4d4d',
                    fontSize: '1.2rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}
                >
                  <LogOut size={20} /> LOGOUT
                </button>
              </div>
            )}
          </div>

            
            {isLoggedIn && userRole === 'admin' && (
              <div className="admin-menu-bar staff-access-bar">
                <span className="staff-label">Staff Access:</span>
                <a href="/admin" className="admin-ctrl-btn no-deco">Dashboard</a>
              </div>
            )}
        </div>
      </div>
      </nav>
    </>
  );
};

export default Navigation;
