import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

// Schéma de validation du formulaire d'inscription
const registerSchema = Yup.object().shape({
  pseudo: Yup.string()
    .min(3, 'Le pseudo doit contenir au moins 3 caractères')
    .max(20, 'Le pseudo ne doit pas dépasser 20 caractères')
    .required('Le pseudo est requis'),
  email: Yup.string()
    .email('Format d\'email invalide')
    .required('L\'email est requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
    )
    .required('Le mot de passe est requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('La confirmation du mot de passe est requise')
});

const Register = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setApiError('');
      
      // Inscription de l'utilisateur
      await register(values.pseudo, values.email, values.password);
      
      setSuccess(true);
      resetForm();
      
      // Connexion automatique après inscription réussie
      setTimeout(async () => {
        try {
          await login(values.pseudo, values.password);
          navigate('/'); // Redirection vers la page d'accueil
        } catch (loginError) {
          console.error('Erreur lors de la connexion après inscription:', loginError);
          navigate('/login'); // Redirection vers la page de connexion en cas d'erreur
        }
      }, 1500);
      
    } catch (error) {
      setApiError(error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="auth-form-container">
        <h2>Inscription</h2>
        
        {apiError && (
          <div className="error-message">
            {apiError}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            Inscription réussie! Redirection en cours...
          </div>
        )}
        
        <Formik
          initialValues={{ 
            pseudo: '', 
            email: '', 
            password: '', 
            confirmPassword: '' 
          }}
          validationSchema={registerSchema}
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
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={errors.email && touched.email ? 'input-error' : ''}
                />
                <ErrorMessage name="email" component="div" className="error-text" />
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
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-text" />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting || success} 
                className="submit-button"
              >
                {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </Form>
          )}
        </Formik>
        
        <div className="auth-links">
          <p>
            Déjà un compte? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 