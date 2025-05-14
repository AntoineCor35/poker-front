import React, { useEffect, useState } from 'react';
import { fetchTables, joinTable } from '../api/tables';
import { useAuth } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      navigate('/signup');
      return;
    }
    try {
      await joinTable(tableId);
      // Redirection ou feedback à ajouter ici si besoin
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

export default TablesPage; 