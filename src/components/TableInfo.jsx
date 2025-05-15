import React from 'react';
import PixelCard from './ui/card/PixelCard';

const TableInfo = ({ pot, river }) => (
  <div className="bg-black text-white rounded shadow p-4 flex flex-col items-center my-4">
    <div className="mb-2 font-bold text-lg">Pot : <span className="font-mono">{pot}</span></div>
    <div className="flex gap-2">
      {river && river.length > 0 ? (
        river.map((card, i) => (
          <PixelCard key={i} suit={card.suit} value={card.value} className="w-12 h-16" />
        ))
      ) : (
        <span className="text-gray-400 text-sm">Aucune carte sur la table</span>
      )}
    </div>
  </div>
);

export default TableInfo; 