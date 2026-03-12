import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SkeletonLoader from '../components/SkeletonLoader';
import { Send, Users, Shield, MessageSquare } from 'lucide-react';

const TenantForum = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const tempIdCounter = useRef(0);

    const isLoggedIn = !!localStorage.getItem('adminToken') || !!localStorage.getItem('studentToken');
    const userRole = localStorage.getItem('userRole') || 'student';
    const currentUserId = localStorage.getItem('userId');

    const fetchMessages = useCallback(async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/forum/messages`);
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch messages', err);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await fetchMessages();
        };
        init();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [fetchMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !isLoggedIn) return;

        tempIdCounter.current += 1;
        const tempId = `temp-${tempIdCounter.current}`;
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const optimisticMsg = {
            _id: tempId,
            user: userRole === 'admin' ? 'Admin' : (localStorage.getItem('username') || 'Resident'),
            text: input,
            time: timestamp,
            isAdmin: userRole === 'admin',
            likes: [],
            sender: { 
                username: localStorage.getItem('username') || 'Resident',
                role: userRole
            }
        };

        setMessages(prev => [...prev, optimisticMsg]);
        setInput('');

        try {
            await axios.post(`${API_BASE_URL}/api/forum/messages`, {
                content: input,
                senderId: currentUserId
            });
            fetchMessages();
        } catch (err) {
            console.error('Failed to send message', err);
            // Revert optimistic update or show error
        }
    };

    const handleLike = async (id) => {
        if (!isLoggedIn) {
            alert('Please login to like messages.');
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/api/forum/messages/${id}/like`, { userId: currentUserId });
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
        const newText = window.prompt('Edit message:', msg.text || msg.content);
        if (!newText || newText === (msg.text || msg.content)) return;
        try {
            await axios.patch(`${API_BASE_URL}/api/forum/messages/${msg._id}`, { content: newText }, {
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
            <main className="standard-page-layout">
                <section className="section" style={{ flex: 1, paddingBottom: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Group <span>Chat</span></h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Connect with fellow residents. Keep it friendly!</p>
                    </div>

                    <div style={{
                        width: '100%',
                        maxWidth: '1200px',
                        background: 'var(--glass)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'calc(100vh - 250px)',
                        minHeight: '600px',
                        overflow: 'hidden',
                        margin: '0 auto',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(30px)',
                        position: 'relative'
                    }}>
                        {/* Rules Section (Now more substantial and scrollable if needed) */}
                        <div style={{ 
                            padding: '1.5rem 2rem', 
                            background: 'rgba(197, 160, 89, 0.08)', 
                            borderBottom: '1px solid var(--glass-border)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem'
                        }}>
                            <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                                <Shield size={18} style={{ color: 'var(--gold)' }} />
                                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>Five Eight 9 Community Code</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>1. Professionalism</strong>
                                No bullying, hate speech, or harassment. We are a community of future leaders.
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>2. Academic Respect</strong>
                                Strict quiet hours apply: Sun-Thu (22:00 - 06:00), Fri-Sat (00:00 - 07:00).
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>3. Digital Safety</strong>
                                Do not share room numbers or private contact details in the group chat.
                            </div>
                        </div>

                        {/* Top Bar */}
                        <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '8px', height: '8px', background: '#48bb78', borderRadius: '50%', boxShadow: '0 0 10px #48bb78' }}></div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Live Discussion</span>
                            </div>
                            <Users size={18} style={{ color: 'var(--gold)', opacity: 0.6 }} />
                        </div>

                        {/* Messages Area */}
                        <div style={{ 
                            flex: 1, 
                            padding: '1.5rem', 
                            overflowY: 'auto', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '1.2rem',
                            scrollBehavior: 'smooth',
                            background: 'rgba(5, 10, 26, 0.3)'
                        }}>
                            {loading && messages.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <SkeletonLoader height="60px" borderRadius="12px" width="60%" />
                                    <SkeletonLoader height="80px" borderRadius="12px" width="70%" style={{ alignSelf: 'flex-end' }} />
                                    <SkeletonLoader height="50px" borderRadius="12px" width="50%" />
                                </div>
                            ) : messages.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '4rem 2rem', opacity: 0.4 }}>
                                    <MessageSquare size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--gold)' }} />
                                    <p>No messages yet. Start the conversation!</p>
                                </div>
                            ) : (
                                messages.map((msg, i) => {
                                    const senderName = msg.sender?.username || msg.user;
                                    const isAdmin = msg.sender?.role === 'admin' || msg.isAdmin;
                                    const isMe = senderName === localStorage.getItem('username') || msg.user === 'You' || (isLoggedIn && senderName === (userRole === 'admin' ? 'Admin' : 'Resident'));

                                    return (
                                        <div
                                            key={msg._id || i}
                                            style={{
                                                maxWidth: '85%',
                                                alignSelf: isMe ? 'flex-end' : 'flex-start',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.3rem',
                                                alignItems: isMe ? 'flex-end' : 'flex-start'
                                            }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: isMe ? 'flex-end' : 'flex-start',
                                                gap: '0.6rem',
                                                fontSize: '0.7rem',
                                                color: 'var(--text-secondary)',
                                                padding: '0 0.5rem',
                                                flexDirection: isMe ? 'row-reverse' : 'row',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{ fontWeight: 800, color: isAdmin ? 'var(--gold)' : 'var(--text-primary)' }}>
                                                    {isMe ? 'You' : senderName}
                                                </span>
                                                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                                                    {msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div style={{
                                                padding: '0.9rem 1.3rem',
                                                background: isMe ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                                                color: isMe ? 'var(--navy)' : 'var(--text-primary)',
                                                borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                fontSize: '0.9rem',
                                                lineHeight: '1.5',
                                                border: isAdmin ? '1px solid var(--gold)' : '1px solid var(--glass-border)',
                                                boxShadow: isMe ? '0 10px 20px -10px var(--gold-glow)' : 'none'
                                            }}>
                                                {msg.content || msg.text}
                                            </div>
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: '0.8rem', 
                                                marginTop: '0.2rem', 
                                                alignItems: 'center',
                                                flexDirection: isMe ? 'row-reverse' : 'row',
                                                padding: '0 0.5rem'
                                            }}>
                                                <button 
                                                    onClick={() => handleLike(msg._id)}
                                                    style={{ 
                                                        background: 'transparent', 
                                                        border: 'none', 
                                                        color: (msg.likes || []).includes(currentUserId) ? 'var(--gold)' : 'var(--text-muted)',
                                                        cursor: 'pointer',
                                                        fontSize: '0.65rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <Shield size={10} fill={(msg.likes || []).includes(currentUserId) ? 'var(--gold)' : 'none'} />
                                                    {(msg.likes || []).length > 0 ? (msg.likes || []).length : ''}
                                                </button>
                                                {userRole === 'admin' && (
                                                    <div style={{ display: 'flex', gap: '0.5rem', opacity: 0.5 }}>
                                                        <button onClick={() => handleEdit(msg)} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.6rem' }}>Edit</button>
                                                        <button onClick={() => handleDelete(msg._id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.6rem' }}>Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area (Moved to Bottom) */}
                        <div style={{
                            padding: '1.2rem 1.5rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderTop: '1px solid var(--glass-border)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <form
                                onSubmit={handleSend}
                                style={{
                                    display: 'flex',
                                    gap: '0.8rem',
                                    alignItems: 'center'
                                }}
                            >
                                <div className="hide-on-mobile" style={{ 
                                    width: '36px', 
                                    height: '36px', 
                                    background: 'var(--gold-gradient)', 
                                    borderRadius: '10px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: 'var(--navy)', 
                                    fontWeight: 900,
                                    fontSize: '0.8rem'
                                }}>
                                    {localStorage.getItem('username')?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={isLoggedIn ? "Say something..." : "Login to chat"}
                                    disabled={!isLoggedIn}
                                    style={{
                                        flex: 1,
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '14px',
                                        padding: '0.9rem 1.2rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        fontSize: '0.9rem'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!isLoggedIn || !input.trim()}
                                    style={{
                                        background: isLoggedIn && input.trim() ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                                        color: 'var(--navy)',
                                        border: 'none',
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: isLoggedIn && input.trim() ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </motion.div>
    );
};

export default TenantForum;
