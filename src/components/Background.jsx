import React from 'react';

const Background = () => {
    return (
        <div className="background-wrapper">
            <div className="celestial-bg">
                <div className="stars-container">
                    <div className="stars-layer s1"></div>
                    <div className="stars-layer s2"></div>
                    <div className="stars-layer s3"></div>
                </div>
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
                    opacity: 0.8;
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

                .stars-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: transparent;
                }

                .stars-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                /* CSS ONLY STARS - NO IMAGES */
                .stars-layer.s1 {
                    background-image: 
                        radial-gradient(1px 1px at 10% 20%, #fff, transparent),
                        radial-gradient(1px 1px at 20% 50%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 30% 80%, #fff, transparent),
                        radial-gradient(1px 1px at 40% 10%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 50% 60%, #fff, transparent),
                        radial-gradient(1px 1px at 60% 30%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 70% 90%, #fff, transparent),
                        radial-gradient(1px 1px at 80% 40%, #fff, transparent),
                        radial-gradient(1.5px 1.5px at 90% 70%, #fff, transparent);
                    background-size: 50% 50%;
                    animation: twinkle 4s ease-in-out infinite alternate;
                }

                .stars-layer.s2 {
                    background-image: 
                        radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.8), transparent),
                        radial-gradient(1px 1px at 35% 45%, rgba(197, 160, 89, 0.5), transparent),
                        radial-gradient(1.5px 1.5px at 55% 65%, rgba(255,255,255,0.8), transparent),
                        radial-gradient(1px 1px at 75% 85%, rgba(197, 160, 89, 0.5), transparent),
                        radial-gradient(1px 1px at 95% 15%, rgba(255,255,255,0.8), transparent);
                    background-size: 40% 40%;
                    animation: twinkle 6s ease-in-out infinite alternate-reverse;
                }

                .stars-layer.s3 {
                    background-image: 
                        radial-gradient(2px 2px at 5% 95%, #fff, transparent),
                        radial-gradient(2px 2px at 45% 5%, #fff, transparent),
                        radial-gradient(2px 2px at 85% 55%, #fff, transparent);
                    background-size: 70% 70%;
                    animation: twinkle 8s ease-in-out infinite alternate;
                    opacity: 0.3;
                }

                @keyframes twinkle {
                    0% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 0.4; transform: scale(1); }
                }

                @keyframes drift {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50px); }
                }
            `}</style>
        </div>
    );
};

export default Background;
