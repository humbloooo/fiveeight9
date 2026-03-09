import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResidentMenuOpen, setIsResidentMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <nav className="nav-cluster">
      <div className="logo-placeholder" style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
        FIVE EIGHT 9
      </div>

      {/* Desktop Links */}
      <div className="nav-links desktop-only">
        {mainLinks.map((link) => (
          <a key={link.name} href={link.href} className="nav-link">
            {link.name}
          </a>
        ))}

        {/* Resident Portal Dropdown */}
        <div style={{ position: 'relative' }}
          onMouseEnter={() => setIsResidentMenuOpen(true)}
          onMouseLeave={() => setIsResidentMenuOpen(false)}>
          <button className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Portal <ChevronDown size={14} />
          </button>

          {isResidentMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(30px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              minWidth: '160px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              marginTop: '0.5rem'
            }}>
              {residentLinks.map(link => (
                <a key={link.name} href={link.href} className="nav-link" style={{ fontSize: '0.85rem' }}>{link.name}</a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="nav-actions desktop-only">
        <button className="cta-button">BOOK A VIEWING</button>
      </div>

      {/* Mobile Toggle */}
      <button className="mobile-toggle" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Explore</span>
          {mainLinks.map((link) => (
            <a key={link.name} href={link.href} className="mobile-nav-link" onClick={() => setIsOpen(false)} aria-label={`Navigate to ${link.name}`}>{link.name}</a>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Residents</span>
          {residentLinks.map((link) => (
            <a key={link.name} href={link.href} className="mobile-nav-link" onClick={() => setIsOpen(false)} aria-label={`Resident Access ${link.name}`}>{link.name}</a>
          ))}
        </div>

        <button className="cta-button" style={{ marginTop: 'auto', width: '100%' }} aria-label="Book a viewing now">
          BOOK A VIEWING
        </button>
      </div>

      <style>{`
        .desktop-only { display: flex; align-items: center; }
        .mobile-toggle { display: none; background: transparent; border: none; color: var(--text-primary); cursor: pointer; z-index: 1001; }
        .mobile-menu { position: fixed; top: 0; right: -100%; width: 85%; max-width: 320px; height: 100vh; background: var(--nav-bg); backdrop-filter: blur(40px); padding: 5rem 2.5rem 2.5rem; display: flex; flexDirection: column; transition: right 0.5s cubic-bezier(0.16, 1, 0.3, 1); border-left: 1px solid var(--glass-border); box-shadow: -10px 0 50px rgba(0,0,0,0.2); z-index: 1000; overflow-y: auto; }
        .mobile-menu.open { right: 0; }
        .mobile-nav-link { color: var(--text-primary); text-decoration: none; font-size: 1.1rem; font-weight: 600; padding: 0.5rem 0; border-bottom: 1px solid var(--glass-border); display: block; }
        @media (max-width: 768px) {
          .desktop-only { display: none; }
          .mobile-toggle { display: block; }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
