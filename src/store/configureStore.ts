import { composeWithDevTools } from '@redux-devtools/extension';
import { createBrowserHistory } from 'history';
import {
    Store,
    legacy_createStore, // eslint-disable-line camelcase
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { BUILD_TYPE } from 'constants/appConstants';
import { appReducer, initialAppState } from 'store/app/appReducer';
import { RootState } from 'store/types';

export const initialState = { app: initialAppState };

const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    });
const rootReducer = combineReducers({
    router: routerReducer,
    app: appReducer,
});

const logger = createLogger({
    diff: true,
    collapsed: true,
});
const configureStoreDev = (): Store<RootState> => {
    const middleware = [thunk, logger, routerMiddleware];
    return legacy_createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware)),
    );
};
const configureStoreProd = (): Store<RootState> => {
    const middleware = [thunk, routerMiddleware];
    return legacy_createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware)),
    );
};
const configureStore =
    BUILD_TYPE === `production` ? configureStoreProd : configureStoreDev;

export const store = configureStore();
export const history = createReduxHistory(store);
