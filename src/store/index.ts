import { AppAction } from 'actions/appActions';
import { ListAction } from 'actions/listActions';

export type Action = AppAction | ListAction;

export type AppTheme = `dark` | `light`;
export type ListStore = string[];
export interface AppStore {
    readonly theme: AppTheme;
    readonly requestsInProgress: number;
}
export interface ApplicationStore {
    readonly app: AppStore;
    readonly list: ListStore;
}
