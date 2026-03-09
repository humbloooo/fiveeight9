import React from 'react';
import { Wifi, Shield, Zap, Coffee, Library, Users, Waves, Bus, Utensils, Sun } from 'lucide-react';

const Amenities = () => {
    const amenities = [
        { icon: <Wifi />, title: 'Uncapped Wi-Fi', desc: 'High-speed fiber for seamless studying.' },
        { icon: <Shield />, title: '24/7 Security', desc: 'Secure biometric access & monitoring.' },
        { icon: <Sun />, title: 'Solar Backup', desc: 'Zero load-shedding with our solar grid.' },
        { icon: <Waves />, title: 'Swimming Pool', desc: 'Relax and unwind in our premium pool.' },
        { icon: <Library />, title: 'Pro Study Area', desc: 'Quiet zones designed for academic focus.' },
        { icon: <Bus />, title: 'Hourly Transport', desc: 'Frequent shuttles to and from campus.' },
        { icon: <Utensils />, title: 'Student Cafeteria', desc: 'Delicious and affordable meals daily.' },
        { icon: <Zap />, title: 'Electric & Gas', desc: 'Hybrid stoves for reliable cooking always.' },
    ];

    return (
        <div id="amenities-list" className="amenities-grid">
            {amenities.map((item, i) => (
                <div key={i} className="amenity-item">
                    <div className="amenity-icon">{item.icon}</div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default Amenities;
