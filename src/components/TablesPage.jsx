import React, { useEffect, useState } from 'react';
import { fetchTables, joinTable, getTable, startGame, leaveTable, getPossibleActions, playAction } from '../api/tables';
import { useAuth } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PixelCard from '../components/ui/card/PixelCard';
import PixelChip from '../components/ui/chip/PixelChip';
import PokerTableLayout from './PokerTableLayout';

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchTables()
      .then((data) => {
        setTables(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erreur lors du chargement des tables');
        setLoading(false);
      });
  }, []);

  const handleJoin = async (tableId) => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }
    try {
      const res = await joinTable(tableId);
      if (res.success) {
        navigate(`/tables/${tableId}`);
      } else if (res.error && res.error.includes('already joined')) {
        navigate(`/tables/${tableId}`);
      } else {
        setError(res.error || "Impossible de rejoindre la table.");
      }
    } catch (err) {
      setError(err.message || "Erreur lors de la tentative de rejoindre la table");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Tables disponibles</h1>
      <ul className="space-y-4">
        {tables.map((table) => (
          <li key={table.id} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-lg text-white">{table.name}</div>
              <div className="text-sm text-white">Joueurs : {table.players.length} / {table.maxPlayers}</div>
              <div className="text-sm text-white">Blindes : {table.smallBlind} / {table.bigBlind}</div>
              <div className="text-sm text-white">Statut : {table.status}</div>
            </div>
            <button
              className="mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleJoin(table.id)}
            >
              Rejoindre
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Composant d'affichage synthétique de l'état de la table
const TableStatus = ({ table, userId }) => {
  // Trouver le joueur courant
  const currentPlayer = table.players.find(p => p.isCurrentPlayer);
  // Trouver le joueur connecté (si userId fourni)
  const me = userId ? table.players.find(p => p.id === userId) : null;

  // Helper pour afficher la main
  const renderHand = (hand, show = true) => {
    if (!hand || hand.length === 0) return <span>—</span>;
    if (!show) {
      // Affiche un dos de carte pour chaque carte
      return (
        <span className="flex gap-1">{hand.map((_, i) => (
          <PixelCard key={i} suit="?" value="" className="bg-poker-blue/80" />
        ))}</span>
      );
    }
    return (
      <span className="flex gap-1">{hand.map((card, i) => (
        <PixelCard key={i} suit={suitToSymbol(card.suit)} value={card.value} />
      ))}</span>
    );
  };

  // Helper pour les rôles
  const getRoles = (p) => [
    p.isDealer && 'Dealer',
    p.isSmallBlind && 'Small Blind',
    p.isBigBlind && 'Big Blind',
    p.isCurrentPlayer && 'Current Player',
    p.isAI && 'AI',
    p.isHuman && 'Human',
  ].filter(Boolean).join(', ');

  function suitToSymbol(suit) {
    switch (suit) {
      case 'Heart': return '♥';
      case 'Spade': return '♠';
      case 'Diamond': return '♦';
      case 'Clover': return '♣';
      default: return suit;
    }
  }

  return (
    <div className="bg-poker-black/80 rounded p-4 mt-4 text-white">
      <div className="mb-2 font-bold text-lg">{table.name} <span className="text-xs">({table.status})</span></div>
      <div className="mb-2">Pot : <b>{table.pot}</b> | Blindes : {table.smallBlind} / {table.bigBlind} | Round : {table.round} | Turn : {table.turn}</div>
      <div className="mb-2">Mise à suivre : <b>{table.currentBet}</b></div>
      <div className="mb-2">Joueur courant : <b>{currentPlayer ? currentPlayer.name : '—'}</b></div>
      {currentPlayer && currentPlayer.hand && (
        <div className="mb-2">Main du joueur courant : <b>{renderHand(currentPlayer.hand)}</b></div>
      )}
      <div className="mb-2">Joueurs :</div>
      <ul className="mb-2 ml-4">
        {table.players.map((p) => {
          // On montre la main seulement si c'est le joueur connecté ou le joueur courant
          const showHand = (userId && p.id === userId) || p.isCurrentPlayer;
          return (
            <li key={p.id} className={p.isCurrentPlayer ? 'font-bold text-poker-gold flex items-center gap-2' : 'flex items-center gap-2'}>
              <span>{p.name}</span>
              <PixelChip value={p.chips} className="w-6 h-6" />
              {getRoles(p) && <span className="text-xs ml-2">[{getRoles(p)}]</span>}
              <span className="ml-2">Main :</span> {renderHand(p.hand, showHand)}
              <span className="ml-2">Bet: {p.currentBet}</span>
            </li>
          );
        })}
      </ul>
      {me && (
        <div className="mb-2">Votre main : <b>{renderHand(me.hand)}</b></div>
      )}
      <div className="mb-2">Historique :</div>
      <ul className="text-xs ml-4">
        {table.gameLog.slice(-5).map((log, i) => (
          <li key={i}>{log.message}{log.data ? ` (${JSON.stringify(log.data)})` : ''}</li>
        ))}
      </ul>
    </div>
  );
};

export const TableView = () => {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setLoading(true);
    getTable(id)
      .then(async (data) => {
        setTable(data);
        setLoading(false);
        // Si la partie est en cours, on tente de récupérer les actions possibles via la nouvelle route status
        if (data.status === 'Ongoing') {
          try {
            const res = await getPossibleActions(id);
            if (res.possibleActions) {
              setApiResponse(res);
            }
          } catch (e) { /* ignore */ }
        }
      })
      .catch((err) => {
        setError(err.message || 'Erreur lors du chargement de la table');
        setLoading(false);
      });
  }, [id]);

  const handlePlay = async () => {
    try {
      await startGame(id);
      // Toujours rafraîchir l'état via /tables/:id/status après Play
      const status = await getPossibleActions(id);
      setApiResponse(status);
    } catch (err) {
      setApiResponse(err.message || 'Erreur lors du lancement du jeu');
    }
  };

  const handleLeave = async () => {
    try {
      await leaveTable(id);
      navigate('/tables');
    } catch (err) {
      setError(err.message || 'Erreur lors de la sortie de la table');
    }
  };

  // Ajout du handler pour les actions du joueur
  const handlePlayerAction = async (action, amount = null) => {
    try {
      const res = await playAction(id, action, amount);
      setApiResponse(res); // Utilise directement la réponse de l'action
    } catch (err) {
      setApiResponse(err.message || 'Erreur lors de l\'action de jeu');
    }
  };

  if (loading) return <div>Chargement de la table...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!table) return <div>Table introuvable</div>;

  return (
    <div className="p-4 w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 text-white">Table : {table.name}</h1>
      <div className="text-white mb-2">ID : {table.id}</div>
      <div className="text-white mb-2">Statut : {table.status}</div>
      <div className="flex gap-4 mt-6 mb-6">
        {table.status !== 'Ongoing' && (
          <button onClick={handlePlay} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Play</button>
        )}
        <button onClick={handleLeave} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Leave Table</button>
      </div>
      {apiResponse && apiResponse.table && (
        <>
          {console.log('DEBUG', {
            players: apiResponse.table.players,
            myId: user?.id,
            actions: apiResponse.possibleActions,
            currentPlayer: apiResponse.table.players.find(p => p.isCurrentPlayer),
          })}
          <PokerTableLayout
            players={apiResponse.table.players}
            myId={user?.id}
            board={{
              flop: apiResponse.table.river?.slice(0, 3) || [],
              turn: apiResponse.table.river?.[3],
              river: apiResponse.table.river?.[4],
            }}
            round={apiResponse.table.round}
            pot={apiResponse.table.pot}
            actions={apiResponse.possibleActions || []}
            onAction={handlePlayerAction}
          />
          {/* Affichage textuel du gameLog */}
          <div className="mt-8 w-full max-w-2xl bg-black/80 rounded p-4 text-white">
            <h2 className="text-lg font-bold mb-2">Historique de la partie</h2>
            <ul className="text-xs space-y-1">
              {apiResponse.table.gameLog && apiResponse.table.gameLog.length > 0 ? (
                apiResponse.table.gameLog.map((log, i) => (
                  <li key={i} className="border-b border-gray-700 pb-1 mb-1">
                    <span className="text-poker-gold font-mono mr-2">{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() + ' ' : ''}</span>
                    <span className="font-semibold">{log.message}</span>
                    {log.data && (
                      <span className="ml-2 text-gray-300">{JSON.stringify(log.data)}</span>
                    )}
                  </li>
                ))
              ) : (
                <li>Aucun historique pour cette table.</li>
              )}
            </ul>
          </div>
        </>
      )}
      {apiResponse && !apiResponse.table && (
        <pre className="bg-black text-white mt-6 p-4 rounded overflow-x-auto text-xs">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TablesPage; 