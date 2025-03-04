import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app using createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
