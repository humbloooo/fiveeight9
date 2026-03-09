import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            background: 'rgba(5, 10, 26, 0.95)',
            borderTop: '1px solid var(--glass-border)',
            padding: '5rem 2rem 2rem',
            color: 'white'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '4rem',
                marginBottom: '4rem'
            }}>
                {/* Brand */}
                <div>
                    <h2 style={{ color: 'var(--gold)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '2px' }}>FIVE EIGHT 9</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.9rem' }}>
                        Providing secure, high-quality, and modern lofts for the next generation of leaders near Univen.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Facebook size={20} /></a>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Instagram size={20} /></a>
                        <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <li><a href="/#home" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Home</a></li>
                        <li><a href="/#rooms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Rooms</a></li>
                        <li><a href="/cafeteria" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Nari's Cafe</a></li>
                        <li><a href="/safety" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Safety & Security</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contact Us</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <MapPin size={18} color="var(--gold)" /> 589 University Drive, Thohoyandou
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <Phone size={18} color="var(--gold)" /> +27 (0) 15 555 8900
                        </li>
                        <li style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <Mail size={18} color="var(--gold)" /> hello@fiveeight9.co.za
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Stay Updated</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Subscribe for availability alerts and student news.</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="email"
                            placeholder="Your email"
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                padding: '0.8rem',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button className="cta-button" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem' }}>JOIN</button>
                    </div>
                </div>
            </div>

            <div style={{
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '2rem',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem'
            }}>
                © {currentYear} Five Eight 9 Student Lofts. All rights reserved. | Luxury Student Housing near University of Venda.
            </div>
        </footer>
    );
};

export default Footer;
