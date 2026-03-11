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
            <main style={{ paddingTop: '120px' }}>
                <section className="section">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h1 className="section-title">Wellness <span>Resource Center</span></h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            We care about your success beyond academics. Access the logs and support systems you need to thrive.
                        </p>
                    </div>

                    <div className="amenities-grid" style={{ marginBottom: '6rem' }}>
                        {resources.map((res, i) => (
                            <div key={i} className="amenity-item">
                                <div className="amenity-icon">{res.icon}</div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{res.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{res.text}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Frequently Asked <span>Questions</span></h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {faqs.map((faq, i) => (
                                <div key={i} style={{
                                    background: 'var(--glass)',
                                    padding: '2rem',
                                    borderRadius: '16px',
                                    border: '1px solid var(--glass-border)',
                                }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                        <HelpCircle size={20} style={{ color: 'var(--gold)', marginTop: '0.2rem' }} />
                                        <div>
                                            <h4 style={{ marginBottom: '0.8rem', color: 'var(--text-primary)' }}>{faq.q}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
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
