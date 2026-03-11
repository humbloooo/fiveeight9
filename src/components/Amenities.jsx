import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { Wifi, Shield, Coffee, Zap, Droplets, Truck, Monitor, Sun, Info, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Amenities = () => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeAmenity, setActiveAmenity] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);

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
        switch (iconName?.toLowerCase()) {
            case 'sun': return <Sun size={18} />;
            case 'wifi': return <Wifi size={18} />;
            case 'shield': return <Shield size={18} />;
            case 'coffee': return <Coffee size={18} />;
            case 'truck': return <Truck size={18} />;
            case 'droplets': return <Droplets size={18} />;
            case 'zap': return <Zap size={18} />;
            case 'monitor': return <Monitor size={18} />;
            default: return <Info size={18} />;
        }
    };

    return (
        <div className="reveal glass-panel" style={{
            padding: '4rem 2.5rem',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '40px'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                background: 'var(--gold-gradient)',
                color: 'var(--navy)',
                padding: '0.6rem 2rem',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '3px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                textTransform: 'uppercase',
                boxShadow: '0 5px 15px rgba(197, 160, 89, 0.3)'
            }}>
                Amenities
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2rem',
                marginTop: '1.5rem'
            }}>
                {loading ? (
                    Array(8).fill(0).map((_, i) => (
                        <div key={i} style={{ height: '140px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}></div>
                    ))
                ) : (
                    amenities.map((item, i) => (
                        <div key={item._id || i} 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1rem',
                                textAlign: 'center',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                padding: '1.5rem 1rem',
                                borderRadius: '24px',
                                background: activeAmenity === i ? 'rgba(var(--gold-rgb, 197, 160, 89), 0.05)' : 'transparent',
                                border: '1px solid transparent',
                                position: 'relative'
                            }} 
                            onMouseEnter={() => setActiveAmenity(i)}
                            onMouseLeave={() => setActiveAmenity(null)}
                            className="amenity-mini-item"
                        >
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '15px',
                                background: activeAmenity === i ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: activeAmenity === i ? 'var(--navy)' : 'var(--gold)',
                                transition: 'all 0.3s ease'
                            }}>
                                {getIcon(item.icon)}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <span style={{
                                    fontSize: '0.85rem',
                                    fontWeight: 800,
                                    color: activeAmenity === i ? 'var(--gold)' : 'var(--text-primary)',
                                    letterSpacing: '0.5px',
                                    transition: 'color 0.3s ease'
                                }}>{item.title}</span>
                                
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: '1.5',
                                    margin: 0,
                                    opacity: activeAmenity === i ? 1 : 0.7,
                                    transition: 'opacity 0.3s ease'
                                }}>
                                    {item.desc}
                                </p>

                                {item.detailedDesc && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedDetail(item); }}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--gold)',
                                            fontSize: '0.7rem',
                                            fontWeight: 900,
                                            marginTop: '0.8rem',
                                            cursor: 'pointer',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.4rem',
                                            opacity: activeAmenity === i ? 1 : 0,
                                            transform: activeAmenity === i ? 'translateY(0)' : 'translateY(5px)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        View Details <Info size={12} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Detailed Modal Overlay */}
            {selectedDetail && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 3000, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <div 
                        onClick={() => setSelectedDetail(null)}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
                    ></div>
                    
                    <div style={{
                        position: 'relative', background: 'var(--navy)', width: '100%', maxWidth: '800px',
                        maxHeight: '90vh', overflowY: 'auto', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)',
                        padding: '3rem'
                    }} className="reveal">
                        <button 
                            onClick={() => setSelectedDetail(null)}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--navy)' }}>
                                {getIcon(selectedDetail.icon)}
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>{selectedDetail.title}</h2>
                        </div>

                        <div 
                            style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '3rem' }}
                            dangerouslySetInnerHTML={{ __html: selectedDetail.detailedDesc || selectedDetail.desc }}
                        />

                        {selectedDetail.media && selectedDetail.media.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                {selectedDetail.media.map((img, idx) => (
                                    <img key={idx} src={img} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }} alt={selectedDetail.title} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                .amenity-mini-item:hover {
                    background: rgba(255,255,255,0.02) !important;
                }
                .amenity-mini-item:hover div {
                    background: var(--gold);
                    color: var(--navy);
                    border-color: var(--gold);
                }
                /* (104) Icon Morphing / Pulse effect */
                .amenity-mini-item:hover div svg {
                    animation: pulseIcon 0.6s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate;
                }
                @keyframes pulseIcon {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.18) rotate(5deg); }
                }
            `}</style>
        </div>
    );
};

export default Amenities;
