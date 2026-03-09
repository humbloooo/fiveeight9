import React from 'react';

const Navigation = () => {
    return (
        <nav className="nav-cluster">
            <div className="logo-placeholder" style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.2rem' }}>
                FIVE EIGHT 9
            </div>
            <div className="nav-links">
                <a href="/#home" className="nav-link">Home</a>
                <a href="/#rooms" className="nav-link">Rooms</a>
                <a href="/cafeteria" className="nav-link">Cafeteria</a>
                <a href="/safety" className="nav-link">Safety</a>
                <a href="/#contact" className="nav-link">Contact</a>
            </div>

            <button className="cta-button">
                BOOK A VIEWING
            </button>
        </nav>
    );
};

export default Navigation;
