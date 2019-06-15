import { Store, combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import appReducer from 'reducers/appReducer';
import listReducer from 'reducers/listReducer';
import { ApplicationStore } from 'store';

export const makeRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        list: listReducer,
    });

export default makeRootReducer;
