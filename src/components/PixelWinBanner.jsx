import React from 'react';

const getAvatarFromMessage = (message) => {
  // Essaie d'extraire le nom du gagnant du message
  const match = message && message.match(/Victoire de ([\w\d]+)/i);
  if (match) {
    // Hash simple du nom pour choisir l'avatar
    const name = match[1];
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    const idx = (sum % 4) + 1;
    return `/img/pokerplayer${idx}.png`;
  }
  return '/img/pokerplayer1.png';
};

const PixelWinBanner = ({ message }) => (
  <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 bg-poker-gold text-black border-4 border-black pixel-borders px-8 py-6 text-3xl font-pixel animate-pulse shadow-xl rounded flex items-center gap-6">
    <img src={getAvatarFromMessage(message)} alt="avatar" style={{ maxWidth: 120, maxHeight: 120, objectFit: 'contain' }} className="rounded pixel-borders border-2 border-black" />
    <span>{message}</span>
  </div>
);

export default PixelWinBanner; 