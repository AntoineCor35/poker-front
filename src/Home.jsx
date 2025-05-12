import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './auth/hooks/useAuth';

// Import pixel art components
import { PixelButton, PixelContainer, PixelCard, PixelChip, PixelAnimation } from './components/ui';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  // Sample cards to display
  const demoCards = [
    { suit: '♥', value: 'A' },
    { suit: '♠', value: 'K' },
    { suit: '♦', value: 'Q' },
  ];

  return (
    <div className="home-container">
      <div className="hero-section text-center mb-12">
        <h1 className="text-3xl uppercase mb-4">Poker Game</h1>
        <p className="mb-8">Jouez au poker en ligne avec des amis ou d'autres joueurs</p>
        
        {/* Sample card display */}
        <div className="flex justify-center gap-4 my-8">
          {demoCards.map((card, index) => (
            <PixelAnimation key={index} interval={600 + (index * 200)}>
              <PixelCard suit={card.suit} value={card.value} />
            </PixelAnimation>
          ))}
        </div>
        
        {isAuthenticated ? (
          <div className="authenticated-section">
            <h2 className="text-xl mb-4">Bonjour, {user?.pseudo}!</h2>
            <div className="flex justify-center items-center gap-2 mb-6">
              <span>Votre solde:</span>
              <PixelChip value={user?.bank || 0} />
            </div>
            <div className="action-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tables">
                <PixelButton>Rejoindre une table</PixelButton>
              </Link>
              <Link to="/profile">
                <PixelButton className="bg-poker-green hover:bg-green-700">
                  Voir mon profil
                </PixelButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="unauthenticated-section">
            <p className="mb-6">Connectez-vous ou inscrivez-vous pour commencer à jouer</p>
            <div className="action-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <PixelButton>Se connecter</PixelButton>
              </Link>
              <Link to="/register">
                <PixelButton className="bg-poker-green hover:bg-green-700">
                  S'inscrire
                </PixelButton>
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <div className="features-section mt-16">
        <h2 className="text-2xl text-center uppercase mb-8">Fonctionnalités</h2>
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          <PixelContainer className="p-4">
            <h3 className="text-xl mb-2 text-poker-gold">Tables en temps réel</h3>
            <p>Rejoignez des tables de poker en temps réel avec d'autres joueurs</p>
          </PixelContainer>
          
          <PixelContainer className="p-4">
            <h3 className="text-xl mb-2 text-poker-gold">Tournois</h3>
            <p>Participez à des tournois réguliers et gagnez des prix</p>
          </PixelContainer>
          
          <PixelContainer className="p-4">
            <h3 className="text-xl mb-2 text-poker-gold">Statistiques</h3>
            <p>Suivez vos performances et améliorez votre jeu</p>
          </PixelContainer>
        </div>
      </div>
    </div>
  );
};

export default Home; 