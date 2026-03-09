import React, { useState, useEffect, useMemo } from 'react';

const Background = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setIsDarkMode(e.matches);

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // richer star field for dark mode
    const stars = useMemo(() => {
        return [...Array(100)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            opacity: 0.2 + Math.random() * 0.6,
            duration: 3 + Math.random() * 4
        }));
    }, []);

    return (
        <div className="background-wrapper">
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
            {isDarkMode && (
                <>
                    <div className="star-field" style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        {stars.map((star) => (
                            <div
                                key={star.id}
                                className="star"
                                style={{
                                    position: 'absolute',
                                    left: star.left,
                                    top: star.top,
                                    width: star.size,
                                    height: star.size,
                                    background: 'white',
                                    borderRadius: '50%',
                                    opacity: star.opacity,
                                    animation: `twinkle ${star.duration}s infinite ease-in-out`,
                                    boxShadow: '0 0 5px rgba(255,255,255,0.3)'
                                }}
                            />
                        ))}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            top: '-10%',
                            left: '-10%',
                            width: '100%',
                            height: '100%',
                            background: 'radial-gradient(circle at 20% 30%, rgba(0, 31, 63, 0.4) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                            pointerEvents: 'none',
                            zIndex: -1
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-10%',
                            right: '-10%',
                            width: '100%',
                            height: '100%',
                            background: 'radial-gradient(circle at 80% 70%, rgba(197, 160, 89, 0.1) 0%, transparent 50%)',
                            filter: 'blur(120px)',
                            pointerEvents: 'none',
                            zIndex: -1
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default Background;
