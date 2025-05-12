import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './auth/hooks/useAuth';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Bienvenue sur l'application Poker</h1>
        <p>Jouez au poker en ligne avec des amis ou d'autres joueurs</p>
        
        {isAuthenticated ? (
          <div className="authenticated-section">
            <h2>Bonjour, {user?.pseudo}!</h2>
            <p>Votre solde: {user?.bank || 0} jetons</p>
            <div className="action-buttons">
              <Link to="/tables" className="primary-button">
                Rejoindre une table
              </Link>
              <Link to="/profile" className="secondary-button">
                Voir mon profil
              </Link>
            </div>
          </div>
        ) : (
          <div className="unauthenticated-section">
            <p>Connectez-vous ou inscrivez-vous pour commencer à jouer</p>
            <div className="action-buttons">
              <Link to="/login" className="primary-button">
                Se connecter
              </Link>
              <Link to="/register" className="secondary-button">
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="features-section">
        <h2>Fonctionnalités</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Tables en temps réel</h3>
            <p>Rejoignez des tables de poker en temps réel avec d'autres joueurs</p>
          </div>
          <div className="feature-card">
            <h3>Tournois</h3>
            <p>Participez à des tournois réguliers et gagnez des prix</p>
          </div>
          <div className="feature-card">
            <h3>Statistiques</h3>
            <p>Suivez vos performances et améliorez votre jeu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 