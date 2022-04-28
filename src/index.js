import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configure } from "axios-hooks";
import axios from "axios";
import LRU from "lru-cache";
import { BrowserRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:20175/api/"
const cache = new LRU({ max: 10 });
configure({ axios, cache })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
