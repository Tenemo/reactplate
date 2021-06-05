import { UnknownError } from 'typings/errors';

export const APP_TOGGLE_THEME = 'APP_TOGGLE_THEME';

export const APP_EXAMPLE_REQUEST = 'APP_EXAMPLE_REQUEST';
export const APP_EXAMPLE_FAILURE = 'APP_EXAMPLE_FAILURE';
export const APP_EXAMPLE_SUCCESS = 'APP_EXAMPLE_SUCCESS';

export type ExampleRequest = {
    id: number;
};

export type ExampleResponse = {
    id: number;
    itemName: string;
};

export type AppState = {
    theme: string;
    example: {
        isLoading: boolean;
        error: UnknownError | null;
        response: ExampleResponse | null;
    };
};

type ToggleThemeAction = {
    type: typeof APP_TOGGLE_THEME;
};
type ExampleRequestAction = {
    type: typeof APP_EXAMPLE_REQUEST;
};
type ExampleFailureAction = {
    type: typeof APP_EXAMPLE_FAILURE;
    payload: {
        error: UnknownError;
    };
};
type ExampleSuccessAction = {
    type: typeof APP_EXAMPLE_SUCCESS;
    payload: {
        response: ExampleResponse;
    };
};

export type AppActionTypes =
    | ToggleThemeAction
    | ExampleRequestAction
    | ExampleFailureAction
    | ExampleSuccessAction;
