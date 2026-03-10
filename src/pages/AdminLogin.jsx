import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const AdminLogin = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            setToken(res.data.token);
            localStorage.setItem('adminToken', res.data.token);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="admin-login" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--navy)'
        }}>
            <form onSubmit={handleLogin} style={{
                background: 'var(--glass)',
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                width: '90%',
                maxWidth: '400px',
                backdropFilter: 'blur(20px)'
            }}>
                <h2 style={{ color: 'var(--gold)', marginBottom: '0.5rem', textAlign: 'center', fontWeight: 900 }}>ADMIN PORTAL</h2>
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>Secure Access Only</p>

                {error && <div style={{
                    background: 'rgba(255, 77, 77, 0.1)',
                    color: '#ff4d4d',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 77, 77, 0.2)'
                }}>{error}</div>}

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@fiveeight9.co.za"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            borderRadius: '12px',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Security Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            borderRadius: '12px',
                            outline: 'none'
                        }}
                    />
                </div>
                <button
                    className="cta-button"
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '1.2rem', borderRadius: '12px' }}
                >
                    {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
