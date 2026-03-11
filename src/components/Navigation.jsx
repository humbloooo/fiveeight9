import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogIn, Shield, Moon, Sun, Bell, Eye } from 'lucide-react';
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
  const [nightOwl, setNightOwl] = useState(false); // (305) Night-Owl Reading Mode

  const toggleMenu = () => setIsOpen(!isOpen);

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
      else if (scrollY < 1800) setCtaText('EXPLORE ROOMS');
      else setCtaText('RESERVE NOW');
    };
    
    // Call once to set initial state based on current scroll
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // System Theme Sync & Login Notification
  useEffect(() => {
    const checkLogin = () => {
      if (localStorage.getItem('justLoggedIn')) {
        setShowToast(true);
        localStorage.removeItem('justLoggedIn');
      }
    };
    checkLogin();

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.body.classList.toggle('light-mode', systemTheme === 'light');
    } else {
      document.body.classList.toggle('light-mode', theme === 'light');
    }
  }, [theme]);

  // Night-Owl Reading Mode Hook
  useEffect(() => {
    document.body.classList.toggle('night-owl-active', nightOwl);
  }, [nightOwl]);

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
    { name: 'Rent Calc', href: '/calculator' },
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

      <div className="nav-logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => window.location.href = '/'}>
        <img src={logo} alt="Five Eight 9" style={{ height: '28px', width: 'auto' }} />
      </div>

      {/* Desktop Main Links */}
      <div className="nav-links desktop-only">
        {mainLinks.map((link) => (
          <a key={link.name} href={link.href} className="nav-link">
            {link.name}
          </a>
        ))}

        <div style={{ position: 'relative' }}
          onMouseEnter={() => setIsResidentMenuOpen(true)}
          onMouseLeave={() => setIsResidentMenuOpen(false)}>
          <button className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
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

        {/* (301) NSFAS Application Cycle Countdown Badge */}
        <div style={{
          background: 'rgba(255, 215, 0, 0.1)',
          border: '1px solid var(--gold)',
          color: 'var(--gold)',
          padding: '0.3rem 0.8rem',
          borderRadius: '20px',
          fontSize: '0.65rem',
          fontWeight: 900,
          marginLeft: '1rem',
          letterSpacing: '1px'
        }}>
          NSFAS '26 OPEN
        </div>
      </div>

      <div className="nav-actions desktop-only">
        {!isLoggedIn ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={() => setNightOwl(!nightOwl)} className="icon-btn" title="Night-Owl Reading Mode">
                <Eye size={18} color={nightOwl ? 'var(--gold)' : 'currentColor'} />
            </button>
            <a href="/login" className="nav-link" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LogIn size={14} /> STUDENT LOG
            </a>
            <button className="cta-button" onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}>
              {ctaText}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={() => setNightOwl(!nightOwl)} className="icon-btn" title="Night-Owl Reading Mode">
                <Eye size={18} color={nightOwl ? 'var(--gold)' : 'currentColor'} />
            </button>
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
            <span className="overlay-label">Navigation</span>
            <X size={32} onClick={toggleMenu} style={{ cursor: 'pointer', color: 'var(--gold)' }} />
          </div>

          <div className="overlay-grid">
            <div className="overlay-section">
              <h3>Explore</h3>
              {mainLinks.map(link => (
                <a key={link.name} href={link.href} onClick={toggleMenu}>{link.name}</a>
              ))}
            </div>

            <div className="overlay-section">
              <h3>Portals</h3>
              <a href="/admin" onClick={toggleMenu}>Staff Portal</a>
              <a href="/login" onClick={toggleMenu}>Student Portal</a>
            </div>

            <div className="overlay-section">
              <h3>Resident Services</h3>
              {residentLinks.slice(0, 3).map(link => (
                <a key={link.name} href={link.href} onClick={toggleMenu}>{link.name}</a>
              ))}
              <div style={{ marginTop: '2rem' }}>
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
            margin-top: 0.5rem;
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
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--glass-border);
            width: 45px;
            height: 45px;
            border-radius: 12px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2001;
            transition: all 0.3s ease;
        }
        .burger-toggle:hover { background: var(--gold); }
        .burger-icon { width: 20px; height: 14px; position: relative; }
        .burger-icon span { 
            position: absolute; left: 0; width: 100%; height: 2px; 
            background: var(--text-primary); transition: all 0.3s ease; 
        }
        .burger-toggle:hover .burger-icon span { background: var(--navy); }
        .burger-icon span:first-child { top: 0; }
        .burger-icon span:last-child { bottom: 0; }
        .burger-icon.open span:first-child { transform: rotate(45deg); top: 6px; }
        .burger-icon.open span:last-child { transform: rotate(-45deg); bottom: 6px; }

        .overlay-menu {
            position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
            background: rgba(5, 10, 26, 0.98); backdrop-filter: blur(20px);
            z-index: 2000; display: flex; align-items: center; justify-content: center;
            opacity: 0; pointer-events: none; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            transform: translateY(-20px);
        }
        .overlay-menu.active { opacity: 1; pointer-events: auto; transform: translateY(0); }
        .overlay-content { width: 90%; max-width: 1100px; padding: 2rem; }
        .overlay-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
        .overlay-label { font-size: 0.7rem; color: var(--gold); font-weight: 900; text-transform: uppercase; letter-spacing: 4px; }
        .overlay-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; }
        .overlay-section h3 { font-size: 0.75rem; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; opacity: 0.5; }
        .overlay-section a { display: block; font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 900; color: #fff; text-decoration: none; margin-bottom: 1rem; transition: var(--transition-premium); }
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
