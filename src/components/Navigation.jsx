import React from 'react';

const Navigation = () => {
    const navItems = ['Home', 'Rooms', 'Amenities', 'Contact'];

    return (
        <nav className="nav-cluster">
            <div className="logo-placeholder" style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>
                FIVE EIGHT 9
            </div>
            <div className="nav-links">
                {navItems.map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="nav-item"
                    >
                        {item}
                    </a>
                ))}
            </div>

            <button className="cta-button">
                BOOK A VIEWING
            </button>
        </nav>
    );
};

export default Navigation;
