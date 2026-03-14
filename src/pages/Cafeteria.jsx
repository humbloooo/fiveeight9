import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SkeletonLoader from '../components/SkeletonLoader';
import { Utensils, Coffee, Clock, ShieldCheck, AlertCircle, Search, Filter } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages'];

const Cafeteria = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

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

    const filteredMenu = menu.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        return matchesSearch && matchesCategory;
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
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 className="section-title reveal-text" style={{ marginBottom: '1.5rem' }}>Nari's <span>Cafe</span></h1>
                        <p className="reveal-text" style={{ color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '650px', lineHeight: '1.8', fontSize: '1.1rem' }}>
                            Freshly prepared gourmet meals, artisanal coffee, and essential nutrition — served daily for the modern resident.
                        </p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div style={{ 
                        width: '100%', 
                        maxWidth: '1200px', 
                        margin: '0 auto 4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        padding: '0 5%'
                    }}>
                        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                            <input 
                                type="text"
                                placeholder="Search our gourmet menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                    background: 'var(--glass)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '16px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        </div>

                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: '0.8rem', 
                            flexWrap: 'wrap'
                        }}>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '0.6rem 1.5rem',
                                        borderRadius: '50px',
                                        border: activeCategory === cat ? '1px solid var(--gold)' : '1px solid var(--glass-border)',
                                        background: activeCategory === cat ? 'var(--gold-glow)' : 'rgba(255,255,255,0.02)',
                                        color: activeCategory === cat ? 'var(--gold)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                        letterSpacing: '1px'
                                    }}
                                >
                                    {cat.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="menu-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                        gap: '2.5rem',
                        maxWidth: '1200px',
                        width: '100%',
                        margin: '0 auto',
                        padding: '0 5%'
                    }}>
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <SkeletonLoader key={i} height="320px" borderRadius="32px" />
                            ))
                        ) : filteredMenu.length > 0 ? (
                            <AnimatePresence mode="popLayout">
                                {filteredMenu.map((item, i) => (
                                    <motion.div 
                                        key={item._id || i} 
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="menu-card reveal" 
                                        style={{
                                            background: 'var(--glass)',
                                            padding: '2.5rem',
                                            borderRadius: '32px',
                                            border: '1px solid var(--glass-border)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'flex-start', gap: '1rem' }}>
                                            <div style={{
                                                background: 'rgba(197, 160, 89, 0.1)',
                                                padding: '0.8rem',
                                                borderRadius: '12px',
                                                marginBottom: '1rem'
                                            }}>
                                                <Utensils size={20} color="var(--gold)" />
                                            </div>
                                            {item.price && (
                                                <span style={{
                                                    background: 'var(--gold-gradient)',
                                                    color: 'white',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '12px',
                                                    fontWeight: 900,
                                                    fontSize: '0.9rem',
                                                    whiteSpace: 'nowrap',
                                                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                                }}>{item.price}</span>
                                            )}
                                        </div>
                                        
                                        <h3 style={{ color: 'var(--text-primary)', fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.8rem' }}>{item.name}</h3>
                                        
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 'auto', lineHeight: '1.7', paddingBottom: '2.5rem' }}>
                                            {item.description || "Freshly prepared daily with the finest ingredients."}
                                        </p>
                                        
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid var(--glass-border)',
                                            paddingTop: '1.5rem'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: item.inStock ? 'var(--gold)' : '#ff4d4d' }}>
                                                {item.inStock ? <Clock size={16} /> : <AlertCircle size={16} />}
                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                    {item.inStock ? 'Available' : 'Sold Out'}
                                                </span>
                                            </div>
                                            <span style={{ 
                                                fontSize: '0.7rem', 
                                                color: 'var(--text-muted)', 
                                                fontWeight: 700, 
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                {item.category || 'Gourmet'}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', background: 'var(--glass)', borderRadius: '32px', border: '1px dashed var(--glass-border)' }}>
                                <Utensils size={64} style={{ color: 'var(--gold)', opacity: 0.15, marginBottom: '1.5rem', margin: '0 auto 1.5rem', display: 'block' }} />
                                <h3 style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No items found</h3>
                                <p style={{ opacity: 0.5, fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>We couldn't find any menu items matching your selection. Try a different category or search term.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
            <style>{`
                .menu-card:hover {
                    transform: translateY(-12px) scale(1.02);
                    border-color: rgba(197, 160, 89, 0.4);
                    background: rgba(255,255,255,0.05);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                }
                .menu-card {
                    overflow: visible !important;
                }
                .menu-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(197, 160, 89, 0.05), transparent 40%);
                    opacity: 0;
                    transition: opacity 0.5s;
                    pointer-events: none;
                }
                .menu-card:hover::after {
                    opacity: 1;
                }
            `}</style>
        </motion.div>
    );
};

export default Cafeteria;
