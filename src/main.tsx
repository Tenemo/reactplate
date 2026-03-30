import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { browserTracingIntegration } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from 'app/App';
import { store } from 'app/store';

import 'styles/global.scss';

declare const __BUILD_DATE__: string;

export const Root = (): React.JSX.Element => {
    useEffect(() => {
        // https://stackoverflow.com/questions/31402576/enable-focus-only-on-keyboard-use-or-tab-press
        const handleMouseDown = (): void => {
            document.body.classList.add('using-mouse');
        };
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        };

        document.body.addEventListener('mousedown', handleMouseDown);
        document.body.addEventListener('keydown', handleKeyDown);
        console.log(`Build date: ${__BUILD_DATE__}`);

        return () => {
            document.body.removeEventListener('mousedown', handleMouseDown);
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <React.StrictMode>
            <Provider store={store}>
                <HelmetProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </HelmetProvider>
            </Provider>
        </React.StrictMode>
    );
};

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

const root = createRoot(container);
root.render(<Root />);
