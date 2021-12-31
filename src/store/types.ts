import { RouterState } from 'redux-first-history';
import { ThunkDispatch } from 'redux-thunk';

import { AppState, AppActionTypes } from 'store/app/appTypes';

export type RootState = {
    readonly router: RouterState;
    readonly app: AppState;
};

export type AllActions = AppActionTypes;
export type CommonDispatch = ThunkDispatch<RootState, unknown, AllActions>;
