import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/components/app/App';
import './sass/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import { AppContextProvider } from './core/context/app.provider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <Router>
                <App></App>
            </Router>
        </AppContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
