import React from 'react';

/**
 * Pixel art style playing card component
 * @param {Object} props - Component props
 * @param {string} props.suit - Card suit symbol (♥, ♦, ♣, ♠) ou nom anglais (Spade, Heart, ...)
 * @param {string} props.value - Card value (A, 2, 3, ..., J, Q, K)
 * @param {boolean} props.isBack - Affiche le dos de la carte si true
 * @param {boolean} props.isDealer - Badge Dealer
 * @param {boolean} props.isSmallBlind - Badge Small Blind
 * @param {boolean} props.isBigBlind - Badge Big Blind
 * @param {string} props.className - Additional CSS classes
 */
const suitToSymbol = (suit) => {
  switch (suit) {
    case 'Heart': return '♥';
    case 'Spade': return '♠';
    case 'Diamond': return '♦';
    case 'Clover': return '♣';
    default: return suit;
  }
};

const PixelCard = ({ suit, value, isBack = false, isDealer = false, isSmallBlind = false, isBigBlind = false, className = '' }) => {
  const suitColor = suitToSymbol(suit) === "♥" || suitToSymbol(suit) === "♦" ? "text-poker-red" : "text-poker-black";
  
  return (
    <div className={`relative w-20 h-28 rounded overflow-hidden ${className}`} style={{ minWidth: 60, minHeight: 64 }}>
      {!isBack && <div className="absolute inset-0 bg-gray-50 border border-black rounded"></div>}
      {isBack ? (
        <div className="absolute inset-0 flex items-center justify-center rounded overflow-hidden">
          <img
            src="/img/badfoxlab-badfoxlab-cover-3-sq.gif"
            alt="Dos de carte"
            style={{ width: '100%', height: '100%', objectFit: 'cover', imageRendering: 'pixelated' }}
            draggable={false}
          />
        </div>
      ) : (
        <div className={`absolute inset-0 flex flex-col items-center justify-center font-pixel ${suitColor} px-1 py-1`}>
          <div className="text-lg font-bold leading-none">{value}</div>
          <div className="text-lg mt-1 leading-none">{suitToSymbol(suit)}</div>
        </div>
      )}
      {/* Badges rôles */}
      {isDealer && <span className="absolute top-1 left-1 bg-yellow-400 text-black text-xs px-1 rounded">D</span>}
      {isSmallBlind && <span className="absolute top-1 right-1 bg-blue-400 text-white text-xs px-1 rounded">SB</span>}
      {isBigBlind && <span className="absolute bottom-1 right-1 bg-red-500 text-white text-xs px-1 rounded">BB</span>}
      {/* Coins décoratifs */}
      <div className="absolute top-1 left-1 text-xs opacity-70">{!isBack && suitToSymbol(suit)}</div>
      <div className="absolute bottom-1 right-1 text-xs opacity-70 rotate-180">{!isBack && suitToSymbol(suit)}</div>
    </div>
  );
};

export default PixelCard; 