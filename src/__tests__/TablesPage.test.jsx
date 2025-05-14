import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// À adapter selon l'emplacement réel du composant TablesPage
import TablesPage from '../components/TablesPage';
import { BrowserRouter } from 'react-router-dom';

// Mocks à adapter selon ton implémentation réelle
jest.mock('../api/tables');
jest.mock('../auth/context/AuthContext');

import { fetchTables, joinTable } from '../api/tables';
import { useAuth } from '../auth/context/AuthContext';

const mockTables = [
  {
    id: 1,
    name: 'Beginner Table',
    status: 'Waiting',
    round: 1,
    turn: 1,
    currentBlind: 25,
    smallBlind: 10,
    bigBlind: 25,
    currentBet: 0,
    pot: 0,
    dealerPosition: 0,
    river: [],
    players: [],
    maxPlayers: 4,
    minPlayers: 2,
    gameLog: []
  },
  {
    id: 2,
    name: 'Intermediate Table',
    status: 'Waiting',
    round: 1,
    turn: 1,
    currentBlind: 50,
    smallBlind: 25,
    bigBlind: 50,
    currentBet: 0,
    pot: 0,
    dealerPosition: 0,
    river: [],
    players: [],
    maxPlayers: 4,
    minPlayers: 2,
    gameLog: []
  },
];

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('TablesPage', () => {
  beforeEach(() => {
    (useAuth).mockReturnValue({ isAuthenticated: false });
    jest.clearAllMocks();
  });

  it('affiche un état de chargement pendant le fetch', async () => {
    (fetchTables).mockReturnValue(new Promise(() => {}));
    renderWithRouter(<TablesPage />);
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();
  });

  it('affiche la liste des tables après un fetch réussi', async () => {
    (fetchTables).mockResolvedValue(mockTables);
    renderWithRouter(<TablesPage />);
    expect(await screen.findByText('Beginner Table')).toBeInTheDocument();
    expect(screen.getByText('Intermediate Table')).toBeInTheDocument();
  });

  it('affiche un message d\'erreur si le fetch échoue', async () => {
    (fetchTables).mockRejectedValue(new Error('Erreur réseau'));
    renderWithRouter(<TablesPage />);
    expect(await screen.findByText(/erreur/i)).toBeInTheDocument();
  });

  it('affiche un bouton "Rejoindre" pour chaque table', async () => {
    (fetchTables).mockResolvedValue(mockTables);
    renderWithRouter(<TablesPage />);
    expect(await screen.findAllByRole('button', { name: /rejoindre/i })).toHaveLength(2);
  });

  it('redirige vers l\'inscription si non authentifié au clic sur "Rejoindre"', async () => {
    (fetchTables).mockResolvedValue(mockTables);
    (useAuth).mockReturnValue({ isAuthenticated: false });
    renderWithRouter(<TablesPage />);
    const joinButtons = await screen.findAllByRole('button', { name: /rejoindre/i });
    fireEvent.click(joinButtons[0]);
    await waitFor(() => {
      // À adapter selon ta logique de redirection
      expect(window.location.pathname).toBe('/register');
    });
  });

  it("appelle l'API joinTable si authentifié au clic sur 'Rejoindre'", async () => {
    (fetchTables).mockResolvedValue(mockTables);
    (useAuth).mockReturnValue({ isAuthenticated: true, user: { id: 42 } });
    (joinTable).mockResolvedValue({ success: true, table: mockTables[0] });
    renderWithRouter(<TablesPage />);
    const joinButtons = await screen.findAllByRole('button', { name: /rejoindre/i });
    fireEvent.click(joinButtons[0]);
    await waitFor(() => {
      expect(joinTable).toHaveBeenCalledWith(1);
    });
  });
});