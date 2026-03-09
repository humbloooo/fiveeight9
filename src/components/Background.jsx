import React from 'react';

const Background = () => {
    return (
        <div className="background-wrapper">
            <div className="celestial-bg">
                <div className="stars"></div>
                <div className="twinkling"></div>
                <div className="clouds"></div>
            </div>

            <style>{`
                .background-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--navy);
                    z-index: -2;
                    overflow: hidden;
                    transition: background 0.5s ease;
                }

                .celestial-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                @media (prefers-color-scheme: light) {
                    .celestial-bg {
                        display: none;
                    }
                }

                .stars, .twinkling, .clouds {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                .stars {
                    background: #000 url(https://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
                    z-index: 0;
                }

                .twinkling {
                    background: transparent url(https://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
                    z-index: 1;
                    animation: move-twink-back 200s linear infinite;
                }

                .clouds {
                    background: transparent url(https://www.script-tutorials.com/demos/360/images/clouds3.png) repeat top center;
                    z-index: 2;
                    opacity: 0.2;
                    animation: move-clouds-back 200s linear infinite;
                }

                @keyframes move-twink-back {
                    from { background-position: 0 0; }
                    to { background-position: -10000px 5000px; }
                }

                @keyframes move-clouds-back {
                    from { background-position: 0 0; }
                    to { background-position: 10000px 0; }
                }

                /* Light Mode Overlay */
                @media (prefers-color-scheme: light) {
                    .background-wrapper {
                        background: radial-gradient(circle at top right, rgba(197, 160, 89, 0.05), transparent),
                                    radial-gradient(circle at bottom left, rgba(197, 160, 89, 0.05), transparent),
                                    var(--navy);
                    }
                }
            `}</style>
        </div>
    );
};

export default Background;
