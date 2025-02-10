import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBoundary.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import 'rsuite/dist/rsuite.min.css'
import { CustomProvider } from 'rsuite';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CustomProvider theme="dark">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </CustomProvider>
  </StrictMode>
);