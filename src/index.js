import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App';
import ToggleModeProvider from './context/ToggleMode';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToggleModeProvider>
    <App />
  </ToggleModeProvider>
);


