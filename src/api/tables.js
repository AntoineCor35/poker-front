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

export const getTable = async (tableId) => {
  const response = await api.get(`/tables/${tableId}`);
  return response.data;
};

export const startGame = async (tableId) => {
  const response = await api.post(`/tables/${tableId}/start`);
  return response.data;
};

export const leaveTable = async (tableId) => {
  const response = await api.post(`/tables/${tableId}`, { action: 'leave' });
  return response.data;
};

export const getPossibleActions = async (tableId) => {
  const response = await api.get(`/tables/${tableId}/status`);
  return response.data;
}; 