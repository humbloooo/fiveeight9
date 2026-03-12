import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Heart, Brain, Activity, PhoneCall, HelpCircle } from 'lucide-react';

const WellnessCenter = () => {
    const resources = [
        { title: 'Mental Health Support', icon: <Brain />, text: 'Access to confidential student counseling services.' },
        { title: 'Emergency Contacts', icon: <PhoneCall />, text: 'Direct lines to local clinics and campus security.' },
        { title: 'Fitness & Health', icon: <Activity />, text: 'Information on local gym partners and on-site health protocols.' },
        { title: 'Academic Wellness', icon: <Heart />, text: 'Quiet study zones and peer-led tutoring sessions.' },
    ];

    const faqs = [
        { q: 'How do I report a maintenance issue?', a: 'You can use the Maintenance Ticket system in your resident portal or contact the front desk.' },
        { q: 'What are the visiting hours?', a: 'Visitors are allowed between 08:00 AM and 08:00 PM for the safety of all residents.' },
        { q: 'Is laundry included?', a: 'Coin-operated laundry facilities are available 24/7 on the ground floor.' },
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
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 5rem)' }}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>Wellness <span>Nexus</span></h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.7' }}>
                            A holistic sanctuary for your physical and mental peak performance. Access the support systems designed for the modern resident.
                        </p>
                    </div>

                    <div className="amenities-grid" style={{ 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                        gap: '2rem',
                        marginBottom: 'clamp(4rem, 12vw, 8rem)' 
                    }}>
                        {resources.map((res, i) => (
                            <motion.div 
                                key={i} 
                                className="amenity-item"
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                style={{
                                    background: 'var(--glass)',
                                    padding: '2.5rem 2rem',
                                    borderRadius: '32px',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <div className="amenity-icon" style={{ 
                                    width: '64px', 
                                    height: '64px', 
                                    background: 'var(--gold-gradient)',
                                    color: 'var(--navy)',
                                    borderRadius: '18px',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {React.cloneElement(res.icon, { size: 32 })}
                                </div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: 800 }}>{res.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{res.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '3rem', textAlign: 'center' }}>Knowledge <span>Base</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {faqs.map((faq, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                }}>
                                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                                        <div style={{ background: 'var(--gold-glow)', padding: '0.8rem', borderRadius: '12px' }}>
                                            <HelpCircle size={22} style={{ color: 'var(--gold)' }} />
                                        </div>
                                        <div>
                                            <h4 style={{ marginBottom: '0.6rem', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700 }}>{faq.q}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7' }}>{faq.a}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default WellnessCenter;
