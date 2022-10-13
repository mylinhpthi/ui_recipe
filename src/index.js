import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from "react-cookie";
import reportWebVitals from './reportWebVitals';
import { configure } from "axios-hooks";
import axios from "axios";
import LRU from "lru-cache";
axios.defaults.baseURL = "http://localhost:8093/"
const cache = new LRU({ max: 10 });
configure({ axios })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
   </CookiesProvider>
  </React.StrictMode>
);
reportWebVitals();
