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
    {/* Cercle principal */}
    <div className={`absolute inset-0 ${color} rounded-full`}></div>
    
    {/* Anneau pixelisé extérieur */}
    <div className="absolute inset-[10%] flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full border-[3px] border-dashed border-white opacity-40 rounded-full"></div>
    </div>
    
    {/* Cercle blanc central */}
    <div className="absolute inset-[25%] bg-white rounded-full border border-black"></div>
    
    {/* Valeur du jeton */}
    <div className="absolute inset-0 flex items-center justify-center font-pixel text-poker-black font-bold">
      {value}
    </div>
  </div>
);

export default PixelChip; 