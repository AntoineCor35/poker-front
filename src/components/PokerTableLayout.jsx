import React, { useState } from 'react';
import PixelCard from './ui/card/PixelCard';
import PixelChip from './ui/chip/PixelChip';

// Affiche un badge rond avec le numéro du joueur
const PlayerBadge = ({ num }) => (
  <span className="inline-block w-6 h-6 rounded-full bg-poker-black text-poker-gold font-bold flex items-center justify-center border-2 border-poker-gold text-xs ml-2">●{num}</span>
);

// Affiche la main (cartes ou dos)
const renderHand = (hand, show = true, player = {}) => {
  if (!hand || hand.length === 0) return <span>—</span>;
  if (!show) {
    return (
      <span className="flex gap-1">{hand.map((_, i) => (
        <PixelCard key={i} isBack suit="?" value="" className="bg-poker-blue/80" />
      ))}</span>
    );
  }
  return (
    <span className="flex gap-1">{hand.map((card, i) => (
      <PixelCard
        key={i}
        suit={suitToSymbol(card.suit)}
        value={card.value}
        isDealer={i === 0 && player.isDealer}
        isSmallBlind={i === 0 && player.isSmallBlind}
        isBigBlind={i === 0 && player.isBigBlind}
      />
    ))}</span>
  );
};

function suitToSymbol(suit) {
  switch (suit) {
    case 'Heart': return '♥';
    case 'Spade': return '♠';
    case 'Diamond': return '♦';
    case 'Clover': return '♣';
    default: return suit;
  }
}

