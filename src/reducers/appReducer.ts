import * as types from 'constants/actionTypes';
import { Action, AppStore } from 'store';

export const initialState: AppStore = {
    theme: `dark`,
    requestsInProgress: 0,
};

const actionTypeIsRequestEnd = (type: types.ActionType): boolean =>
    type.substring(type.length - 8) === `_SUCCESS` ||
    type.substring(type.length - 8) === `_FAILURE`;

const actionTypeIsRequest = (type: types.ActionType): boolean =>
    type.substring(type.length - 8) === `_REQUEST`;

const listReducer = (
    state: AppStore = initialState,
    action: Action,
): AppStore => {
    if (actionTypeIsRequest(action.type)) {
        return { ...state, requestsInProgress: state.requestsInProgress + 1 };
    }
    if (actionTypeIsRequestEnd(action.type)) {
        return { ...state, requestsInProgress: state.requestsInProgress - 1 };
    }
    return state;
};

export default listReducer;
