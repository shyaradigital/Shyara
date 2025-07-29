import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './style.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Suppress WebGL errors in console
const originalError = console.error;
console.error = (...args) => {
  // Filter out WebGL-related errors
  const message = args.join(' ');
  if (message.includes('WebGL') || 
      message.includes('GL_INVALID_VALUE') || 
      message.includes('GL_INVALID_FRAMEBUFFER_OPERATION') ||
      message.includes('Framebuffer is incomplete') ||
      message.includes('Texture dimensions must all be greater than zero')) {
    return; // Don't log WebGL errors
  }
  originalError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
