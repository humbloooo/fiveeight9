import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wifi, Shield, Zap, Droplets, Truck, Sun, Info, X, 
    Smartphone, Utensils, Dumbbell, Car, Lock, Key, Tv
} from 'lucide-react';

const Amenities = () => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/amenities`);
                setAmenities(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching amenities:', err);
                setLoading(false);
            }
        };
        fetchAmenities();
    }, []);

    const getIcon = (iconName) => {
        const props = { size: 24, strokeWidth: 2.5 };
        switch (iconName?.toLowerCase()) {
            case 'sun': return <Sun {...props} />;
            case 'wifi': return <Wifi {...props} />;
            case 'shield': return <Shield {...props} />;
            case 'coffee': return <Utensils {...props} />;
            case 'truck': return <Truck {...props} />;
            case 'droplets': return <Droplets {...props} />;
            case 'zap': return <Zap {...props} />;
            case 'monitor': return <Tv {...props} />;
            case 'waves': return <Waves {...props} />;
            case 'wind': return <Wind {...props} />;
            case 'smartphone': return <Smartphone {...props} />;
            case 'gym': return <Dumbbell {...props} />;
            case 'parking': return <Car {...props} />;
            case 'security': return <Lock {...props} />;
            case 'access': return <Key {...props} />;
            default: return <Info {...props} />;
        }
    };

    return (
        <section className="reveal" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '6rem 5%' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <span style={{ 
                    color: 'var(--gold)', 
                    fontWeight: 900, 
                    fontSize: '0.8rem', 
                    letterSpacing: '5px', 
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '1rem'
                }}>Premium Facilities</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
                    Living <span className="gold-text">Redefined</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                    Every detail designed to elevate your lifestyle. Discover what makes us exclusive.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem'
            }}>
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} style={{ height: '220px', background: 'var(--glass)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}></div>
                    ))
                ) : (
                    amenities.map((item, i) => (
                        <motion.div 
                            key={item._id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            onClick={() => setSelectedDetail(item)}
                            style={{
                                background: 'var(--glass)',
                                backdropFilter: 'blur(30px)',
                                padding: '2.5rem',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            whileHover={{ 
                                y: -10,
                                borderColor: 'var(--gold)',
                                background: 'rgba(var(--gold-rgb, 197, 160, 89), 0.05)'
                            }}
                        >
                            {/* Decorative Background Glow */}
                            <AnimatePresence>
                                {hoveredIdx === i && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        style={{
                                            position: 'absolute',
                                            top: '-20%',
                                            right: '-20%',
                                            width: '200px',
                                            height: '200px',
                                            background: 'var(--gold-gradient)',
                                            filter: 'blur(80px)',
                                            opacity: 0.1,
                                            zIndex: 0,
                                            pointerEvents: 'none'
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '20px',
                                background: hoveredIdx === i ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: hoveredIdx === i ? 'var(--navy)' : 'var(--gold)',
                                marginBottom: '2rem',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                {getIcon(item.icon)}
                            </div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 900,
                                    marginBottom: '1rem',
                                    color: 'var(--text-primary)',
                                    letterSpacing: '-0.5px'
                                }}>{item.title}</h3>
                                
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {item.desc}
                                </p>

                                <div style={{ 
                                    marginTop: '1.5rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 900,
                                    color: 'var(--gold)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    opacity: hoveredIdx === i ? 1 : 0,
                                    transform: hoveredIdx === i ? 'translateX(0)' : 'translateX(-10px)',
                                    transition: 'all 0.4s ease'
                                }}>
                                    Explore Detail <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Premium Detail Modal */}
            <AnimatePresence>
                {selectedDetail && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 5000, 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <div 
                            onClick={() => setSelectedDetail(null)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
                        ></div>
                        
                        <motion.div 
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            style={{
                                position: 'relative', background: 'var(--navy)', width: '100%', maxWidth: '900px',
                                maxHeight: '90vh', overflowY: 'auto', borderRadius: '40px', border: '1px solid var(--glass-border)',
                                padding: '4rem',
                                boxShadow: '0 50px 150px rgba(0,0,0,0.8)'
                            }}
                        >
                            <button 
                                onClick={() => setSelectedDetail(null)}
                                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                                <div style={{ 
                                    width: '80px', height: '80px', borderRadius: '24px', 
                                    background: 'var(--gold-gradient)', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center', color: 'var(--navy)'
                                }}>
                                    {getIcon(selectedDetail.icon)}
                                </div>
                                <div>
                                    <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Exclusive Feature</span>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px' }}>{selectedDetail.title}</h2>
                                </div>
                            </div>

                            <div 
                                style={{ color: 'var(--text-secondary)', lineHeight: '2', fontSize: '1.2rem', marginBottom: '4rem', fontWeight: 500 }}
                                dangerouslySetInnerHTML={{ __html: selectedDetail.detailedDesc || selectedDetail.desc }}
                            />

                            {selectedDetail.media && selectedDetail.media.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {selectedDetail.media.map((img, idx) => (
                                        <motion.div 
                                            key={idx}
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <img src={img} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '24px', border: '1px solid var(--glass-border)' }} alt={selectedDetail.title} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

// Helper for arrow icon as it was missing from original setup
const ArrowRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

export default Amenities;
