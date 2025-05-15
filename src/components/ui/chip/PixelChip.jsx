import React from 'react';

/**
 * Poker chip SVG icon (outline, Tabler Icons)
 * @param {Object} props
 * @param {string|number} props.value - Chip value
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.size - Chip diameter in px (default: 48)
 * @param {string} props.colorClass - Tailwind text color class (default: text-poker-gold)
 */
const PokerChipIcon = ({ value, className = '', size = 48, colorClass = 'text-poker-gold' }) => (
  <div className={`flex items-center gap-2 ${className}`} style={{ minHeight: size }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={colorClass}
      style={{ display: 'block' }}
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <line x1="18.364" y1="5.636" x2="15.536" y2="8.464" />
      <line x1="8.464" y1="15.536" x2="5.636" y2="18.364" />
      <line x1="5.636" y1="5.636" x2="8.464" y2="8.464" />
      <line x1="15.536" y1="15.536" x2="18.364" y2="18.364" />
    </svg>
    <span
      className="font-pixel text-white drop-shadow-sm"
      style={{ fontSize: Math.round(size * 0.38), lineHeight: 1 }}
    >
      {value}
    </span>
  </div>
);

export default PokerChipIcon; 