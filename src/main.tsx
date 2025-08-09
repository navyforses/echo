import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Get the root element
const rootElement = document.getElementById('root');

// Ensure root element exists
if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root and render app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 