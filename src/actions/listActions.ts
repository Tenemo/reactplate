import * as types from 'constants/actionTypes';

interface ListItem {
    item: string;
}
interface AddItem extends ListItem {
    type: types.LIST_ADD_ITEM;
}
interface RemoveItem extends ListItem {
    type: types.LIST_REMOVE_ITEM;
}
export type ListAction = AddItem | RemoveItem;

export const addItem = (item: string): AddItem => ({
    type: types.LIST_ADD_ITEM,
    item,
});

export const removeItem = (item: string): RemoveItem => ({
    type: types.LIST_REMOVE_ITEM,
    item,
});
