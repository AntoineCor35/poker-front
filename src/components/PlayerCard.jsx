import React from 'react';
import { PixelCard, PokerChipIcon } from './ui';

const getRoles = (player) => {
  const roles = [];
  if (player.isDealer) roles.push('Dealer');
  if (player.isSmallBlind) roles.push('Small Blind');
  if (player.isBigBlind) roles.push('Big Blind');
  if (player.isCurrentPlayer) roles.push('Current');
  if (player.isAI) roles.push('IA');
  if (player.isHuman) roles.push('Humain');
  return roles.join(', ');
};

const PlayerCard = ({ player }) => {
  return (
    <div className="bg-black text-white rounded p-4 flex flex-col items-center shadow-md border border-gray-700">
      <div className="font-bold text-lg mb-1">{player.name}</div>
      <PokerChipIcon value={player.chips} size={40} className="mb-1" />
      <div className="text-xs mb-1">Rôles : <span className="font-semibold">{getRoles(player)}</span></div>
      <div className="text-sm mb-1">Mise actuelle : <span className="font-bold">{player.currentBet}</span></div>
      <div className="flex gap-1 mb-1">
        {player.hand && player.hand.length > 0
          ? player.hand.map((card, i) =>
              <PixelCard key={i} suit={card.suit} value={card.value} isBack={!player.isCurrentPlayer} className="w-8 h-12" />
            )
          : <span className="text-gray-400 text-xs">—</span>
        }
      </div>
      {player.hasFolded && <div className="text-red-400 text-xs font-bold">A FOLD</div>}
      {player.isCurrentPlayer && <div className="text-green-400 text-xs font-bold">À toi de jouer !</div>}
    </div>
  );
};

export default PlayerCard; 