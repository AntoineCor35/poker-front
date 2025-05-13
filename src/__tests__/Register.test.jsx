import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../auth/components/Register';
import { BrowserRouter } from 'react-router-dom';

// Mock de l'hook useAuth et useNavigate
jest.mock('../auth/hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    register: jest.fn().mockResolvedValue({}),
    login: jest.fn().mockResolvedValue({})
  })
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Register Component', () => {
  test('renders email and password fields and submits the form correctly', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    // Vérifier que les champs sont présents
    const emailInput = screen.getByLabelText(/^email$/i);
    const passwordInput = screen.getByLabelText(/^mot de passe$/i);
    const pseudoInput = screen.getByLabelText(/^pseudo$/i);
    const confirmPasswordInput = screen.getByLabelText(/^confirmer le mot de passe$/i);
    const submitButton = screen.getByRole('button', { name: /s'inscrire/i });
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(pseudoInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    
    // Simuler la saisie utilisateur
    const testPseudo = 'testuser';
    const testEmail = 'test@example.com';
    const testPassword = 'Password123';
    
    fireEvent.change(pseudoInput, { target: { value: testPseudo } });
    fireEvent.change(emailInput, { target: { value: testEmail } });
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    fireEvent.change(confirmPasswordInput, { target: { value: testPassword } });
    
    // Vérifier que les valeurs ont été mises à jour
    expect(pseudoInput.value).toBe(testPseudo);
    expect(emailInput.value).toBe(testEmail);
    expect(passwordInput.value).toBe(testPassword);
    expect(confirmPasswordInput.value).toBe(testPassword);
    
    // Soumettre le formulaire
    fireEvent.click(submitButton);
    
    // Vérifier que le message de succès apparaît
    await waitFor(() => {
      expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument();
    });
  });
}); 