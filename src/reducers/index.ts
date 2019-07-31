import { combineReducers, Reducer } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';

import appReducer from 'reducers/appReducer';
import listReducer from 'reducers/listReducer';
import { ApplicationStore } from 'store';

export interface State extends ApplicationStore {
    readonly router: RouterState;
}

export const makeRootReducer = (history: History): Reducer =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        list: listReducer,
    });

export default makeRootReducer;
