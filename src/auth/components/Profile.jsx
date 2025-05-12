import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';

/**
 * Composant qui affiche le profil de l'utilisateur connecté
 */
const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    // Éviter de refaire un appel si le profil a déjà été chargé
    if (user && !profileLoaded && !loading) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const data = await authService.getProfile();
          setProfileData(data);
          setProfileLoaded(true);
          
          // Mettre à jour les données utilisateur dans le contexte global
          // sans déclencher une nouvelle exécution de l'effet
          setUser(prevUser => ({ ...prevUser, ...data }));
        } catch (err) {
          console.error('Erreur lors de la récupération du profil:', err);
          setError('Impossible de charger les données du profil.');
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user, profileLoaded, loading, setUser]); // Ajouter profileLoaded comme dépendance

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Erreur</h3>
        <p>{error}</p>
        <button onClick={() => {
          setProfileLoaded(false); // Réinitialiser pour permettre un nouvel essai
          window.location.reload();
        }}>Réessayer</button>
      </div>
    );
  }

  if (!user || !profileData) {
    return (
      <div className="error-container">
        <h3>Non connecté</h3>
        <p>Veuillez vous connecter pour accéder à votre profil.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Profil Utilisateur</h2>
      
      <div className="profile-card">
        <div className="profile-header">
          <h3>{profileData.pseudo}</h3>
          <span className="profile-email">{profileData.email}</span>
        </div>
        
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-label">ID:</span>
            <span className="stat-value">{profileData.id}</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Solde:</span>
            <span className="stat-value">{profileData.bank || 0} jetons</span>
          </div>
          
          {profileData.victoryStats !== undefined && (
            <div className="stat-item">
              <span className="stat-label">Victoires:</span>
              <span className="stat-value">{profileData.victoryStats}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 