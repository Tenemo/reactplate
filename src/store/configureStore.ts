import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import makeRootReducer from 'reducers';
import { BUILD_TYPE } from 'constants/appConstants';

export const history = createBrowserHistory();
const logger = createLogger({
    diff: true,
    collapsed: true,
});
function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middleware = [thunk, logger, reactRouterMiddleware];
    /* eslint-disable-next-line no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        makeRootReducer(history),
        initialState,
        composeEnhancers(applyMiddleware(...middleware)),
    );
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(makeRootReducer(history));
        });
    }
    return store;
}
function configureStoreProd(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middleware = [thunk, reactRouterMiddleware];
    return createStore(
        makeRootReducer(history),
        initialState,
        compose(applyMiddleware(...middleware)),
    );
}
const configureStore = BUILD_TYPE === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
