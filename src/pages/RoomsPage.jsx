import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../config';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Home, Shield, Truck, Coffee, ArrowRight, Info, Layers, Maximize2 } from 'lucide-react';

const GalleryCategory = ({ title, icon: GalleryIcon, items, delay }) => (
    <motion.div 
        className="gallery-category reveal"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        style={{ marginBottom: 'clamp(4rem, 10vw, 8rem)' }}
    >
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 5%',
            marginBottom: '3rem'
        }}>
            <div>
                <h2 style={{ 
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', 
                    fontWeight: 900, 
                    textTransform: 'uppercase',
                    letterSpacing: '-1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem',
                    marginBottom: '0.5rem'
                }}>
                    <div style={{
                        background: 'var(--gold-gradient)',
                        padding: '0.8rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 25px rgba(197, 160, 89, 0.3)'
                    }}>
                        <GalleryIcon color="var(--navy)" size={28} />
                    </div>
                    {title} <span className="gold-text">Gallery</span>
                </h2>
                <div style={{ height: '4px', width: '60px', background: 'var(--gold)', borderRadius: '2px' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Swipe <ArrowRight size={18} className="gold-text" />
            </div>
        </div>

        <div className="horizontal-gallery-scroll" style={{
            display: 'flex',
            gap: '2.5rem',
            overflowX: 'auto',
            padding: '1rem 5% 3rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory'
        }}>
            {items.map((img, i) => (
                <motion.div 
                    key={i} 
                    className="gallery-item-wrapper" 
                    whileHover={{ y: -15 }}
                    style={{
                        minWidth: 'clamp(260px, 80vw, 550px)',
                        height: 'clamp(300px, 50vh, 600px)',
                        scrollSnapAlign: 'center',
                        borderRadius: 'clamp(24px, 4vw, 40px)',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid var(--glass-border)',
                        background: 'var(--glass-deep)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                        cursor: 'pointer'
                    }}
                >
                    <img 
                        src={img.url} 
                        alt={img.caption || title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        loading="lazy"
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2.5rem)',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}>
                        <div>
                            <span style={{ 
                                color: 'var(--gold)', 
                                fontSize: '0.75rem', 
                                fontWeight: 900, 
                                letterSpacing: '2px', 
                                textTransform: 'uppercase',
                                display: 'block',
                                marginBottom: '0.5rem'
                            }}>
                                {title}
                            </span>
                            <h4 style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
                                {img.caption || `${title} Space`}
                            </h4>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            padding: '0.8rem',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <Maximize2 size={18} />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchData = async () => {
            try {
                const [roomsRes, settingsRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/rooms`),
                    axios.get(`${API_BASE_URL}/api/settings`)
                ]);
                setRooms(roomsRes.data);
                setSettings(settingsRes.data);
            } catch (err) {
                console.error('Failed to fetch dynamic data', err);
            }
        };
        fetchData();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Merge API rooms into gallery categories
    const apiRooms = rooms.map(r => ({
        url: r.imageUrl || (r.media && r.media[0]),
        caption: r.title || r.name,
        category: r.category || 'Single Room'
    })).filter(r => r.url);

    const galleryData = {
        building: settings?.buildingPictures?.length > 0 
            ? settings.buildingPictures 
            : [
                { url: 'https://images.unsplash.com/photo-1545324418-f1d3c5b53571?auto=format&fit=crop&q=80&w=1200', caption: 'Front Elevation' },
                { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200', caption: 'Executive Lobby' },
                { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200', caption: 'Night Architecture' }
            ],
        rooms: [
            ...apiRooms,
            { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200', caption: 'Single Loft Standard' },
            { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200', caption: 'Deluxe Suite Living' },
            { url: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1200', caption: 'Premium Studying Area' }
        ],
        amenities: [
            { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', caption: 'Private Jacuzzi' },
            { url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=1200', caption: 'The Hub (Study Lab)' },
            { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200', caption: "Nari's Cafe Vibe" }
        ],
        security: [
            { url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200', caption: 'Biometric Access Control' },
            { url: 'https://images.unsplash.com/photo-1590483734724-383b853b2719?auto=format&fit=crop&q=80&w=1200', caption: 'Secure Perimeter' }
        ],
        transport: [
            { url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200', caption: 'Complimentary Shuttle' },
            { url: 'https://images.unsplash.com/photo-1562610885-3e284f1ede4b?auto=format&fit=crop&q=80&w=1200', caption: 'Convenient Pick-up Points' }
        ]
    };

    return (
        <motion.div 
            className="rooms-page-container" style={{ minHeight: '100vh', background: 'var(--navy)', color: 'var(--text-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Background />
            <Navigation />

            <div style={{ paddingTop: 'clamp(100px, 20vw, 180px)', paddingBottom: 'clamp(4rem, 10vw, 10rem)' }}>
                <header className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vw, 10rem)', padding: '0 5%' }}>
                    <div style={{
                        background: 'rgba(197, 160, 89, 0.1)',
                        width: 'fit-content',
                        margin: '0 auto 2rem',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '50px',
                        border: '1px solid var(--gold-glow)',
                        color: 'var(--gold)',
                        fontSize: '0.85rem',
                        fontWeight: 900,
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        PREMIUM ACCOMMODATION
                    </div>
                    <h1 style={{ marginBottom: '2rem', fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
                        The <span className="gold-text">Estate</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.9', fontWeight: 500 }}>
                        Five Eight 9 isn't just a place to stay—it's a statement. Explore the architectural brilliance and luxury spaces 
                        designed to elevate your university experience.
                    </p>
                </header>

                <GalleryCategory title="Architecture" icon={Home} items={galleryData.building} delay={0.1} />
                <GalleryCategory title="Residences" icon={Layers || Info} items={galleryData.rooms} delay={0.2} />
                <GalleryCategory title="Amenities" icon={Coffee} items={galleryData.amenities} delay={0.3} />
                <GalleryCategory title="Safety" icon={Shield} items={galleryData.security} delay={0.4} />
                <GalleryCategory title="Transport" icon={Truck} items={galleryData.transport} delay={0.5} />

                <section style={{
                    textAlign: 'center',
                    padding: 'clamp(3rem, 8vw, 8rem) 5%',
                    background: 'var(--glass-deep)',
                    margin: '0 clamp(1rem, 3vw, 5%)',
                    borderRadius: 'clamp(24px, 5vw, 50px)',
                    border: '1px solid var(--glass-border)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.4)'
                }} className="reveal">
                    {/* Decorative element */}
                    <div style={{
                        position: 'absolute',
                        top: '-10%',
                        right: '-5%',
                        width: '300px',
                        height: '300px',
                        background: 'var(--gold-gradient)',
                        filter: 'blur(150px)',
                        opacity: 0.1,
                        pointerEvents: 'none'
                    }}></div>

                    <h2 style={{ marginBottom: '2rem', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-1px' }}>
                        Experience the <span className="gold-text">Difference.</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto clamp(2rem, 5vw, 4rem)', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', lineHeight: '1.8', padding: '0 clamp(0.5rem, 3vw, 1rem)' }}>
                        Our spaces are engineered for success and comfort. Limited availability remains for the upcoming semester.
                    </p>
                    <button className="cta-button"
                        onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}
                        style={{ padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.5rem, 4vw, 3rem)', fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', borderRadius: '20px' }}
                    >
                        Secure Your Residence <ArrowRight size={22} style={{ marginLeft: '1rem' }} />
                    </button>
                </section>
            </div>

            <Footer />

            <style>{`
                .horizontal-gallery-scroll::-webkit-scrollbar { display: none; }
                .gallery-item-wrapper:hover img { transform: scale(1.1); }
                .gallery-item-wrapper {
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
        </motion.div>
    );
};

export default RoomsPage;
