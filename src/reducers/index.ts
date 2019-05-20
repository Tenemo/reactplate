import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from 'reducers/appReducer';
import listReducer from 'reducers/listReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        app: appReducer,
        list: listReducer,
    });
