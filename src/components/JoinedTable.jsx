import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { joinTable, getPossibleActions, startGame, playAction } from '../api/tables';
import TableHeader from './TableHeader';
import GameLog from './GameLog';
import PlayersList from './PlayersList';
import TableInfo from './TableInfo';
import PlayerAction from './PlayerAction';
import PixelCard from './ui/card/PixelCard';

const JoinedTable = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(null); // tout sauf gameLog
  const [gameLog, setGameLog] = useState([]); // juste l'historique
  const [actions, setActions] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [startLoading, setStartLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Helper pour séparer gameLog du reste
  const extractTableState = (table) => {
    if (!table) return { tableWithoutLog: null, gameLog: [] };
    const { gameLog, ...tableWithoutLog } = table;
    return { tableWithoutLog, gameLog: gameLog || [] };
  };

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await joinTable(id);
        if (res.success && res.table) {
          const { tableWithoutLog, gameLog } = extractTableState(res.table);
          setTableData(tableWithoutLog);
          setGameLog(gameLog);
          setActions(res.possibleActions || null);
          setCurrentPlayer(res.currentPlayer || null);
        } else if (res.error && (res.error.includes('already') || res.error.includes('progress'))) {
          // Si déjà rejoint ou partie en cours, on récupère les actions possibles
          const actionsRes = await getPossibleActions(id);
          if (actionsRes.table) {
            const { tableWithoutLog, gameLog } = extractTableState(actionsRes.table);
            setTableData(tableWithoutLog);
            setGameLog(gameLog);
            setActions(actionsRes.possibleActions || null);
            setCurrentPlayer(actionsRes.currentPlayer || null);
          }
        } else {
          setError(res.error || 'Erreur inconnue');
        }
      } catch (err) {
        setError(err.message || 'Erreur lors de la tentative de rejoindre la table');
      } finally {
        setLoading(false);
      }
    };
    fetchTable();
  }, [id]);

  // Handler pour démarrer la partie
  const handleStartGame = async () => {
    setStartLoading(true);
    setError(null);
    try {
      const res = await startGame(id);
      if (res.success && res.table) {
        const { tableWithoutLog, gameLog } = extractTableState(res.table);
        console.log("tableWithoutLog", tableWithoutLog);
        setTableData(tableWithoutLog);
        setGameLog(gameLog);
        setActions(res.possibleActions || null);
        setCurrentPlayer(res.currentPlayer || null);
      } else if (res.error && res.error.includes('progress')) {
        // Partie déjà en cours, on récupère l'état
        const actionsRes = await getPossibleActions(id);
        if (actionsRes.table) {
          const { tableWithoutLog, gameLog } = extractTableState(actionsRes.table);
          setTableData(tableWithoutLog);
          setGameLog(gameLog);
          setActions(actionsRes.possibleActions || null);
          setCurrentPlayer(actionsRes.currentPlayer || null);
        }
      } else {
        setError(res.error || 'Erreur lors du démarrage de la partie');
      }
    } catch (err) {
      setError(err.message || 'Erreur lors du démarrage de la partie');
    } finally {
      setStartLoading(false);
    }
  };

  // Handler pour une action joueur
  const handlePlayerAction = async (action, amount) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await playAction(id, action, amount);
      if (res.success && res.table) {
        const { tableWithoutLog, gameLog } = extractTableState(res.table);
        setTableData(tableWithoutLog);
        setGameLog(gameLog);
        setActions(res.possibleActions || null);
        setCurrentPlayer(res.currentPlayer || null);
      } else {
        setError(res.error || 'Erreur lors de l\'action');
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'action');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Chargement de la table...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!tableData) return null;

  return (
    <div>
      <TableHeader 
        name={tableData.name}
        status={tableData.status}
        round={tableData.round}
        turn={tableData.turn}
        smallBlind={tableData.smallBlind}
        bigBlind={tableData.bigBlind}
      />
      <PlayersList players={tableData.players} />
      <TableInfo pot={tableData.pot} river={tableData.river} />
      <PlayerAction actions={actions} onAction={handlePlayerAction} loading={actionLoading} />
      <GameLog log={gameLog} />
      {tableData.status === 'Waiting' && (
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleStartGame}
          disabled={startLoading}
        >
          {startLoading ? 'Démarrage...' : 'Commencer la partie'}
        </button>
      )}
    </div>
  );
};

export default JoinedTable; 