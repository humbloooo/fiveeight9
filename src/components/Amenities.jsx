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
        <div style={{
            background: 'var(--glass)',
            backdropFilter: 'blur(30px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }} className="reveal">
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--gold)',
                color: '#000',
                padding: '0.5rem 1.5rem',
                fontSize: '0.7rem',
                fontWeight: 900,
                letterSpacing: '2px',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                textTransform: 'uppercase'
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
            `}</style>
        </div>
    );
};

export default Amenities;
