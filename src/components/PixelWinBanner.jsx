import React from 'react';

const PixelWinBanner = ({ message }) => (
  <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 bg-poker-gold text-black border-4 border-black pixel-borders px-8 py-6 text-3xl font-pixel animate-pulse shadow-xl rounded">
    {message}
  </div>
);

export default PixelWinBanner; 