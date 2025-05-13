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
    <div className={`relative w-16 h-24 bg-gray-50 rounded ${className}`}>
      <div className="absolute inset-0 bg-gray-50 border border-black rounded"></div>
      <div className={`absolute inset-0 flex flex-col items-center justify-center font-pixel ${suitColor}`}>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-2xl mt-1">{suit}</div>
      </div>
      {/* Coins décoratifs */}
      <div className="absolute top-1 left-1 text-xs opacity-70">{suit}</div>
      <div className="absolute bottom-1 right-1 text-xs opacity-70 rotate-180">{suit}</div>
    </div>
  );
};

export default PixelCard; 