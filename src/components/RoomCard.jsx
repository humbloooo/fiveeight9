import React from 'react';

const RoomCard = ({ title, price, subtitle, nsfas }) => {
    return (
        <div className="room-card">
            <div className="card-badge">{price}</div>
            {nsfas && <div className="card-badge nsfas-badge">NSFAS ACCREDITED</div>}

            <div className="card-image-placeholder" style={{ background: 'linear-gradient(45deg, var(--navy-light), var(--gold))', opacity: 0.1 }}></div>

            <h3 className="card-title">{title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{subtitle}</p>

            <button
                style={{
                    background: 'transparent',
                    border: '1px solid var(--gold)',
                    color: 'var(--gold)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--navy)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
            >
                View Details
            </button>
        </div>
    );
};

export default RoomCard;
