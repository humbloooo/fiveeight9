import React from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import StableLogo from './components/StableLogo';
import RoomCard from './components/RoomCard';
import Amenities from './components/Amenities';
import Footer from './components/Footer';

function App() {
  const rooms = [
    { title: 'Single Room', price: 'R4,400 p/m', subtitle: 'Private space for focused success.', nsfas: true },
    { title: 'Sharing Room', price: 'R4,400 p/m', subtitle: 'Shared comfort and community living.', nsfas: true },
  ];

  return (
    <div className="app-container">
      <Background />
      <Navigation />

      <main>
        {/* Section 1: Hero */}
        <section id="home" className="section hero-section">
          <div style={{ width: '100%', maxWidth: '800px', padding: '0 20px' }}>
            <StableLogo />
          </div>
          <div style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'center', color: 'var(--text-secondary)', padding: '0 20px' }}>
            Premium student living near Univen.
            Experience comfort, safety, and a vibrant community designed for your academic journey.
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-button" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>BOOK YOUR SPOT</button>
            <button
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                padding: '1rem 2.5rem',
                borderRadius: '4px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => document.getElementById('amenities').scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE AMENITIES
            </button>
          </div>
        </section>

        {/* Section 2: Rooms */}
        <section id="rooms" className="section">
          <h2 className="section-title">Room <span>Options</span></h2>
          <div className="room-display-grid" style={{ maxWidth: '800px' }}>
            {rooms.map((room, i) => (
              <RoomCard key={i} {...room} />
            ))}
          </div>
        </section>

        {/* Section 3: Amenities */}
        <section id="amenities" className="section">
          <h2 className="section-title">Student <span>Experience</span></h2>
          <Amenities />
        </section>

        {/* Section 4: Contact/CTA */}
        <section id="contact" className="section" style={{ minHeight: '60vh', background: 'var(--glass)' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Ready to <span>Move In?</span></h2>
          <p style={{ maxWidth: '600px', marginBottom: '3rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '0 20px' }}>
            Join a community of high-achieving students in an environment that fosters academic excellence and vibrant life.
          </p>
          <button className="cta-button" style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}>REQUEST A VIEWING</button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
