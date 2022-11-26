import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SellerContextProvider } from './context/SellerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SellerContextProvider>
      <App />
    </SellerContextProvider>

  </React.StrictMode>
);
