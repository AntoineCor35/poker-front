import React, { createContext, useState, useEffect, useMemo } from 'react';
import authService from '../services/authService';

// Création du contexte d'authentification
export const AuthContext = createContext();

/**
 * Fournisseur du contexte d'authentification
 * Gère l'état d'authentification et expose les méthodes d'authentification
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // Vérifier si un token est stocké et s'il est valide
        if (authService.isAuthenticated()) {
          const isValid = await authService.verifyToken();
          
          if (isValid) {
            // Si valide, définir l'utilisateur et son état d'authentification
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            setIsAuthenticated(true);
            
            // Récupérer les données à jour du profil
            try {
              const profileData = await authService.getProfile();
              setUser(prev => ({ ...prev, ...profileData }));
            } catch (profileError) {
              console.error('Erreur lors de la récupération du profil:', profileError);
            }
          } else {
            // Si le token n'est pas valide, réinitialiser l'état
            resetAuthState();
          }
        } else {
          resetAuthState();
        }
      } catch (err) {
        console.error('Erreur d\'initialisation de l\'authentification:', err);
        resetAuthState();
        setError(err.message || 'Erreur d\'authentification');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Réinitialise l'état d'authentification
  const resetAuthState = () => {
    setUser(null);
    setIsAuthenticated(false);
    authService.logout();
  };

  // Fonction de connexion
  const login = async (pseudo, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const authData = await authService.login(pseudo, password);
      setUser(authData.user);
      setIsAuthenticated(true);
      
      return authData;
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (pseudo, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const userData = await authService.register(pseudo, email, password);
      return userData;
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    resetAuthState();
  };

  // Valeur du contexte exposée aux composants enfants
  const contextValue = useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    setUser,
  }), [user, loading, error, isAuthenticated, login, register, logout, setUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 