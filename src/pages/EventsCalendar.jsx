import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';

const EventsCalendar = () => {
    const events = [
        {
            title: 'Welcome Braia',
            date: '15 March 2024',
            time: '18:00',
            location: 'Pool Area',
            category: 'Social',
            desc: 'Meet your neighbors and enjoy free food and music.'
        },
        {
            title: 'Study Marathon',
            date: '20 March 2024',
            time: '10:00 - 22:00',
            location: 'Study Hall',
            category: 'Academic',
            desc: 'Intensive prep for the upcoming mid-terms.'
        },
        {
            title: 'Zumba Session',
            date: '22 March 2024',
            time: '17:00',
            location: 'Gym Area',
            category: 'Wellness',
            desc: 'Free high-energy fitness class.'
        },
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
                        <h1 className="section-title">Events <span>Calendar</span></h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Don't miss out on the Five Eight 9 lifestyle.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                        width: '100%',
                        maxWidth: '1200px'
                    }}>
                        {events.map((event, i) => (
                            <div key={i} style={{
                                background: 'var(--glass)',
                                borderRadius: '24px',
                                border: '1px solid var(--glass-border)',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease'
                            }} className="event-card">
                                <div style={{ padding: '2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span style={{
                                            background: 'var(--gold-glow)',
                                            color: 'var(--gold)',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '50px',
                                            fontSize: '0.8rem',
                                            fontWeight: 700
                                        }}>{event.category}</span>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{event.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{event.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>{event.desc}</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                            <Clock size={16} color="var(--gold)" /> {event.time}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                            <MapPin size={16} color="var(--gold)" /> {event.location}
                                        </div>
                                    </div>
                                </div>
                                <button style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: 'none',
                                    borderTop: '1px solid var(--glass-border)',
                                    color: 'var(--gold)',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}>ADD TO CALENDAR</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default EventsCalendar;
