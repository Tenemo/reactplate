import { createSelector } from 'reselect';

import { AppState } from 'store/app/appTypes';
import { RootState } from 'store/types';

export const getApp = (state: RootState): AppState => state.app;
export const getAppTheme = createSelector(getApp, (app) => app.theme);
