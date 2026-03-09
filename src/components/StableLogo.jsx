import React from 'react';

const StableLogo = () => {
    return (
        <div className="stable-logo-container" style={{ textAlign: 'center', width: '100%' }}>
            <div className="logo-text">
                <h1 className="text-main" style={{
                    fontSize: 'clamp(3rem, 10vw, 5rem)',
                    lineHeight: 1.1,
                    display: 'flex',
                    gap: '0.3em',
                    justifyContent: 'center',
                    fontWeight: 900,
                    letterSpacing: '-2px'
                }}>
                    <span className="five" style={{ color: 'var(--text-primary)' }}>FIVE</span>
                    <span className="eight" style={{ color: 'var(--gold)' }}>EIGHT</span>
                    <span className="nine" style={{ color: 'var(--gold)' }}>9</span>
                </h1>
                <p className="text-sub" style={{
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                    color: 'var(--gold)',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    marginTop: '0.5rem',
                    fontWeight: 600
                }}>
                    Student Lofts.
                </p>
            </div>
        </div>
    );
};

export default StableLogo;
