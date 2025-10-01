// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Get the base URL from Vite environment and normalize for root hosting
const base = import.meta.env.BASE_URL || '/';
const basename = base === '/' ? undefined : base;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router basename={basename}>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
