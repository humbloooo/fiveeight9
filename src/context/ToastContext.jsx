import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div style={{ position: 'fixed', top: '120px', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <AnimatePresence>
                    {toasts.map(toast => (
                        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle color="#48bb78" size={20} />,
        error: <AlertCircle color="#f56565" size={20} />,
        info: <Info color="#4299e1" size={20} />
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            layout
            style={{
                background: 'rgba(5, 10, 26, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                padding: '1.2rem 1.5rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                minWidth: '300px'
            }}
        >
            {icons[toast.type]}
            <span style={{ fontSize: '0.95rem', fontWeight: 600, flex: 1 }}>{toast.message}</span>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem' }}>
                <X size={16} />
            </button>
            <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '3px',
                    background: toast.type === 'error' ? '#f56565' : toast.type === 'success' ? '#48bb78' : '#4299e1'
                }}
            />
        </motion.div>
    );
};
