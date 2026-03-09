import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--navy)',
                width: '100%',
                maxWidth: '500px',
                padding: '3rem',
                borderRadius: '32px',
                border: '1px solid var(--glass-border)',
                position: 'relative'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X /></button>

                {submitted ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                            <Check color="#000" size={40} strokeWidth={3} />
                        </div>
                        <h2 style={{ color: 'white', marginBottom: '1rem', fontWeight: 900 }}>REQUEST SENT</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Our team will contact you within 24 hours to confirm your viewing date.</p>
                        <button className="cta-button" style={{ width: '100%' }} onClick={onClose}>CLOSE</button>
                    </div>
                ) : (
                    <>
                        <h2 style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 900, letterSpacing: '-1px' }}>BOOK A VIEWING</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Experience the premium student lifestyle firsthand.</p>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <input type="text" placeholder="Full Name" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <input type="tel" placeholder="Phone Number" required style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }} />
                            </div>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <select style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}>
                                    <option>Select Room Interest</option>
                                    <option>Single Room</option>
                                    <option>Sharing Room</option>
                                </select>
                            </div>
                            <button type="submit" className="cta-button" style={{ width: '100%' }}>SEND REQUEST</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
