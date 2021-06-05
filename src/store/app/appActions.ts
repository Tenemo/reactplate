import {
    AppActionTypes,
    ExampleResponse,
    ExampleRequest,
    APP_TOGGLE_THEME,
    APP_EXAMPLE_REQUEST,
    APP_EXAMPLE_FAILURE,
    APP_EXAMPLE_SUCCESS,
} from 'store/app/appTypes';
import { CommonDispatch } from 'store/types';
import { UnknownError } from 'typings/errors';
import request from 'utils/request';

export const toggleTheme = (): AppActionTypes => ({
    type: APP_TOGGLE_THEME,
});

export const exampleRequest = (): AppActionTypes => ({
    type: APP_EXAMPLE_REQUEST,
});
export const exampleFailure = (error: UnknownError): AppActionTypes => ({
    type: APP_EXAMPLE_FAILURE,
    payload: { error },
});
export const exampleSuccess = (response: ExampleResponse): AppActionTypes => ({
    type: APP_EXAMPLE_SUCCESS,
    payload: { response },
});
export const fetchExample =
    (requestPayload: ExampleRequest) =>
    async (dispatch: CommonDispatch): Promise<void> => {
        try {
            const response = await request.post<ExampleResponse>(
                'someUrl',
                requestPayload,
            );
            dispatch(exampleSuccess(response.data));
        } catch (error) {
            dispatch(exampleFailure(error as UnknownError));
        }
    };
