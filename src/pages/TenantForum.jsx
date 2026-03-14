import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Background from '../components/Background';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SkeletonLoader from '../components/SkeletonLoader';
import { Send, Users, Shield, MessageSquare, Heart, Edit3, Trash2, Info } from 'lucide-react';

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
        fetchMessages();
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
        }
    };

    const handleLike = async (id) => {
        if (!isLoggedIn) return;
        try {
            await axios.post(`${API_BASE_URL}/api/forum/messages/${id}/like`, { userId: currentUserId });
            fetchMessages();
        } catch (err) {
            console.error('Failed to like', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Exterminate this communication?')) return;
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
        const newText = window.prompt('Update transmission:', msg.text || msg.content);
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
            transition={{ duration: 0.5 }}
        >
            <Background />
            <Navigation />
            <main className="standard-page-layout">
                <section className="section" style={{ flex: 1, paddingBottom: '4rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h1 className="section-title">Forum <span>Nexus</span></h1>
                        <p style={{ color: 'var(--text-secondary)', margin: '0 auto', maxWidth: '600px', lineHeight: '1.8' }}>
                            The digital heartbeat of Five Eight 9. Connect, debate, and thrive within our exclusive resident network.
                        </p>
                    </div>

                    <div style={{
                        width: '100%',
                        maxWidth: '1200px',
                        background: 'var(--glass-deep)',
                        borderRadius: '40px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '75vh',
                        minHeight: '700px',
                        overflow: 'hidden',
                        margin: '0 auto',
                        boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(40px)',
                        position: 'relative'
                    }}>
                        {/* Rules/Code Header */}
                        <div style={{ 
                            padding: '1.5rem 2.5rem', 
                            background: 'rgba(197, 160, 89, 0.05)', 
                            borderBottom: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div className="status-pulse" style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 12px #4ade80' }}></div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>Live Nexus</span>
                            </div>
                            <div style={{ display: 'flex', gap: '2rem' }} className="hide-on-mobile">
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}><Shield size={14} className="gold-text" /> Professionalism Only</span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}><Info size={14} className="gold-text" /> Strictly Residents</span>
                            </div>
                            <Users size={20} className="gold-text" style={{ opacity: 0.6 }} />
                        </div>

                        {/* Messages Stream */}
                        <div style={{ 
                            flex: 1, 
                            padding: '2.5rem', 
                            overflowY: 'auto', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '1.5rem',
                            scrollBehavior: 'smooth',
                            background: 'rgba(5, 10, 26, 0.2)'
                        }} className="custom-scrollbar">
                            {loading && messages.length === 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <SkeletonLoader height="70px" borderRadius="20px" width="55%" />
                                    <SkeletonLoader height="90px" borderRadius="20px" width="65%" style={{ alignSelf: 'flex-end' }} />
                                    <SkeletonLoader height="60px" borderRadius="20px" width="45%" />
                                </div>
                            ) : messages.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '6rem 2.5rem', opacity: 0.3 }}>
                                    <MessageSquare size={64} style={{ margin: '0 auto 2rem', color: 'var(--gold)' }} />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Silence of the Void</h3>
                                    <p>Initialize the first transmission in the Nexus.</p>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, i) => {
                                        const senderName = msg.sender?.username || msg.user;
                                        const isAdmin = msg.sender?.role === 'admin' || msg.isAdmin;
                                        const isMe = senderName === localStorage.getItem('username') || msg.user === 'You' || (isLoggedIn && senderName === (userRole === 'admin' ? 'Admin' : 'Resident'));

                                        return (
                                            <motion.div
                                                key={msg._id || i}
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                style={{
                                                    maxWidth: '82%',
                                                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.4rem',
                                                    alignItems: isMe ? 'flex-end' : 'flex-start'
                                                }}
                                            >
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '0.8rem',
                                                    fontSize: '0.75rem',
                                                    color: 'var(--text-secondary)',
                                                    padding: '0 0.8rem',
                                                    flexDirection: isMe ? 'row-reverse' : 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <span style={{ fontWeight: 900, color: isAdmin ? 'var(--gold)' : 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.7rem' }}>
                                                        {isMe ? 'Command Unit (You)' : (isAdmin ? `[ADM] ${senderName}` : senderName)}
                                                    </span>
                                                    <span style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700 }}>
                                                        {msg.time || new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    padding: '1.2rem 1.6rem',
                                                    background: isMe ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                                                    color: isMe ? 'var(--navy)' : 'var(--text-primary)',
                                                    borderRadius: isMe ? '24px 24px 6px 24px' : '24px 24px 24px 6px',
                                                    fontSize: '1rem',
                                                    lineHeight: '1.6',
                                                    border: isAdmin ? '1px solid var(--gold)' : '1px solid var(--glass-border)',
                                                    boxShadow: isMe ? '0 15px 30px -10px rgba(197, 160, 89, 0.4)' : '0 10px 30px rgba(0,0,0,0.2)',
                                                    position: 'relative',
                                                    backdropFilter: isMe ? 'none' : 'blur(10px)',
                                                    fontWeight: isMe ? 700 : 500
                                                }}>
                                                    {msg.content || msg.text}
                                                </div>
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: '1.2rem', 
                                                    marginTop: '0.3rem', 
                                                    alignItems: 'center',
                                                    flexDirection: isMe ? 'row-reverse' : 'row',
                                                    padding: '0 0.8rem'
                                                }}>
                                                    <button 
                                                        onClick={() => handleLike(msg._id)}
                                                        style={{ 
                                                            background: 'transparent', 
                                                            border: 'none', 
                                                            color: (msg.likes || []).includes(currentUserId) ? 'var(--gold)' : 'var(--text-muted)',
                                                            cursor: 'pointer',
                                                            fontSize: '0.7rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.4rem',
                                                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                            fontWeight: 800
                                                        }}
                                                    >
                                                        <Heart size={14} fill={(msg.likes || []).includes(currentUserId) ? 'var(--gold)' : 'none'} />
                                                        {(msg.likes || []).length > 0 ? (msg.likes || []).length : ''}
                                                    </button>
                                                    {userRole === 'admin' && (
                                                        <div style={{ display: 'flex', gap: '1rem', opacity: 0.4 }}>
                                                            <button onClick={() => handleEdit(msg)} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 800 }}>UPDATE</button>
                                                            <button onClick={() => handleDelete(msg._id)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 800 }}>PURGE</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Transmission Input Area */}
                        <div style={{
                            padding: '1.8rem 2.5rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderTop: '1px solid var(--glass-border)',
                            backdropFilter: 'blur(20px)'
                        }}>
                            <form
                                onSubmit={handleSend}
                                style={{
                                    display: 'flex',
                                    gap: '1.2rem',
                                    alignItems: 'center'
                                }}
                            >
                                {!isLoggedIn ? (
                                    <div style={{ flex: 1, textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>
                                        AUTH REQUIRED FOR NEXUS TRANSMISSION. <a href="/student-login" className="gold-text" style={{ textDecoration: 'none' }}>LOGIN NOW</a>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ 
                                            width: '45px', 
                                            height: '45px', 
                                            background: 'var(--gold-gradient)', 
                                            borderRadius: '14px', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            color: 'var(--navy)', 
                                            fontWeight: 900,
                                            fontSize: '1rem',
                                            boxShadow: '0 10px 20px rgba(197, 160, 89, 0.3)'
                                        }} className="hide-on-mobile">
                                            {localStorage.getItem('username')?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <input
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Transmit message to the Nexus..."
                                            style={{
                                                flex: 1,
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: '18px',
                                                padding: '1.1rem 1.5rem',
                                                color: 'var(--text-primary)',
                                                outline: 'none',
                                                fontSize: '1rem',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim()}
                                            style={{
                                                background: input.trim() ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                                                color: input.trim() ? 'var(--navy)' : 'var(--text-muted)',
                                                border: 'none',
                                                width: '56px',
                                                height: '56px',
                                                borderRadius: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: input.trim() ? 'pointer' : 'not-allowed',
                                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                                boxShadow: input.trim() ? '0 15px 30px rgba(197, 160, 89, 0.3)' : 'none'
                                            }}
                                        >
                                            <Send size={24} style={{ transform: input.trim() ? 'translateX(2px)' : 'none' }} />
                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <style>{`
                .status-pulse {
                    animation: statusPulse 2s infinite;
                }
                @keyframes statusPulse {
                    0% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                    100% { opacity: 0.6; transform: scale(1); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(197, 160, 89, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(197, 160, 89, 0.4);
                }
            `}</style>
        </motion.div>
    );
};

export default TenantForum;
