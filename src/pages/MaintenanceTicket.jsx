import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Wrench, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';

const MaintenanceTicket = () => {
    const [submitted, setSubmitted] = useState(false);
    const [ticket, setTicket] = useState({
        issueType: 'Plumbing',
        priority: 'Medium',
        roomNumber: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // In production, this would send to the backend
    };

    if (submitted) {
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
                <main className="section">
                    <div style={{ textAlign: 'center', background: 'var(--glass)', padding: '5rem', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                        <CheckCircle size={80} color="var(--gold)" style={{ marginBottom: '2rem' }} />
                        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>Ticket <span>Submitted</span></h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Your request has been logged. Our technicians will attend to it shortly.</p>
                        <button className="cta-button" onClick={() => setSubmitted(false)}>LOG ANOTHER ISSUE</button>
                    </div>
                </main>
                <Footer />
            </motion.div>
        );
    }

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
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
                        <h1 className="section-title">Maintenance <span>Tickets</span></h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Log issues directly to our team.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                        gap: 'clamp(1.5rem, 4vw, 4rem)',
                        width: '100%',
                        maxWidth: '1200px'
                    }}>
                        {/* Form */}
                        <form onSubmit={handleSubmit} style={{ background: 'var(--glass)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Issue Category</label>
                                <select
                                    className="admin-input"
                                    value={ticket.issueType}
                                    onChange={(e) => setTicket({ ...ticket, issueType: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '12px' }}
                                >
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                    <option>Furniture</option>
                                    <option>Wi-Fi/Internet</option>
                                    <option>General</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Priority</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {['Low', 'Medium', 'High'].map(p => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setTicket({ ...ticket, priority: p })}
                                            style={{
                                                flex: 1,
                                                padding: '0.8rem',
                                                borderRadius: '8px',
                                                border: '1px solid var(--glass-border)',
                                                background: ticket.priority === p ? 'var(--gold-glow)' : 'transparent',
                                                color: ticket.priority === p ? 'var(--gold)' : 'var(--text-primary)',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem',
                                                fontWeight: 700
                                            }}
                                        >{p}</button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Room Number</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 3A-01"
                                    className="admin-input"
                                    value={ticket.roomNumber}
                                    onChange={(e) => setTicket({ ...ticket, roomNumber: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,2).05)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '12px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Problem Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Describe the issue in detail..."
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', padding: '1rem', borderRadius: '12px', resize: 'none' }}
                                    value={ticket.description}
                                    onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="cta-button" style={{ width: '100%', padding: '1.2rem' }}>SUBMIT TICKET</button>
                        </form>

                        {/* Info Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'var(--glass)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <AlertTriangle color="var(--gold)" />
                                    <h4 style={{ fontWeight: 800 }}>Emergency Issues?</h4>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    If you are experiencing a water leak or total power failure, please contact the front desk immediately at:
                                    <br /><br />
                                    <strong style={{ color: 'white' }}>+27 (0) 15 555 8900</strong>
                                </p>
                            </div>

                            <div style={{ background: 'rgba(197, 160, 89, 0.05)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--gold-glow)' }}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <Info color="var(--gold)" />
                                    <h4 style={{ fontWeight: 800 }}>What Happens Next?</h4>
                                </div>
                                <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1.2rem' }}>
                                    <li>Technician reviews the ticket priority.</li>
                                    <li>You will receive an email confirmation.</li>
                                    <li>Most issues are resolved within 24-48 hours.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default MaintenanceTicket;
