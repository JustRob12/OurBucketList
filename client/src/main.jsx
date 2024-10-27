import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration.js'; // Import the service worker registration
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register();
