import React from 'react';

/**
 * Pixel art style poker chip component
 * @param {Object} props - Component props
 * @param {string|number} props.value - Chip value
 * @param {string} props.color - Background color class for the chip
 * @param {string} props.className - Additional CSS classes
 */
const PixelChip = ({ value, color = "bg-poker-gold", className = '' }) => (
  <div className={`relative w-12 h-12 ${className}`}>
    <div className={`absolute inset-0 ${color} border-2 border-black rounded-full pixel-borders`}></div>
    <div className="absolute inset-0 flex items-center justify-center font-pixel text-poker-black">{value}</div>
  </div>
);

export default PixelChip; 