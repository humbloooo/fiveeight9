import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorGlow = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 1, // Behind main content, above deep background
                mixBlendMode: 'screen',
                transform: 'translate(-50%, -50%)'
            }}
            animate={{
                x: mousePosition.x,
                y: mousePosition.y
            }}
            transition={{
                type: 'tween',
                ease: 'backOut',
                duration: 0.5
            }}
        />
    );
};

export default CursorGlow;
