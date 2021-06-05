import { connectRouter } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';
import { History } from 'history';

import { appReducer, initialAppState } from 'store/app/appReducer';

export const makeRootReducer = (history: History): Reducer =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
    });

export const initialState = { app: initialAppState };

export default makeRootReducer;
