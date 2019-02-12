import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from 'store/configureStore';
import App from 'containers/App/App';

const store = configureStore();
const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

export default hot(module)(Root);
