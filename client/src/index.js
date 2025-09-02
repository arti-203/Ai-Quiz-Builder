

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="87782418916-sl5k7ber0mt29s856r39q299c33l070j.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
