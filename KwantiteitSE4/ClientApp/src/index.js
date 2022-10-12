import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//const rootElement = document.getElementById('root');

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
        <Provider store={store}>
            <App />
        </Provider>
);
registerServiceWorker();
