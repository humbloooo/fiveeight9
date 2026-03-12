import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogIn, Shield, Moon, Sun, Phone } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';
import Toast from './Toast';
import logo from '../assets/brand/logo.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResidentMenuOpen, setIsResidentMenuOpen] = useState(false);
  const [isLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const [userRole] = useState(localStorage.getItem('userRole') || 'student'); // 'student' or 'admin'
  const [showToast, setShowToast] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [ctaText, setCtaText] = useState('BOOK A VIEWING'); // (002) Context-Aware CTA
  const [scrollProgress, setScrollProgress] = useState(0); // (102) Liquid Gold Progress
  const [settings, setSettings] = useState(null);

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

  // Context CTA Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate progress percentage
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
      
      // Update CTA
      if (scrollY < 600) setCtaText('BOOK A VIEWING');
      else if (scrollY < 1800) setCtaText('EXPLORE THE BUILDING');
      else setCtaText('RESERVE NOW');
    };
    
    // Call once to set initial state based on current scroll
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // System Theme Sync & Login Notification
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'system');
    };
    window.addEventListener('themeChanged', handleThemeChange);

    const checkLogin = () => {
      if (localStorage.getItem('justLoggedIn')) {
        setShowToast(true);
        localStorage.removeItem('justLoggedIn');
      }
    };
    checkLogin();

    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      const currentTheme = localStorage.getItem('theme') || 'system';
      const isDark = currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.body.classList.toggle('light-mode', !isDark);
      setTheme(currentTheme);
    };

    applyTheme();
    window.addEventListener('themeChanged', applyTheme);

    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/settings`);
        setSettings(res.data);
      } catch (err) {
        console.error('Error fetching nav settings:', err);
      }
    };
    fetchSettings();

    return () => window.removeEventListener('themeChanged', applyTheme);
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
    { name: 'Tickets', href: '/maintenance' },
  ];

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <nav className="nav-cluster">
        {showToast && <Toast message={`Welcome back, ${userRole}!`} type="info" onClose={() => setShowToast(false)} />}

      <div className="nav-logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }} onClick={() => window.location.href = '/'}>
        <img src={logo} alt="Five Eight 9" style={{ height: '24px', width: 'auto' }} />
        <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '1px', color: 'var(--text-primary)' }} className="mobile-header-text">
          Five Eight<span style={{ color: 'var(--gold)' }}>9</span>
        </span>
      </div>

      {/* Desktop Main Links */}
      <div className="nav-links desktop-only">
        {mainLinks.filter(link => !['Home', 'Rooms'].includes(link.name)).map((link) => (
          <a key={link.name} href={link.href} className="nav-link">
            {link.name}
          </a>
        ))}

        <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
          onMouseEnter={() => setIsResidentMenuOpen(true)}
          onMouseLeave={() => setIsResidentMenuOpen(false)}>
          <button className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '1rem 0' }}>
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

        {/* Resident Support Number (NEW) */}
        {settings?.emergencyContacts?.reception && (
          <div className="support-badge desktop-only" style={{
            background: 'rgba(197, 160, 89, 0.1)',
            padding: '0.4rem 1rem',
            borderRadius: '10px',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginLeft: 'auto',
            marginRight: '2rem'
          }}>
            <Phone size={14} style={{ color: 'var(--gold)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.5px' }}>
              SUPPORT: {settings.emergencyContacts.reception}
            </span>
          </div>
        )}

      <div className="nav-actions desktop-only">
        {!isLoggedIn ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="cta-button" onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}>
              {ctaText}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {userRole === 'admin' && (
              <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            )}
            <a href="/admin" className="icon-btn" title="Admin Dashboard">
              <Shield size={18} />
            </a>
            <div className="user-badge">
              <User size={14} /> {userRole.toUpperCase()}
            </div>
          </div>
        )}
      </div>

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
          </div>

          <div className="overlay-grid">
            <div className="overlay-section">
              <h3>Explore</h3>
              {mainLinks.map(link => (
                <a key={link.name} href={link.href} onClick={toggleMenu}>{link.name}</a>
              ))}
            </div>

            <div className="overlay-section">
              <h3>Resident Services</h3>
              {residentLinks.map(link => (
                <a key={link.name} href={link.href} onClick={toggleMenu}>{link.name}</a>
              ))}
            </div>

            <div className="overlay-section">
              <h3>Portals & Alerts</h3>
              <a href="/login-student" onClick={toggleMenu}>Student Portal</a>
              <a href="/admin" onClick={toggleMenu}>Staff Portal</a>
              <div style={{ marginTop: '2.5rem' }}>
                <button className="cta-button" style={{ width: '100%', padding: '1.2rem' }} onClick={() => { toggleMenu(); window.dispatchEvent(new CustomEvent('openBooking')); }}>
                  {ctaText}
                </button>
              </div>
            </div>
          </div>

          {isLoggedIn && userRole === 'admin' && (
            <div className="admin-menu-bar">
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Admin Controls:</span>
              <button onClick={toggleTheme} className="admin-ctrl-btn">
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />} Switch Theme
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .desktop-only { display: flex; align-items: center; }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: var(--nav-bg);
            backdrop-filter: blur(30px);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            min-width: 160px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease;
        }
        .dropdown-menu:after { 
            content: '';
            position: absolute;
            top: -5px;
            left: 20px;
            width: 10px;
            height: 10px;
            background: var(--nav-bg);
            border-left: 1px solid var(--glass-border);
            border-top: 1px solid var(--glass-border);
            transform: rotate(45deg);
        }
        .dropdown-item {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.85rem;
            font-weight: 600;
            transition: color 0.3s ease;
        }
        .dropdown-item:hover { color: var(--gold); }

        .burger-toggle {
            background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.0));
            border: 1px solid rgba(255, 215, 0, 0.3);
            width: 46px;
            height: 46px;
            border-radius: 50%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2001;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 15px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.03);
        }
        .burger-toggle:hover { 
            background: rgba(255,215,0,0.1); 
            border-color: var(--gold); 
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(255,215,0,0.25);
        }
        .burger-icon { width: 22px; height: 16px; position: relative; }
        .burger-icon span { 
            position: absolute; left: 0; width: 100%; height: 2px; 
            background: var(--gold); transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); 
            border-radius: 2px;
        }
        .burger-icon span:first-child { top: 0; width: 70%; left: 30%; }
        .burger-toggle:hover .burger-icon span:first-child { width: 100%; left: 0; }
        .burger-icon span:last-child { bottom: 0; width: 100%; }
        .burger-icon.open span:first-child { transform: rotate(45deg); top: 7px; width: 100%; left: 0; }
        .burger-icon.open span:last-child { transform: rotate(-45deg); bottom: 7px; width: 100%; }

        .overlay-menu {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.4); 
            backdrop-filter: blur(120px);
            -webkit-backdrop-filter: blur(120px);
            z-index: 2000; display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: all 0.5s ease;
        }
        .overlay-menu.active { opacity: 1; pointer-events: auto; }
        .overlay-content { 
            width: 100%; height: 100%; padding: 10vh 10%; overflow-y: auto; 
            background: var(--burger-bg);
            box-shadow: none;
            transform: scale(1.1);
            transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .overlay-menu.active .overlay-content { transform: scale(1) translateY(0); }
        .overlay-content::-webkit-scrollbar { display: none; }
        .overlay-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .overlay-label { font-size: 0.8rem; color: var(--gold); font-weight: 900; text-transform: uppercase; letter-spacing: 4px; }
        .overlay-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 3rem; }
        .overlay-section h3 { font-size: 0.9rem; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 1.5rem; font-weight: 900; text-decoration: underline; text-underline-offset: 6px; }
        .overlay-section a { display: block; font-size: clamp(1.3rem, 3.5vw, 1.8rem); font-weight: 800; color: var(--text-primary); text-decoration: none; margin-bottom: 1.2rem; transition: all 0.3s ease; }
        .overlay-section a:hover { color: var(--gold); transform: translateX(10px); }

        .admin-menu-bar { 
            margin-top: 5rem; padding-top: 2rem; border-top: 1px solid var(--glass-border);
            display: flex; align-items: center; gap: 2rem;
        }
        .admin-ctrl-btn {
            background: var(--glass); border: 1px solid var(--glass-border); color: #fff;
            padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem; fontWeight: 700;
            display: flex; alignItems: center; gap: 0.5rem; cursor: pointer; transition: all 0.3s ease;
        }
        .admin-ctrl-btn:hover { background: var(--gold); color: #000; }

        .icon-btn { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-primary); width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; }
        .icon-btn:hover { border-color: var(--gold); color: var(--gold); }
        .user-badge { background: var(--gold); color: #000; padding: 0.4rem 0.8rem; border-radius: 6px; font-weight: 900; font-size: 0.65rem; display: flex; align-items: center; gap: 0.4rem; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) {
            .desktop-only { display: none; }
            .overlay-content { width: 85%; }
            .overlay-section a { font-size: 1.6rem; }
            .overlay-grid { gap: 2rem; }
        }
      `}</style>
    </nav>
    </>
  );
};

export default Navigation;
