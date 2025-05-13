import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ne pas utiliser next/font dans un projet React standard
// import { Press_Start_2P } from 'next/font/google';

// const pixelFont = Press_Start_2P({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-pixel",
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
