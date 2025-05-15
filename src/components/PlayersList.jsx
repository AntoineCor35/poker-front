import React from 'react';
import PlayerCard from './PlayerCard';

const PlayersList = ({ players }) => {
  if (!players || players.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
};

export default PlayersList; 