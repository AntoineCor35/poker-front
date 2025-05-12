import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';
import { PixelButton, PixelContainer } from '../../components/ui';

// Schéma de validation du formulaire
const loginSchema = Yup.object().shape({
  pseudo: Yup.string()
    .required('Le pseudo est requis'),
  password: Yup.string()
    .required('Le mot de passe est requis')
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setApiError('');
      await login(values.pseudo, values.password);
      navigate('/'); // Redirection vers la page d'accueil après connexion
    } catch (error) {
      setApiError(error.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
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
        
        <Formik
          initialValues={{ pseudo: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="pseudo" className="block mb-2 uppercase font-pixel">Pseudo</label>
                <Field
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  className={`w-full p-2 bg-poker-black border-2 font-pixel ${
                    errors.pseudo && touched.pseudo 
                      ? 'border-poker-red' 
                      : 'border-black'
                  }`}
                />
                <ErrorMessage 
                  name="pseudo" 
                  component="div" 
                  className="text-poker-red mt-1 text-sm" 
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 uppercase font-pixel">Mot de passe</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={`w-full p-2 bg-poker-black border-2 font-pixel ${
                    errors.password && touched.password 
                      ? 'border-poker-red' 
                      : 'border-black'
                  }`}
                />
                <ErrorMessage 
                  name="password" 
                  component="div" 
                  className="text-poker-red mt-1 text-sm" 
                />
              </div>
              
              <PixelButton 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-3"
              >
                {isSubmitting ? 'CONNEXION...' : 'SE CONNECTER'}
              </PixelButton>
            </Form>
          )}
        </Formik>
        
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