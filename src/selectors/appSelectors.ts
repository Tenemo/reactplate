import { createSelector } from 'reselect';

import { ApplicationStore, AppStore } from 'store';

export const getApp = (state: ApplicationStore): AppStore => state.app;

export const getIsAppLoading = createSelector(
    [getApp],
    (app: AppStore): boolean => app.requestsInProgress > 1,
);
