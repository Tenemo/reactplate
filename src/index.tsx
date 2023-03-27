import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from 'components/Root';

Sentry.init({
    dsn: 'https://ae9f630bfc884a3a86d5a3bbb5ae29c4@o502294.ingest.sentry.io/4504912262463488',
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});

const container = document.getElementById('root');

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Root />);
