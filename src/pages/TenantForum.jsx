import React, { useState } from 'react';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Send, Users, Shield } from 'lucide-react';

const TenantForum = () => {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Admin', text: 'Welcome to the Group Chat! Keep it friendly.', time: '09:00 AM', isAdmin: true },
        { id: 2, user: 'Thabo', text: 'Does anyone know when the bus leaves for campus?', time: '10:15 AM', isAdmin: false },
        { id: 3, user: 'Sarah', text: 'It leaves every hour on the dot. Next one is at 11:00.', time: '10:17 AM', isAdmin: false },
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, {
            id: Date.now(),
            user: 'You',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAdmin: false
        }]);
        setInput('');
    };

    return (
        <div className="app-container">
            <Background />
            <Navigation />
            <main style={{ paddingTop: '120px' }}>
                <section className="section" style={{ height: 'calc(100vh - 120px)', justifyContent: 'flex-start' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Group <span>Chat</span></h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Connect with your fellow residents at Five Eight 9.</p>
                    </div>

                    <div style={{
                        width: '100%',
                        maxWidth: '800px',
                        background: 'var(--glass)',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '600px',
                        overflow: 'hidden'
                    }}>
                        {/* Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '10px', height: '10px', background: '#48bb78', borderRadius: '50%' }}></div>
                            <span style={{ fontWeight: 600 }}>Active Residents</span>
                            <Users size={18} style={{ color: 'var(--gold)', marginLeft: 'auto' }} />
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {messages.map((msg) => (
                                <div key={msg.id} style={{
                                    alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start',
                                    maxWidth: '70%'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        gap: '0.5rem',
                                        marginBottom: '0.3rem',
                                        flexDirection: msg.user === 'You' ? 'row-reverse' : 'row'
                                    }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: msg.isAdmin ? 'var(--gold)' : 'var(--text-primary)' }}>{msg.user}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{msg.time}</span>
                                    </div>
                                    <div style={{
                                        background: msg.user === 'You' ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                                        color: msg.user === 'You' ? '#000' : 'white',
                                        padding: '1rem 1.5rem',
                                        borderRadius: msg.user === 'You' ? '18px 2px 18px 18px' : '2px 18px 18px 18px',
                                        fontSize: '0.95rem'
                                    }}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Overlay */}
                        <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <button type="submit" style={{
                                background: 'var(--gold)',
                                border: 'none',
                                padding: '1rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Send size={20} color="#000" />
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default TenantForum;
