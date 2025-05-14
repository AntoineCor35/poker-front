import React from 'react';

/**
 * Pixel art style playing card component
 * @param {Object} props - Component props
 * @param {string} props.suit - Card suit symbol (♥, ♦, ♣, ♠)
 * @param {string} props.value - Card value (A, 2, 3, ..., J, Q, K)
 * @param {boolean} props.isBack - Affiche le dos de la carte si true
 * @param {boolean} props.isDealer - Badge Dealer
 * @param {boolean} props.isSmallBlind - Badge Small Blind
 * @param {boolean} props.isBigBlind - Badge Big Blind
 * @param {string} props.className - Additional CSS classes
 */
const PixelCard = ({ suit, value, isBack = false, isDealer = false, isSmallBlind = false, isBigBlind = false, className = '' }) => {
  const suitColor = suit === "♥" || suit === "♦" ? "text-poker-red" : "text-poker-black";
  
  return (
    <div className={`relative w-16 h-24 bg-gray-50 rounded ${className}`}>
      <div className="absolute inset-0 bg-gray-50 border border-black rounded"></div>
      {isBack ? (
        <div className="absolute inset-0 flex items-center justify-center text-3xl text-poker-blue">🂠</div>
      ) : (
        <div className={`absolute inset-0 flex flex-col items-center justify-center font-pixel ${suitColor}`}>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-2xl mt-1">{suit}</div>
        </div>
      )}
      {/* Badges rôles */}
      {isDealer && <span className="absolute top-1 left-1 bg-yellow-400 text-black text-xs px-1 rounded">D</span>}
      {isSmallBlind && <span className="absolute top-1 right-1 bg-blue-400 text-white text-xs px-1 rounded">SB</span>}
      {isBigBlind && <span className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 rounded">BB</span>}
      {/* Coins décoratifs */}
      <div className="absolute top-1 left-1 text-xs opacity-70">{!isBack && suit}</div>
      <div className="absolute bottom-1 right-1 text-xs opacity-70 rotate-180">{!isBack && suit}</div>
    </div>
  );
};

export default PixelCard; 