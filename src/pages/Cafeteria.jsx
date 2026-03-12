import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SkeletonLoader from '../components/SkeletonLoader';
import { Utensils, Coffee, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Cafeteria = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/cafeteria`);
                setMenu(res.data);
            } catch (err) {
                console.error('Error fetching menu:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (!loading) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.menu-card, .section-title, .reveal-text').forEach(el => {
                observer.observe(el);
            });

            return () => observer.disconnect();
        }
    }, [loading]);

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
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 className="section-title reveal-text" style={{ marginBottom: '1rem' }}>Nari's <span>Cafe</span></h1>
                        <p className="reveal-text" style={{ color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '600px', lineHeight: '1.8' }}>
                            Fresh, affordable, and delicious meals served daily within the Five Eight 9 premises.
                            Supporting your academic performance with quality nutrition.
                        </p>
                    </div>

                    <div className="menu-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                        gap: '2.5rem',
                        maxWidth: '1200px',
                        width: '100%',
                        margin: '0 auto'
                    }}>
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <SkeletonLoader key={i} height="280px" borderRadius="24px" />
                            ))
                        ) : menu.length > 0 ? (
                            menu.map((item, i) => (
                                <div key={item._id || i} className="menu-card reveal" style={{
                                    background: 'var(--glass)',
                                    padding: '2.5rem',
                                    borderRadius: '24px',
                                    border: '1px solid var(--glass-border)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'flex-start', gap: '1rem' }}>
                                        <h3 style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.2rem', margin: 0 }}>{item.name}</h3>
                                        {item.price && (
                                            <span style={{
                                                background: 'var(--gold)',
                                                color: 'var(--navy)',
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '8px',
                                                fontWeight: 900,
                                                fontSize: '0.75rem',
                                                whiteSpace: 'nowrap'
                                            }}>{item.price}</span>
                                        )}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'auto', lineHeight: '1.7', paddingBottom: '2rem' }}>
                                        {item.description || "No description provided."}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        fontSize: '0.75rem',
                                        color: item.inStock ? 'var(--text-secondary)' : '#ff4d4d',
                                        borderTop: '1px solid var(--glass-border)',
                                        paddingTop: '1.5rem'
                                    }}>
                                        {item.inStock ? <Clock size={16} color="var(--gold)" /> : <AlertCircle size={16} />}
                                        <span style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800 }}>
                                            {item.inStock ? (item.category || 'Available') : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--glass)', borderRadius: '24px', border: '1px dashed var(--glass-border)' }}>
                                <Utensils size={48} style={{ color: 'var(--gold)', opacity: 0.3, marginBottom: '1rem' }} />
                                <h3 style={{ color: 'var(--text-secondary)' }}>Menu currently unavailable</h3>
                                <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>We are updating our gourmet selections. Please check back soon.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <style>{`
                .menu-card:hover {
                    transform: translateY(-10px);
                    border-color: var(--gold);
                    background: rgba(255,255,255,0.06);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                }
            `}</style>
        </motion.div>
    );
};

export default Cafeteria;
