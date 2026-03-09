import React from 'react';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Utensils, Coffee, Clock, ShieldCheck } from 'lucide-react';

const Cafeteria = () => {
    const menu = [
        { name: 'Student Special', price: 'R35', desc: 'Our most affordable daily meal.', stock: 'Available' },
        { name: 'Hearty Breakfast', price: 'R25', desc: 'Eggs, toast, and coffee.', stock: 'Morning Only' },
        { name: 'Loft Burger', price: 'R45', desc: 'Premium beef with local spices.', stock: 'Limited' },
    ];

    return (
        <div className="app-container">
            <Background />
            <Navigation />
            <main style={{ paddingTop: '120px' }}>
                <section className="section">
                    <h1 className="section-title" style={{ fontSize: '3.5rem' }}>Nari's <span>Cafe</span></h1>
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '4rem' }}>
                        Fresh, affordable, and delicious meals served daily within the Five Eight 9 premises.
                    </p>

                    <div className="menu-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        {menu.map((item, i) => (
                            <div key={i} style={{
                                background: 'var(--glass)',
                                padding: '2rem',
                                borderRadius: '16px',
                                border: '1px solid var(--glass-border)',
                                transition: 'transform 0.3s ease'
                            }} className="menu-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ color: 'var(--gold)' }}>{item.name}</h3>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{item.price}</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{item.desc}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <Clock size={14} /> {item.stock}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Cafeteria;
