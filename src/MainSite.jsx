import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import StableLogo from './components/StableLogo';
import RoomCard from './components/RoomCard';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import BookingModal from './components/BookingModal';

const MainSite = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

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
                <section id="home" className="section hero-section reveal">
                    <div style={{ width: '100%', maxWidth: '800px', padding: '0 20px' }}>
                        <StableLogo />
                    </div>
                    <p style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'center', color: 'var(--text-secondary)', padding: '0 20px', lineHeight: '1.8' }}>
                        Providing secure, high-quality, and modern lofts for the next generation of leaders.
                        Experience comfort, safety, and a vibrant community designed for your academic journey.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="cta-button" onClick={() => setIsBookingOpen(true)}>BOOK YOUR SPOT</button>
                        <button
                            style={{
                                background: 'var(--glass)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-primary)',
                                padding: '1rem 2.5rem',
                                borderRadius: '6px',
                                fontWeight: 900,
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                fontSize: '0.85rem',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                            onMouseLeave={(e) => e.target.style.background = 'var(--glass)'}
                            onClick={() => document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' })}
                        >
                            EXPLORE ROOMS
                        </button>
                    </div>
                </section>

                {/* Section 2: Rooms */}
                <section id="rooms" className="section">
                    <h2 className="section-title">Room <span>Options</span></h2>
                    <div className="room-display-grid">
                        {rooms.map((room, i) => (
                            <div key={i} className="reveal" style={{ animationDelay: `${i * 0.2}s` }}>
                                <RoomCard {...room} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Amenities */}
                <section id="amenities" className="section">
                    <h2 className="section-title">Student <span>Experience</span></h2>
                    <Amenities />
                </section>

                {/* Section 4: Contact/CTA */}
                <section id="contact" className="section reveal" style={{ minHeight: '60vh' }}>
                    <div style={{
                        background: 'var(--glass)',
                        padding: '5rem',
                        borderRadius: '40px',
                        border: '1px solid var(--glass-border)',
                        textAlign: 'center',
                        maxWidth: '900px',
                        width: '100%'
                    }}>
                        <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>Ready to <span>Move In?</span></h2>
                        <p style={{ maxWidth: '600px', marginBottom: '3rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                            Join a community of high-achieving students in an environment that fosters academic excellence and vibrant life.
                        </p>
                        <button className="cta-button" style={{ fontSize: '1.1rem', padding: '1.2rem 3.5rem' }} onClick={() => setIsBookingOpen(true)}>REQUEST A VIEWING</button>
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsAppButton />
            <BackToTop />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

            <style>{`
                .section { opacity: 0; }
                .section.reveal { opacity: 1; }
            `}</style>
        </div>
    );
};

export default MainSite;
