import React, { useState } from 'react';
import { X, Check, User, Mail, Phone, Hash, BookOpen } from 'lucide-react';

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
            background: 'rgba(5, 10, 26, 0.95)',
            backdropFilter: 'blur(30px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--navy)',
                width: '100%',
                maxWidth: '550px',
                padding: '3.5rem',
                borderRadius: '40px',
                border: '1px solid var(--glass-border)',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '200px', height: '200px', background: 'var(--gold)', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }}></div>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'var(--glass)',
                    border: '1px solid var(--glass-border)',
                    color: 'white',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                }} className="hover:rotate-90">
                    <X size={20} />
                </button>

                {submitted ? (
                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
                        <div style={{ width: '90px', height: '90px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', boxShadow: '0 10px 30px var(--gold-glow)' }}>
                            <Check color="#000" size={45} strokeWidth={3} />
                        </div>
                        <h2 style={{ color: 'white', marginBottom: '1.2rem', fontWeight: 900, fontSize: '2rem' }}>REQUEST SENT</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>Excellent choice. Our residential team will contact you within 24 hours to finalize your viewing date.</p>
                        <button className="cta-button" style={{ width: '100%', padding: '1.2rem' }} onClick={onClose}>RETURN TO SITE</button>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '3rem' }}>
                            <h2 style={{ color: 'white', marginBottom: '0.8rem', fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1.5px', lineHeight: 1 }}>BOOK A<br /><span style={{ color: 'var(--gold)' }}>VIEWING</span></h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>Secure your academic home for the next season.</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div className="input-group">
                                <User size={18} className="input-icon" />
                                <input type="text" placeholder="Full Name" required />
                            </div>

                            <div className="input-group">
                                <Mail size={18} className="input-icon" />
                                <input type="email" placeholder="Email Address" required />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.2rem' }}>
                                <div className="input-group">
                                    <Phone size={18} className="input-icon" />
                                    <input type="tel" placeholder="Phone" required />
                                </div>
                                <div className="input-group">
                                    <Hash size={18} className="input-icon" />
                                    <input type="text" placeholder="Student No." required />
                                </div>
                            </div>

                            <div className="input-group">
                                <BookOpen size={18} className="input-icon" />
                                <select required style={{ paddingLeft: '3.5rem' }}>
                                    <option value="">Select Room Type</option>
                                    <option>Standard Single Loft</option>
                                    <option>Premium Single Loft</option>
                                    <option>Sharing Studio Loft</option>
                                </select>
                            </div>

                            <button type="submit" className="cta-button" style={{
                                marginTop: '1.5rem',
                                padding: '1.2rem',
                                width: '100%',
                                fontSize: '1rem'
                            }}>
                                CONFIRM REQUEST
                            </button>
                        </form>
                    </>
                )}

                <style>{`
                    .input-group {
                        position: relative;
                        width: 100%;
                    }
                    .input-icon {
                        position: absolute;
                        left: 1.5rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--gold);
                        opacity: 0.7;
                    }
                    input, select {
                        width: 100%;
                        padding: 1.1rem 1.1rem 1.1rem 3.5rem;
                        background: rgba(255,255,255,0.03);
                        border: 1px solid var(--glass-border);
                        color: white !important;
                        border-radius: 16px;
                        font-family: inherit;
                        font-size: 0.95rem;
                        transition: all 0.3s ease;
                        outline: none;
                    }
                    input:focus, select:focus {
                        border-color: var(--gold);
                        background: rgba(255,255,255,0.06);
                        box-shadow: 0 0 20px rgba(197,160,89,0.1);
                    }
                    input::placeholder {
                        color: rgba(255,255,255,0.3);
                    }
                    select option {
                        background: var(--navy);
                        color: white;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default BookingModal;
