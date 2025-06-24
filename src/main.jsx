import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./styles/index.css"; // Keep your CSS import here
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // <--- ADD THIS IMPORT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* <--- WRAP App WITH BrowserRouter HERE */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
