import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component with some content', () => {
  render(<App />);
  // On cherche quelque chose de unique dans le header
  const headerElement = screen.getAllByText(/PIXEL/)[0];
  expect(headerElement).toBeInTheDocument();
  
  // Ou on teste juste que l'application se charge avec sa classe principale
  const appElement = document.querySelector('.App');
  expect(appElement).toBeInTheDocument();
});
