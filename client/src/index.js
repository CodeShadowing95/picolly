import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';

const store = configureStore({
  reducer: reducers
});

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
);