import type { EnhancedStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { appThemeSlice } from 'features/AppTheme/appThemeSlice';
import { exampleRequestApi } from 'features/ExampleRequest/exampleRequestSlice';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    appTheme: appThemeSlice.reducer,
    exampleRequestApi: exampleRequestApi.reducer,
});

const configureAppStore = (
    preloadedState?: Partial<RootState>,
): EnhancedStore<RootState> =>
    configureStore({
        reducer: rootReducer,
        devTools: import.meta.env.DEV,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(exampleRequestApi.middleware),
        preloadedState,
    });

export type AppStore = ReturnType<typeof configureAppStore>;
export type AppDispatch = AppStore['dispatch'];

export const makeStore = (preloadedState?: Partial<RootState>): AppStore =>
    configureAppStore(preloadedState);

export const store = makeStore();
