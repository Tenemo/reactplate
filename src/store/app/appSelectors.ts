import { createSelector } from 'reselect';

import { RootState } from 'store/types';
import { AppState } from 'store/app/appTypes';

export const getApp = (state: RootState): AppState => state.app;
export const getAppTheme = createSelector(getApp, (app) => app.theme);
