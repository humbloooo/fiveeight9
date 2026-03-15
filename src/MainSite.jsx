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
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/brand/logo.png';
import { MapPin, Wifi, Truck, Copy, Check } from 'lucide-react';

import axios from 'axios';
import API_BASE_URL from './config';

const MainSite = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoggedIn] = useState(!!localStorage.getItem('studentToken'));

    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };
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
                <section id="home" className="section hero-section" style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 'clamp(80px, 15vw, 120px)',
                    position: 'relative'
                }}>
                    {/* Hero Ambient Glow */}
                    <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '500px', background: 'radial-gradient(circle, var(--gold-glow), transparent 70%)', opacity: 0.15, filter: 'blur(80px)', pointerEvents: 'none' }}></div>

                    <div style={{ width: '100%', maxWidth: '900px', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', position: 'relative' }} className="reveal">
                        <motion.img 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            src={logo} alt="Five Eight 9 Hero" 
                            style={{ width: '100%', maxWidth: '160px', height: 'auto', marginBottom: '1rem' }} 
                        />
                        <motion.h1 
                            initial={{ opacity: 0, letterSpacing: '15px' }}
                            animate={{ opacity: 1, letterSpacing: '4px' }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            style={{ fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 6rem)', textAlign: 'center', textTransform: 'uppercase', lineHeight: 1 }}
                        >
                            Five Eight<span className="gold-text">9</span>
                        </motion.h1>
                    </div>
                    
                    {/* Dynamic Room Counter (Refinement 001) */}
                    <div style={{ display: 'flex', gap: 'clamp(2rem, 8vw, 4rem)', marginTop: 'clamp(2rem, 5vw, 4rem)' }} className="reveal reveal-delay-1">
                        <div className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span className="stat-number gold-text" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900 }}>{(settings?.homeStats?.count || '231').toString().replace(/%/g, '')}</span>
                            <span className="stat-label" style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.6, fontWeight: 900 }}>{settings?.homeStats?.label || 'SINGLE ROOMS'}</span>
                        </div>
                        <div style={{ width: '1px', height: '50px', background: 'var(--glass-border)', alignSelf: 'center', opacity: 0.3 }}></div>
                        <div className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span className="stat-number gold-text" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900 }}>{((settings?.homeStats?.subCount === '15%' || settings?.homeStats?.subCount === '15' || !settings?.homeStats?.subCount) ? '62' : settings.homeStats.subCount).toString().replace(/%/g, '')}</span>
                            <span className="stat-label" style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.6, fontWeight: 900 }}>{settings?.homeStats?.subLabel || 'SHARING ROOMS'}</span>
                        </div>
                    </div>

                    <p className="reveal reveal-delay-2" style={{ marginTop: 'clamp(1.5rem, 4vw, 3rem)', maxWidth: '700px', textAlign: 'center', color: 'var(--text-secondary)', padding: '0 clamp(1rem, 5vw, 2.5rem)', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                        Defining the intersection of <span className="gold-text" style={{ fontWeight: 800 }}>luxury</span> and <span className="gold-text" style={{ fontWeight: 800 }}>academic excellence</span>. Private, secure, and modern lofts tailored for the elite student lifestyle in Thohoyandou.
                    </p>

                    <div className="hero-actions reveal reveal-delay-3" style={{ marginTop: 'clamp(2rem, 5vw, 4rem)', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a href="/rooms" className="cta-button" style={{ padding: 'clamp(1rem, 2.5vw, 1.4rem) clamp(1.5rem, 4vw, 3rem)', fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}>EXPLORE THE BUILDING</a>
                        <button className="secondary-button" style={{ padding: 'clamp(1rem, 2.5vw, 1.4rem) clamp(1.5rem, 4vw, 3rem)', fontSize: 'clamp(0.8rem, 2vw, 1rem)', background: 'var(--glass)', border: '1px solid var(--glass-border)' }} onClick={() => setIsBookingOpen(true)}>RESERVE A LOFT</button>
                    </div>

                    {/* Scroll Indicator - hidden on mobile to avoid overlap */}
                    <div className="scroll-indicator-desktop" style={{ position: 'absolute', bottom: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3, duration: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.5 }}
                        >
                            <span style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: 800, textTransform: 'uppercase' }}>Scroll</span>
                            <div style={{ width: '1px', height: '40px', background: 'var(--gold)', animation: 'pulse 2s infinite' }}></div>
                        </motion.div>
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
                        ) : (
                            <>
                                {/* Featured Building Pictures */}
                                {settings?.buildingPictures?.filter(pic => pic.showOnHome).map((pic, i) => (
                                    <div key={`building-${i}`} className="room-card-wrapper reveal">
                                        <RoomCard 
                                            title="Building View" 
                                            subtitle="Gallery" 
                                            desc={pic.caption || "A glimpse into Five Eight 9's premium environment."}
                                            image={pic.url}
                                            price=""
                                        />
                                    </div>
                                ))}

                                {/* Featured Rooms */}
                                {rooms.filter(room => room.showOnHome).map((room, i) => (
                                    <div key={room._id || i} className="room-card-wrapper reveal">
                                        <RoomCard {...room} image={room.imageUrl || room.image} price={showPrices ? room.price : ''} />
                                    </div>
                                ))}

                                {/* Fallback if nothing is featured */}
                                {rooms.filter(room => room.showOnHome).length === 0 && (!settings?.buildingPictures || settings.buildingPictures.filter(pic => pic.showOnHome).length === 0) && (
                                    <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-secondary)' }}>No featured content available.</p>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Resident Quick Info Panel */}
                <AnimatePresence>
                    {isLoggedIn && settings && (
                        <motion.section 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="section" 
                            style={{ paddingTop: '2rem', paddingBottom: '0' }}
                        >
                            <div className="glass-panel" style={{ padding: 'clamp(1.2rem, 3vw, 2rem)', borderRadius: 'clamp(20px, 4vw, 32px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', border: '1px solid var(--gold-glow)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '1px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MapPin size={14} /> RESIDENCE ADDRESS
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{settings.address || '@589 Luxury Student Lofts, Thohoyandou'}</span>
                                        <button onClick={() => handleCopy(settings.address, 'address')} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                                            {copiedField === 'address' ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '1px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Wifi size={14} /> WIFI PASSWORDS
                                    </h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>RES</span>
                                                <span style={{ fontSize: '0.8rem' }}>{settings.wifiPasswords?.res}</span>
                                            </div>
                                            <button onClick={() => handleCopy(settings.wifiPasswords?.res, 'res')} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                                                {copiedField === 'res' ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>UNIVEN</span>
                                                <span style={{ fontSize: '0.8rem' }}>{settings.wifiPasswords?.univen}</span>
                                            </div>
                                            <button onClick={() => handleCopy(settings.wifiPasswords?.univen, 'univen')} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                                                {copiedField === 'univen' ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <h3 style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '1px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Truck size={14} /> LIVE TRANSPORT
                                    </h3>
                                    <div style={{ background: 'var(--gold-gradient)', padding: '1rem', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'black' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 900 }}>{settings.transport?.currentStatus?.location || 'Status Unavailable'}</span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.7 }}>ETA: {settings.transport?.currentStatus?.estimatedArrival || 'N/A'}</span>
                                        </div>
                                        <Truck size={24} style={{ opacity: 0.8 }} />
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Section 2.5: Detailed Transport Schedule */}
                <section id="transport" className="section reveal">
                    <h2 className="section-title"><span>Transport</span> Schedule</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 'clamp(20px, 4vw, 40px)' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Truck size={20} /> Recurring Daily Bus
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '0.8rem' }}>
                                {settings?.transport?.baseSchedule?.filter(s => s.active).map((slot, i) => (
                                    <div key={i} style={{ 
                                        padding: '0.8rem', 
                                        background: 'rgba(255,255,255,0.03)', 
                                        borderRadius: '12px', 
                                        textAlign: 'center', 
                                        fontSize: '0.8rem', 
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-primary)',
                                        fontWeight: 700
                                    }}>
                                        {slot.time}
                                    </div>
                                ))}
                            </div>
                            <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                * Schedule runs Monday to Friday during academic sessions.
                            </p>
                        </div>

                        {settings?.transport?.exceptions?.length > 0 && (
                            <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: 'clamp(20px, 4vw, 40px)', border: '1px solid rgba(255, 71, 87, 0.2)' }}>
                                <h3 style={{ fontSize: '1.2rem', color: '#ff4757', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <Truck size={20} /> Schedule Exceptions
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {settings.transport.exceptions.map((ex, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 71, 87, 0.05)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255, 71, 87, 0.1)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>{new Date(ex.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {ex.time}</div>
                                                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{ex.note}</div>
                                            </div>
                                            <div style={{ fontSize: '0.6rem', background: '#ff4757', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 900 }}>ALERT</div>
                                        </div>
                                    ))}
                                </div>
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
                <section id="contact" className="section reveal" style={{ minHeight: 'auto' }}>
                    <div className="glass-panel" style={{
                        padding: 'clamp(2rem, 6vw, 5rem)',
                        borderRadius: 'clamp(24px, 5vw, 60px)',
                        textAlign: 'center',
                        maxWidth: '1000px',
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: '-10%', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at center, var(--gold-glow), transparent 70%)', opacity: 0.1, pointerEvents: 'none' }}></div>
                        <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem' }}>Ready to <span className="gold-text">Move In?</span></h2>
                        <p style={{ maxWidth: '650px', color: 'var(--text-secondary)', textAlign: 'center', margin: '0 auto', marginBottom: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', padding: '0 clamp(0.5rem, 3vw, 1rem)' }}>
                            Join a community of high-achieving students in an environment that fosters academic excellence and a vibrant social vibe.
                        </p>
                        <button className="cta-button" style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', padding: 'clamp(1rem, 2.5vw, 1.3rem) clamp(2rem, 5vw, 4rem)' }} onClick={() => setIsBookingOpen(true)}>REQUEST A VIEWING</button>
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
