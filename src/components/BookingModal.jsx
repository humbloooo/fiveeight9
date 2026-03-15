import React, { useState, useEffect } from 'react';
import { X, Check, User, Mail, Phone, Hash, BookOpen } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', studentNo: '', roomType: '' });

    // Refinement 008: Closing Logic
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) return setStep(2);
        setSubmitted(true);
    };

    return (
        <div 
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 10, 26, 0.95)',
                backdropFilter: 'blur(30px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3000,
                padding: '2rem'
            }}
        >
            <div style={{
                background: 'var(--navy)',
                width: '100%',
                maxWidth: '550px',
                padding: 'clamp(1.5rem, 5vw, 3.5rem)',
                borderRadius: 'clamp(24px, 4vw, 40px)',
                border: '1px solid var(--glass-border)',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                overflow: 'hidden'
            }}>
                <button onClick={onClose} className="hover:rotate-90" style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                    <X size={20} />
                </button>

                {submitted ? (
                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
                        <div style={{ width: '90px', height: '90px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', boxShadow: '0 10px 30px var(--gold-glow)' }}>
                            <Check color="#000" size={45} strokeWidth={3} />
                        </div>
                        <h2 style={{ color: 'white', marginBottom: '1.2rem', fontWeight: 900, fontSize: '2rem' }}>REQUEST SENT</h2>
                        <button className="cta-button" style={{ width: '100%', padding: '1.2rem' }} onClick={onClose}>FINISH</button>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1, height: '4px', background: 'var(--gold)', borderRadius: '2px' }}></div>
                                <div style={{ flex: 1, height: '4px', background: step === 2 ? 'var(--gold)' : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: '0.3s' }}></div>
                            </div>
                            <h2 style={{ color: 'white', marginBottom: '0.5rem', fontWeight: 900, fontSize: '2rem' }}>
                                {step === 1 ? 'PERSONAL INFO' : 'PICK YOUR LOFT'}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Step {step} of 2: {step === 1 ? 'Tell us who you are.' : 'Select your desired accomodation.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {step === 1 ? (
                                <>
                                    <div className="input-group">
                                        <User size={18} className="input-icon" />
                                        <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div className="input-group">
                                        <Mail size={18} className="input-icon" />
                                        <input type="email" placeholder="Email Address" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1rem' }}>
                                        <div className="input-group">
                                            <Phone size={18} className="input-icon" />
                                            <input type="tel" placeholder="Phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                                        </div>
                                        <div className="input-group">
                                            <Hash size={18} className="input-icon" />
                                            <input type="text" placeholder="Student No." required value={formData.studentNo} onChange={(e) => setFormData({...formData, studentNo: e.target.value})} />
                                        </div>
                                    </div>
                                    <button type="submit" className="cta-button" style={{ marginTop: '1.5rem', padding: '1.2rem' }}>NEXT STEP</button>
                                </>
                            ) : (
                                <>
                                    <div className="input-group">
                                        <BookOpen size={18} className="input-icon" />
                                        <select required style={{ paddingLeft: '3.5rem' }} value={formData.roomType} onChange={(e) => setFormData({...formData, roomType: e.target.value})}>
                                            <option value="">Select Room Type</option>
                                            <option>Standard Single Loft</option>
                                            <option>Premium Single Loft</option>
                                            <option>Sharing Studio Loft</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                        <button type="button" className="cta-button" style={{ flex: 1, background: 'var(--glass)', color: 'white' }} onClick={() => setStep(1)}>BACK</button>
                                        <button type="submit" className="cta-button" style={{ flex: 2 }}>BOOK VIEWING</button>
                                    </div>
                                </>
                            )}
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
                        padding: 1rem 1rem 1rem 3rem;
                        background: var(--glass-thick);
                        border: 1px solid var(--glass-border);
                        color: white !important;
                        border-radius: 20px;
                        font-family: inherit;
                        font-size: 1rem;
                        transition: var(--transition-premium);
                        outline: none;
                    }
                    input:focus, select:focus {
                        border-color: var(--gold);
                        background: rgba(255,255,255,0.08);
                        box-shadow: 0 0 30px rgba(197,160,89,0.15);
                    }
                    input::placeholder {
                        color: rgba(255,255,255,0.5); /* Increased contrast from 0.3 */
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
