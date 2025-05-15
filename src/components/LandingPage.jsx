import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PixelButton, PixelCard, PokerChipIcon, PixelContainer, PixelAnimation } from './ui';
import useAuth from '../auth/hooks/useAuth';

// Composant pour les icônes chevron
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Composant pour le menu hamburger
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

// Composant pour l'icône de fermeture
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

// Composant pour les éléments en pixel art
const PixelArt = ({ className, children, style }) => (
  
  <div className={`pixel-art ${className}`} style={style}>
    {children}
  </div>
);

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationFrame, setAnimationFrame] = useState(0);
  const { isAuthenticated, user, logout } = useAuth();

  // Animation simple pour les éléments pixel art
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-poker-green-dark text-white font-pixel">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-poker-black border-b-4 border-poker-gold pixel-borders">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <PixelArt className="w-10 h-10 bg-poker-red border-2 border-black pixel-borders flex items-center justify-center">
                <span className="text-xl font-bold">P</span>
              </PixelArt>
              <span className="font-bold text-xl tracking-wider">
                PIXEL<span className="text-poker-red">POKER</span>
              </span>
            </Link>

            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-poker-gold transition-colors">
                FONCTIONNALITÉS
              </a>
              <a href="#gameplay" className="hover:text-poker-gold transition-colors">
                JEU
              </a>
              <a href="#join" className="hover:text-poker-gold transition-colors">
                REJOINDRE
              </a>
              <Link to="/tables" className="hover:text-poker-gold transition-colors">
                TABLES
              </Link>
            </div>

            <div className="hidden md:flex space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="flex items-center gap-2 text-poker-gold">
                    {user?.pseudo} <PokerChipIcon value={user?.bank || 0} size={32} />
                  </span>
                  <Link to="/profile">
                    <PixelButton size="sm">Profil</PixelButton>
                  </Link>
                  <PixelButton size="sm" variant="outline" onClick={logout}>Déconnexion</PixelButton>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <PixelButton variant="outline" size="sm">
                      CONNEXION
                    </PixelButton>
                  </Link>
                  <Link to="/register">
                    <PixelButton size="sm">INSCRIPTION</PixelButton>
                  </Link>
                </>
              )}
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-poker-black border-t-4 border-black pixel-borders">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#features" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                FONCTIONNALITÉS
              </a>
              <a href="#gameplay" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                JEU
              </a>
              <a href="#join" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                REJOINDRE
              </a>
              <Link to="/tables" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                TABLES
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t-4 border-black pixel-borders">
                {isAuthenticated ? (
                  <>
                    <span className="flex items-center gap-2 text-poker-gold">
                      {user?.pseudo} <PokerChipIcon value={user?.bank || 0} size={32} />
                    </span>
                    <Link to="/profile">
                      <PixelButton className="w-full">Profil</PixelButton>
                    </Link>
                    <PixelButton className="w-full" variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>Déconnexion</PixelButton>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <PixelButton variant="outline" className="w-full">
                        CONNEXION
                      </PixelButton>
                    </Link>
                    <Link to="/register">
                      <PixelButton className="w-full">
                        INSCRIPTION
                      </PixelButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-poker-green-dark">
          {/* Pixel art background pattern */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  fontSize: '24px',
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              >
                {['♠', '♥', '♦', '♣'][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-poker-gold text-poker-black border-2 border-black pixel-borders">
                EXPÉRIENCE POKER 8-BIT
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                JOUE AU POKER
                <br />
                <span className="text-poker-red">STYLE PIXEL</span>
              </h1>
              <p className="text-xl">
                Découvre le poker comme jamais auparavant avec notre jeu de poker en pixel art rétro. Stratégie, fun et nostalgie à chaque main.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <PixelButton
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    COMMENCER À JOUER
                    <ChevronRight />
                  </PixelButton>
                </Link>
                <a href="#features">
                  <PixelButton
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    DÉCOUVRIR LES FONCTIONNALITÉS
                  </PixelButton>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Pixel art poker table - SANS TOP BORDER */}
                <div className="absolute inset-0 bg-poker-green border-l-8 border-r-8 border-b-8 border-yellow-800 pixel-borders rounded-full"></div>

                {/* Cards avec animation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex justify-center items-center gap-3 w-full">
                    <PixelAnimation>
                      <PixelCard suit="♥" value="A" className="w-16 h-24 transform rotate-[-5deg] drop-shadow-lg" />
                    </PixelAnimation>
                    <PixelAnimation interval={600}>
                      <PixelCard suit="♦" value="K" className="w-16 h-24 transform rotate-[5deg] drop-shadow-lg" />
                    </PixelAnimation>
                    <PixelAnimation interval={700}>
                      <PixelCard suit="♠" value="Q" className="w-16 h-24 transform rotate-[-5deg] drop-shadow-lg" />
                    </PixelAnimation>
                    <PixelAnimation interval={800}>
                      <PixelCard suit="♣" value="J" className="w-16 h-24 transform rotate-[5deg] drop-shadow-lg" />
                    </PixelAnimation>
                  </div>
                </div>

                {/* Chips améliorés et plus visibles */}
                <div className="absolute" style={{ left: '25%', top: '60%' }}>
                  <PokerChipIcon value="25" size={56} className="drop-shadow-xl text-xl" colorClass="text-red-600" />
                </div>
                <div className="absolute" style={{ left: '45%', top: '65%' }}>
                  <PokerChipIcon value="50" size={56} className="drop-shadow-xl text-xl" colorClass="text-blue-600" />
                </div>
                <div className="absolute" style={{ left: '65%', top: '62%' }}>
                  <PokerChipIcon value="100" size={56} className="drop-shadow-xl text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-poker-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 inline-block border-b-4 border-poker-red pb-2 pixel-borders text-white">
              FONCTIONNALITÉS DU JEU
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-white">
              Notre jeu de poker pixel regorge de fonctionnalités rétro pour une expérience authentique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '👤',
                title: 'CUSTOM PROFILE',
                description: 'Crée ton avatar pixel et personnalise ton identité de joueur - WILL BE AVAILABLE SOON',
                borderColor: 'border-poker-red',
              },
              {
                icon: '💰',
                title: 'CHIP MANAGEMENT',
                description: 'Suis ton solde en temps réel avec notre système de jetons pixel - WILL BE AVAILABLE SOON',
                borderColor: 'border-black',
              },
              {
                icon: '🎮',
                title: 'MULTIPLE TABLES',
                description: 'Rejoins différentes tables selon ton niveau et ta bankroll - WILL BE AVAILABLE SOON',
                borderColor: 'border-poker-gold',
              },
              {
                icon: '🎲',
                title: 'LIVE GAMES',
                description: "Ressens l'adrénaline du poker en temps réel avec des joueurs du monde entier - WILL BE AVAILABLE SOON",
                borderColor: 'border-poker-red',
              },
              {
                icon: '🏆',
                title: 'TOURNAMENTS',
                description: 'Participe à des tournois réguliers et gagne des trophées pixel exclusifs - WILL BE AVAILABLE SOON',
                borderColor: 'border-black',
              },
              {
                icon: '📊',
                title: 'LEADERBOARDS',
                description: 'Grimpe dans le classement et deviens le champion pixel poker - WILL BE AVAILABLE SOON',
                borderColor: 'border-poker-gold',
              },
            ].map((feature, i) => (
              <PixelContainer
                key={i}
                className={`p-6 border-4 ${feature.borderColor} hover:translate-y-[-4px] transition-transform`}
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </PixelContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative border-8 border-black pixel-borders bg-poker-green p-4">
                <div className="border-4 border-yellow-800 pixel-borders p-4 bg-poker-green-dark">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-poker-red border-2 border-black pixel-borders flex items-center justify-center font-bold">
                          P
                        </div>
                        <div>
                          <p className="font-bold">PIXEL TABLE</p>
                          <p className="text-xs">8 PLAYERS • MIN BET: 100</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-poker-red border-2 border-black pixel-borders text-xs font-medium">
                        LIVE
                      </div>
                    </div>

                    <div className="relative h-40 bg-poker-green border-4 border-yellow-800 pixel-borders flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PokerChipIcon value="1250" size={80} />
                      </div>

                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        <PixelCard suit="♥" value="9" className="w-12 h-16" />
                        <PixelCard suit="♠" value="9" className="w-12 h-16" />
                      </div>

                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-poker-gold border-2 border-black pixel-borders text-xs font-medium text-black">
                          YOUR TURN
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <PixelButton 
                        variant="outline" 
                        size="sm" 
                        className="border-poker-red text-poker-red hover:bg-red-900/20"
                      >
                        FOLD
                      </PixelButton>
                      <PixelButton 
                        variant="outline" 
                        size="sm"
                      >
                        CHECK
                      </PixelButton>
                      <PixelButton 
                        size="sm" 
                        className="bg-poker-gold hover:bg-yellow-600 text-black border-black"
                      >
                        RAISE
                      </PixelButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-4xl font-bold text-white">
                UNE EXPÉRIENCE POKER <span className="text-poker-red">8-BIT</span> AUTHENTIQUE
              </h2>
              <p className="text-xl">
                Notre interface pixel intuitive te ramène à l'âge d'or du jeu vidéo tout en offrant une expérience poker moderne  - WORK IN PROGRESS.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'PIXEL-PERFECT INTERFACE',
                    description: 'Navigue dans notre interface rétro pensée pour un max de nostalgie - WORK IN PROGRESS.',
                  },
                  {
                    title: 'CHIP ANIMATIONS',
                    description: 'Regarde tes jetons s\'animer et s\'empiler avec de vraies animations pixel - WORK IN PROGRESS.',
                  },
                  {
                    title: 'RETRO SOUND EFFECTS',
                    description: 'Savoure les sons 8-bit des cartes qui battent et des jetons qui s\'entrechoquent - WORK IN PROGRESS.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-6 h-6 bg-poker-red border-2 border-black pixel-borders flex-shrink-0 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/register">
                <PixelButton size="lg">
                  ESSAYER MAINTENANT
                  <ChevronRight />
                </PixelButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-24 relative bg-poker-black">
        <div className="container mx-auto px-4">
          <PixelContainer className="max-w-4xl mx-auto border-8 border-black p-12">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-poker-red border-4 border-black pixel-borders mb-6">
                <div className="text-4xl">🃏</div>
              </div>

              <h2 className="text-4xl font-bold">
                PRÊT À JOUER VOTRE <span className="text-poker-red">MEILLEURE MAIN</span> ?
              </h2>

              <p className="text-xl max-w-2xl mx-auto">
                Rejoins PIXELPOKER maintenant et reçois un bonus de bienvenue de 1000 jetons pour commencer ton aventure poker.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <PixelButton size="lg" className="w-full sm:w-auto">
                        Voir mon profil
                      </PixelButton>
                    </Link>
                    <PixelButton size="lg" variant="outline" className="w-full sm:w-auto" onClick={logout}>
                      Déconnexion
                    </PixelButton>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <PixelButton
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        CRÉER UN COMPTE
                      </PixelButton>
                    </Link>
                    <Link to="/login">
                      <PixelButton
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        CONNEXION
                      </PixelButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </PixelContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t-4 border-black pixel-borders bg-poker-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-poker-red border-2 border-black pixel-borders flex items-center justify-center font-bold">
                  P
                </div>
                <span className="font-bold text-xl">
                  PIXEL<span className="text-poker-red">POKER</span>
                </span>
              </Link>
              <p className="text-gray-300 text-sm">
                La nouvelle génération du poker rétro. Stratégie, fun et nostalgie à chaque main - WORK IN PROGRESS.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 border-b-2 border-poker-red pb-1 inline-block">LIENS RAPIDES</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#features" className="hover:text-poker-gold transition-colors">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#gameplay" className="hover:text-poker-gold transition-colors">
                    Jeu
                  </a>
                </li>
                <li>
                  <a href="#join" className="hover:text-poker-gold transition-colors">
                    Rejoindre
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 border-b-2 border-poker-red pb-1 inline-block">LÉGAL</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Mentions légales
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 border-b-2 border-poker-red pb-1 inline-block">CONTACT</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Partenariats
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Carrières
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-4 border-black pixel-borders mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 PIXELPOKER. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-poker-gold transition-colors">
                <div className="w-8 h-8 bg-poker-green-dark border-2 border-gray-400 pixel-borders flex items-center justify-center">
                  F
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-poker-gold transition-colors">
                <div className="w-8 h-8 bg-poker-green-dark border-2 border-gray-400 pixel-borders flex items-center justify-center">
                  T
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-poker-gold transition-colors">
                <div className="w-8 h-8 bg-poker-green-dark border-2 border-gray-400 pixel-borders flex items-center justify-center">
                  I
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 