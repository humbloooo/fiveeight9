import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Heart, Brain, Activity, PhoneCall, HelpCircle, ChevronDown, ExternalLink } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

const resources = [
    { title: 'Mental Health Support', icon: Brain, text: 'Access to confidential student counseling services. Our network of campus psychologists offers free sessions for all residents.' },
    { title: 'Emergency Contacts', icon: PhoneCall, text: 'Direct lines to local clinics and campus security. See below for all critical numbers.' },
    { title: 'Fitness & Health', icon: Activity, text: 'Information on local gym partners and on-site health protocols. Weekly fitness check-ins available.' },
    { title: 'Academic Wellness', icon: Heart, text: 'Quiet study zones and peer-led tutoring sessions every Tuesday and Thursday evening.' },
];

const defaultFaqs = [
    { q: 'How do I report a maintenance issue?', a: 'Use the Maintenance Ticket system in your resident portal, or contact the front desk directly.' },
    { q: 'What are the visiting hours?', a: 'Visitors are allowed between 08:00 AM and 08:00 PM for the safety of all residents. Overnight guests require prior approval.' },
    { q: 'Is laundry included?', a: 'Coin-operated laundry facilities are available 24/7 on the ground floor. Your room card is your access.' },
    { q: 'How do I access the counseling service?', a: 'Counseling sessions can be booked at reception. All sessions are 100% confidential.' },
    { q: 'What happens in a medical emergency?', a: 'Call the emergency contact number displayed in every corridor, or proceed to reception — staff are trained in first aid.' },
];

const FAQItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            style={{ borderRadius: '18px', border: '1px solid var(--glass-border)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}
        >
            <button
                onClick={() => setOpen(v => !v)}
                style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1.5rem 2rem', background: 'transparent', border: 'none',
                    color: 'var(--text-primary)', cursor: 'pointer', gap: '1rem', textAlign: 'left'
                }}
            >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'var(--gold-glow)', padding: '0.6rem', borderRadius: '10px', flexShrink: 0 }}>
                        <HelpCircle size={18} style={{ color: 'var(--gold)' }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>{faq.q}</span>
                </div>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 2rem 1.5rem 4.5rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const WellnessCenter = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/settings`).then(res => setSettings(res.data)).catch(() => {});
    }, []);

    const emergencyContacts = settings?.emergencyContacts || [];

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

                    {/* Hero */}
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 5rem)' }}>
                        <motion.h1
                            className="section-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Wellness <span>Nexus</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: '1.8' }}
                        >
                            A holistic sanctuary for your physical and mental peak performance. Access the support systems designed for the modern resident.
                        </motion.p>
                    </div>

                    {/* Resource Cards */}
                    <div className="amenities-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '2rem', marginBottom: 'clamp(4rem, 12vw, 8rem)' }}>
                        {resources.map((res, i) => (
                            <motion.div
                                key={i}
                                className="amenity-item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                style={{ background: 'var(--glass)', padding: '2.5rem 2rem', borderRadius: '32px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                            >
                                <div className="amenity-icon" style={{
                                    width: '64px', height: '64px', background: 'var(--gold-gradient)',
                                    color: 'var(--navy)', borderRadius: '18px', marginBottom: '1.5rem',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <res.icon size={32} />
                                </div>
                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem', fontSize: '1.15rem', fontWeight: 800 }}>{res.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{res.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Emergency Contacts (dynamic from settings) */}
                    {emergencyContacts.length > 0 && (
                        <div style={{ maxWidth: '900px', margin: '0 auto 5rem', width: '100%' }}>
                            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginBottom: '2rem', textAlign: 'center' }}>
                                Emergency <span>Contacts</span>
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: '1.2rem' }}>
                                {emergencyContacts.map((contact, i) => (
                                    <motion.a
                                        key={i}
                                        href={`tel:${contact.number || contact.phone}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        style={{
                                            display: 'flex', flexDirection: 'column', gap: '0.5rem',
                                            padding: '1.5rem', borderRadius: '16px',
                                            background: 'rgba(197,160,89,0.05)', border: '1px solid var(--gold-glow)',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>
                                            {contact.label || contact.name}
                                        </span>
                                        <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '1.1rem' }}>
                                            {contact.number || contact.phone}
                                        </span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Accordion */}
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                        <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginBottom: '2.5rem', textAlign: 'center' }}>
                            Knowledge <span>Base</span>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {defaultFaqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                marginTop: '4rem', textAlign: 'center', padding: '3rem',
                                background: 'var(--glass)', borderRadius: '24px', border: '1px solid var(--glass-border)'
                            }}
                        >
                            <h3 style={{ marginBottom: '1rem', fontWeight: 900 }}>Need Immediate Help?</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                                Our front desk is staffed 24/7. Don't hesitate to reach out for any concern.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="/maintenance" style={{ textDecoration: 'none' }}>
                                    <button className="cta-button" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        Log a Maintenance Ticket
                                    </button>
                                </a>
                                <a href="/forum" style={{ textDecoration: 'none' }}>
                                    <button style={{
                                        padding: '0.9rem 1.8rem', borderRadius: '10px',
                                        border: '1px solid var(--glass-border)', background: 'var(--glass)',
                                        color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 700,
                                        display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem'
                                    }}>
                                        <ExternalLink size={16} /> Community Forum
                                    </button>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default WellnessCenter;
