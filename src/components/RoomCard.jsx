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
        <div className="room-card glass-panel hover-lift">
            <div className="room-card-top">
                <div className="room-img-wrapper">
                    <img src={getOptimizedUrl(image || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800')}
                        alt={title}
                        className="room-img" />
                    <div className="room-badge-container">
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                            <span className="room-badge room-badge--gold">{price}</span>
                            {nsfas && <span className="room-badge room-badge--glass" style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--gold)' }}>NSFAS</span>}
                        </div>
                        {title.toLowerCase().includes('sharing') && (
                            <span className="room-badge room-badge--warning">🔥 FILLING FAST</span>
                        )}
                        <span className="room-badge room-badge--glass">📍 5 MINS TO UNIVEN</span>
                    </div>
                </div>

                <div className="room-content">
                    <h3 className="room-title">{title}</h3>
                    <p className="room-subtitle">{subtitle}</p>
                </div>
            </div>

            <button
                className="room-action-btn"
                aria-label={`Quick chat about ${title} on WhatsApp`}
                onClick={() => {
                    const msg = encodeURIComponent(`Hi, I'm interested in the ${title} at Five Eight 9 Student Lofts.`);
                    window.open(`https://wa.me/27155558900?text=${msg}`, '_blank', 'noopener,noreferrer');
                }}
            >
                QUICK CHAT 💬
            </button>
        </div>
    );
};

export default RoomCard;
