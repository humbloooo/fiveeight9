import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const ThemeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if we should prompt the user
        const systemPref = localStorage.getItem('themePreference');
        const sessionPrompted = sessionStorage.getItem('themePrompted');

        if (systemPref !== 'system' && !sessionPrompted) {
            // Slight delay so it doesn't jarringly appear before hydration finishes
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSelect = (choice) => {
        if (choice === 'system') {
            localStorage.setItem('themePreference', 'system');
            localStorage.setItem('theme', 'system');
        } else {
            localStorage.removeItem('themePreference'); // Ensure it asks again next session
            localStorage.setItem('theme', choice);
        }
        
        sessionStorage.setItem('themePrompted', 'true');
        setIsOpen(false);
        
        // Dispatch event so Navigation/App updates instantly
        window.dispatchEvent(new Event('themeChanged'));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25 }}
                        style={{
                            background: 'var(--glass)',
                            border: '1px solid var(--glass-border)',
                            padding: '3rem 2rem',
                            borderRadius: '24px',
                            maxWidth: '450px',
                            width: '100%',
                            textAlign: 'center',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                        }}
                    >
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-primary)' }}>Choose Your Experience</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Select your preferred visual mode for exploring Five Eight 9.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button 
                                onClick={() => handleSelect('dark')}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                    padding: '1rem', background: 'rgba(5, 10, 26, 0.8)', border: '1px solid var(--glass-border)',
                                    borderRadius: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.borderColor = 'var(--gold)'}
                                onMouseOut={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                            >
                                <Moon size={20} /> Dark Mode (Night Owl)
                            </button>

                            <button 
                                onClick={() => handleSelect('light')}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                    padding: '1rem', background: '#f8f9fa', border: '1px solid #e0e0e0',
                                    borderRadius: '12px', color: '#1a202c', fontWeight: 700, cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.borderColor = 'var(--gold)'}
                                onMouseOut={(e) => e.target.style.borderColor = '#e0e0e0'}
                            >
                                <Sun size={20} /> Light Mode (Daylight)
                            </button>

                            <button 
                                onClick={() => handleSelect('system')}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                    padding: '1rem', background: 'transparent', border: '2px solid var(--gold)',
                                    borderRadius: '12px', color: 'var(--gold)', fontWeight: 900, cursor: 'pointer',
                                    transition: 'all 0.3s ease', marginTop: '1rem'
                                }}
                                onMouseOver={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.color = '#000'; }}
                                onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
                            >
                                <Monitor size={20} /> Use System Default (Always)
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ThemeModal;
