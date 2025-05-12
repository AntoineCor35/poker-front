import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Créer une instance d'axios avec une configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes - ajoute le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les réponses - gère les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si le statut est 401 (non authentifié)
    if (error.response && error.response.status === 401) {
      // Supprimer le token et rediriger vers la page de connexion
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 