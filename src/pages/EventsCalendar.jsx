import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SkeletonLoader from '../components/SkeletonLoader';
import { Calendar, MapPin, Clock, Tag, Search, Filter, CalendarDays } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

const CATEGORIES = ['All', 'Social', 'Academic', 'Wellness', 'Community', 'Other'];

const categoryColors = {
    Social:    { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.4)',  text: '#818cf8' },
    Academic:  { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  text: '#34d399' },
    Wellness:  { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.4)',   text: '#f87171' },
    Community: { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.4)',  text: '#fbbf24' },
    Other:     { bg: 'rgba(156,163,175,0.1)',  border: 'rgba(156,163,175,0.3)', text: '#9ca3af' },
};

const EventCard = ({ event, index }) => {
    const cat = categoryColors[event.category] || categoryColors.Other;
    const dateStr = event.date ? new Date(event.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date TBC';
    const isPast = event.date && new Date(event.date) < new Date();

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            whileHover={{ y: -6 }}
            style={{
                background: 'var(--glass)',
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                opacity: isPast ? 0.65 : 1,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
            }}
        >
            {/* Image if available */}
            {event.imageUrl && (
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {isPast && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--text-secondary)', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px' }}>PAST EVENT</span>
                        </div>
                    )}
                </div>
            )}

            <div style={{ padding: 'clamp(1.2rem, 3vw, 2rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.text, padding: '0.3rem 0.9rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                        {event.category || 'General'}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CalendarDays size={14} color="var(--gold)" /> {dateStr}
                    </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.8rem', color: 'var(--text-primary)' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: 'auto', paddingBottom: '1.5rem' }}>
                    {event.description || event.desc || 'More details coming soon.'}
                </p>

                {/* Meta row */}
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {event.time && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            <Clock size={14} color="var(--gold)" /> {event.time}
                        </div>
                    )}
                    {event.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            <MapPin size={14} color="var(--gold)" /> {event.location}
                        </div>
                    )}
                </div>
            </div>

            {!isPast && (
                <button
                    onClick={() => {
                        const title = encodeURIComponent(event.title);
                        const details = encodeURIComponent(event.description || '');
                        const loc = encodeURIComponent(event.location || '');
                        const start = event.date ? new Date(event.date).toISOString().replace(/-|:|\.\d+/g, '') : '';
                        window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}&dates=${start}/${start}`, '_blank');
                    }}
                    style={{
                        width: '100%', padding: '1rem',
                        background: 'rgba(197,160,89,0.06)',
                        border: 'none', borderTop: '1px solid var(--glass-border)',
                        color: 'var(--gold)', fontWeight: 700, cursor: 'pointer',
                        fontSize: '0.8rem', letterSpacing: '1.5px',
                        transition: 'background 0.3s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(197,160,89,0.14)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(197,160,89,0.06)'}
                >
                    + ADD TO GOOGLE CALENDAR
                </button>
            )}
        </motion.div>
    );
};

const EventsCalendar = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/events`);
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Could not load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filtered = events.filter(ev => {
        const matchesSearch = !search || (ev.title + ev.description + ev.location).toLowerCase().includes(search.toLowerCase());
        const matchesCat = activeCategory === 'All' || ev.category === activeCategory;
        return matchesSearch && matchesCat;
    });

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
                    {/* Hero */}
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <motion.h1
                            className="section-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Events <span>Calendar</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}
                        >
                            Stay connected with life at Five Eight 9. From social gatherings to academic sessions — something is always happening.
                        </motion.p>
                    </div>

                    {/* Filter + Search bar */}
                    <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto 3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.9rem 1.2rem 0.9rem 3.2rem',
                                    background: 'var(--glass)', border: '1px solid var(--glass-border)',
                                    borderRadius: '14px', color: 'var(--text-primary)', fontSize: '0.95rem',
                                    outline: 'none', transition: 'border-color 0.3s'
                                }}
                                onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                                onBlur={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '0.5rem 1.1rem', borderRadius: '50px',
                                        border: activeCategory === cat ? '1px solid var(--gold)' : '1px solid var(--glass-border)',
                                        background: activeCategory === cat ? 'var(--gold-glow)' : 'transparent',
                                        color: activeCategory === cat ? 'var(--gold)' : 'var(--text-secondary)',
                                        cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700,
                                        transition: 'all 0.25s ease', letterSpacing: '0.5px'
                                    }}
                                >{cat}</button>
                            ))}
                        </div>
                    </div>

                    {/* Events grid */}
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
                            {Array(3).fill(0).map((_, i) => <SkeletonLoader key={i} height="360px" borderRadius="24px" />)}
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-error)' }}>
                            <Calendar size={48} style={{ opacity: 0.4, margin: '0 auto 1rem' }} />
                            <p>{error}</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--glass)', borderRadius: '24px', border: '1px dashed var(--glass-border)', maxWidth: '600px', margin: '0 auto' }}>
                            <Calendar size={48} style={{ color: 'var(--gold)', opacity: 0.4, margin: '0 auto 1.5rem' }} />
                            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                {search || activeCategory !== 'All' ? 'No matching events' : 'No events scheduled'}
                            </h3>
                            <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>
                                {search || activeCategory !== 'All' ? 'Try a different search or category.' : 'Check back soon — exciting events are being planned!'}
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '2rem', width: '100%', maxWidth: '1200px' }}>
                            {filtered.map((event, i) => (
                                <EventCard key={event._id || i} event={event} index={i} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default EventsCalendar;
