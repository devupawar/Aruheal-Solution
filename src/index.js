import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom' ki jagah 'react-dom/client' import karo
import { Provider } from 'react-redux'; // Redux Provider ko import karo
import { store } from './redux/store'; // Aapke Redux store ko import karo
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot ka use karo

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

