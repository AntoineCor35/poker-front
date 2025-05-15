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

  const PixelArt = ({ className, children, style }) => (
    <div className={`pixel-art ${className}`} style={style}>
      {children}
    </div>
  );

  return (
    <nav className="bg-poker-black border-b-4 border-poker-gold font-pixel sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo + Texte */}
        <Link to="/" className="flex items-center space-x-2">
              <PixelArt className="w-10 h-10 bg-poker-red border-2 border-black pixel-borders flex items-center justify-center">
                <span className="text-xl font-bold text-white">P</span>
              </PixelArt>
              <span className="font-bold text-xl tracking-wider text-white">
                PIXEL<span className="text-poker-red">POKER</span>
              </span>
            </Link>
        {/* Liens de navigation */}
        <div className="flex items-center space-x-8 uppercase">
          <Link to="/" className="px-2 text-white hover:text-poker-gold">ACCUEIL</Link>
          <Link to="/tables" className="px-2 text-white hover:text-poker-gold">TABLES</Link>
          {isAuthenticated && (
            <Link to="/profile" className="px-2 text-white hover:text-poker-gold">PROFIL</Link>
          )}
        </div>
        {/* Actions utilisateur */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-2 text-poker-gold">
                {user?.pseudo} <PokerChipIcon value={user?.bank || 0} size={32} />
              </span>
              <PixelButton size="sm" onClick={handleLogout}>Logout</PixelButton>
            </>
          ) : (
            <>
              <Link to="/login">
                <PixelButton variant="outline" size="sm">Connexion</PixelButton>
              </Link>
              <Link to="/register">
                <PixelButton size="sm">Inscription</PixelButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 