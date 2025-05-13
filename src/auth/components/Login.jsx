import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { PixelButton, PixelContainer } from '../../components/ui';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!pseudo) newErrors.pseudo = 'Le pseudo est requis';
    if (!password) newErrors.password = 'Le mot de passe est requis';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true);
    try {
      await login(pseudo, password);
      navigate('/');
    } catch (error) {
      setApiError(error.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <PixelContainer className="p-6">
        <h2 className="text-2xl uppercase mb-6 text-center text-poker-gold font-pixel">Connexion</h2>
        {apiError && (
          <div className="bg-poker-red border border-black p-3 mb-4 text-white">
            {apiError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="pseudo" className="block mb-2 uppercase font-pixel">Pseudo</label>
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              className={`w-full p-2 bg-poker-black border-2 font-pixel text-white ${
                errors.pseudo ? 'border-poker-red' : 'border-black'
              }`}
            />
            {errors.pseudo && (
              <div className="text-poker-red mt-1 text-sm">{errors.pseudo}</div>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 uppercase font-pixel">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full p-2 bg-poker-black border-2 font-pixel text-white ${
                errors.password ? 'border-poker-red' : 'border-black'
              }`}
            />
            {errors.password && (
              <div className="text-poker-red mt-1 text-sm">{errors.password}</div>
            )}
          </div>
          <PixelButton
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3"
          >
            {isSubmitting ? 'CONNEXION...' : 'SE CONNECTER'}
          </PixelButton>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white">
            Pas encore de compte? <Link to="/register" className="text-poker-gold hover:underline">S'inscrire</Link>
          </p>
        </div>
      </PixelContainer>
    </div>
  );
};

export default Login; 