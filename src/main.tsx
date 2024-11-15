import { browserTracingIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import App from 'app/App';
import { store, history } from 'app/store';

import 'styles/global.scss';

export const Root = (): React.JSX.Element => {
    useEffect(() => {
        // https://stackoverflow.com/questions/31402576/enable-focus-only-on-keyboard-use-or-tab-press
        document.body.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });
        document.body.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
        console.log(`Build date: ${process.env.BUILD_DATE ?? 'N/A'}`);
    }, []);

    return (
        <React.StrictMode>
            <Provider store={store}>
                <HelmetProvider>
                    <Router history={history}>
                        <App />
                    </Router>
                </HelmetProvider>
            </Provider>
        </React.StrictMode>
    );
};

Sentry.init({
    dsn: 'https://ae9f630bfc884a3a86d5a3bbb5ae29c4@o502294.ingest.sentry.io/4504912262463488',
    integrations: [browserTracingIntegration()],
    tracesSampleRate: 1.0,
});

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Root />);
