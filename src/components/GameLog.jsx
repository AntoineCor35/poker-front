import React from 'react';

const GameLog = ({ log }) => {
  if (!log || log.length === 0) return null;
  // On affiche les 10 dernières actions (ou moins)
  const lastLogs = log.slice(-10);
  return (
    <div className="bg-black/90 text-white rounded p-4 mb-4 max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-2">Journal de la partie</h3>
      <ul className="text-sm space-y-1">
        {lastLogs.map((entry, i) => (
          <li key={i} className="border-b border-gray-700 pb-1 mb-1 last:border-b-0 last:mb-0">
            <span className="text-poker-gold font-mono mr-2">
              {entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : ''}
            </span>
            <span className="font-semibold">{entry.message}</span>
            {entry.data && (
              <span className="ml-2 text-gray-300">{JSON.stringify(entry.data)}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameLog; 