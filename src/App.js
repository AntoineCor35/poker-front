import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './auth/styles/auth.css';

// Fournisseur de contexte d'authentification
import { AuthProvider } from './auth/context/AuthContext';

// Composants
import Login from './auth/components/Login';
import Register from './auth/components/Register';
import Profile from './auth/components/Profile';
import PrivateRoute from './auth/components/PrivateRoute';
import Navbar from './auth/components/Navbar';
import Home from './Home'; // Créer ce composant plus tard
import LandingPage from './components/LandingPage';
import TablesPage from './components/TablesPage';

// Import pixel art components
import { PixelContainer } from './components/ui';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App font-pixel bg-poker-green-dark min-h-screen">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Routes avec Navbar et Container */}
            <Route path="/app" element={
              <>
                <Navbar />
                <PixelContainer className="content max-w-5xl mx-auto mt-8">
                  <Home />
                </PixelContainer>
              </>
            } />
            
            {/* Routes publiques */}
            <Route path="/login" element={
              <>
                {console.log('Rendering Login route')}
                <Navbar />
                <PixelContainer className="content max-w-5xl mx-auto mt-8">
                  <Login />
                </PixelContainer>
              </>
            } />
            <Route path="/register" element={
              <>
                <Navbar />
                <PixelContainer className="content max-w-5xl mx-auto mt-8">
                  <Register />
                </PixelContainer>
              </>
            } />
            <Route path="/tables" element={
              <>
                <Navbar />
                <PixelContainer className="content max-w-5xl mx-auto mt-8">
                  <TablesPage />
                </PixelContainer>
              </>
            } />
            
            {/* Routes protégées */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={
                <>
                  <Navbar />
                  <PixelContainer className="content max-w-5xl mx-auto mt-8">
                    <Profile />
                  </PixelContainer>
                </>
              } />
              {/* Ajoutez d'autres routes protégées ici */}
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
