import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createLogger } from 'redux-logger';

import { appThemeSlice } from 'features/AppTheme/appThemeSlice';
import { exampleRequestSlice } from 'features/ExampleRequest/exampleRequestSlice';

export type RootState = ReturnType<typeof rootReducer>;

const logger = createLogger({
    diff: true,
    collapsed: true,
});

const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({ history: createBrowserHistory() });

export const rootReducer = combineReducers({
    appTheme: appThemeSlice.reducer,
    exampleRequestApi: exampleRequestSlice.reducer,
    router: routerReducer,
});

const middleware = [routerMiddleware, exampleRequestSlice.middleware];

// We'll be just fine with inferring these types :)
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const makeStoreDev = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middleware).concat(logger),
        preloadedState,
    });
    return store;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const makeStoreProd = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: false,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(middleware),
        preloadedState,
    });
    return store;
};

const buildType = process.env.NODE_ENV ?? `production`;
export const makeStore =
    buildType === `development` ? makeStoreDev : makeStoreProd;

export const store = makeStore();
export const history = createReduxHistory(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
