import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
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
        <div style={{
            position: 'fixed',
            top: '120px',
            right: '2rem',
            background: 'rgba(5, 10, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            zIndex: 5000,
            animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            color: 'white'
        }}>
            {icons[type]}
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message}</span>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem' }}><X size={16} /></button>

            <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};

export default Toast;
