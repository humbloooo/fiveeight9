import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Send, Users, Shield } from 'lucide-react';

const TenantForum = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const isLoggedIn = !!localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole') || 'student';

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/forum/messages`);
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch messages', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            await fetchMessages();
        };
        loadMessages();
        // Polling every 10 seconds for new messages
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (!isLoggedIn) {
            alert('You must have an account to send messages. Please login.');
            return;
        }

        const optimisticMsg = {
            _id: Date.now().toString(),
            user: userRole === 'admin' ? 'Admin' : 'Resident',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAdmin: userRole === 'admin',
            likes: []
        };

        setMessages(prev => [...prev, optimisticMsg]);
        setInput('');

        try {
            await axios.post(`${API_BASE_URL}/api/forum/messages`, optimisticMsg);
            fetchMessages();
        } catch (err) {
            console.error('Failed to send message', err);
        }
    };

    const handleLike = async (id) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('You must have an account to like messages.');
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/api/forum/messages/${id}/like`, { userId });
            fetchMessages();
        } catch (err) {
            console.error('Failed to like', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/forum/messages/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
            });
            fetchMessages();
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    const handleEdit = async (msg) => {
        const newText = window.prompt('Edit message:', msg.text);
        if (!newText || newText === msg.text) return;
        try {
            await axios.patch(`${API_BASE_URL}/api/forum/messages/${msg._id}`, { text: newText }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
            });
            fetchMessages();
        } catch (err) {
            console.error('Edit failed', err);
        }
    };

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
                            {loading ? (
                                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading messages...</div>
                            ) : messages.length === 0 ? (
                                <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No messages yet. Be the first to say hi!</div>
                            ) : messages.map((msg) => {
                                    const isMe = msg.user === (userRole === 'admin' ? 'Admin' : 'Resident') || msg.user === 'You';
                                    return (
                                        <div key={msg._id} style={{
                                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                                            maxWidth: '75%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: isMe ? 'flex-end' : 'flex-start'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                gap: '0.5rem',
                                                marginBottom: '0.3rem',
                                                flexDirection: isMe ? 'row-reverse' : 'row'
                                            }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: msg.isAdmin ? 'var(--gold)' : 'var(--text-primary)' }}>{msg.user}</span>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{msg.time}</span>
                                            </div>
                                            <div style={{
                                                background: isMe ? 'var(--gold)' : 'rgba(255,255,255,0.05)',
                                                color: isMe ? '#000' : 'var(--text-primary)',
                                                padding: '0.8rem 1.2rem',
                                                borderRadius: isMe ? '18px 2px 18px 18px' : '2px 18px 18px 18px',
                                                fontSize: '0.9rem',
                                                border: msg.isAdmin ? '1px solid var(--gold)' : '1px solid var(--glass-border)',
                                                position: 'relative',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                            }}>
                                                {msg.text}
                                            </div>
                                            
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: '0.8rem', 
                                                marginTop: '0.4rem', 
                                                alignItems: 'center',
                                                flexDirection: isMe ? 'row-reverse' : 'row'
                                            }}>
                                                <button 
                                                    onClick={() => handleLike(msg._id)}
                                                    style={{ 
                                                        background: 'transparent', 
                                                        border: 'none', 
                                                        color: (msg.likes || []).includes(localStorage.getItem('userId')) ? 'var(--gold)' : 'var(--text-secondary)',
                                                        cursor: 'pointer',
                                                        fontSize: '0.75rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        padding: '2px 5px'
                                                    }}
                                                >
                                                    <Shield size={12} fill={(msg.likes || []).includes(localStorage.getItem('userId')) ? 'var(--gold)' : 'none'} />
                                                    {(msg.likes || []).length}
                                                </button>

                                                {userRole === 'admin' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleDelete(msg._id)}
                                                            style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.7rem' }}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button 
                                                            onClick={() => handleEdit(msg)}
                                                            style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.7rem' }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Overlay */}
                        <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isLoggedIn ? "Type your message..." : "Login to send messages..."}
                                disabled={!isLoggedIn}
                                style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    padding: '1rem 1.5rem',
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none',
                                    opacity: isLoggedIn ? 1 : 0.5
                                }}
                            />
                            <button type="submit" disabled={!isLoggedIn} style={{
                                background: isLoggedIn ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                padding: '1rem',
                                borderRadius: '12px',
                                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Send size={20} color={isLoggedIn ? "#000" : "var(--text-secondary)"} />
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default TenantForum;
