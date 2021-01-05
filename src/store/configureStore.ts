import { Store, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import { makeRootReducer } from 'store';
import { RootState } from 'store/types';
import { BUILD_TYPE } from 'constants/appConstants';

export const history = createBrowserHistory();
const logger = createLogger({
    diff: true,
    collapsed: true,
});
const configureStoreDev = (initialState?: RootState): Store<RootState> => {
    const reactRouterMiddleware = routerMiddleware(history);
    const middleware = [thunk, logger, reactRouterMiddleware];
    /* eslint-disable-next-line no-underscore-dangle */
    const store = createStore(
        makeRootReducer(history),
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );
    if (module.hot) {
        module.hot.accept(`../store`, (): void => {
            store.replaceReducer(makeRootReducer(history));
        });
    }
    return store;
};
const configureStoreProd = (initialState?: RootState): Store<RootState> => {
    const reactRouterMiddleware = routerMiddleware(history);
    const middleware = [thunk, reactRouterMiddleware];
    return createStore(
        makeRootReducer(history),
        initialState,
        compose(applyMiddleware(...middleware)),
    );
};
const configureStore =
    BUILD_TYPE === `production` ? configureStoreProd : configureStoreDev;

export const store = configureStore();
