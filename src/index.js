import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';

import { AuthenticationProvider } from './contexts/AuthenticationContext';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthenticationProvider>
                <DataProvider>
                    <App />
                </DataProvider>
            </AuthenticationProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
