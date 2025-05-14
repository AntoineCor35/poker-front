import React, { useEffect, useState } from 'react';
import { fetchTables, joinTable } from '../api/tables';
import { useAuth } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getTable } from '../api/tables';

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

export const TableView = () => {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTable(id)
      .then((data) => {
        setTable(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erreur lors du chargement de la table');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Chargement de la table...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!table) return <div>Table introuvable</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Table : {table.name}</h1>
      <div className="text-white mb-2">ID : {table.id}</div>
      <div className="text-white mb-2">Statut : {table.status}</div>
      <div className="text-white mb-2">Joueurs ({table.players.length} / {table.maxPlayers}) :</div>
      <ul className="text-white mb-4">
        {table.players.map((player) => (
          <li key={player.id}>{player.name} (Chips : {player.chips})</li>
        ))}
      </ul>
      <div className="text-white mb-2">Blindes : {table.smallBlind} / {table.bigBlind}</div>
      <div className="text-white mb-2">Pot : {table.pot}</div>
      {/* Ajoute d'autres infos si besoin */}
    </div>
  );
};

export default TablesPage; 