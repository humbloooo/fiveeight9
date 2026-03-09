import React from 'react';
import { Wifi, Shield, Coffee, Zap, Droplets, Truck, Monitor, Sun } from 'lucide-react';

const Amenities = () => {
    const amenityList = [
        { icon: <Sun />, title: 'Solar Powered', desc: 'Continuous power during load shedding.' },
        { icon: <Wifi />, title: 'Uncapped Wi-Fi', desc: 'High-speed fiber connectivity for students.' },
        { icon: <Shield />, title: '24/7 Security', desc: 'Biometric access and round-the-clock patrol.' },
        { icon: <Coffee />, title: 'Nari\'s Cafe', desc: 'On-site student-friendly cafeteria.' },
        { icon: <Truck />, title: 'Hourly Transport', desc: 'Reliable bus service to and from campus.' },
        { icon: <Droplets />, title: 'Constant Water', desc: 'Backup water reservoirs on site.' },
        { icon: <Zap />, title: 'Electric Stoves', desc: 'Modern kitchen facilities for all.' },
        { icon: <Monitor />, title: 'Study Area', desc: 'Dedicated quiet zones for learning.' },
    ];

    return (
        <div className="amenities-grid">
            {amenityList.map((item, i) => (
                <div key={i} className="amenity-item reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="amenity-icon">
                        {item.icon}
                    </div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default Amenities;
