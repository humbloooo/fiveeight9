import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, CreditCard, Hash, MapPin, Building2, ShieldCheck, LogOut, Camera } from 'lucide-react';
import API_BASE_URL from '../config';
import { useToast } from '../context/ToastContext';

const StudentAccount = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('studentToken');
            if (!token) {
                window.location.href = '/student-login';
                return;
            }

            try {
                const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(res.data);
            } catch (err) {
                console.error('Error fetching user data', err);
                addToast('Failed to load profile data', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [addToast]);

    const handleLogout = () => {
        localStorage.removeItem('studentToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
        addToast('Successfully logged out', 'success');
        setTimeout(() => {
            window.location.href = '/';
        }, 800);
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <ShieldCheck size={40} color="var(--gold)" />
                </motion.div>
            </div>
        );
    }

    if (!userData) return null;

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'var(--navy)', 
            padding: 'clamp(90px, 15vw, 120px) clamp(1rem, 4vw, 2rem) clamp(2rem, 5vw, 5rem)',
            color: 'var(--text-primary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient background glows */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(197,160,89,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(197,160,89,0.03) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', color: 'var(--gold)', fontWeight: 900, fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', background: 'rgba(197,160,89,0.1)', padding: '0.6rem 1.2rem', borderRadius: '100px' }}
                    >
                        <ShieldCheck size={14} /> SECURE RESIDENT PORTAL
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '1rem' }}
                    >
                        My <span className="gold-text">Account</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}
                    >
                        View your residence identity and verified documentation.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)' }}>
                    {/* Left Column - Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ 
                            background: 'var(--glass-deep)', 
                            borderRadius: 'clamp(24px, 4vw, 40px)',
                            border: '1px solid var(--glass-border)',
                            padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 3vw, 2rem)',
                            textAlign: 'center',
                            height: 'fit-content',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div style={{ position: 'relative', width: 'min(180px, 40vw)', height: 'min(180px, 40vw)', margin: '0 auto 2rem' }}>
                            <div style={{ 
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '35%', 
                                overflow: 'hidden', 
                                border: '3px solid var(--gold)',
                                boxShadow: '0 0 30px rgba(197,160,89,0.3)',
                                background: 'var(--navy)'
                            }}>
                                {userData.profilePictureUrl ? (
                                    <img src={userData.profilePictureUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', opacity: 0.3 }}>
                                        <User size={80} />
                                    </div>
                                )}
                            </div>
                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--gold)', color: 'var(--navy)', width: '40px', height: '40px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid var(--navy)' }}>
                                <Camera size={18} />
                            </div>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>{userData.username}</h2>
                        <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
                            {userData.role} • RESIDENT
                        </div>

                        <button 
                            onClick={handleLogout}
                            style={{ 
                                width: '100%', 
                                background: 'rgba(255, 77, 77, 0.1)', 
                                color: '#ff4d4d', 
                                border: '1px solid rgba(255, 77, 77, 0.2)', 
                                padding: '1.2rem', 
                                borderRadius: '18px', 
                                fontWeight: 900, 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '0.8rem', 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'}
                        >
                            <LogOut size={18} /> TERMINATE SESSION
                        </button>
                    </motion.div>

                    {/* Right Column - Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                        <div style={{ background: 'var(--glass-deep)', borderRadius: 'clamp(24px, 4vw, 40px)', border: '1px solid var(--glass-border)', padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Building2 size={24} color="var(--gold)" /> Identity Metadata
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                                {[
                                    { label: 'Email Address', value: userData.email, icon: <Mail size={18} /> },
                                    { label: 'Student ID', value: userData.studentNumber, icon: <Hash size={18} /> },
                                    { label: 'National Identity', value: 'Verified (Ends in ' + userData.idNumber?.slice(-4) + ')', icon: <CreditCard size={18} /> },
                                    { label: 'Assigned Unit', value: userData.roomNumber || 'Awaiting Placement', icon: <MapPin size={18} /> }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
                                            {item.icon} {item.label}
                                        </div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: 'var(--glass-glow)', borderRadius: 'clamp(24px, 4vw, 40px)', border: '1px solid var(--gold)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ background: 'var(--gold)', color: 'var(--navy)', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.3rem' }}>Read-Only Verification</h4>
                                <p style={{ color: 'var(--navy)', opacity: 0.7, fontSize: '0.9rem', fontWeight: 600 }}>Your profile is strictly managed by the residence administration for security and compliance purposes.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .gold-text { background: linear-gradient(to right, #C5A059, #F5D78E); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            `}</style>
        </div>
    );
};

export default StudentAccount;
