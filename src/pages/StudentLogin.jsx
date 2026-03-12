import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import API_BASE_URL from '../config';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { User, Lock, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

const StudentLogin = () => {
    const [studentNumber, setStudentNumber] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/student-login`, {
                studentNumber: studentNumber.trim(),
                idNumber: idNumber.trim()
            });

            const { token, role } = res.data;
            localStorage.setItem('studentToken', token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('justLoggedIn', 'true');
            
            // Redirect to home or dashboard
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="login-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ minHeight: '100vh', background: 'var(--navy)', color: 'white' }}
        >
            <Background />
            <Navigation />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '160px 5% 100px',
                minHeight: '100vh'
            }}>
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        width: '100%',
                        maxWidth: '450px',
                        background: 'var(--glass)',
                        backdropFilter: 'blur(40px)',
                        padding: '3rem',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                        textAlign: 'center'
                    }}
                >
                    <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'var(--gold-gradient)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        boxShadow: '0 10px 30px rgba(197, 160, 89, 0.3)'
                    }}>
                        <GraduationCap size={35} color="black" />
                    </div>

                    <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                        Student <span className="gold-text">Portal</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontWeight: 500 }}>
                        Enter your housing credentials to continue.
                    </p>

                    <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Student Number
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                <input 
                                    type="text"
                                    placeholder="e.g. 202456789"
                                    required
                                    value={studentNumber}
                                    onChange={(e) => setStudentNumber(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                ID / Passport Number
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                                <input 
                                    type="password"
                                    placeholder="Enter your registered ID"
                                    required
                                    value={idNumber}
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '16px',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(255, 71, 87, 0.1)',
                                border: '1px solid rgba(255, 71, 87, 0.3)',
                                borderRadius: '12px',
                                color: '#ff4757',
                                fontSize: '0.85rem',
                                marginBottom: '2rem',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <ShieldCheck size={16} />
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="cta-button"
                            style={{
                                width: '100%',
                                padding: '1.2rem',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '1rem',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Authenticating...' : 'Secure Login'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </motion.div>
            </div>

            <Footer />
        </motion.div>
    );
};

export default StudentLogin;
