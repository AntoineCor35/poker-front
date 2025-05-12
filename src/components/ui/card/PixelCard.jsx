import React from 'react';

/**
 * Pixel art style playing card component
 * @param {Object} props - Component props
 * @param {string} props.suit - Card suit symbol (♥, ♦, ♣, ♠)
 * @param {string} props.value - Card value (A, 2, 3, ..., J, Q, K)
 * @param {string} props.className - Additional CSS classes
 */
const PixelCard = ({ suit, value, className = '' }) => {
  const suitColor = suit === "♥" || suit === "♦" ? "text-poker-red" : "text-poker-black";
  
  return (
    <div className={`relative w-16 h-24 ${className}`}>
      <div className="absolute inset-0 bg-white border-2 border-black pixel-borders"></div>
      <div className={`absolute inset-0 flex flex-col items-center justify-center font-pixel ${suitColor}`}>
        <div className="text-lg">{value}</div>
        <div className="text-xl">{suit}</div>
      </div>
    </div>
  );
};

export default PixelCard; 