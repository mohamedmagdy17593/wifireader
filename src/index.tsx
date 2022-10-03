import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <div className="font-sans">
      <Toaster />
      <App />
    </div>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