// Cadre joueur
const PlayerBox = ({ player, num, isMe, isCurrent, actions, onAction }) => {
  const [raiseAmount, setRaiseAmount] = useState('');
  const [error, setError] = useState('');
  const canRaise = actions && actions.includes('raise');
  const maxChips = player.chips;
  const isRaiseValid = () => {
    const amount = Number(raiseAmount);
    return canRaise && amount > 0 && amount <= maxChips && Number.isInteger(amount);
  };
  const handleRaise = () => {
    if (!isRaiseValid()) {
      setError('Montant invalide');
      return;
    }
    setError('');
    onAction('raise', Number(raiseAmount));
    setRaiseAmount('');
  };
  return (
    <div className={`bg-poker-black/80 border-2 border-poker-gold rounded p-4 min-w-[180px] min-h-[150px] flex flex-col items-center mb-2 ${isCurrent ? 'shadow-lg shadow-poker-gold' : ''}`}
      style={{ minHeight: 180 }}>
      <div className="font-bold text-white text-center mb-1">{player.name}</div>
      <div className="flex items-center gap-2 mb-1">
        <PixelChip value={player.chips} className="w-6 h-6" />
        <span className="text-xs text-gray-300">Chips</span>
      </div>
      <div className="text-xs text-gray-300 mb-1">Last: {player.lastAction || '—'}</div>
      <div className="text-xs text-gray-300 mb-1">Status: {player.hasFolded ? 'FOLDED' : 'PLAYING'}</div>
      <PlayerBadge num={num} />
      <div className="mt-2">{renderHand(player.hand, isMe || isCurrent, player)}</div>
      {/* Actions pour le joueur réel et si c'est à lui de jouer */}
      {isMe && isCurrent && actions && actions.length > 0 && (
        <div className="flex flex-col gap-2 mt-3 w-full items-center">
          {canRaise && (
            <div className="flex flex-col items-center w-full mb-2">
              <input
                type="number"
                min="1"
                max={maxChips}
                step="1"
                value={raiseAmount}
                onChange={e => setRaiseAmount(e.target.value)}
                placeholder={`Montant (max ${maxChips})`}
                className="px-2 py-1 rounded border border-gray-400 text-black text-xs w-28 mb-1"
              />
              {error && <span className="text-red-500 text-xs">{error}</span>}
            </div>
          )}
          <div className="flex gap-2 w-full justify-center">
            {actions.map((a) => (
              a.toLowerCase() === 'raise' ? (
                <button
                  key={a}
                  onClick={handleRaise}
                  disabled={!isRaiseValid()}
                  className={`bg-poker-gold text-black font-bold px-2 py-1 rounded border border-black text-xs hover:bg-yellow-400 transition ${!isRaiseValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {a.toUpperCase()}
                </button>
              ) : (
                <button
                  key={a}
                  onClick={() => onAction(a)}
                  className={
                    a.toLowerCase() === 'fold'
                      ? 'bg-red-600 text-white font-bold px-2 py-1 rounded border border-black text-xs hover:bg-red-800 transition'
                      : 'bg-poker-gold text-black font-bold px-2 py-1 rounded border border-black text-xs hover:bg-yellow-400 transition'
                  }
                >
                  {a.toUpperCase()}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Zone centrale : board, round, pot
const BoardBox = ({ board, round, pot }) => (
  <div className="bg-poker-black/90 border-2 border-poker-gold rounded p-4 min-w-[320px] flex flex-col items-center">
    <div className="mb-2 text-white text-sm">FLOP: {board.flop && board.flop.length > 0 ? board.flop.map((c, i) => <PixelCard key={i} suit={suitToSymbol(c.suit)} value={c.value} className="inline-block mx-1" />) : '—'}</div>
    <div className="mb-2 text-white text-sm">TURN: {board.turn ? <PixelCard suit={suitToSymbol(board.turn.suit)} value={board.turn.value} className="inline-block mx-1" /> : '—'}</div>
    <div className="mb-2 text-white text-sm">RIVER: {board.river ? <PixelCard suit={suitToSymbol(board.river.suit)} value={board.river.value} className="inline-block mx-1" /> : '—'}</div>
    <div className="mt-2 text-white text-sm">ROUND {round} – POT: <PixelChip value={pot} className="w-8 h-8 inline-block align-middle" /></div>
  </div>
);

/**
 * PokerTableLayout
 * @param {Object} props
 * @param {Array} props.players - Liste des joueurs (dans l'ordre de la table)
 * @param {number} props.myId - id du joueur réel
 * @param {Object} props.board - { flop: [], turn: {}, river: {} }
 * @param {number} props.round - numéro du round
 * @param {number} props.pot - montant du pot
 * @param {Array} props.actions - actions possibles pour le joueur réel
 * @param {Function} props.onAction - callback(action)
 */
const PokerTableLayout = ({ players, myId, board, round, pot, actions, onAction }) => {
  // On suppose 4 joueurs max, on place le joueur réel en haut à droite (2), puis sens horaire
  const ordered = [players[0], players[1], players[2], players[3]];
  const meIdx = players.findIndex(p => p.id === myId);
  // Décale le tableau pour que le joueur réel soit toujours en position 2
  if (meIdx > 0) {
    for (let i = 0; i < meIdx; i++) {
      ordered.push(ordered.shift());
    }
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center" style={{ minHeight: 600 }}>
      <div className="flex w-full justify-between mb-8">
        <PlayerBox player={ordered[0]} num={1} isMe={ordered[0].id === myId} isCurrent={ordered[0].isCurrentPlayer} 
          actions={ordered[0].id === myId ? actions : undefined} 
          onAction={ordered[0].id === myId ? onAction : undefined} />
        <PlayerBox player={ordered[1]} num={2} isMe={ordered[1].id === myId} isCurrent={ordered[1].isCurrentPlayer} 
          actions={ordered[1].id === myId ? actions : undefined} 
          onAction={ordered[1].id === myId ? onAction : undefined} />
      </div>
      <BoardBox board={board} round={round} pot={pot} />
      <div className="flex w-full justify-between mt-8">
        <PlayerBox player={ordered[3]} num={4} isMe={ordered[3].id === myId} isCurrent={ordered[3].isCurrentPlayer} 
          actions={ordered[3].id === myId ? actions : undefined} 
          onAction={ordered[3].id === myId ? onAction : undefined} />
        <PlayerBox player={ordered[2]} num={3} isMe={ordered[2].id === myId} isCurrent={ordered[2].isCurrentPlayer} 
          actions={ordered[2].id === myId ? actions : undefined} 
          onAction={ordered[2].id === myId ? onAction : undefined} />
      </div>
    </div>
  );
};

export default PokerTableLayout; 