import React, { useState } from 'react';
import { Wifi, Shield, Coffee, Zap, Droplets, Truck, Monitor, Sun } from 'lucide-react';

const Amenities = () => {
    const [activeAmenity, setActiveAmenity] = useState(null);

    const amenityList = [
        { icon: <Sun size={18} />, title: 'Solar Powered', desc: 'Continuous power supply through our dedicated solar array.' },
        { icon: <Wifi size={18} />, title: 'Uncapped Wi-Fi', desc: 'High-speed internet access available throughout the community.' },
        { icon: <Shield size={18} />, title: '24/7 Security', desc: 'Round-the-clock security personnel and CCTV monitoring.' },
        { icon: <Coffee size={18} />, title: 'Nari\'s Cafe', desc: 'On-site cafe serving fresh meals, snacks, and premium coffee.' },
        { icon: <Truck size={18} />, title: 'Hourly Transport', desc: 'Reliable shuttle service to key campus locations.' },
        { icon: <Droplets size={18} />, title: 'Constant Water', desc: 'Backup water tanks ensuring uninterrupted supply.' },
        { icon: <Zap size={18} />, title: 'Electric Stoves', desc: 'Modern kitchenettes equipped with electric stoves.' },
        { icon: <Monitor size={18} />, title: 'Study Area', desc: 'Quiet, dedicated spaces designed for focused academic work.' },
    ];

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
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginTop: '1rem'
            }}>
                {amenityList.map((item, i) => (
                    <div key={i} 
                         onClick={() => setActiveAmenity(activeAmenity === i ? null : i)}
                         style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        textAlign: 'center',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        cursor: 'pointer',
                        padding: '1.5rem 1rem',
                        borderRadius: '24px',
                        background: activeAmenity === i ? 'var(--glass-thick)' : 'transparent',
                        border: activeAmenity === i ? '1px solid var(--gold)' : '1px solid transparent'
                    }} className="amenity-mini-item">
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            background: activeAmenity === i ? 'var(--gold)' : 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: activeAmenity === i ? 'var(--navy)' : 'var(--gold)',
                            transition: 'all 0.3s ease'
                        }}>
                            {item.icon}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                color: activeAmenity === i ? 'var(--gold)' : 'var(--text-primary)',
                                letterSpacing: '0.5px',
                                transition: 'color 0.3s ease'
                            }}>{item.title}</span>
                            
                            <div style={{
                                maxHeight: activeAmenity === i ? '120px' : '0',
                                opacity: activeAmenity === i ? 1 : 0,
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.5',
                                marginTop: activeAmenity === i ? '0.5rem' : '0'
                            }}>
                                {item.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .amenity-mini-item:hover {
                    transform: translateY(-5px);
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
