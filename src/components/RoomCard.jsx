import React from 'react';

const RoomCard = ({ title, price, subtitle, nsfas }) => {
    return (
        <div className="room-card" style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflow: 'hidden',
            padding: 0
        }}>
            <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{
                        background: 'var(--gold)',
                        color: '#000',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 900
                    }}>{price}</span>
                    {nsfas && <span style={{
                        border: '1px solid var(--gold)',
                        color: 'var(--gold)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        fontSize: '0.6rem',
                        fontWeight: 700
                    }}>NSFAS</span>}
                </div>

                <div className="skeleton" style={{ width: '100%', height: '180px', borderRadius: '12px', marginBottom: '1.5rem' }}></div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>{subtitle}</p>
            </div>

            <button
                className="cta-button"
                aria-label={`View details for ${title}`}
                style={{
                    width: '100%',
                    borderRadius: 0,
                    padding: '1.2rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: 'none',
                    borderTop: '1px solid var(--glass-border)',
                    color: 'var(--gold)',
                    fontSize: '0.8rem'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--navy)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
                onClick={() => window.location.href = '#contact'}
            >
                VIEW DETAILS
            </button>
        </div>
    );
};

export default RoomCard;
