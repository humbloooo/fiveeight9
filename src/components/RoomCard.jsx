import React from 'react';

const RoomCard = ({ title, price, subtitle, nsfas, image }) => {
    const getOptimizedUrl = (url) => {
        if (!url) return '';
        if (url.includes('res.cloudinary.com') && !url.includes('f_auto')) {
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        return url;
    };

    return (
        <div className="room-card glass-panel hover-lift" style={{
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflow: 'hidden',
            padding: 0,
            borderRadius: '24px'
        }}>
            <div style={{ padding: '0' }}>
                <div style={{
                    width: '100%',
                    height: '220px',
                    borderRadius: '0',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <img src={getOptimizedUrl(image || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800')}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="room-img" />
                    <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                            <span style={{
                                background: 'var(--gold-gradient)',
                                color: '#000',
                                padding: '0.4rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.7rem',
                                fontWeight: 900,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}>{price}</span>
                            {nsfas && <span style={{
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(5px)',
                                color: 'var(--gold)',
                                padding: '0.4rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                border: '1px solid rgba(197, 160, 89, 0.3)'
                            }}>NSFAS</span>}
                        </div>
                        {title.toLowerCase().includes('sharing') && (
                            <span style={{
                                background: '#ff4d4d',
                                color: 'white',
                                padding: '0.4rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.6rem',
                                fontWeight: 900,
                                boxShadow: '0 4px 10px rgba(255, 77, 77, 0.3)',
                                width: 'fit-content'
                            }}>🔥 FILLING FAST</span>
                        )}
                        <span style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            padding: '0.4rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.6rem',
                            fontWeight: 600,
                            width: 'fit-content',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>📍 5 MINS TO UNIVEN</span>
                    </div>
                </div>

                <div style={{ padding: '0 1.8rem 1.8rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.6rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: '1.6' }}>{subtitle}</p>
                </div>
            </div>

            <button
                className="cta-button"
                aria-label={`Quick chat about ${title} on WhatsApp`}
                style={{
                    width: '100%',
                    borderRadius: 0,
                    padding: '1.4rem',
                    background: 'rgba(255,255,255,0.01)',
                    border: 'none',
                    borderTop: '1px solid var(--glass-border)',
                    color: 'var(--gold)',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    transition: 'var(--transition-premium)'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'var(--gold-gradient)'; e.target.style.color = 'var(--navy)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)'; }}
                onClick={() => {
                    const msg = encodeURIComponent(`Hi, I'm interested in the ${title} at Five Eight 9 Student Lofts.`);
                    window.open(`https://wa.me/27155558900?text=${msg}`, '_blank', 'noopener,noreferrer');
                }}
            >
                QUICK CHAT 💬
            </button>
            <style>{`
                .room-card:hover .room-img { transform: scale(1.1); }
            `}</style>
        </div>
    );
};

export default RoomCard;
