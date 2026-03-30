import { UnknownAction } from 'redux';

import { UnknownError } from 'typings/errors';

export const APP_TOGGLE_THEME = 'APP_TOGGLE_THEME';

export const APP_EXAMPLE_REQUEST = 'APP_EXAMPLE_REQUEST';
export const APP_EXAMPLE_FAILURE = 'APP_EXAMPLE_FAILURE';
export const APP_EXAMPLE_SUCCESS = 'APP_EXAMPLE_SUCCESS';

export interface ExampleRequest {
    id: number;
}

export interface ExampleResponse {
    id: number;
    itemName: string;
}

export interface AppState {
    theme: string;
    example: {
        isLoading: boolean;
        error: UnknownError | null;
        response: ExampleResponse | null;
    };
}

interface ToggleThemeAction extends UnknownAction {
    type: typeof APP_TOGGLE_THEME;
}
interface ExampleRequestAction extends UnknownAction {
    type: typeof APP_EXAMPLE_REQUEST;
}
interface ExampleFailureAction extends UnknownAction {
    type: typeof APP_EXAMPLE_FAILURE;
    payload: {
        error: UnknownError;
    };
}
interface ExampleSuccessAction extends UnknownAction {
    type: typeof APP_EXAMPLE_SUCCESS;
    payload: {
        response: ExampleResponse;
    };
}

export type AppActionTypes =
    | ToggleThemeAction
    | ExampleRequestAction
    | ExampleFailureAction
    | ExampleSuccessAction;
