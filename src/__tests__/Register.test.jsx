import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../auth/components/Register';
import { BrowserRouter } from 'react-router-dom';

// On déclare les mocks à l'extérieur
const mockRegister = jest.fn();
jest.mock('../auth/hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    register: mockRegister,
    login: jest.fn()
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

  const setup = () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    return {
      pseudoInput: screen.getByLabelText(/^pseudo$/i),
      emailInput: screen.getByLabelText(/^email$/i),
      passwordInput: screen.getByLabelText(/^mot de passe$/i),
      confirmPasswordInput: screen.getByLabelText(/^confirmer le mot de passe$/i),
      submitButton: screen.getByRole('button', { name: /s'inscrire/i })
    };
  };

  test('affiche une erreur si le mot de passe est trop court', async () => {
    const { pseudoInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(pseudoInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Abc123' } }); // 6 caractères
    fireEvent.change(confirmPasswordInput, { target: { value: 'Abc123' } });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/au moins 8 caractères/i)).toBeInTheDocument();
  });

  test('affiche une erreur si le mot de passe ne contient pas de majuscule', async () => {
    const { pseudoInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(pseudoInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } }); // pas de majuscule
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/au moins une lettre majuscule/i)).toBeInTheDocument();
  });

  test('affiche une erreur si le mot de passe ne contient pas de minuscule', async () => {
    const { pseudoInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(pseudoInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'PASSWORD123' } }); // pas de minuscule
    fireEvent.change(confirmPasswordInput, { target: { value: 'PASSWORD123' } });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/au moins une lettre majuscule, une lettre minuscule et un chiffre/i)).toBeInTheDocument();
  });

  test('affiche une erreur si le mot de passe ne contient pas de chiffre', async () => {
    const { pseudoInput, emailInput, passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(pseudoInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password' } }); // pas de chiffre
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password' } });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/au moins une lettre majuscule, une lettre minuscule et un chiffre/i)).toBeInTheDocument();
  });

  test("affiche un message de succès si l'API retourne 200", async () => {
    mockRegister.mockResolvedValueOnce({ status: 200 }); // Simule le succès

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/^pseudo$/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/^confirmer le mot de passe$/i), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument();
    });
  });

  test("affiche un message d'erreur si l'API retourne 401", async () => {
    mockRegister.mockRejectedValueOnce({ response: { status: 401 } });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/^pseudo$/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/^confirmer le mot de passe$/i), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/erreur lors de l'inscription\. veuillez réessayer\./i)).toBeInTheDocument();
    });
  });
}); 