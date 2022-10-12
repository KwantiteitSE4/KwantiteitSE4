import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
axios.defaults.baseURL='https://localhost:44308';
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
