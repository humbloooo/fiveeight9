import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/settings');
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '4rem'
            }}>
                {/* Brand Info */}
                <div className="reveal">
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                        FIVE <span style={{ color: 'var(--gold)' }}>EIGHT 9</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        The premier student living experience in Thohoyandou, providing safe, modern, and inspiring lofts for future leaders.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {Object.entries(socialLinks).map(([platform, data]) => (
                            data.visible && data.link && (
                                <a key={platform} href={data.link} target="_blank" rel="noopener noreferrer" className="social-icon-footer">
                                    <span style={{ textTransform: 'capitalize', fontSize: '0.75rem', fontWeight: 800 }}>{platform}</span>
                                </a>
                            )
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="reveal" style={{ animationDelay: '0.1s' }}>
                    <h4 className="footer-title">Navigation</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <a href="/#home" className="footer-link">Home Office</a>
                        <a href="/#rooms" className="footer-link">Room Layouts</a>
                        <a href="/cafeteria" className="footer-link">Nari's Cafe</a>
                        <a href="/safety" className="footer-link">Safety First</a>
                        <a href="/admin" className="footer-link">Staff Portal</a>
                    </div>
                </div>

                {/* Emergency & Support */}
                <div className="reveal" style={{ animationDelay: '0.2s' }}>
                    <h4 className="footer-title">Resident Support</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="contact-item-footer">
                            <span className="label">Reception:</span>
                            <span className="value">{emergency.reception || '+27 15 589 0000'}</span>
                        </div>
                        <div className="contact-item-footer">
                            <span className="label">Security:</span>
                            <span className="value">{emergency.security || '+27 15 589 1111'}</span>
                        </div>
                        <div className="contact-item-footer">
                            <span className="label">Support:</span>
                            <span className="value">{emergency.email || 'care@fiveeight9.co.za'}</span>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <a href="/maintenance" className="cta-button" style={{ padding: '0.7rem 1.5rem', fontSize: '0.7rem' }}>LOG A TICKET</a>
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
                .footer-title { color: var(--gold); text-transform: uppercase; letter-spacing: 2px; font-weight: 900; font-size: 0.8rem; margin-bottom: 2rem; }
                .footer-link { color: var(--text-secondary); text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: all 0.3s ease; }
                .footer-link:hover { color: var(--gold); transform: translateX(5px); }
                .contact-item-footer { display: flex; flex-direction: column; gap: 0.2rem; }
                .contact-item-footer .label { font-size: 0.65rem; color: var(--gold); font-weight: 900; text-transform: uppercase; opacity: 0.7; }
                .contact-item-footer .value { color: #fff; font-weight: 700; font-size: 0.9rem; }
                .social-icon-footer { 
                    background: var(--glass); border: 1px solid var(--glass-border); color: #fff;
                    padding: 0.5rem 0.8rem; border-radius: 6px; text-decoration: none; transition: all 0.3s ease;
                }
                .social-icon-footer:hover { background: var(--gold); color: #000; transform: translateY(-3px); }
            `}</style>
        </footer>
    );
};

export default Footer;
