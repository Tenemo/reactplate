import { browserTracingIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from 'app/App';
import { store } from 'app/store';

import 'styles/global.scss';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [browserTracingIntegration()],
        tracesSampleRate: 1.0,
    });
}

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

createRoot(container).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
