import React from 'react';

const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px', className = '' }) => {
    return (
        <div 
            className={`skeleton-loader ${className}`}
            style={{
                width,
                height,
                borderRadius,
                background: 'var(--glass-thick)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'pulse 1.5s ease-in-out infinite'
            }}
        >
            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
                .skeleton-loader::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.05) 20%,
                        rgba(255, 255, 255, 0.1) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .light-mode .skeleton-loader {
                    background: rgba(0,0,0,0.06) !important;
                }
                .light-mode .skeleton-loader::after {
                    background-image: linear-gradient(
                        90deg,
                        rgba(0, 0, 0, 0) 0,
                        rgba(0, 0, 0, 0.02) 20%,
                        rgba(0, 0, 0, 0.05) 60%,
                        rgba(0, 0, 0, 0)
                    ) !important;
                }
                `}
            </style>
        </div>
    );
};

export default SkeletonLoader;
