import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> ensures that the app is rendered only once
  // StrictMode is a React feature that helps you find bugs in your React code.
  // Strict Mode enables extra development-only checks for the entire component tree inside the <StrictMode> component.

  // StrictMode renders components twice in order to detect any problems with your code and warn you about them.
  <React.StrictMode>
    <title>Registration Project</title>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
