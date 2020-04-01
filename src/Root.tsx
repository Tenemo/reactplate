import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { HelmetProvider } from 'react-helmet-async';

import configureStore, { history } from 'store/configureStore';
import App from 'containers/App';

const store = configureStore();

const Root: React.FunctionComponent = (): JSX.Element => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </ConnectedRouter>
    </Provider>
);

export default hot(Root);
