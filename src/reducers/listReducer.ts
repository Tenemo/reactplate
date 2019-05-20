import * as types from 'constants/actionTypes';
import { Action, ListStore } from 'store';

export const initialState: ListStore = {
    list: [],
};

const listReducer = (state: ListStore = initialState, action: Action): ListStore => {
    switch (action.type) {
        case types.LIST_ADD_ITEM:
            return state;
        case types.LIST_REMOVE_ITEM:
            return state;
        default:
            return state;
    }
};

export default listReducer;
