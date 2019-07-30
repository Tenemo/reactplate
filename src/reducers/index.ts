import { Store, combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { routerReducer, RouterState } from 'react-router-redux';

import appReducer from 'reducers/appReducer';
import listReducer from 'reducers/listReducer';
import { ApplicationStore, AppStore, ListStore } from 'store';

export interface State {
    readonly router: RouterState;
    readonly app: AppStore;
    readonly list: ListStore;
}

export const makeRootReducer = (history: History) => {
    console.log(
        combineReducers<State>({
            router: connectRouter(history),
            app: appReducer,
            list: listReducer,
        }),
    );
    return combineReducers<State>({
        router: connectRouter(history),
        app: appReducer,
        list: listReducer,
    });
};

export default makeRootReducer;
