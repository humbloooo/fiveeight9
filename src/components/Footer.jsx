import React, { useEffect, useState } from 'react';
import { Instagram, Twitter, MessageCircle, Mail, MapPin, Phone, ShieldOutlined, ExternalLink } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    const getIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return <Instagram size={18} />;
            case 'twitter': return <Twitter size={18} />;
            case 'whatsapp': return <MessageCircle size={18} />;
            default: return <ExternalLink size={18} />;
        }
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/settings`);
                setSettings(res.data);
            } catch (err) {
                console.error('Error fetching footer settings:', err);
            }
        };
        fetchSettings();
    }, []);

    const socialLinks = settings?.socialLinks || {};
    const emergency = settings?.emergencyContacts || {};

    return (
        <footer style={{
            background: 'var(--navy)',
            padding: '8rem 2rem 4rem',
            borderTop: '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Accent */}
            <div style={{ position: 'absolute', bottom: '-150px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '300px', background: 'var(--gold)', filter: 'blur(150px)', opacity: 0.05, pointerEvents: 'none' }}></div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '4rem'
            }}>
                {/* Brand Info */}
                <div className="reveal">
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                        FIVE <span className="gold-text">EIGHT 9</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                        The premier student living experience in Thohoyandou, providing safe, modern, and inspiring lofts for future leaders.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {Object.entries(socialLinks).map(([platform, data]) => (
                            data.visible && data.link && (
                                <a key={platform} href={data.link} target="_blank" rel="noopener noreferrer" className="social-icon-footer" title={platform}>
                                    {getIcon(platform)}
                                </a>
                            )
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="reveal" style={{ animationDelay: '0.1s' }}>
                    <h4 className="footer-title">Navigation</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <a href="/#home" className="footer-link">Property Home</a>
                        <a href="/#rooms" className="footer-link">Room Layouts</a>
                        <a href="/cafeteria" className="footer-link">Nari's Cafe</a>
                        <a href="/safety" className="footer-link">Safety First</a>
                        <a href="/admin" className="footer-link">Staff Portal</a>
                    </div>
                </div>

                {/* Emergency & Support */}
                <div className="reveal" style={{ animationDelay: '0.2s' }}>
                    <h4 className="footer-title">Resident Support</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="contact-item-footer">
                            <span className="label">Reception & Support</span>
                            <span className="value">{emergency.reception || '+27 15 589 0000'}</span>
                        </div>
                        <div className="contact-item-footer">
                            <span className="label">Security & Emergency</span>
                            <span className="value">{emergency.security || '+27 15 589 1111'}</span>
                        </div>
                        <div className="contact-item-footer">
                            <span className="label">Email Inquiry</span>
                            <span className="value">{emergency.email || 'care@fiveeight9.co.za'}</span>
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                            <a href="/maintenance" className="cta-button" style={{ padding: '0.8rem 1.8rem', fontSize: '0.75rem' }}>LOG A TICKET</a>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="reveal" style={{ animationDelay: '0.3s' }}>
                    <h4 className="footer-title">Join The Vibe</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                        Get updates on cafeteria specials, community events, and availability.
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input type="email" placeholder="Email" style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            padding: '0.8rem 1rem',
                            borderRadius: '8px',
                            flex: 1,
                            fontSize: '0.8rem'
                        }} />
                        <button style={{
                            background: 'var(--gold)',
                            border: 'none',
                            color: '#000',
                            padding: '0 1.2rem',
                            borderRadius: '8px',
                            fontWeight: 900,
                            fontSize: '0.7rem'
                        }}>JOIN</button>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '6rem',
                paddingTop: '3rem',
                borderTop: '1px solid var(--glass-border)',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                letterSpacing: '1px'
            }}>
                &copy; {new Date().getFullYear()} FIVE EIGHT 9 STUDENT LOFTS. ALL RIGHTS RESERVED.
            </div>

            <style>{`
                .footer-title { background: var(--gold-gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; font-size: 0.8rem; margin-bottom: 2rem; }
                .footer-link { color: var(--text-secondary); text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: var(--transition-premium); }
                .footer-link:hover { color: var(--gold); transform: translateX(8px); }
                .contact-item-footer { display: flex; flex-direction: column; gap: 0.4rem; }
                .contact-item-footer .label { font-size: 0.75rem; color: var(--gold); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
                .contact-item-footer .value { color: #fff; font-weight: 700; font-size: 1rem; letter-spacing: 0.5px; }
                .social-icon-footer { 
                    background: var(--glass-deep); border: 1px solid var(--glass-border); color: #fff;
                    width: 42px; height: 42px; border-radius: 12px; text-decoration: none; transition: var(--transition-premium);
                    display: flex; align-items: center; justify-content: center;
                }
                .social-icon-footer:hover { background: var(--gold-gradient); color: #000; transform: translateY(-5px) rotate(10deg); box-shadow: 0 10px 20px rgba(197, 160, 89, 0.2); }
            `}</style>
        </footer>
    );
};

export default Footer;
