import React, { useEffect, useState } from 'react';
import Background from './components/Background';
import Navigation from './components/Navigation';
import RoomCard from './components/RoomCard';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import BookingModal from './components/BookingModal';
import SkeletonLoader from './components/SkeletonLoader';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import logo from './assets/brand/logo.png';

import axios from 'axios';
import API_BASE_URL from './config';

const MainSite = () => {
    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [showPrices, setShowPrices] = useState(true);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roomsRes, settingsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/rooms`),
                    axios.get(`${API_BASE_URL}/api/settings`)
                ]);
                setRooms(roomsRes.data);
                setSettings(settingsRes.data);
                setShowPrices(settingsRes.data.displayOptions?.showRoomPrices ?? true);
                setLoadingRooms(false);
            } catch (err) {
                console.error('Error fetching data:', err);
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

    return (
        <motion.div 
            className="app-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Background />
            <Navigation />

            <main>
                {/* Section 1: Hero */}
                <section id="home" className="section hero-section reveal">
                    <div style={{ width: '100%', maxWidth: '800px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <img src={logo} alt="Five Eight 9 Hero" style={{ width: '100%', maxWidth: '120px', height: 'auto', animation: 'fadeIn 1s ease' }} />
                        <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '2px', textAlign: 'center' }}>
                            Five Eight<span style={{ color: 'var(--gold)' }}>9</span>
                        </h1>
                    </div>
                    
                    {/* Dynamic Room Counter (Refinement 001) */}
                    <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem' }} className="reveal reveal-delay-2">
                        <div className="stat-item">
                            <span className="stat-number gold-text">{(settings?.homeStats?.count || '231').toString().replace(/%/g, '')}</span>
                            <span className="stat-label">{settings?.homeStats?.label || 'SINGLE ROOMS'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number gold-text">{((settings?.homeStats?.subCount === '15%' || settings?.homeStats?.subCount === '15' || !settings?.homeStats?.subCount) ? '62' : settings.homeStats.subCount).toString().replace(/%/g, '')}</span>
                            <span className="stat-label">{settings?.homeStats?.subLabel || 'SHARING ROOMS'}</span>
                        </div>
                    </div>

                    <p style={{ marginTop: '2.5rem', maxWidth: '600px', textAlign: 'center', color: 'var(--text-secondary)', padding: '0 20px', lineHeight: '1.8' }}>
                        Providing secure, high-quality, and modern lofts for the next generation of leaders in Thohoyandou.
                    </p>
                    <div className="hero-actions reveal reveal-delay-3" style={{ marginTop: '3.5rem' }}>
                            <a href="/rooms" className="cta-button">EXPLORE THE BUILDING</a>
                            <button className="secondary-button" onClick={() => setIsBookingOpen(true)}>RESERVE A LOFT</button>
                        </div>
                </section>

                {/* (NEW) Res Full Banner */}
                {settings?.resFull && (
                    <div style={{
                        position: 'fixed', top: '80px', left: '0', width: '100%', 
                        background: 'linear-gradient(90deg, #ff4d4d, #f56565)', 
                        color: 'white', padding: '0.8rem', textAlign: 'center', 
                        zIndex: 1000, fontWeight: 900, fontSize: '0.8rem', 
                        letterSpacing: '2px', textTransform: 'uppercase',
                        boxShadow: '0 4px 15px rgba(255, 77, 77, 0.3)'
                    }}>
                        🚨 Important: Residence is currently full for the dynamic academic year 🚨
                    </div>
                )}

                {/* Section 2: Rooms */}
                <section id="rooms" className="section reveal" style={{ padding: '4rem 0' }}>
                    <h2 className="section-title" style={{ padding: '0 5%' }}>Room <span>Options</span></h2>
                    
                    <div style={{ 
                        width: '100%', 
                        overflowX: 'auto', 
                        padding: '2rem 5%',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollSnapType: 'x mandatory',
                        display: 'flex',
                        gap: '2rem'
                    }} className="horizontal-scroll-container">
                        <style>{`
                            .horizontal-scroll-container::-webkit-scrollbar { display: none; }
                            .room-card-wrapper {
                                min-width: clamp(280px, 80vw, 400px);
                                scroll-snap-align: center;
                            }
                        `}</style>
                        {loadingRooms ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="room-card-wrapper">
                                    <SkeletonLoader height="450px" borderRadius="24px" className="room-card glass-panel" />
                                </div>
                            ))
                        ) : rooms.length > 0 ? (
                            rooms.map((room, i) => (
                                <div key={room._id || i} className="room-card-wrapper reveal">
                                    <RoomCard {...room} image={room.imageUrl || room.image} price={showPrices ? room.price : ''} />
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>No rooms currently available.</p>
                        )}
                        
                        {/* Jacuzzi Specific Option if not in DB, for Demo/Placeholder */}
                        {!rooms.some(r => r.title?.toLowerCase().includes('jacuzzi')) && !loadingRooms && (
                           <div className="room-card-wrapper reveal">
                                <RoomCard 
                                    title="Jacuzzi Loft" 
                                    subtitle="Executive Suite" 
                                    desc="Premium experience with private Jacuzzi and luxury fittings."
                                    image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"
                                    price="R 8,500"
                                />
                           </div>
                        )}
                    </div>
                </section>

                {/* Section 3: Amenities */}
                <section id="amenities" className="section reveal">
                    <h2 className="section-title"><span>Amenities</span></h2>
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

        </motion.div>
    );
};

export default MainSite;
