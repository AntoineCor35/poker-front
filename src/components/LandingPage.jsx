import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PixelButton, PixelCard, PixelChip, PixelContainer, PixelAnimation } from './ui';

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
                FEATURES
              </a>
              <a href="#gameplay" className="hover:text-poker-gold transition-colors">
                GAMEPLAY
              </a>
              <a href="#join" className="hover:text-poker-gold transition-colors">
                JOIN
              </a>
            </div>

            <div className="hidden md:flex space-x-4">
              <Link to="/login">
                <PixelButton variant="outline" size="sm">
                  LOGIN
                </PixelButton>
              </Link>
              <Link to="/register">
                <PixelButton size="sm">SIGN UP</PixelButton>
              </Link>
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
                FEATURES
              </a>
              <a href="#gameplay" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                GAMEPLAY
              </a>
              <a href="#join" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                JOIN
              </a>
              <div className="flex flex-col space-y-2 pt-2 border-t-4 border-black pixel-borders">
                <Link to="/login">
                  <PixelButton variant="outline" className="w-full">
                    LOGIN
                  </PixelButton>
                </Link>
                <Link to="/register">
                  <PixelButton className="w-full">
                    SIGN UP
                  </PixelButton>
                </Link>
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
                8-BIT POKER EXPERIENCE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                PLAY POKER
                <br />
                <span className="text-poker-red">PIXEL STYLE</span>
              </h1>
              <p className="text-xl">
                Experience poker like never before with our retro-inspired pixel art poker game. Strategy, fun, and
                nostalgia in every hand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <PixelButton
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    START PLAYING
                    <ChevronRight />
                  </PixelButton>
                </Link>
                <a href="#features">
                  <PixelButton
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    EXPLORE FEATURES
                  </PixelButton>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Pixel art poker table */}
                <div className="absolute inset-0 bg-poker-green border-8 border-yellow-800 pixel-borders rounded-full"></div>

                {/* Cards */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-64 h-64">
                    <PixelAnimation className="absolute" style={{ left: '20%', top: '30%', transform: 'rotate(-15deg)' }}>
                      <PixelCard suit="♥" value="A" className="w-16 h-24" />
                    </PixelAnimation>
                    <PixelAnimation className="absolute" interval={700} style={{ left: '40%', top: '35%', transform: 'rotate(10deg)' }}>
                      <PixelCard suit="♠" value="K" className="w-16 h-24" />
                    </PixelAnimation>
                  </div>
                </div>

                {/* Chips */}
                <div className="absolute" style={{ left: '30%', top: '60%' }}>
                  <PixelChip value="25" color="bg-red-500" className="w-12 h-12" />
                </div>
                <div className="absolute" style={{ left: '45%', top: '65%' }}>
                  <PixelChip value="50" color="bg-blue-500" className="w-12 h-12" />
                </div>
                <div className="absolute" style={{ left: '60%', top: '62%' }}>
                  <PixelChip value="100" className="w-12 h-12" />
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
            <h2 className="text-4xl font-bold mb-6 inline-block border-b-4 border-poker-red pb-2 pixel-borders">
              GAME FEATURES
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Our pixel poker game comes packed with retro-inspired features for an authentic gaming experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '👤',
                title: 'CUSTOM PROFILE',
                description: 'Create your pixel avatar and customize your poker identity',
                borderColor: 'border-poker-red',
              },
              {
                icon: '💰',
                title: 'CHIP MANAGEMENT',
                description: 'Track your balance in real-time with our pixel-perfect chip system',
                borderColor: 'border-black',
              },
              {
                icon: '🎮',
                title: 'MULTIPLE TABLES',
                description: 'Join different tables based on your skill level and chip stack',
                borderColor: 'border-poker-gold',
              },
              {
                icon: '🎲',
                title: 'LIVE GAMES',
                description: 'Experience the thrill of real-time poker with players worldwide',
                borderColor: 'border-poker-red',
              },
              {
                icon: '🏆',
                title: 'TOURNAMENTS',
                description: 'Compete in regular tournaments and win exclusive pixel trophies',
                borderColor: 'border-black',
              },
              {
                icon: '📊',
                title: 'LEADERBOARDS',
                description: 'Climb the ranks and become the pixel poker champion',
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
                        <PixelChip value="1250" className="w-20 h-20" />
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
              <h2 className="text-4xl font-bold">
                AUTHENTIC <span className="text-poker-red">8-BIT</span> POKER EXPERIENCE
              </h2>
              <p className="text-xl">
                Our intuitive pixel interface brings you back to the golden age of gaming while delivering a modern
                poker experience.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: 'PIXEL-PERFECT INTERFACE',
                    description: 'Navigate through our retro-inspired UI designed for maximum nostalgia.',
                  },
                  {
                    title: 'CHIP ANIMATIONS',
                    description: 'Watch your chips stack and move with authentic pixel animations.',
                  },
                  {
                    title: 'RETRO SOUND EFFECTS',
                    description: 'Experience the satisfying 8-bit sounds of cards shuffling and chips clinking.',
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
                  TRY NOW
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
                READY TO PLAY YOUR <span className="text-poker-red">BEST HAND</span>?
              </h2>

              <p className="text-xl max-w-2xl mx-auto">
                Join PIXELPOKER now and receive a welcome bonus of 500 chips to start your poker adventure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/register">
                  <PixelButton
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    CREATE ACCOUNT
                  </PixelButton>
                </Link>
                <Link to="/login">
                  <PixelButton
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    LOGIN
                  </PixelButton>
                </Link>
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
                The next generation of retro poker gaming. Strategy, fun, and nostalgia in every hand.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 border-b-2 border-poker-red pb-1 inline-block">QUICK LINKS</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#features" className="hover:text-poker-gold transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#gameplay" className="hover:text-poker-gold transition-colors">
                    Gameplay
                  </a>
                </li>
                <li>
                  <a href="#join" className="hover:text-poker-gold transition-colors">
                    Join
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 border-b-2 border-poker-red pb-1 inline-block">LEGAL</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Legal Notice
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
                    Partnerships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-poker-gold transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t-4 border-black pixel-borders mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 PIXELPOKER. ALL RIGHTS RESERVED.</p>
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