import React from 'react';

/**
 * Pixel art style container component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Container content
 * @param {string} props.className - Additional CSS classes
 */
const PixelContainer = ({ children, className = '' }) => (
  <div className={`pixel-container ${className}`}>
    {children}
  </div>
);

export default PixelContainer; 