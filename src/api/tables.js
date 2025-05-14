import api from './axiosConfig';

// Fonctions factices pour être mockées dans les tests
export const fetchTables = async () => {
  const response = await api.get('/tables');
  return response.data;
};

export const joinTable = async (tableId) => {
  const response = await api.post(`/tables/${tableId}`, { action: 'join' });
  return response.data;
}; 