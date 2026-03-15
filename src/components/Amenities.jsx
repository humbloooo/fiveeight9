import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

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
            } catch (err) {
                console.error('Error fetching amenities:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAmenities();
    }, []);

    const getIcon = (iconName, size = 24) => {
        const Icon = LucideIcons[iconName] || LucideIcons.Info;
        return <Icon size={size} strokeWidth={2.5} />;
    };

    if (!loading && amenities.length === 0) return null;

    return (
        <section className="reveal" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: 'clamp(3rem, 8vw, 6rem) 5%' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 5rem)' }}>
                <span style={{
                    color: 'var(--gold)',
                    fontWeight: 900,
                    fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                    letterSpacing: '5px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '1rem'
                }}>Premium Facilities</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1rem' }}>
                    Living <span className="gold-text">Redefined</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)' }}>
                    Every detail designed to elevate your lifestyle. Discover what makes us exclusive.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                width: '100%'
            }}>
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} style={{
                            height: '240px',
                            background: 'var(--glass)',
                            borderRadius: 'clamp(24px, 4vw, 32px)',
                            border: '1px solid var(--glass-border)',
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                    ))
                ) : (
                    amenities.map((item, i) => (
                        <motion.div
                            key={item._id || i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: i * 0.06, duration: 0.5 }}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            onClick={() => setSelectedDetail(item)}
                            style={{
                                background: 'var(--glass)',
                                backdropFilter: 'blur(30px)',
                                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                                borderRadius: 'clamp(24px, 4vw, 32px)',
                                border: '1px solid var(--glass-border)',
                                cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            whileHover={{
                                y: -8,
                                borderColor: 'var(--gold)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                            }}
                        >
                            {/* Featured image if available */}
                            {item.imageUrl && (
                                <div style={{
                                    width: '100%',
                                    height: '160px',
                                    borderRadius: 'clamp(16px, 3vw, 20px)',
                                    overflow: 'hidden',
                                    marginBottom: '1.2rem'
                                }}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                    />
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: 'min(56px, 14vw)',
                                    height: 'min(56px, 14vw)',
                                    minWidth: '44px',
                                    minHeight: '44px',
                                    borderRadius: '16px',
                                    background: hoveredIdx === i ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: hoveredIdx === i ? 'var(--navy)' : 'var(--gold)',
                                    transition: 'all 0.4s ease',
                                    flexShrink: 0
                                }}>
                                    {getIcon(item.icon)}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{
                                        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                                        fontWeight: 900,
                                        marginBottom: '0.5rem',
                                        color: 'var(--text-primary)',
                                        letterSpacing: '-0.3px'
                                    }}>{item.title}</h3>

                                    <p style={{
                                        fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6',
                                        margin: 0,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {(item.detailedDesc || (item.media && item.media.length > 0)) && (
                                <div style={{
                                    marginTop: '1rem',
                                    paddingTop: '0.8rem',
                                    borderTop: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        color: 'var(--gold)',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase'
                                    }}>View Details</span>
                                    <LucideIcons.ArrowRight size={14} color="var(--gold)" />
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedDetail && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 5000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: 'clamp(1rem, 2vw, 2rem)'
                        }}
                    >
                        <div
                            onClick={() => setSelectedDetail(null)}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)' }}
                        />

                        <motion.div
                            initial={{ y: 40, opacity: 0, scale: 0.97 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 40, opacity: 0, scale: 0.97 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{
                                position: 'relative',
                                background: 'var(--navy)',
                                width: '100%',
                                maxWidth: '900px',
                                maxHeight: '90dvh',
                                overflowY: 'auto',
                                borderRadius: 'clamp(24px, 4vw, 32px)',
                                border: '1px solid var(--glass-border)',
                                padding: 'clamp(1.5rem, 5vw, 3.5rem)',
                                boxShadow: '0 50px 150px rgba(0,0,0,0.8)'
                            }}
                        >
                            <button
                                onClick={() => setSelectedDetail(null)}
                                style={{
                                    position: 'sticky',
                                    top: '0',
                                    float: 'right',
                                    background: 'var(--glass)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <LucideIcons.X size={18} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 1.5rem)', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', flexWrap: 'wrap' }}>
                                <div style={{
                                    width: 'min(72px, 18vw)', height: 'min(72px, 18vw)', borderRadius: '20px',
                                    background: 'var(--gold-gradient)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', color: 'var(--navy)',
                                    flexShrink: 0
                                }}>
                                    {getIcon(selectedDetail.icon, 28)}
                                </div>
                                <div style={{ flex: 1, minWidth: '180px' }}>
                                    <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Exclusive Feature</span>
                                    <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', fontWeight: 900, letterSpacing: '-1px', margin: 0 }}>{selectedDetail.title}</h2>
                                </div>
                            </div>

                            {/* Description */}
                            {selectedDetail.detailedDesc ? (
                                <div
                                    style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}
                                    dangerouslySetInnerHTML={{ __html: selectedDetail.detailedDesc }}
                                />
                            ) : selectedDetail.description ? (
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
                                    {selectedDetail.description}
                                </p>
                            ) : null}

                            {/* Media Gallery */}
                            {selectedDetail.media && selectedDetail.media.length > 0 && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${selectedDetail.media.length === 1 ? '400px' : '220px'}), 1fr))`,
                                    gap: '1rem'
                                }}>
                                    {selectedDetail.media.map((img, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            style={{ borderRadius: 'clamp(16px, 3vw, 20px)', overflow: 'hidden' }}
                                        >
                                            <img
                                                src={img}
                                                style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'cover', display: 'block' }}
                                                alt={`${selectedDetail.title} - ${idx + 1}`}
                                            />
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

export default Amenities;
