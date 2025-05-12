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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              {/* Routes publiques */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Routes protégées */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />} />
                {/* Ajoutez d'autres routes protégées ici */}
              </Route>
              
              {/* Route d'accueil */}
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
