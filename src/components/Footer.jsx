import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4 style={{ color: 'white', fontWeight: 800 }}>FIVE EIGHT 9</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Premium student living near Univen. Providing secure, high-quality, and modern lofts for the next generation of leaders.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Facebook size={20} color="var(--gold)" />
                        <Instagram size={20} color="var(--gold)" />
                        <Twitter size={20} color="var(--gold)" />
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#rooms">Rooms</a></li>
                        <li><a href="#amenities">Amenities</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <ul className="footer-links" style={{ display: 'grid', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <MapPin size={16} color="var(--gold)" />
                            <span style={{ fontSize: '0.9rem' }}>589 University Drive, Thohoyandou</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Phone size={16} color="var(--gold)" />
                            <span style={{ fontSize: '0.9rem' }}>+27 (0) 15 555 8900</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Mail size={16} color="var(--gold)" />
                            <span style={{ fontSize: '0.9rem' }}>hello@fiveeight9.co.za</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Stay Updated</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Subscribe for availability alerts and student news.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="email"
                            placeholder="Your email"
                            style={{
                                flex: 1,
                                padding: '0.6rem',
                                borderRadius: '4px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                fontSize: '0.8rem'
                            }}
                        />
                        <button className="cta-button" style={{ padding: '0.6rem 1rem' }}>JOIN</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Five Eight 9 Student Lofts. All rights reserved. | Luxury Student Housing near University of Venda.
            </div>
        </footer>
    );
};

export default Footer;
