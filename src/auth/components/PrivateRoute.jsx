import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Composant de route privée qui vérifie l'authentification de l'utilisateur
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
 */
const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 