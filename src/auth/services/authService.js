import api from '../../api/axiosConfig';
import { jwtDecode } from 'jwt-decode';

/**
 * Service d'authentification pour gérer les interactions avec l'API
 */
const authService = {
  /**
   * Authentifie un utilisateur avec ses identifiants
   * @param {string} pseudo - Le pseudo de l'utilisateur
   * @param {string} password - Le mot de passe de l'utilisateur
   * @returns {Promise<Object>} Les données utilisateur et le token
   */
  login: async (pseudo, password) => {
    try {
      const response = await api.post('/auth/login', { pseudo, password });
      const { access_token } = response.data;
      
      // Stocker le token dans le localStorage
      localStorage.setItem('token', access_token);
      
      // Décoder le token pour obtenir les informations utilisateur
      const decodedToken = jwtDecode(access_token);
      localStorage.setItem('user', JSON.stringify(decodedToken));
      
      return { token: access_token, user: decodedToken };
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },
  
  /**
   * Inscrit un nouvel utilisateur
   * @param {string} pseudo - Le pseudo de l'utilisateur
   * @param {string} email - L'email de l'utilisateur
   * @param {string} password - Le mot de passe de l'utilisateur
   * @returns {Promise<Object>} Les données du nouvel utilisateur
   */
  register: async (pseudo, email, password) => {
    try {
      const response = await api.post('/users', { pseudo, email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'inscription' };
    }
  },
  
  /**
   * Vérifie si le token stocké est valide
   * @returns {Promise<boolean>} true si le token est valide
   */
  verifyToken: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const response = await api.post('/auth/verify-token', { token });
      return response.data.valid;
    } catch (error) {
      // En cas d'erreur, effacer le token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  },
  
  /**
   * Récupère les informations du profil de l'utilisateur connecté
   * @returns {Promise<Object>} Les données du profil
   */
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du profil' };
    }
  },
  
  /**
   * Déconnecte l'utilisateur en supprimant le token
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns {boolean} true si l'utilisateur est authentifié
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Vérifier si le token est expiré
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  },
  
  /**
   * Récupère l'utilisateur courant depuis le localStorage
   * @returns {Object|null} L'utilisateur connecté ou null
   */
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  }
};

export default authService; 