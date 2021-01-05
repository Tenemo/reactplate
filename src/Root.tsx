import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { HelmetProvider } from 'react-helmet-async';

import { store, history } from 'store/configureStore';
import App from 'components/App';

const Root: React.FunctionComponent = (): ReactElement => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </ConnectedRouter>
    </Provider>
);

export default Root;
