import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PixelButton, PokerChipIcon } from '../../components/ui';

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
    <nav className="bg-poker-black border-b-4 border-poker-gold py-4 font-pixel">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="navbar-brand mb-4 sm:mb-0">
          <Link to="/" className="text-xl text-poker-gold uppercase">Poker App</Link>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
          <div className="navbar-start flex gap-4">
            <Link to="/" className="px-2 text-white hover:text-poker-gold">Accueil</Link>
            <Link to="/tables" className="px-2 text-white hover:text-poker-gold">Tables</Link>
            {isAuthenticated && (
              <Link to="/profile" className="px-2 text-white hover:text-poker-gold">Profil</Link>
            )}
          </div>
          
          <div className="navbar-end flex items-center gap-4 mt-4 sm:mt-0">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-white">{user?.pseudo}</span>
                  <PokerChipIcon value={user?.bank || 0} size={32} />
                </div>
                <PixelButton 
                  onClick={handleLogout} 
                  className="text-sm px-3 py-1"
                >
                  Logout
                </PixelButton>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">
                  <PixelButton className="text-sm px-3 py-1">Connexion</PixelButton>
                </Link>
                <Link to="/register">
                  <PixelButton className="text-sm px-3 py-1 bg-poker-green hover:bg-green-700">Inscription</PixelButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 