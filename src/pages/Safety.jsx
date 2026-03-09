import React, { useEffect } from 'react';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, Clock, CheckCircle } from 'lucide-react';

const Safety = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.amenity-item, .section-title, .reveal-text, .safety-info-card').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const measures = [
        { title: 'Biometric Access', icon: <Lock />, desc: 'Strict fingerprint-only entry for residents, ensuring unauthorized persons stay out.' },
        { title: '24hr Surveillance', icon: <Eye />, desc: 'High-definition CCTV across all communal zones and entry points.' },
        { title: 'Controlled Entry', icon: <Clock />, desc: 'Secure resident-only entry permitted at all times with strict visitor policies.' },
        { title: 'On-site Guarding', icon: <Shield />, desc: 'Trained professional security team patrolling the premises 24/7.' },
    ];

    return (
        <div className="app-container">
            <Background />
            <Navigation />
            <main style={{ paddingTop: '120px' }}>
                <section className="section">
                    <h1 className="section-title reveal-text">Safety & <span>Security</span></h1>
                    <p className="reveal-text" style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '5rem', maxWidth: '800px', lineHeight: '1.8' }}>
                        Your academic journey deserves a secure foundation. At Five Eight 9, we integrate state-of-the-art technology
                        with professional security teams to ensure a peaceful living environment.
                    </p>

                    <div className="amenities-grid">
                        {measures.map((item, i) => (
                            <div key={i} className="amenity-item reveal" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                                <div className="amenity-icon" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>{item.icon}</div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem', fontWeight: 800 }}>{item.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="safety-info-card reveal" style={{
                        marginTop: '6rem',
                        background: 'var(--glass)',
                        padding: '4rem 3rem',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        maxWidth: '900px',
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: 0
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--gold)' }}></div>
                        <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 900, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <CheckCircle size={24} /> Campus Escort Service
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
                            For students studying late at Univen, we provide a secure walking escort service between **8:00 PM and 10:00 PM**.
                            Our internal security team ensures you arrive safely at your doorstep after your late-night library sessions.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Safety;
