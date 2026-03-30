import { UnknownAction } from 'redux';

import {
    AppState,
    AppActionTypes,
    APP_TOGGLE_THEME,
    APP_EXAMPLE_REQUEST,
    APP_EXAMPLE_FAILURE,
    APP_EXAMPLE_SUCCESS,
} from 'store/app/appTypes';

export const initialAppState: AppState = {
    theme: 'dark',
    example: {
        isLoading: false,
        error: null,
        response: null,
    },
};

export const appReducer = (
    state: AppState = initialAppState,
    action: AppActionTypes | UnknownAction,
): AppState => {
    switch (action.type) {
        case APP_TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === 'dark' ? 'light' : 'dark',
            };
        case APP_EXAMPLE_REQUEST:
            return {
                ...state,
                example: {
                    ...state.example,
                    isLoading: true,
                    error: null,
                },
            };
        case APP_EXAMPLE_FAILURE:
            return {
                ...state,
                example: {
                    ...state.example,
                    isLoading: false,
                    error: (
                        action as Extract<
                            AppActionTypes,
                            { type: typeof APP_EXAMPLE_FAILURE }
                        >
                    ).payload.error,
                    response: null,
                },
            };
        case APP_EXAMPLE_SUCCESS:
            return {
                ...state,
                example: {
                    ...state.example,
                    isLoading: false,
                    error: null,
                    response: (
                        action as Extract<
                            AppActionTypes,
                            { type: typeof APP_EXAMPLE_SUCCESS }
                        >
                    ).payload.response,
                },
            };
        default:
            return state;
    }
};
