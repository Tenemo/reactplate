import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import requestsStatusReducer from 'reducers/requestsStatusReducer';

export default history =>
    combineReducers({
        router: connectRouter(history),
        requestsInProgress: requestsStatusReducer,
    });
