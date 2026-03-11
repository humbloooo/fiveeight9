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
import logo from './assets/brand/logo.png';

import axios from 'axios';
import API_BASE_URL from './config';

const MainSite = () => {
    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [settingsRes, roomsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/settings`),
                    axios.get(`${API_BASE_URL}/api/rooms`)
                ]);
                setSettings(settingsRes.data);
                setRooms(roomsRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoadingRooms(false);
            }
        };
        fetchData();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const showPrices = settings?.displayOptions?.showRoomPrices ?? true;

    return (
        <div className="app-container">
            <Background />
            <Navigation />

            <main>
                {/* Section 1: Hero */}
                <section id="home" className="section hero-section reveal">
                    <div style={{ width: '100%', maxWidth: '800px', padding: '0 20px', display: 'flex', justifyContent: 'center' }}>
                        <img src={logo} alt="Five Eight 9 Hero" style={{ width: '100%', maxWidth: '400px', height: 'auto', animation: 'fadeIn 1s ease' }} />
                    </div>
                    
                    {/* Dynamic Room Counter (Refinement 001) */}
                    <div className="reveal reveal-delay-1" style={{ display: 'flex', gap: '4rem', marginTop: '3rem' }}>
                        <div className="stat-item">
                            <span className="stat-value">231</span>
                            <span className="stat-label">Luxury Lofts</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">15%</span>
                            <span className="stat-label">Sharing Options</span>
                        </div>
                    </div>

                    <p style={{ marginTop: '2.5rem', maxWidth: '600px', textAlign: 'center', color: 'var(--text-secondary)', padding: '0 20px', lineHeight: '1.8' }}>
                        Providing secure, high-quality, and modern lofts for the next generation of leaders in Thohoyandou.
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
                <section id="rooms" className="section reveal">
                    <h2 className="section-title">Room <span>Options</span></h2>
                    <div className="room-display-grid">
                        {loadingRooms ? (
                            Array(2).fill(0).map((_, i) => (
                                <div key={i} className="room-card glass-panel skeleton" style={{ height: '450px', borderRadius: '24px' }}></div>
                            ))
                        ) : rooms.length > 0 ? (
                            rooms.map((room, i) => (
                                <div key={room._id || i} className={`reveal reveal-delay-${(i % 3) + 1}`}>
                                    <RoomCard {...room} image={room.imageUrl || room.image} price={showPrices ? room.price : ''} />
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>No rooms currently available.</p>
                        )}
                    </div>
                </section>

                {/* Section 3: Amenities */}
                <section id="amenities" className="section reveal">
                    <h2 className="section-title">Student <span>Experience</span></h2>
                    <Amenities />
                </section>

                {/* Section 4: Contact/CTA */}
                <section id="contact" className="section reveal" style={{ minHeight: '60vh' }}>
                    <div className="glass-panel" style={{
                        padding: '5rem',
                        borderRadius: '60px',
                        textAlign: 'center',
                        maxWidth: '1000px',
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-10%;', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at center, var(--gold-glow), transparent 70%)', opacity: 0.1, pointerEvents: 'none' }}></div>
                        <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem' }}>Ready to <span className="gold-text">Move In?</span></h2>
                        <p style={{ maxWidth: '650px', marginBottom: '3.5rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0 auto 3.5rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                            Join a community of high-achieving students in an environment that fosters academic excellence and a vibrant social vibe.
                        </p>
                        <button className="cta-button" style={{ fontSize: '1.1rem', padding: '1.3rem 4rem' }} onClick={() => setIsBookingOpen(true)}>REQUEST A VIEWING</button>
                    </div>
                </section>
            </main>

            <Footer />
            <WhatsAppButton />
            <BackToTop />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

        </div>
    );
};

export default MainSite;
