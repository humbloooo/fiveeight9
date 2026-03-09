import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setToken(res.data.token);
            localStorage.setItem('adminToken', res.data.token);
        } catch (err) {
            setError('Invalid credentials');
        }
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
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ color: 'var(--gold)', marginBottom: '2rem', textAlign: 'center' }}>Admin Access</h2>
                {error && <p style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</p>}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            borderRadius: '4px'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            color: 'white',
                            borderRadius: '4px'
                        }}
                    />
                </div>
                <button className="cta-button" type="submit" style={{ width: '100%' }}>LOGIN</button>
            </form>
        </div>
    );
};

export default AdminLogin;
