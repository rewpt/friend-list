import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const axios = require('axios');

axios.defaults.baseURL = 'https://api.example.com';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
