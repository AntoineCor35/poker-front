import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { joinTable, getPossibleActions } from '../api/tables';
import TableHeader from './TableHeader';

const JoinedTable = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [actions, setActions] = useState(null);

  useEffect(() => {
    const fetchTable = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await joinTable(id);
        if (res.success) {
          setTableData(res.table);
        } else if (res.error && res.error.includes('already')) {
          // Si déjà rejoint, on récupère les actions possibles
          const actionsRes = await getPossibleActions(id);
          setTableData(actionsRes.table);
          setActions(actionsRes.possibleActions);
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
      />
      {tableData.status === 'Waiting' && (
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
          Commencer la partie
        </button>
      )}
    </div>
  );
};

export default JoinedTable; 