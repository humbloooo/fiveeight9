import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Utensils, Coffee, Clock, ShieldCheck } from 'lucide-react';

const Cafeteria = () => {
    useEffect(() => {
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
    }, []);

    const menu = [
        { name: 'Student Special', price: 'R35', desc: 'Our most affordable daily meal.', stock: 'Available' },
        { name: 'Hearty Breakfast', price: 'R25', desc: 'Eggs, toast, and coffee.', stock: 'Morning Only' },
        { name: 'Loft Burger', price: 'R45', desc: 'Premium beef with local spices.', stock: 'Limited' },
        { name: 'Pasta Delight', price: 'R40', desc: 'Creamy Alfredo or spicy Bolognese.', stock: 'Available' },
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
                    <h1 className="section-title reveal-text">Nari's <span>Cafe</span></h1>
                    <p className="reveal-text" style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px' }}>
                        Fresh, affordable, and delicious meals served daily within the Five Eight 9 premises.
                        Supporting your academic performance with quality nutrition.
                    </p>

                    <div className="menu-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1200px',
                        width: '100%',
                        margin: '0 auto'
                    }}>
                        {menu.map((item, i) => (
                            <div key={i} className="menu-card" style={{
                                background: 'var(--glass)',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '1px solid var(--glass-border)',
                                animationDelay: `${i * 0.15}s`,
                                opacity: 0
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                                    <h3 style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.2rem' }}>{item.name}</h3>
                                    <span style={{
                                        background: 'var(--gold)',
                                        color: '#000',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: '4px',
                                        fontWeight: 900,
                                        fontSize: '0.8rem'
                                    }}>{item.price}</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.6' }}>{item.desc}</p>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
                                    borderTop: '1px solid var(--glass-border)',
                                    paddingTop: '1.5rem'
                                }}>
                                    <Clock size={16} color="var(--gold)" />
                                    <span style={{ textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{item.stock}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default Cafeteria;
