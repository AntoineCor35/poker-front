import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Barre de navigation qui affiche différents liens selon l'état d'authentification
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Poker App</Link>
      </div>
      
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Accueil</Link>
          {isAuthenticated && (
            <>
              <Link to="/tables" className="navbar-item">Tables</Link>
              <Link to="/profile" className="navbar-item">Profil</Link>
            </>
          )}
        </div>
        
        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="navbar-auth">
              <span className="navbar-username">
                {user?.pseudo}
              </span>
              <button onClick={handleLogout} className="logout-button">
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-item">Connexion</Link>
              <Link to="/register" className="navbar-item">Inscription</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 