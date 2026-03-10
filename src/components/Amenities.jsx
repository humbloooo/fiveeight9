import React from 'react';
import { Wifi, Shield, Coffee, Zap, Droplets, Truck, Monitor, Sun } from 'lucide-react';

const Amenities = () => {
    const amenityList = [
        { icon: <Sun size={18} />, title: 'Solar Powered' },
        { icon: <Wifi size={18} />, title: 'Uncapped Wi-Fi' },
        { icon: <Shield size={18} />, title: '24/7 Security' },
        { icon: <Coffee size={18} />, title: 'Nari\'s Cafe' },
        { icon: <Truck size={18} />, title: 'Hourly Transport' },
        { icon: <Droplets size={18} />, title: 'Constant Water' },
        { icon: <Zap size={18} />, title: 'Electric Stoves' },
        { icon: <Monitor size={18} />, title: 'Study Area' },
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
                transform: 'translateX(-50%)',
                background: 'var(--gold-gradient)',
                color: '#000',
                padding: '0.6rem 2rem',
                fontSize: '0.75rem',
                fontWeight: 900,
                letterSpacing: '3px',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                textTransform: 'uppercase',
                boxShadow: '0 5px 15px rgba(197, 160, 89, 0.3)'
            }}>
                Student Experience
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                marginTop: '1rem'
            }}>
                {amenityList.map((item, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease'
                    }} className="amenity-mini-item">
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold)',
                        }}>
                            {item.icon}
                        </div>
                        <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            letterSpacing: '0.5px'
                        }}>{item.title}</span>
                    </div>
                ))}
            </div>

            <style>{`
                .amenity-mini-item:hover {
                    transform: translateY(-5px);
                }
                .amenity-mini-item:hover div {
                    background: var(--gold);
                    color: #000;
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
