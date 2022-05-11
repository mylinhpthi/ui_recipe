import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from "react-cookie";
import reportWebVitals from './reportWebVitals';
import { configure } from "axios-hooks";
import axios from "axios";
import LRU from "lru-cache";
axios.defaults.baseURL = "http://localhost:20175/api/"
// const cache = new LRU({ max: 10 });
configure({ axios })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
   </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
