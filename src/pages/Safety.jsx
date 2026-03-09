import React from 'react';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, Clock } from 'lucide-react';

const Safety = () => {
    const measures = [
        { title: 'Biometric Access', icon: <Lock />, desc: 'Strict fingerprint-only entry for residents.' },
        { title: '24hr Surveillance', icon: <Eye />, desc: 'High-definition CCTV across all communal zones.' },
        { title: 'Night Safety', icon: <Clock />, desc: 'No exit after 10:00 PM (Entry permitted at all times for residents).' },
        { title: 'On-site Guarding', icon: <Shield />, desc: 'Trained professional security patrolling the premises.' },
    ];

    return (
        <div className="app-container">
            <Background />
            <Navigation />
            <main style={{ paddingTop: '120px' }}>
                <section className="section">
                    <h1 className="section-title" style={{ fontSize: '3.5rem' }}>Safety & <span>Security</span></h1>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem', maxWidth: '800px' }}>
                        Your academic journey deserves a secure foundation. At Five Eight 9, your safety is our highest priority.
                    </p>

                    <div className="amenities-grid">
                        {measures.map((item, i) => (
                            <div key={i} className="amenity-item">
                                <div className="amenity-icon" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>{item.icon}</div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '5rem',
                        background: 'var(--glass)',
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        maxWidth: '800px',
                        margin: '5rem auto 0'
                    }}>
                        <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', textAlign: 'center' }}>Campus Escort Service</h3>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', lineHeight: '1.6' }}>
                            For students studying late at Univen, we provide a secure walking escort service between **8:00 PM and 10:00 PM**.
                            Your safety to and from campus is handled by our internal security team.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Safety;
