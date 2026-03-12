import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, Clock, CheckCircle } from 'lucide-react';

const Safety = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.amenity-item, .section-title, .reveal-text, .safety-info-card').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const measures = [
        { title: 'PSG Security Guards', icon: <Shield />, desc: 'Manned by professional PSG Security personnel patrolling the premises 24/7.' },
        { title: 'Armed Response', icon: <Lock />, desc: 'Highly trained armed units available 24/7 with immediate response capabilities.' },
        { title: 'HD Surveillance', icon: <Eye />, desc: 'Comprehensive CCTV coverage integrated with backup power for zero downtime.' },
        { title: 'Boundary Defense', icon: <Clock />, desc: 'Reinforced walls with electric fencing, consistently powered by backup systems.' },
    ];

    return (
        <motion.div 
            className="app-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Background />
            <Navigation />
            <main className="standard-page-layout">
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
                            <CheckCircle size={24} /> Redundant Security Power
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
                            Five Eight 9 is equipped with robust backup power solutions specifically for our security infrastructure. 
                            Our CCTV cameras and electric fencing remain 100% operational during outages, ensuring that your 
                            safety is never compromised by external power failures.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default Safety;
