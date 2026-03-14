import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, ChevronLeft } from 'lucide-react';
import Background from '../components/Background';
import { useToast } from '../context/ToastContext';

const AdminLogin = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            setToken(res.data.token);
            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('userRole', res.data.user.role);
            addToast('Login successful. Welcome to the Command Center.', 'success');
        } catch (err) {
            const msg = err.response?.data?.message || 'Invalid administrative credentials';
            setError(msg);
            addToast(msg, 'error');
        }
        setLoading(false);
    };

    return (
        <div className="admin-login-layout" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--navy)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Background />

            {/* Back to Site Button */}
            <motion.a 
                href="/"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    zIndex: 10
                }}
            >
                <ChevronLeft size={18} /> BACK TO RESIDENCE
            </motion.a>
            
            <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '90%',
                    maxWidth: '450px',
                    zIndex: 2
                }}
            >
                <form onSubmit={handleLogin} style={{
                    background: 'var(--glass-deep)',
                    padding: '3.5rem 3rem',
                    borderRadius: '35px',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(40px)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
                    position: 'relative'
                }}>
                    {/* Decorative Top Bar */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '4px',
                        background: 'var(--gold-gradient)',
                        borderRadius: '0 0 10px 10px'
                    }}></div>

                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            background: 'var(--gold-gradient)',
                            borderRadius: '22px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            boxShadow: '0 15px 35px rgba(197, 160, 89, 0.4)',
                            transform: 'rotate(-5deg)'
                        }}>
                            <Shield size={35} color="var(--navy)" />
                        </div>
                        <h1 style={{ 
                            color: 'var(--text-primary)', 
                            fontSize: '1.8rem', 
                            fontWeight: 900, 
                            letterSpacing: '2px',
                            marginBottom: '0.5rem'
                        }}>
                            ADMIN <span className="gold-text">PORTAL</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>
                            SECURE COMMAND CENTER ACCESS
                        </p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    background: 'rgba(255, 77, 77, 0.08)',
                                    color: '#ff4d4d',
                                    padding: '1rem',
                                    borderRadius: '14px',
                                    marginBottom: '2rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    border: '1px solid rgba(255, 77, 77, 0.2)',
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

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '0.8rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Administrative Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@fiveeight9.co.za"
                                style={{
                                    width: '100%',
                                    padding: '1.1rem 1.1rem 1.1rem 3.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '16px',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <label style={{ display: 'block', color: 'var(--gold)', marginBottom: '0.8rem', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Security Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '1.1rem 1.1rem 1.1rem 3.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    color: 'var(--text-primary)',
                                    borderRadius: '16px',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                            />
                        </div>
                    </div>

                    <button
                        className="cta-button"
                        type="submit"
                        disabled={loading}
                        style={{ 
                            width: '100%', 
                            padding: '1.3rem', 
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            fontSize: '1rem',
                            fontWeight: 900,
                            letterSpacing: '1px',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'AUTHORIZING...' : 'ACCESS COMMAND CENTER'}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
                    This is a secure system. All access attempts are logged.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
