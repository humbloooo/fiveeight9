import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../config';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { User, Lock, ArrowRight, ShieldCheck, GraduationCap, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { addToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/student-login`, {
                email: email.trim(),
                idNumber: idNumber.trim()
            });

            const { token, user } = res.data;
            localStorage.setItem('studentToken', token);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('justLoggedIn', 'true');
            
            addToast('Access granted. Welcome to the Student Portal.', 'success');
            
            // Redirect to home or account
            setTimeout(() => {
                window.location.href = '/account';
            }, 800);
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please verify your credentials.';
            setError(msg);
            addToast(msg, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="login-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ minHeight: '100vh', background: 'var(--navy)', color: 'white' }}
        >
            <Background />
            <Navigation />

            <main className="standard-page-layout" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: 'calc(100vh - 100px)',
                padding: '120px 5% 80px'
            }}>
                <motion.div 
                    initial={{ y: 30, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        width: '100%',
                        maxWidth: '480px',
                        background: 'var(--glass-deep)',
                        backdropFilter: 'blur(40px)',
                        padding: '4rem 3rem',
                        borderRadius: '40px',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 50px 120px rgba(0,0,0,0.6)',
                        textAlign: 'center',
                        position: 'relative'
                    }}
                >
                    {/* Decorative Top Accent */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100px',
                        height: '4px',
                        background: 'var(--gold-gradient)',
                        borderRadius: '0 0 10px 10px'
                    }}></div>

                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'var(--gold-gradient)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2.5rem',
                        boxShadow: '0 15px 40px rgba(197, 160, 89, 0.4)',
                        transform: 'rotate(-3deg)'
                    }}>
                        <GraduationCap size={40} color="var(--navy)" />
                    </div>

                    <h1 style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 900, 
                        marginBottom: '0.8rem', 
                        color: 'var(--text-primary)',
                        letterSpacing: '-1px'
                    }}>
                        Student <span className="gold-text">Portal</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3.5rem', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                        SECURE RESIDENT ACCESS
                    </p>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    padding: '1.2rem',
                                    background: 'rgba(255, 71, 87, 0.08)',
                                    border: '1px solid rgba(255, 71, 87, 0.2)',
                                    borderRadius: '16px',
                                    color: '#ff4757',
                                    fontSize: '0.85rem',
                                    marginBottom: '2.5rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    justifyContent: 'center'
                                }}
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '1.8rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                <input 
                                    type="email"
                                    placeholder="Enter your registered email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '18px',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                Security Pin / ID 
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                <input 
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={idNumber}
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '18px',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="cta-button"
                            style={{
                                width: '100%',
                                padding: '1.3rem',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                fontWeight: 900,
                                fontSize: '1.1rem',
                                letterSpacing: '1px',
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'AUTHENTICATING...' : 'ACCESS PORTAL'}
                            {!loading && <ArrowRight size={22} />}
                        </button>
                    </form>

                    <p style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Forget your credentials? Visit the front desk for recovery.
                    </p>
                </motion.div>
            </main>

            <Footer />
        </motion.div>
    );
};

export default StudentLogin;
