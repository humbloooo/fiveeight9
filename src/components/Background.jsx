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
                    transition: background 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .celestial-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: block;
                    mix-blend-mode: screen;
                }

                /* Strictly follow system theme */
                @media (prefers-color-scheme: light) {
                    .celestial-bg {
                        display: none;
                    }
                    .background-wrapper {
                        background: radial-gradient(circle at top right, rgba(197, 160, 89, 0.08), transparent 40%),
                                    radial-gradient(circle at bottom left, rgba(197, 160, 89, 0.05), transparent 40%),
                                    #f8f9fa;
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
                    opacity: 0.5;
                }

                .twinkling {
                    background: transparent url(https://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
                    z-index: 1;
                    animation: move-twink-back 200s linear infinite;
                }

                .clouds {
                    background: transparent url(https://www.script-tutorials.com/demos/360/images/clouds3.png) repeat top center;
                    z-index: 2;
                    opacity: 0.15;
                    animation: move-clouds-back 300s linear infinite;
                }

                @keyframes move-twink-back {
                    from { background-position: 0 0; }
                    to { background-position: -10000px 5000px; }
                }

                @keyframes move-clouds-back {
                    from { background-position: 0 0; }
                    to { background-position: 10000px 0; }
                }
            `}</style>
        </div>
    );
};

export default Background;
