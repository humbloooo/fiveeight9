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
                <section className="section" style={{ paddingTop: 'clamp(2rem, 8vw, 4rem)' }}>
                    <motion.h1 
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Safety & <span>Security</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 5rem)', maxWidth: '800px', margin: '0 auto 5rem', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
                    >
                        Your academic journey deserves a secure foundation. At Five Eight 9, we integrate state-of-the-art technology
                        with professional security teams to ensure a peaceful living environment.
                    </motion.p>

                    <div className="amenities-grid" style={{ 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: '2rem'
                    }}>
                        {measures.map((item, i) => (
                            <motion.div 
                                key={i} 
                                className="amenity-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                                style={{
                                    background: 'var(--glass)',
                                    padding: '3rem 2rem',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <div className="amenity-icon" style={{ 
                                    width: '70px',
                                    height: '70px',
                                    borderColor: 'var(--gold)', 
                                    color: 'var(--gold)',
                                    background: 'rgba(197, 160, 89, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    marginBottom: '1.5rem',
                                    border: '2px solid'
                                }}>
                                    {React.cloneElement(item.icon, { size: 30 })}
                                </div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.5px' }}>{item.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            marginTop: 'clamp(4rem, 12vw, 7rem)',
                            background: 'var(--glass)',
                            padding: 'clamp(2rem, 6vw, 4rem)',
                            borderRadius: '35px',
                            border: '1px solid var(--glass-border)',
                            maxWidth: '1000px',
                            width: '100%',
                            margin: '7rem auto 0',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)'
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: 'var(--gold-gradient)' }}></div>
                        <h3 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 900, fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                            <CheckCircle size={32} /> Redundant Security Power
                        </h3>
                        <p style={{ color: 'var(--text-primary)', lineHeight: '1.9', fontSize: 'clamp(1rem, 2vw, 1.1rem)', fontWeight: 400 }}>
                            Five Eight 9 is equipped with robust backup power solutions specifically for our security infrastructure. 
                            Our CCTV cameras and electric fencing remain 100% operational during outages, ensuring that your 
                            safety is never compromised by external power failures.
                        </p>
                    </motion.div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default Safety;
