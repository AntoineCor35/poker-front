import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

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
    <div className="login-container">
      <div className="auth-form-container">
        <h2>Connexion</h2>
        
        {apiError && (
          <div className="error-message">
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
              <div className="form-group">
                <label htmlFor="pseudo">Pseudo</label>
                <Field
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  className={errors.pseudo && touched.pseudo ? 'input-error' : ''}
                />
                <ErrorMessage name="pseudo" component="div" className="error-text" />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={errors.password && touched.password ? 'input-error' : ''}
                />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="submit-button"
              >
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </Form>
          )}
        </Formik>
        
        <div className="auth-links">
          <p>
            Pas encore de compte? <Link to="/register">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 