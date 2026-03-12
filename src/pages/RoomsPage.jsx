import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../config';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Home, Shield, Truck, Coffee, ArrowRight, Info, Layers } from 'lucide-react';

const GalleryCategory = ({ title, icon: GalleryIcon, items, delay }) => (
    <motion.div 
        className="gallery-category reveal"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        style={{ marginBottom: '6rem' }}
    >
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline',
            padding: '0 5%',
            marginBottom: '2rem'
        }}>
            <h2 style={{ 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                fontWeight: 900, 
                textTransform: 'uppercase',
                letterSpacing: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <GalleryIcon className="gold-text" size={32} />
                {title} <span className="gold-text">Gallery</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 700 }}>
                Scroll <ArrowRight size={14} />
            </div>
        </div>

        <div className="horizontal-gallery-scroll" style={{
            display: 'flex',
            gap: '2rem',
            overflowX: 'auto',
            padding: '1rem 5% 2rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: 'x mandatory'
        }}>
            {items.map((img, i) => (
                <div key={i} className="gallery-item-wrapper" style={{
                    minWidth: 'clamp(300px, 80vw, 500px)',
                    height: 'clamp(350px, 50vh, 500px)',
                    scrollSnapAlign: 'start',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                    <img 
                        src={img.url} 
                        alt={img.caption || title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        padding: '2rem',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        color: 'white'
                    }}>
                        <p style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            {img.caption || `${title} Space`}
                        </p>
                    </div>
                </div>
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
                { url: 'https://images.unsplash.com/photo-1545324418-f1d3c5b53571?auto=format&fit=crop&q=80&w=800', caption: 'Front Elevation' },
                { url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800', caption: 'Executive Lobby' },
                { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800', caption: 'Night Architecture' }
            ],
        rooms: [
            ...apiRooms,
            { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', caption: 'Single Loft Standard' },
            { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800', caption: 'Deluxe Suite Living' },
            { url: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800', caption: 'Premium Studying Area' }
        ],
        amenities: [
            { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', caption: 'Private Jacuzzi' },
            { url: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800', caption: 'The Hub (Study Lab)' },
            { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', caption: "Nari's Cafe Vibe" }
        ],
        security: [
            { url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800', caption: 'Biometric Access Control' },
            { url: 'https://images.unsplash.com/photo-1590483734724-383b853b2719?auto=format&fit=crop&q=80&w=800', caption: 'Secure Perimeter' }
        ],
        transport: [
            { url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800', caption: 'Complimentary Shuttle' },
            { url: 'https://images.unsplash.com/photo-1562610885-3e284f1ede4b?auto=format&fit=crop&q=80&w=800', caption: 'Convenient Pick-up Points' }
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

            <div style={{ paddingTop: '160px', paddingBottom: '8rem' }}>
                <header className="reveal" style={{ textAlign: 'center', marginBottom: '8rem', padding: '0 5%' }}>
                    <h1 style={{ marginBottom: '1.5rem' }}>
                        The <span className="gold-text">Building</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8', fontWeight: 500 }}>
                        Experience the lifestyle at Five Eight 9. From modern living spaces to luxury amenities, explore the architecture that inspires.
                    </p>
                </header>

                <GalleryCategory title="Building" icon={Home} items={galleryData.building} delay={0.1} />
                <GalleryCategory title="Room Layouts" icon={Layers || Info} items={galleryData.rooms} delay={0.2} />
                <GalleryCategory title="Amenities" icon={Coffee} items={galleryData.amenities} delay={0.3} />
                <GalleryCategory title="Security" icon={Shield} items={galleryData.security} delay={0.4} />
                <GalleryCategory title="Transport" icon={Truck} items={galleryData.transport} delay={0.5} />

                <section style={{ textAlign: 'center', padding: '6rem 5%', background: 'var(--glass)', margin: '0 5%', borderRadius: '40px', border: '1px solid var(--glass-border)' }} className="reveal">
                    <h2 style={{ marginBottom: '2rem', fontWeight: 900 }}>Ready to <span className="gold-text">Join Us?</span></h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Spaces are filling up fast for the new academic year. Secure your spot now and experience student living like never before.
                    </p>
                    <button className="cta-button" onClick={() => window.dispatchEvent(new CustomEvent('openBooking'))}>
                        Request A Viewing
                    </button>
                </section>
            </div>

            <Footer />

            <style>{`
                .horizontal-gallery-scroll::-webkit-scrollbar { display: none; }
                .gallery-item-wrapper:hover img { transform: scale(1.05); transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .gallery-item-wrapper img { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </motion.div>
    );
};

export default RoomsPage;
