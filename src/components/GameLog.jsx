import React from 'react';
import PixelCard from './ui/card/PixelCard';

const formatMessage = (msg) => {
  // Supprime tout ce qui est entre parenthèses (y compris les parenthèses)
  return msg.replace(/\([^)]*\)/g, '').trim();
};

const renderCards = (data) => {
  if (!data) return null;
  // Priorité : flop, turnCard, riverCard (n'affiche que les nouvelles cartes)
  if (Array.isArray(data.flop) && data.flop.length > 0) {
    return (
      <span className="inline-flex gap-1 ml-2 align-middle">
        {data.flop.map((card, i) => (
          <PixelCard key={i} suit={card.suit} value={card.value} className="w-8 h-12 inline-block" />
        ))}
      </span>
    );
  }
  if (data.turnCard && typeof data.turnCard === 'object') {
    return (
      <span className="inline-flex gap-1 ml-2 align-middle">
        <PixelCard suit={data.turnCard.suit} value={data.turnCard.value} className="w-8 h-12 inline-block" />
      </span>
    );
  }
  if (data.riverCard && typeof data.riverCard === 'object') {
    return (
      <span className="inline-flex gap-1 ml-2 align-middle">
        <PixelCard suit={data.riverCard.suit} value={data.riverCard.value} className="w-8 h-12 inline-block" />
      </span>
    );
  }
  // Fallback : si jamais il y a un tableau cards (ex: main gagnante)
  if (Array.isArray(data.cards) && data.cards.length > 0) {
    return (
      <span className="inline-flex gap-1 ml-2 align-middle">
        {data.cards.map((card, i) => (
          <PixelCard key={i} suit={card.suit} value={card.value} className="w-8 h-12 inline-block" />
        ))}
      </span>
    );
  }
  return null;
};

const GameLog = ({ log }) => {
  if (!log || log.length === 0) return null;
  return (
    <div className="bg-black/90 text-white rounded p-4 mb-4 max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-2">Journal de la partie</h3>
      <ul className="text-sm space-y-1 max-h-96 overflow-y-auto pr-2">
        {[...log].reverse().map((entry, i) => (
          <li key={i} className="border-b border-gray-700 pb-1 mb-1 last:border-b-0 last:mb-0">
            <span className="text-poker-gold font-mono mr-2">
              {entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : ''}
            </span>
            <span className="font-semibold">{formatMessage(entry.message)}</span>
            {renderCards(entry.data)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameLog; 