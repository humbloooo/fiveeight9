import React from 'react';

const StableLogo = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0'
        }}>
            <div style={{
                fontSize: 'clamp(3rem, 12vw, 6rem)',
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-2px',
                lineHeight: 0.8,
                position: 'relative',
                textTransform: 'uppercase'
            }}>
                FIVE
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '2px',
                    background: 'var(--gold)',
                    opacity: 0.5,
                    zIndex: -1
                }}></div>
            </div>
            <div style={{
                fontSize: 'clamp(3rem, 12vw, 6rem)',
                fontWeight: 900,
                color: 'var(--gold)',
                letterSpacing: '-2px',
                lineHeight: 0.8,
                textTransform: 'uppercase'
            }}>
                EIGHT 9
            </div>

            <div style={{
                marginTop: '1.5rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '8px',
                textTransform: 'uppercase',
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '1rem'
            }}>
                Student Lofts
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default StableLogo;
